import { OperatingSystem } from "https://deno.land/x/quickr@0.6.51/main/operating_system.js"
import { FileSystem } from "https://deno.land/x/quickr@0.6.51/main/file_system.js"
import { run, hasCommand, throwIfFails, zipInto, mergeInto, returnAsString, Timeout, Env, Cwd, Stdin, Stdout, Stderr, Out, Overwrite, AppendTo } from "https://deno.land/x/quickr@0.6.51/main/run.js"
import { Console, black, white, red, green, blue, yellow, cyan, magenta, lightBlack, lightWhite, lightRed, lightGreen, lightBlue, lightYellow, lightMagenta, lightCyan, blackBackground, whiteBackground, redBackground, greenBackground, blueBackground, yellowBackground, magentaBackground, cyanBackground, lightBlackBackground, lightRedBackground, lightGreenBackground, lightYellowBackground, lightBlueBackground, lightMagentaBackground, lightCyanBackground, lightWhiteBackground, bold, reset, dim, italic, underline, inverse, strikethrough, gray, grey, lightGray, lightGrey, grayBackground, greyBackground, lightGrayBackground, lightGreyBackground, } from "https://deno.land/x/quickr@0.6.51/main/console.js"
import { zip, enumerate, count, permute, combinations, wrapAroundGet } from "https://deno.land/x/good@1.5.1.0/array.js"
import { toString as safeToString } from "https://deno.land/x/good@1.5.1.0/string.js"
import { deepCopy, deepCopySymbol, allKeyDescriptions, deepSortObject, shallowSortObject, isGeneratorType,isAsyncIterable, isSyncIterable, isTechnicallyIterable, isSyncIterableObjectOrContainer, allKeys } from "https://deno.land/x/good@1.5.1.0/value.js"
import { escapeRegexMatch } from "https://deno.land/x/good@1.7.1.1/flattened/escape_regex_match.js"


import { nixFileToXml, parse, xmlStylePreview } from "./tools/parsing.js"
import { StackManager } from "./tools/analysis.js"

import { NixError, NotImplemented } from "./main/errors.js"


// Design explanation (converting nix to JavaScript)
    // Half the work is done in the runtime.js file
    // the other half is this file translating the AST to use the runtime stuff

    // 1. First there is a top-level wrapper function: createRuntime()
    //    It creates `builtins`, `runtime`, and `operators`
    // 2. A nix var (like `blah`) becomes `nixScope["blah"]` rather
    //    than directly becoming a JS variable. This means:
    //    - there's no keyword problems
    //      E.g. nix`undefined` => js`nixScope["undefined"]`
    //    - variable names can contain dashes and single quotes no problem
    //    - it also really really helps for things like nix`with maintainers; [ thing ]`
    //      because we can merge scopes by doing something like
    //      js`nixScope = {...nixScope.maintainers, ...nixScope}; return [ nixScope["thing"] ]`
    // 3. Nix has ints and floats
    //    JavaScript does not have ints
    //    This is actually a big problem because in nix (1/2 != 1.0/2) 
    //    (When the inputs are BOTH integers, division is rounded)
    //    There are some other edgecases as well 
    //    That said... JavaScript does have BigInt
    //    So, all nix Int-literals are translated to JavaScript BigInts
    //    This causes a few hiccups as things like Math.max() don't work with BigInts
    // 4. While normal nix strings can be mapped to JavaScript strings
    //    Interpolated nix strings can't be, because of them being lazy
    //    E.g. nix`[ "${reallyExpensiveComputation}_something" ]` won't trigger the reallyExpensiveComputation
    //    But in JavaScript it will.
    //    So, we have to create a InterpolatedString class to handle these things
    //       Every interpolated value gets wrapped in a little function
    // 5. Path values become a JavaScript Path class (just a wrapper class around InterpolatedString, because yes we can have interpolated paths)
    // 6. All the other values are straightforward:
    //    - nix lists become JavaScript arrays
    //    - nix attrSets become JavaScript objects
    //    - nix functions become JavaScript functions 
    // 7. Statements (let in, if then else, rec, assert, with) need transforming
    //    Most can be transformed in place, and this is the bulk of the translation logic
    // 
    //    Here's some specifics on how those are handled
    //    - operators (nix`1.0 + 1.0`) get mapped to named version of the operation `operators.add(1.0, 1.0)`
    //    - function calls are just mapped as is (nix`func1 null` => js`func1(null)`)
        //    Here's some specifics on how those are handled
    //    - operators (nix`1.0 + 1.0`) get mapped to named version of the operation `operators.add(1.0, 1.0)`
    //    - function calls are just mapped as is (nix`func1 null` => js`func1(null)`)
    //    - function defintions require a bit more work, see the examples outside of this explanation 
    //    - rec and attrSets 
    //       - theres a few edgecases in here:
    //           - nix`inherit x;`
    //           - nix`inherit (y) x;` (called "inherit_from")
    //           - nix`x.a.b.c = 10;` (stacked binding)
    //           - dynamic attrs nix`${x} = true;` and some lovely extra edgecases: https://discourse.nixos.org/t/attribute-interpolation-breaks-referential-transparency/30070
    //       - There are two kinds of attributes:
    //         constant attributes and getters
    //         it's more efficient to have normal attributes
    //         but it's easier to make everything a getter since they're lazy (AKA always match expected nix behavior)
    // 8. There are some special/magical edgecases
    //    - string interpolation is very not-fun because of nix
    //    - builtins.unsafeGetAttrPos gets the file path where an attribute is defined
    //      which means we need to keep track of that somehow in order for that builtin function to work
    //    - I believe nix does a kind of automatic fixedpoint recursion when functions are called
    //      So there may need to be a checker inside of JavaScript functions for this

