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
    } else if (node.type == "identifier") {
        if (node.text == "null") {
            // NULL can't be reassigned so direct translation is fine
            return "null"
        } else {
            // true,false, and builtins are all identifiers
            // and... they can all be overriden with local variable names...
            // so we can't treat them special
            
            // NOTE: not all identifiers (ex: attrSet keys are identifiers) will be changed to nixScope["name"]
            // but the ones that wont be converted will be skipped
            return `nixScope[${JSON.stringify(node.text)}]`
        }
    } else if (node.type == "integer_expression") {
        // FIXME: check hex/oct/scientific formats
        return `${node.text}n` // convert to BigInt
    } else if (node.type == "float_expression") {
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
            let text = children[1].text
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
        

        throw new NotImplemented(`Sorry :( I don't support these string expressions yet'\n${xmlStylePreview(node)}`)
        // FIXME: different escapes
        // FIXME: interpolation
    } else if (node.type == "path_expression") {
        // FIXME: evaluate escapes
        // FIXME: interpolation
        return `(new Path([${JSON.stringify(node.text)}]))`
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
        
        // FIXME: make sure to handle truthy-ness correctly (empty string, empty list, etc)
        
        const children = valueBasedChildren(node)
        return `((${nixNodeToJs(children[1])}) ? (${nixNodeToJs(children[3])}) : (${nixNodeToJs(children[5])}))`
    } else if (node.type == "list_expression") {
        return `[${
            valueBasedChildren(node).filter(
                each=>!(each.type=="["||each.type=="]")
            ).map(nixNodeToJs).join(",")
        }]`
    } else if (node.type == "select_expression") {
        // FIXME
    } else if (node.type == "attrset_expression") { // attrset
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
        
        // FIXME
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
            const formalsWithDefaults = formals.filter(each=>each.children.length==1)

            const defaults = formalsWithDefaults.map(each=>{
                const children = valueBasedChildren(each.children)
                const argName = children[0].text
                const defaultValue = nixNodeToJs(children[2])
                return `${JSON.stringify(argName)}: ${defaultValue},`
            }).join("")
            
            let allArgsString = ""
            if (children.some(each=>each.type=="@")) {
                
            }
            return `
                (function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        ${defaults}
                        // inherit arguments
                        ...arg,
                        // all-args arg
                        // "arguments": arg, //<<<intentionally does not contain default values
                        ${allArgsString}
                    }
                    runtime.scopeStack.push(nixScope)
                    try {
                        return nixScope["namedArg1"]["something"]
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
        
        // FIXME
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

        // FIXME
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

console.log(convertToJs(`"hello" + "world"`))