// conversion examples:
    // nix code:
        // let
        //     thing.thing = 10
        //     otherThing = thing.thing + 10 + 88
        // in
        //     thing
    // corrisponding JavaScript:
        // (function(){
        //     const nixScope = {
        //         // inherit parent scope
        //         ...runtime.scopeStack.slice(-1)[0],
        //     }
        //     runtime.scopeStack.push(nixScope)
        //     try {
        //         // bases of attr-list assignments
        //         nixScope["thing"] = {}
        //         // assignments to constants
        //         nixScope["thing"]["thing"] = 10n
        //         // assignments involving variables
        //         Object.defineProperty(nixScope, "otherThing", {get(){return builtins.add(nixScope["thing"]["thing"], 98n) }})
        //         return nixScope.thing 
        //     } finally {
        //         runtime.scopeStack.pop()
        //     }
        // })()
    
    // nix code:
        // with maintainers; [ name1 name2 ]
    // corrisponding JavaScript:
        // (function(){
        //     const nixScope = {
        //         // inherit parent scope
        //         ...runtime.scopeStack.slice(-1)[0],
        //         // inherit from with statement
        //         ...nixScope.maintainers,
        //     }
        //     runtime.scopeStack.push(nixScope)
        //     try {
        //         return [
        //             nixScope.name1,
        //             nixScope.name2
        //         ]
        //     } finally {
        //         runtime.scopeStack.pop()
        //     }
        // })()
    
    // nix code:
        // { namedArg1, namedArg2 ?? null }@arguments : namedArg1.something
    // corrisponding JavaScript:
        // (function(arg){
        //     const nixScope = {
        //         // inherit parent scope
        //         ...runtime.scopeStack.slice(-1)[0],
        //         // inherit default arguments
        //         "namedArg2": null,
        //         // inherit arguments
        //         ...arg,
        //         // all-args arg
        //         "arguments": arg, //<<<intentionally does not contain default values
        //     }
        //     runtime.scopeStack.push(nixScope)
        //     try {
        //         return nixScope["namedArg1"]["something"]
        //     } finally {
        //         runtime.scopeStack.pop()
        //     }
        // })

// Design TODO:
    // record unsafeGetAttrPos for each function/scope/identifier
    // handle converting <nixpkgs> to builtins.findFile builtins.nixPath "nixpkgs"

// 
//
// The Main function! nix comes in js comes out
//
// 
export const convertToJs = (code)=>{
    const tree = parse(code)
    const rootNode = tree.rootNode
    let output = ""
    for (const node of rootNode.children) {
        output += nixNodeToJs(node)
    }
    // optimization, could be made less hacky
    if (!output.includes("runtime")) {
        return output
    }
    return `import { createRuntime } from "./main/runtime.js"\nconst runtime = createRuntime()\n${output}`
}

const nixNodeToJs = (node)=>{
    if (node.type == "comment") {
        if (node.text.startsWith("#")) {
            return "//" + node.text.slice(1,0)+"\n"
        } else {
            return node.text
        }
    } else if (node.type == "whitespace") {
        // Skip whitespace nodes
        return ""
    } else if (node.type == "identifier") {
        if (node.text == "null") {
            // NULL can't be reassigned so direct translation is fine
            return "null"
        } else if (node.text == "true" || node.text == "false") {
            // Booleans can technically be shadowed in Nix, but for now treat them as literals
            // TODO: This should check if they're shadowed in the current scope
            return node.text
        } else {
            // builtins and other identifiers
            // They can all be overriden with local variable names...

            // NOTE: not all identifiers (ex: attrSet keys are identifiers) will be changed to nixScope["name"]
            // but the ones that wont be converted will be skipped
            return `nixScope[${JSON.stringify(node.text)}]`
        }
    } else if (node.type == "integer_expression") {
        // Note: Nix does not support hex (0xFF) or octal (0o77) literals
        // They parse as 0 followed by a variable name
        return `${node.text}n` // convert to BigInt
    } else if (node.type == "float_expression") {
        // Scientific notation (1.5e10) is already supported - just pass through
        return node.text
    } else if (node.type == "parenthesized_expression") {
        // FUTURE: there could be an optimization here where if the result is atomic (ex: operators.add(1,2)) then we can skip the parentheses
        return `(${nixNodeToJs(valueBasedChildren(node)[1])})`
    } else if (node.type == "unary_expression") {
        // for minus (float, int, or variable) its fine to leave as-is
        // for "not" also fine
        return node.text
    } else if (node.type == "binary_expression") {
        const children = valueBasedChildren(node)
        // operators of floats stay as-is
        if (children[0]?.type == "float_expression" && children[2]?.type == "float_expression") {
            return node.text
        // TODO: add more cases of literals getting direct conversion
        } else {
            const operator = children[1].text
            const operatorName = ({
                "+": "add",
                "-": "subtract",
                "*": "multiply",
                "/": "divide",
                "==": "equal",
                "!=": "notEqual",
                "<": "lessThan",
                "<=": "lessThanOrEqual",
                ">": "greaterThan",
                ">=": "greaterThanOrEqual",
                "&&": "and",
                "||": "or",
                "->": "implication",
                "//": "merge",
                "++": "listConcat",
                "?": "hasAttr",
                // I think thats all of them
            })[operator]
            if (!operatorName) {
                throw new NotImplemented(`error: operator ${operator} is not supported yet`)
            }
            return `operators.${operatorName}(${nixNodeToJs(children[0])}, ${nixNodeToJs(children[2])})`
        }
        console.debug(`xmlStylePreview(node) is:`,xmlStylePreview(node))
        return node.text
    } else if (node.type == "string_expression") {
        const children = valueBasedChildren(node)
        // <string_expression>
        //     <"\"" text="\"" />
        //     <string_fragment text="world" />
        //     <"\"" text="\"" />
        // </string_expression>
        const usedDoubleQuotes = (children[0].type == "\"")
        const hasInterpolation = children.some(each=>each.type=="interpolation")
        if (!hasInterpolation) {
            // For empty strings, there's no string_fragment child
            const stringFragment = children.find(c => c.type === "string_fragment")
            let text = stringFragment ? stringFragment.text : ""
            if (usedDoubleQuotes) {
                // guarenteed that double quotes are all escaped here
                return `"${text.replace(/(\\\\)*\\([bfvux0])/g, "$1$2")}"`
            } else {
                // there are no backslash escapes
                text = text.replace(/\\./g, "\\$&") // \n becomes literally \n (not a newline)

                // we need to translate the valid escape sequences
                text = text.replace(/(''')*''\$/g, "$1\\$")             // ''$ => the dollar sign, but because its JS we need to escape it so its \$
                text = text.replace(/(''')*''\\\\([nrt"'])/g, "$1\\$2") // ''\n => a newline, but because its JS we need to escape it so its \n
                text = text.replace(/(''')*''\\\\([^nrt"'])/g, "$1$2")  // ''\b => the letter b
                text = text.replace(/'''/g, "''")                       // ''' => two single quotes

                // we need to add a backslash to backticks
                text = text.replace(/`/g, "\\`")

                return `\`${text}\``
            }
        }

        // Handle interpolated strings
        // Example: "hello ${world}" or "prefix ${x} middle ${y} suffix"
        // Structure: strings.length should be getters.length + 1
        // "a ${x} b ${y} c" => strings=["a ", " b ", " c"], getters=[x, y]
        const strings = []
        const getters = []

        // Start with an empty string in case we begin with an interpolation
        let currentString = ""

        for (const child of children) {
            if (child.type == "\"" || child.type == "''") {
                // Skip quotes
                continue
            } else if (child.type == "string_fragment") {
                let text = child.text
                if (usedDoubleQuotes) {
                    // Handle escape sequences in double-quoted strings
                    text = text.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
                } else {
                    // Handle indented string escapes (this shouldn't happen for string_expression, but keeping for consistency)
                    text = text.replace(/`/g, "\\`")
                }
                currentString += text
            } else if (child.type == "interpolation") {
                // Push the accumulated string and start a new one
                strings.push(currentString)
                currentString = ""

                // Get the expression inside the interpolation: ${expr}
                const interpChildren = valueBasedChildren(child)
                // interpChildren[0] is "${", interpChildren[1] is the expression, interpChildren[2] is "}"
                const expr = interpChildren[1]
                getters.push(`()=>(${nixNodeToJs(expr)})`)
            }
        }

        // Push the final string segment
        strings.push(currentString)

        return `(new InterpolatedString([${strings.map(s => JSON.stringify(s)).join(", ")}], [${getters.join(", ")}]))`
    } else if (node.type == "indented_string_expression") {
        // <indented_string_expression>
        //     <'' text="''" />
        //     <string_fragment text="hello " />
        //     <interpolation>
        //         <${ text="${" />
        //         <variable_expression>
        //             <identifier text="world" />
        //         </variable_expression>
        //         <} text="}" />
        //     </interpolation>
        //     <'' text="''" />
        // </indented_string_expression>
        const children = valueBasedChildren(node)
        const hasInterpolation = children.some(each=>each.type=="interpolation")

        if (!hasInterpolation) {
            // Simple indented string without interpolation
            let text = children[1].text
            // Handle indented string escapes
            text = text.replace(/\\./g, "\\$&") // preserve literal backslashes
            text = text.replace(/(''')*''\$/g, "$1\\$")             // ''$ => \$
            text = text.replace(/(''')*''\\\\([nrt"'])/g, "$1\\$2") // ''\n => \n
            text = text.replace(/(''')*''\\\\([^nrt"'])/g, "$1$2")  // ''\b => b
            text = text.replace(/'''/g, "''")                       // ''' => ''
            text = text.replace(/`/g, "\\`")                        // escape backticks
            return `\`${text}\``
        }

        // Handle interpolated indented strings
        const strings = []
        const getters = []

        let currentString = ""

        for (const child of children) {
            if (child.type == "\"" || child.type == "''") {
                // Skip quotes
                continue
            } else if (child.type == "string_fragment") {
                let text = child.text
                // Handle indented string escapes
                text = text.replace(/(''')*''\$/g, "$1$")              // ''$ => $
                text = text.replace(/(''')*''\\\\([nrt"'])/g, "$1$2")  // ''\n => actual newline in JS
                text = text.replace(/(''')*''\\\\([^nrt"'])/g, "$1$2") // ''\b => b
                text = text.replace(/'''/g, "''")                      // ''' => ''
                text = text.replace(/`/g, "\\`")                       // escape backticks for JS template literals
                currentString += text
            } else if (child.type == "interpolation") {
                // Push the accumulated string and start a new one
                strings.push(currentString)
                currentString = ""

                const interpChildren = valueBasedChildren(child)
                const expr = interpChildren[1]
                getters.push(`()=>(${nixNodeToJs(expr)})`)
            }
        }

        // Push the final string segment
        strings.push(currentString)

        return `(new InterpolatedString([${strings.map(s => JSON.stringify(s)).join(", ")}], [${getters.join(", ")}]))`
    } else if (node.type == "path_expression") {
        const children = valueBasedChildren(node)
        const hasInterpolation = children.some(each=>each.type=="interpolation")

        if (!hasInterpolation) {
            // Simple path without interpolation
            return `(new Path([${JSON.stringify(node.text)}], []))`
        }

        // Handle interpolated paths like ./${dir}/file
        const strings = []
        const getters = []
        let currentString = ""

        for (const child of children) {
            if (child.type == "path_fragment") {
                currentString += child.text
            } else if (child.type == "interpolation") {
                // Push the accumulated string and start a new one
                strings.push(currentString)
                currentString = ""

                const interpChildren = valueBasedChildren(child)
                const expr = interpChildren[1]
                getters.push(`()=>(${nixNodeToJs(expr)})`)
            }
        }

        // Push the final string segment
        strings.push(currentString)

        return `(new Path([${strings.map(s => JSON.stringify(s)).join(", ")}], [${getters.join(", ")}]))`
    } else if (node.type == "apply_expression") { // function call
        const children = valueBasedChildren(node)
        return `${nixNodeToJs(children[0])}(${nixNodeToJs(children[1])})`
    } else if (node.type == "if_expression") {
        // <if_expression>
        //     <if text="if" />
        //     <select_expression>
        //         <variable_expression>
        //             <identifier text="a" />
        //         </variable_expression>
        //         <. text="." />
        //         <attrpath>
        //             <identifier text="a" />
        //         </attrpath>
        //     </select_expression>
        //     <then text="then" />
        //     <variable_expression>
        //         <identifier text="b" />
        //     </variable_expression>
        //     <else text="else" />
        //     <variable_expression>
        //         <identifier text="c" />
        //     </variable_expression>
        // </if_expression>
        
        // Nix requires strict boolean values in if conditions
        // We wrap the condition in a helper that checks it's actually a boolean
        const children = valueBasedChildren(node)
        const condition = nixNodeToJs(children[1])
        const thenBranch = nixNodeToJs(children[3])
        const elseBranch = nixNodeToJs(children[5])
        return `(operators.ifThenElse(${condition}, ()=>(${thenBranch}), ()=>(${elseBranch})))`
    } else if (node.type == "list_expression") {
        return `[${
            valueBasedChildren(node).filter(
                each=>!(each.type=="["||each.type=="]")
            ).map(nixNodeToJs).join(",")
        }]`
    } else if (node.type == "select_expression") {
        // <select_expression>
        //     <variable_expression>
        //         <identifier text="a" />
        //     </variable_expression>
        //     <. text="." />
        //     <attrpath>
        //         <identifier text="b" />
        //         <. text="." />
        //         <identifier text="c" />
        //     </attrpath>
        // </select_expression>
        const children = valueBasedChildren(node)
        const base = nixNodeToJs(children[0])

        // Get the attribute path (everything after the first dot)
        const attrpath = children.find(child => child.type === "attrpath")
        if (!attrpath) {
            throw Error(`select_expression has no attrpath: ${node.text}`)
        }

        // Build the path as a series of property accesses
        const pathParts = valueBasedChildren(attrpath).filter(each => each.type !== ".")
        let result = base
        for (const part of pathParts) {
            if (part.type === "identifier") {
                result = `${result}[${JSON.stringify(part.text)}]`
            } else if (part.type === "string_expression") {
                // Dynamic attribute access like a."${b}"
                result = `${result}[${nixNodeToJs(part)}]`
            } else {
                throw Error(`Unexpected attrpath element type: ${part.type}`)
            }
        }
        return result
    } else if (node.type == "variable_expression") {
        // <variable_expression>
        //     <identifier text="a" />
        // </variable_expression>
        const children = valueBasedChildren(node)
        return nixNodeToJs(children[0])
    } else if (node.type == "has_attr_expression") {
        // This is the `a ? b` syntax for checking if attribute exists
        // Already handled by binary_expression as the "?" operator
        const children = valueBasedChildren(node)
        const obj = nixNodeToJs(children[0])
        const attrpath = children.find(child => child.type === "attrpath")
        if (!attrpath) {
            throw Error(`has_attr_expression has no attrpath: ${node.text}`)
        }
        const pathParts = valueBasedChildren(attrpath).filter(each => each.type !== ".")

        // Build an array of attribute names (some may be dynamic via interpolation)
        const attrPathElements = pathParts.map(part => {
            if (part.type === "identifier") {
                // Static attribute name
                return JSON.stringify(part.text)
            } else if (part.type === "interpolation") {
                // Dynamic attribute name via ${...}
                const interpolatedExpr = valueBasedChildren(part).find(child =>
                    child.type !== "${" && child.type !== "}"
                )
                if (!interpolatedExpr) {
                    throw Error(`interpolation in has_attr has no expression: ${part.text}`)
                }
                return nixNodeToJs(interpolatedExpr)
            } else if (part.type === "string_expression") {
                // String expression (could contain interpolation)
                return nixNodeToJs(part)
            } else {
                throw new NotImplemented(`Unsupported attrpath element type in has_attr: ${part.type}`)
            }
        })

        // For simple case like `a ? b`, use operators.hasAttr(a, "b")
        if (attrPathElements.length === 1) {
            return `operators.hasAttr(${obj}, ${attrPathElements[0]})`
        }

        // For nested paths like `a ? b.c.d` or `a ? b.${x}.c`, use operators.hasAttrPath
        return `operators.hasAttrPath(${obj}, ${attrPathElements.join(", ")})`
    } else if (node.type == "attrset_expression" || node.type == "rec_attrset_expression") {
        // node = <attrset_expression>
        //     <{ text="{" />
        //     <binding_set>
        //         {<binding> or <inherit> or <inherit_from>}
        //         <binding>
        //             <attrpath>
        //                 {<string_expression> or <identifier> or [<identifier> <./></identifier> ...]}
        //             </attrpath>
        //             <= text="=" />
        //                 {some kind of expression}
        //             <; text=";" />
        //         </binding>
        //     </binding_set>
        //     <{ text="}" />
        // </attrset_expression>

        const isRec = node.type === "rec_attrset_expression"
        const children = valueBasedChildren(node)
        const bindingSet = children.find(each => each.type === "binding_set")

        if (!bindingSet) {
            // Empty attrset
            return "{}"
        }

        const bindings = valueBasedChildren(bindingSet).filter(each =>
            each.type === "binding" || each.type === "inherit" || each.type === "inherit_from"
        )

        // For rec, we need a scope with getters; for non-rec, we can use a plain object
        if (isRec) {
            // Similar to let expression, but returns the scope itself
            let code = `(function(){\n`
            code += `    const nixScope = {};\n`

            // Process bindings similar to let
            const bindingsByBase = {}
            const simpleBindings = []

            for (const binding of bindings) {
                if (binding.type === "binding") {
                    const bindingChildren = valueBasedChildren(binding)
                    const attrpath = bindingChildren.find(each => each.type === "attrpath")
                    const value = bindingChildren[bindingChildren.findIndex(each => each.text === "=") + 1]

                    const pathParts = valueBasedChildren(attrpath).filter(each => each.type !== ".")

                    if (pathParts.length === 1 && pathParts[0].type === "identifier") {
                        simpleBindings.push({
                            name: pathParts[0].text,
                            value: value,
                            isConstant: isConstantExpression(value)
                        })
                    } else {
                        const baseName = pathParts[0].text
                        if (!bindingsByBase[baseName]) {
                            bindingsByBase[baseName] = []
                        }
                        bindingsByBase[baseName].push({
                            path: pathParts.slice(1),
                            value: value
                        })
                    }
                } else if (binding.type === "inherit") {
                    const inheritedAttrs = valueBasedChildren(binding).find(each => each.type === "inherited_attrs")
                    if (inheritedAttrs) {
                        const identifiers = valueBasedChildren(inheritedAttrs).filter(each => each.type === "identifier")
                        for (const id of identifiers) {
                            simpleBindings.push({
                                name: id.text,
                                value: id,
                                isConstant: false
                            })
                        }
                    }
                }
            }

            // Create base objects for nested bindings
            for (const [baseName, _] of Object.entries(bindingsByBase)) {
                code += `    nixScope[${JSON.stringify(baseName)}] = {};\n`
            }

            // Add simple constant bindings
            for (const {name, value, isConstant} of simpleBindings.filter(b => b.isConstant)) {
                code += `    nixScope[${JSON.stringify(name)}] = ${nixNodeToJs(value)};\n`
            }

            // Add nested bindings
            for (const [baseName, nestedBindings] of Object.entries(bindingsByBase)) {
                for (const {path, value} of nestedBindings) {
                    let accessor = `nixScope[${JSON.stringify(baseName)}]`
                    for (let i = 0; i < path.length - 1; i++) {
                        accessor += `[${JSON.stringify(path[i].text)}]`
                    }
                    const lastKey = path[path.length - 1].text
                    code += `    ${accessor}[${JSON.stringify(lastKey)}] = ${nixNodeToJs(value)};\n`
                }
            }

            // For rec, we need to push the scope so lazy bindings can reference other attributes
            code += `    runtime.scopeStack.push(nixScope);\n`
            code += `    try {\n`

            // Add lazy bindings
            for (const {name, value, isConstant} of simpleBindings.filter(b => !b.isConstant)) {
                code += `        Object.defineProperty(nixScope, ${JSON.stringify(name)}, {get(){return ${nixNodeToJs(value)};}});\n`
            }

            code += `        return nixScope;\n`
            code += `    } finally {\n`
            code += `        runtime.scopeStack.pop();\n`
            code += `    }\n`
            code += `})()`

            return code
        } else {
            // Non-rec attrset - need to handle nested paths by building a helper function
            // We can't use plain object literal syntax for nested paths like { a.b.c = 10; }
            // Instead, we generate code that builds the object imperatively

            const simpleBindings = []
            const nestedBindings = []

            for (const binding of bindings) {
                if (binding.type === "binding") {
                    const bindingChildren = valueBasedChildren(binding)
                    const attrpath = bindingChildren.find(each => each.type === "attrpath")
                    const value = bindingChildren[bindingChildren.findIndex(each => each.text === "=") + 1]

                    const pathParts = valueBasedChildren(attrpath).filter(each => each.type !== ".")

                    if (pathParts.length === 1 && pathParts[0].type === "identifier") {
                        const key = pathParts[0].text
                        simpleBindings.push({ key, value })
                    } else {
                        // Nested path like a.b.c
                        nestedBindings.push({ pathParts, value })
                    }
                } else if (binding.type === "inherit") {
                    const inheritedAttrs = valueBasedChildren(binding).find(each => each.type === "inherited_attrs")
                    if (inheritedAttrs) {
                        const identifiers = valueBasedChildren(inheritedAttrs).filter(each => each.type === "identifier")
                        for (const id of identifiers) {
                            simpleBindings.push({ key: id.text, value: id })
                        }
                    }
                }
            }

            // If we only have simple bindings, use object literal syntax
            if (nestedBindings.length === 0) {
                const properties = simpleBindings.map(({key, value}) =>
                    `${JSON.stringify(key)}: ${nixNodeToJs(value)}`
                )
                return `{${properties.join(", ")}}`
            }

            // Otherwise, build object imperatively
            let code = `(function(){\n`
            code += `    const obj = {};\n`

            // Add simple bindings
            for (const {key, value} of simpleBindings) {
                code += `    obj[${JSON.stringify(key)}] = ${nixNodeToJs(value)};\n`
            }

            // Add nested bindings - need to create intermediate objects
            for (const {pathParts, value} of nestedBindings) {
                // Build the accessor chain, creating intermediate objects as needed
                let accessor = 'obj'
                for (let i = 0; i < pathParts.length - 1; i++) {
                    const part = pathParts[i]
                    const key = part.type === "identifier" ? part.text : nixNodeToJs(part)
                    accessor += `[${JSON.stringify(key)}]`
                    // Ensure intermediate object exists
                    code += `    if (${accessor} === undefined) ${accessor} = {};\n`
                }

                // Set the final value
                const lastPart = pathParts[pathParts.length - 1]
                const lastKey = lastPart.type === "identifier" ? lastPart.text : nixNodeToJs(lastPart)
                code += `    ${accessor}[${JSON.stringify(lastKey)}] = ${nixNodeToJs(value)};\n`
            }

            code += `    return obj;\n`
            code += `})()`

            return code
        }
    } else if (node.type == "function_expression") {
        // simple function:
            // <function_expression>
            //     <identifier text="a" />
            //     <: text=":" />
            //     <integer_expression text="10" />
            // </function_expression>
        // simple function
        const children = valueBasedChildren(node)
        const isSimple = children[0]?.type == "identifier"
        if (isSimple) {
            const argName = children[0].text
            const body = children.slice(-1)[0]
            return `((arg)=>{ const nixScope = {...runtime.scopeStack.slice(-1)[0], ${JSON.stringify(argName)}: arg, }; runtime.scopeStack.push(nixScope); try { return ${nixNodeToJs(body)}; } finally { runtime.scopeStack.pop(); } })`
        // more complicated function:
        } else {
            // <function_expression>
            //     <formals>
            //         <{ text="{" />
            //         <formal>
            //             <identifier text="a" />
            //         </formal>
            //         <, text="," />
            //         <formal>
            //             <identifier text="b" />
            //         </formal>
            //         <, text="," />
            //         <formal>
            //             <identifier text="c" />
            //         </formal>
            //         <} text="}" />
            //     </formals>
            //     <@ text="@" />
            //     <identifier text="thing" />
            //     <: text=":" />
            //     <integer_expression text="10" />
            // </function_expression>
            if (children[0].type != "formals") {
                throw Error(`When handling a function, it didn't seem to be a simple function, but also didn't have <formals>. Not sure what happened:\n${node.text}`)
            }
            const formals = children[0].children.filter(each=>each.type=="formal")
            // A formal with a default has more than just the identifier
            const formalsWithDefaults = formals.filter(each=>{
                const formalChildren = valueBasedChildren(each)
                return formalChildren.length > 1 // Has default if more than just identifier
            })

            const defaults = formalsWithDefaults.map(each=>{
                const formalChildren = valueBasedChildren(each)
                const argName = formalChildren[0].text
                const defaultValue = nixNodeToJs(formalChildren[2])
                return `${JSON.stringify(argName)}: ${defaultValue},`
            }).join("")

            // Handle @ syntax: { a, b }@args: body
            let allArgsString = ""
            const atIndex = children.findIndex(each=>each.type=="@")
            if (atIndex >= 0) {
                // The identifier after @ is the name for the full argument set
                const allArgsName = children[atIndex + 1]
                if (allArgsName?.type === "identifier") {
                    allArgsString = `${JSON.stringify(allArgsName.text)}: arg,`
                }
            }

            // The body is the last child (after the ":")
            const body = children.slice(-1)[0]

            return `
                (function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        ${defaults}
                        // inherit arguments
                        ...arg,
                        // all-args arg (if @ syntax is used)
                        ${allArgsString}
                    }
                    runtime.scopeStack.push(nixScope)
                    try {
                        return ${nixNodeToJs(body)}
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })
            `

        }
    } else if (node.type == "let_expression") {
        // <let_expression>
        //     <let text="let" />
        //     <binding_set>
        //     </binding_set>
        //     <in text="in" />
        //     <></>
        // </let_expression>

        const children = valueBasedChildren(node)
        const bindingSet = children.find(each => each.type === "binding_set")
        const bodyIndex = children.findIndex(each => each.type === "in") + 1
        const body = children[bodyIndex]

        if (!bindingSet || !body) {
            throw Error(`let_expression missing binding_set or body: ${node.text}`)
        }

        // Process bindings
        const bindings = valueBasedChildren(bindingSet).filter(each =>
            each.type === "binding" || each.type === "inherit" || each.type === "inherit_from"
        )

        // Group bindings by base attribute name to handle nested paths
        const bindingsByBase = {}
        const simpleBindings = []

        for (const binding of bindings) {
            if (binding.type === "binding") {
                const bindingChildren = valueBasedChildren(binding)
                const attrpath = bindingChildren.find(each => each.type === "attrpath")
                const value = bindingChildren[bindingChildren.findIndex(each => each.text === "=") + 1]

                const pathParts = valueBasedChildren(attrpath).filter(each => each.type !== ".")

                if (pathParts.length === 1 && pathParts[0].type === "identifier") {
                    // Simple binding: x = value
                    simpleBindings.push({
                        name: pathParts[0].text,
                        value: value,
                        isConstant: isConstantExpression(value)
                    })
                } else {
                    // Nested binding: a.b.c = value
                    const baseName = pathParts[0].text
                    if (!bindingsByBase[baseName]) {
                        bindingsByBase[baseName] = []
                    }
                    bindingsByBase[baseName].push({
                        path: pathParts.slice(1),
                        value: value
                    })
                }
            } else if (binding.type === "inherit") {
                // inherit x y z; means x = x; y = y; z = z;
                const identifiers = valueBasedChildren(binding).filter(each => each.type === "identifier")
                for (const id of identifiers) {
                    simpleBindings.push({
                        name: id.text,
                        value: id,
                        isConstant: false
                    })
                }
            } else if (binding.type === "inherit_from") {
                // inherit (expr) x y z; means x = expr.x; y = expr.y; etc.
                throw new NotImplemented(`inherit (expr) syntax not yet supported`)
            }
        }

        // Generate JavaScript code
        let code = `(function(){\n`
        code += `    const nixScope = {...runtime.scopeStack.slice(-1)[0]};\n`
        code += `    runtime.scopeStack.push(nixScope);\n`
        code += `    try {\n`

        // Create base objects for nested bindings
        for (const [baseName, _] of Object.entries(bindingsByBase)) {
            code += `        nixScope[${JSON.stringify(baseName)}] = {};\n`
        }

        // Add simple constant bindings
        for (const {name, value, isConstant} of simpleBindings.filter(b => b.isConstant)) {
            code += `        nixScope[${JSON.stringify(name)}] = ${nixNodeToJs(value)};\n`
        }

        // Add nested bindings
        for (const [baseName, nestedBindings] of Object.entries(bindingsByBase)) {
            for (const {path, value} of nestedBindings) {
                let accessor = `nixScope[${JSON.stringify(baseName)}]`
                for (let i = 0; i < path.length - 1; i++) {
                    accessor += `[${JSON.stringify(path[i].text)}]`
                }
                const lastKey = path[path.length - 1].text
                code += `        ${accessor}[${JSON.stringify(lastKey)}] = ${nixNodeToJs(value)};\n`
            }
        }

        // Add lazy bindings (those that reference other variables)
        for (const {name, value, isConstant} of simpleBindings.filter(b => !b.isConstant)) {
            code += `        Object.defineProperty(nixScope, ${JSON.stringify(name)}, {get(){return ${nixNodeToJs(value)};}});\n`
        }

        code += `        return ${nixNodeToJs(body)};\n`
        code += `    } finally {\n`
        code += `        runtime.scopeStack.pop();\n`
        code += `    }\n`
        code += `})()`

        return code
    } else if (node.type == "with_expression") {
        // <with_expression>
        //     <with text="with" />
        //     <variable_expression>
        //         <identifier text="thingy" />
        //     </variable_expression>
        //     <; text=";" />
        //     <list_expression>
        //         <[ text="[" />
        //         <variable_expression>
        //             <identifier text="x" />
        //         </variable_expression>
        //         <] text="]" />
        //     </list_expression>
        // </with_expression>

        const children = valueBasedChildren(node)
        const withIndex = children.findIndex(each => each.type === "with")
        const semiIndex = children.findIndex(each => each.text === ";")

        const attrsetExpr = children[withIndex + 1]
        const bodyExpr = children[semiIndex + 1]

        if (!attrsetExpr || !bodyExpr) {
            throw Error(`with_expression missing attrset or body: ${node.text}`)
        }

        // Generate code that merges the attrset into the scope
        // Evaluate the attrset expression with the current scope, then create new scope
        let code = `((_withAttrs)=>{\n`
        code += `    const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};\n`
        code += `    runtime.scopeStack.push(nixScope);\n`
        code += `    try {\n`
        code += `        return ${nixNodeToJs(bodyExpr)};\n`
        code += `    } finally {\n`
        code += `        runtime.scopeStack.pop();\n`
        code += `    }\n`
        code += `})(${nixNodeToJs(attrsetExpr)})`

        return code
    } else {
        throw Error(`This is a bug with convertToJs(), it means this node was unexpected/unhandled and couldn't be converted: type=${JSON.stringify(node.type)}, ${JSON.stringify(node.text)}`)
    }
}


//
// internal-only helpers
//
const valueBasedChildren = (node)=>node.children.filter(each=>each.type!="comment"&&each.typeId>=0)
const nixRepr = (value)=>{
    // FIXME: should use single quotes instead of double, and probably some other things
    return JSON.stringify(value)
}

// Check if an expression is constant (doesn't reference variables)
const isConstantExpression = (node) => {
    if (!node) return true

    const constantTypes = [
        "integer_expression",
        "float_expression",
        "string_expression",
        "path_expression"
    ]

    if (constantTypes.includes(node.type)) {
        // String/path interpolation would make it non-constant, but we'll simplify for now
        return true
    }

    if (node.type === "list_expression") {
        return valueBasedChildren(node).filter(each => each.type !== "[" && each.type !== "]")
            .every(isConstantExpression)
    }

    if (node.type === "attrset_expression") {
        // Non-rec attrsets with constant values are constant
        const bindingSet = valueBasedChildren(node).find(each => each.type === "binding_set")
        if (!bindingSet) return true // empty attrset

        const bindings = valueBasedChildren(bindingSet).filter(each => each.type === "binding")
        return bindings.every(binding => {
            const bindingChildren = valueBasedChildren(binding)
            const value = bindingChildren[bindingChildren.findIndex(each => each.text === "=") + 1]
            return isConstantExpression(value)
        })
    }

    if (node.type === "rec_attrset_expression") {
        // Rec attrsets are never constant because they can reference themselves
        return false
    }

    // Identifiers and any expression involving them are non-constant
    return false
}

console.log(convertToJs(`"hello" + "world"`))