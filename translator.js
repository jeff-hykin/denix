// Core parsing and analysis tools
import { parse, xmlStylePreview } from "./tools/parsing.js"
import { NixError, NotImplemented } from "./main/errors.js"
import { nixRepr } from "./main/runtime.js"
import { isValidKeyLiteral } from 'https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/is_valid_key_literal.js'

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
// build the runtime-import preamble for a chunk of translated JS.
// Shared by both convertToJs and convertToJsSync so the two paths stay in
// lockstep.
//
const buildPreamble = (output, options) => {
    // whenever the output references any runtime-provided identifier, we
    // need the createRuntime() import. \b is outside the group so it applies
    // to every alternative.
    const needsRuntime =
        /\b(runtime|createFunc|createScope|defGetter|nixScope|operators|Path)\b/.test(output)
    if (!needsRuntime) return ""

    const runtimePath = options.runtimePath || "./main/runtime.js"
    const needsPath = /\bnew Path\b/.test(output)
    const needsInterpolatedString = /\bnew InterpolatedString\b/.test(output)
    const extraImports = [needsPath && "Path", needsInterpolatedString && "InterpolatedString"].filter(Boolean)
    let pre = ""
    pre += `import { createRuntime${extraImports.length ? ", " + extraImports.join(", ") : ""} } from "${runtimePath}"\n`
    pre += `const {runtime, createFunc, createScope, defGetter, apply, set, force, mkThunk} = createRuntime()\n`
    // Module-level nixScope, bound to the runtime's current (root) scope.
    // The root scope is seeded with builtins/true/false/null/derivation/
    // import/abort/throw, which is why things like nixScope.builtins and
    // nixScope.true resolve at the top level.
    pre += `const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1]\n`
    // Tell the runtime what file this translated module came from, so relative
    // `import ./foo` paths inside the nix source resolve correctly. When the
    // caller knows the original source file (e.g. denix_eval/denix_build write
    // the translated JS to a temp dir, so import.meta.url would point there,
    // not at the .nix), bake that path in. Otherwise fall back to the module's
    // own location.
    if (options.sourceFile) {
        pre += `runtime.currentFile = ${JSON.stringify(options.sourceFile)}\n`
    } else {
        pre += `runtime.currentFile = import.meta.url.startsWith("file://") ? import.meta.url.slice(7) : new URL(import.meta.url).pathname\n`
    }
    if (output.includes("operators.")) {
        pre += `const operators = runtime.operators\n`
    }
    if (output.includes("builtins.") && !/nixScope(\["builtins"\]|\.builtins)/.test(output)) {
        pre += `const builtins = runtime.builtins\n`
    }
    return pre
}

//
//
// The Main function! nix comes in js comes out
//
//
export const convertToJs = async (code, options = {}) => {
    translationSourceDir = options.sourceFile
        ? options.sourceFile.replace(/\/[^/]*$/, "")
        : null
    const tree = parse(code)
    const rootNode = tree.rootNode
    let output = ""
    for (const node of rootNode.children) {
        output += nixNodeToJs(node)
    }

    let result = buildPreamble(output, options)

    // Always export the result as a module
    result += `\nexport default ${output.trim()}`

    // Format the result with Deno's built-in formatter
    try {
        const formatted = new Deno.Command("deno", {
            args: ["fmt", "-"],
            stdin: "piped",
            stdout: "piped",
            stderr: "piped",
        }).spawn()

        const writer = formatted.stdin.getWriter()
        await writer.write(new TextEncoder().encode(result))
        await writer.close()

        const { stdout, stderr, code } = await formatted.output()

        if (code === 0) {
            result = new TextDecoder().decode(stdout)
        } else {
            const errorMsg = new TextDecoder().decode(stderr)
            console.warn("Warning: Failed to format generated JavaScript:", errorMsg)
        }
    } catch (formatError) {
        // If formatting fails, return unformatted (with a warning)
        console.warn("Warning: Failed to format generated JavaScript:", formatError.message)
    }

    return result
}

// Synchronous version without formatting (for compatibility)
export const convertToJsSync = (code, options = {}) => {
    translationSourceDir = options.sourceFile
        ? options.sourceFile.replace(/\/[^/]*$/, "")
        : null
    const tree = parse(code)
    const rootNode = tree.rootNode
    let output = ""
    for (const node of rootNode.children) {
        output += nixNodeToJs(node)
    }

    let result = buildPreamble(output, options)

    // Always export the result as a module
    result += `\nexport default ${output.trim()}`

    return result
}

// Directory of the source .nix file currently being translated, if known.
// Used to resolve relative path literals (./x, ../x) to absolute paths at
// translation time — which is how Nix treats them (relative to the containing
// file), and is essential under lazy evaluation where the import may fire long
// after the runtime's "current file" has moved on.
let translationSourceDir = null

// Resolve a (possibly relative) Nix path literal against the source directory.
// Absolute paths and `~`/`<...>` forms are left untouched, as is everything
// when the source directory is unknown (so relative paths stay relative).
const resolveSourceRelativePath = (text) => {
    if (!translationSourceDir) { return text }
    if (text.startsWith("/")) { return text }
    if (!(text.startsWith("./") || text.startsWith("../"))) { return text }
    // URL-imported files: relative path literals resolve to sibling URLs
    if (/^https?:\/\//.test(translationSourceDir)) {
        return new URL(text, translationSourceDir + "/").href
    }
    const parts = (translationSourceDir + "/" + text).split("/")
    const out = []
    for (const p of parts) {
        if (p === "" || p === ".") { continue }
        if (p === "..") { out.pop() } else { out.push(p) }
    }
    return "/" + out.join("/")
}

// Decode a single indented-string ('' … '') escape sequence into the literal
// characters it represents. Mirrors Nix's rules:
//   ''$  -> $        '''  -> ''        ''\n -> newline   ''\t -> tab
//   ''\r -> CR       ''\\<newline> -> newline            ''\X -> X (literal)
const decodeIndentEscape = (seq)=>{
    if (seq === "''$") { return "$" }
    if (seq === "'''") { return "''" }
    if (seq.startsWith("''\\")) {
        const rest = seq.slice(3)
        if (rest === "n") { return "\n" }
        if (rest === "r") { return "\r" }
        if (rest === "t") { return "\t" }
        if (rest === "\n" || rest === "") { return "\n" } // ''\<newline> = newline
        return rest // ''\X = literal X
    }
    return seq
}

// Apply Nix's indented-string ('' … '') dedent algorithm in place over an
// ordered list of parts: {kind:"str"|"lit"|"interp", ...}. "str" parts hold
// raw source text whose leading whitespace is stripped; "lit"/"interp" parts
// are content that ends indentation counting for their line. After stripping
// the common indentation, the single leading newline (the one right after the
// opening '') is removed. See Nix's parser.y stripIndentation.
const stripIndentedStringParts = (parts)=>{
    const INF = Number.MAX_SAFE_INTEGER

    // Pass 1: find the minimum indentation across all non-blank lines.
    let minIndent = INF
    let curIndent = 0
    let atStartOfLine = true
    for (const p of parts) {
        if (p.kind !== "str") {
            // Interpolation / escaped literal counts as line content.
            if (atStartOfLine) {
                if (minIndent > curIndent) { minIndent = curIndent }
                atStartOfLine = false
            }
            continue
        }
        for (const c of p.value) {
            if (atStartOfLine) {
                if (c === " " || c === "\t") {
                    curIndent++
                } else if (c === "\n") {
                    curIndent = 0 // blank line: ignore for minIndent
                } else {
                    atStartOfLine = false
                    if (minIndent > curIndent) { minIndent = curIndent }
                }
            } else if (c === "\n") {
                atStartOfLine = true
                curIndent = 0
            }
        }
    }
    if (minIndent === INF) { minIndent = 0 }

    // Pass 2: strip up to minIndent leading whitespace chars from each line.
    atStartOfLine = true
    let dropped = 0
    for (const p of parts) {
        if (p.kind !== "str") {
            atStartOfLine = false
            continue
        }
        let out = ""
        for (const c of p.value) {
            if (atStartOfLine) {
                if ((c === " " || c === "\t") && dropped < minIndent) {
                    dropped++
                } else if (c === "\n") {
                    dropped = 0
                    out += c
                } else {
                    atStartOfLine = false
                    dropped = 0
                    out += c
                }
            } else {
                out += c
                if (c === "\n") {
                    atStartOfLine = true
                    dropped = 0
                }
            }
        }
        p.value = out
    }

    // Remove the single leading newline (empty first line right after '').
    for (const p of parts) {
        if (p.kind === "str") {
            if (p.value.startsWith("\n")) { p.value = p.value.slice(1) }
            break
        }
        if (p.kind === "lit") {
            if (p.value.startsWith("\n")) { p.value = p.value.slice(1) }
            break
        }
        // interpolation first -> nothing to strip
        break
    }
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
            // fun fact, in nix builtins and other identifiers can all be overridden with local variable names
            return "nixScope" + varAccess(node.text)
        }
    } else if (node.type == "integer_expression") {
        // Note: Nix does not support hex (0xFF) or octal (0o77) literals
        // They parse as 0 followed by a variable name
        return `${node.text}n` // convert to BigInt
    } else if (node.type == "float_expression") {
        // Scientific notation (1.5e10) is already supported - just pass through
        return node.text
    } else if (node.type == "uri_expression") {
        // Unquoted URL literals in Nix are just strings
        return JSON.stringify(node.text)
    } else if (node.type == "parenthesized_expression") {
        // FUTURE: there could be an optimization here where if the result is atomic (ex: operators.add(1,2)) then we can skip the parentheses
        return `(${nixNodeToJs(valueBasedChildren(node)[1])})`
    } else if (node.type == "unary_expression") {
        const children = valueBasedChildren(node)
        const operator = children[0].text
        const operand = children[1]

        // For simple literals, we can use them directly
        if (operand.type === "integer_expression") {
            // Negative integers need the 'n' suffix for BigInt
            return `${node.text}n`
        } else if (operand.type === "float_expression") {
            return node.text
        }

        // For other expressions, we need to use operators for proper handling
        if (operator === "!") {
            return `operators.negate(${nixNodeToJs(operand)})`
        } else if (operator === "-") {
            return `operators.negative(${nixNodeToJs(operand)})`
        } else {
            throw new Error(`Unknown unary operator: ${operator}`)
        }
    } else if (node.type == "binary_expression") {
        const children = valueBasedChildren(node)
        // operators of floats stay as-is
        if (children[0]?.type == "float_expression" && children[2]?.type == "float_expression") {
            return node.text
        // TODO: add more cases of literals getting direct conversion
        } else {
            const operator = children[1].text
            // Nix && || -> are lazy in their right operand; JS's native && and
            // || short-circuit identically, so use them directly (also far more
            // readable than helper calls). A helper-call form would eagerly
            // evaluate both sides — this broke nixpkgs top-level default.nix:
            //     if crossSystem0 == null || lib.systems.equals system localSystem
            // where the right side must not run when crossSystem0 is null.
            if (operator === "&&") {
                return `((${nixNodeToJs(children[0])}) && (${nixNodeToJs(children[2])}))`
            }
            if (operator === "||") {
                return `((${nixNodeToJs(children[0])}) || (${nixNodeToJs(children[2])}))`
            }
            if (operator === "->") {
                return `(!(${nixNodeToJs(children[0])}) || (${nixNodeToJs(children[2])}))`
            }
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
                "//": "merge",
                "++": "listConcat",
                "?": "hasAttr",
                // I think thats all of them
            })[operator]
            if (!operatorName) {
                throw new NotImplemented(`error: operator ${operator} is not supported yet`)
            }
            return `operators${varAccess(operatorName)}(${nixNodeToJs(children[0])}, ${nixNodeToJs(children[2])})`
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
            if (usedDoubleQuotes) {
                // Collect text from all string_fragment and escape_sequence children.
                // string_fragment = literal chars (may contain real newlines from multi-line source)
                // escape_sequence = Nix escapes like \n \" \\ \$ etc.
                let text = ""
                for (const child of children) {
                    if (child.type === "string_fragment") {
                        // Escape chars that are invalid inside a JS double-quoted string:
                        // literal newlines, carriage returns, backslashes, double quotes
                        text += child.text
                            .replace(/\\/g, "\\\\")
                            .replace(/"/g, '\\"')
                            .replace(/\n/g, "\\n")
                            .replace(/\r/g, "\\r")
                            .replace(/\t/g, "\\t")
                    } else if (child.type === "escape_sequence") {
                        // Nix escapes: \n \r \t \\ \" \$ and \<newline>
                        const seq = child.text
                        if (seq === "\\$") {
                            text += "$"
                        } else if (seq === "\\\n") {
                            // \<newline> in Nix = literal newline
                            text += "\\n"
                        } else {
                            text += seq
                        }
                    }
                }
                return `"${text}"`
            } else {
                const stringFragment = children.find(c => c.type === "string_fragment")
                let text = stringFragment ? stringFragment.text : ""
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
                // Fragments are literal text (escapes are separate
                // escape_sequence nodes); JSON.stringify below re-escapes.
                currentString += child.text
            } else if (child.type == "escape_sequence") {
                // \n \r \t decode; any other \c is the char itself
                // (\\ => \, \" => ", \$ => $).
                const c = child.text[1]
                currentString += c === "n" ? "\n" : c === "r" ? "\r" : c === "t" ? "\t" : c
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

        // Build an ordered list of parts, preserving the exact source so that
        // Nix's indentation-stripping algorithm can run over it. Each part is:
        //   {kind:"str",  value}  — literal source text of a string_fragment
        //   {kind:"lit",  value}  — already-decoded escape (''$, ''\n, ''' …)
        //   {kind:"interp", expr} — a ${ } interpolation (JS expression source)
        // "str" parts carry leading whitespace that is subject to dedent;
        // "lit"/"interp" parts are content and stop indentation counting.
        const parts = []
        for (const child of children) {
            if (child.type === "\"" || child.type === "''") {
                continue
            } else if (child.type === "string_fragment") {
                parts.push({ kind: "str", value: child.text })
            } else if (child.type === "escape_sequence") {
                parts.push({ kind: "lit", value: decodeIndentEscape(child.text) })
            } else if (child.type === "interpolation") {
                const interpChildren = valueBasedChildren(child)
                const expr = interpChildren[1]
                parts.push({ kind: "interp", expr: nixNodeToJs(expr) })
            }
        }

        stripIndentedStringParts(parts)

        // Assemble into InterpolatedString segments. Consecutive str/lit parts
        // collapse into one string segment; each interp splits a segment.
        const hasInterpolation = parts.some(p => p.kind === "interp")
        const strings = []
        const getters = []
        let current = ""
        for (const p of parts) {
            if (p.kind === "interp") {
                strings.push(current)
                current = ""
                getters.push(`()=>(${p.expr})`)
            } else {
                current += p.value
            }
        }
        strings.push(current)

        if (!hasInterpolation) {
            return JSON.stringify(strings[0])
        }
        return `(new InterpolatedString([${strings.map(s => JSON.stringify(s)).join(", ")}], [${getters.join(", ")}]))`
    } else if (node.type == "path_expression") {
        const children = valueBasedChildren(node)
        const hasInterpolation = children.some(each=>each.type=="interpolation")

        if (!hasInterpolation) {
            // Simple path without interpolation. Relative paths are resolved
            // against the source file's directory (Nix semantics), so the import
            // target is stable regardless of when a lazy thunk later fires.
            return `(new Path([${JSON.stringify(resolveSourceRelativePath(node.text))}], []))`
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
    } else if (node.type == "hpath_expression") {
        // ~/foo — home-relative path; resolves to $HOME/foo as a Path
        const text = node.text || ""
        // Replace leading ~ with home directory lookup
        const relPath = text.slice(1) // remove '~', keep the '/foo' part
        return `(new Path([(typeof Deno !== "undefined" ? Deno.env.get("HOME") : process.env.HOME) + ${JSON.stringify(relPath)}], []))`
    } else if (node.type == "spath_expression") {
        // <...> — nix search-path lookup; desugars to
        //   (builtins.findFile builtins.nixPath "...").
        const text = node.text || ""
        const inner = text.replace(/^</, "").replace(/>$/, "")
        return `(nixScope.builtins${varAccess("findFile")}(nixScope.builtins${varAccess("nixPath")}))(${JSON.stringify(inner)})`
    } else if (node.type == "apply_expression") { // function call
        // Pass the argument LAZILY as a thunk — Nix evaluates function arguments
        // only when the callee demands them. `apply` forces it for builtins but
        // hands the thunk straight to Nix lambdas, which is what makes lazy
        // fixed points (lib.makeExtensible's `rattrs self`) terminate.
        const children = valueBasedChildren(node)
        return `apply(${nixNodeToJs(children[0])}, mkThunk(()=>(${nixNodeToJs(children[1])})))`
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
        //     [<or text="or" />]  # optional default value
        //     [<expression>]       # optional default expression
        // </select_expression>
        const children = valueBasedChildren(node)
        const base = nixNodeToJs(children[0])

        // Get the attribute path (everything after the first dot)
        const attrpath = children.find(child => child.type === "attrpath")
        if (!attrpath) {
            throw Error(`select_expression has no attrpath: ${node.text}`)
        }

        // Check if there's an "or" default value
        const orIndex = children.findIndex(child => child.type === "or")
        const hasDefault = orIndex !== -1
        const defaultValue = hasDefault ? children[orIndex + 1] : null

        // Build the path as a series of property accesses
        const pathParts = valueBasedChildren(attrpath).filter(each => each.type !== ".")
        let result = base
        for (const part of pathParts) {
            if (part.type === "identifier") {
                result = `${result}[${JSON.stringify(part.text)}]`
            } else if (part.type === "string_expression") {
                // Dynamic attribute access like a."${b}"
                result = `${result}[${nixNodeToJs(part)}]`
            } else if (part.type === "interpolation") {
                // Dynamic attribute access like a.${b} (without quotes)
                // The interpolation node contains the expression to evaluate
                result = `${result}[${nixNodeToJs(part)}]`
            } else {
                throw Error(`Unexpected attrpath element type: ${part.type}`)
            }
        }

        // If there's a default value, wrap in nullish coalescing logic
        if (hasDefault) {
            const defaultJs = nixNodeToJs(defaultValue)
            // The default MUST be lazy (thunked): `attrs.x or (throw "…")` only
            // throws when `x` is missing. An eager JS argument would evaluate
            // the throw before selectOrDefault even runs (this broke nixpkgs
            // lib/systems/parse.nix mkSkeletonFromList).
            return `operators.selectOrDefault(${base}, [${pathParts.map(p => {
                if (p.type === "identifier") {
                    return JSON.stringify(p.text)
                } else if (p.type === "string_expression" || p.type === "interpolation") {
                    return nixNodeToJs(p)
                }
            }).join(", ")}], mkThunk(()=>(${defaultJs})))`
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

        // Helper function to extract key string from attrpath element
        const extractKeyString = (pathPart) => {
            if (pathPart.type === "identifier") {
                return pathPart.text
            } else if (pathPart.type === "string_expression") {
                // Extract the actual string value from string_expression
                const children = valueBasedChildren(pathPart)

                // Check if it has interpolation - if so, can't be static
                if (children.some(c => c.type === "interpolation")) {
                    return null
                }

                // Build the string from fragments and escape sequences
                let result = ""
                for (const child of children) {
                    if (child.type === "string_fragment") {
                        result += child.text
                    } else if (child.type === "escape_sequence") {
                        // Convert Nix escape sequences to actual characters
                        const escape = child.text
                        const escapeMap = {
                            "\\n": "\n",
                            "\\r": "\r",
                            "\\t": "\t",
                            "\\\\": "\\",
                            '\\"': '"',
                        }
                        result += escapeMap[escape] || escape
                    }
                }
                return result
            } else {
                // For interpolated strings or other complex expressions,
                // we need to evaluate them at runtime
                return null  // Signals that this needs runtime evaluation
            }
        }

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
            // Rec attrsets need careful handling:
            // - Bindings need access to parent scope AND sibling bindings
            // - But the returned object should only contain the rec attrset's own bindings
            // Solution: Use Object.create() so parent scope is in prototype, not own properties
            let code = `/*rec*/createScope(nixScope, (nixScope)=>{\n`

            // Process bindings similar to let
            const bindingsByBase = {}
            const simpleBindings = []

            for (const binding of bindings) {
                if (binding.type === "binding") {
                    const bindingChildren = valueBasedChildren(binding)
                    const attrpath = bindingChildren.find(each => each.type === "attrpath")
                    const value = bindingChildren[bindingChildren.findIndex(each => each.text === "=") + 1]

                    const pathParts = valueBasedChildren(attrpath).filter(each => each.type !== ".")

                    if (pathParts.length === 1) {
                        const name = extractKeyString(pathParts[0])
                        if (name !== null) {
                            simpleBindings.push({
                                name: name,
                                value: value,
                                isConstant: isConstantExpression(value)
                            })
                        } else {
                            // Dynamic key in rec set - not supported in Nix
                            throw new NixError(`Dynamic attribute keys are not supported in rec sets`)
                        }
                    } else {
                        const baseName = extractKeyString(pathParts[0])
                        if (baseName === null) {
                            throw new NixError(`Dynamic attribute keys are not supported in rec sets`)
                        }
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
                                isConstant: false,
                                // `inherit x;` in a rec set binds the ENCLOSING
                                // scope's x, never the rec set's own — a scope
                                // binding `x = nixScope.x` would blackhole.
                                isPlainInherit: true
                            })
                        }
                    }
                } else if (binding.type === "inherit_from") {
                    // inherit (expr) x y z; means x = expr.x; y = expr.y; etc.
                    const bindingChildren = valueBasedChildren(binding)
                    const sourceExpr = bindingChildren.find(each => each.type !== "inherited_attrs" && each.type.endsWith("_expression"))
                    const inheritedAttrs = bindingChildren.find(each => each.type === "inherited_attrs")

                    if (inheritedAttrs && sourceExpr) {
                        const identifiers = valueBasedChildren(inheritedAttrs).filter(each => each.type === "identifier")
                        for (const id of identifiers) {
                            simpleBindings.push({
                                name: id.text,
                                // Value is sourceExpr.id (e.g., builtins.parseFlakeRef)
                                value: { type: "select", source: sourceExpr, attr: id.text },
                                isConstant: true
                            })
                        }
                    }
                }
            }

            // Create base objects for nested bindings
            for (const [baseName, _] of Object.entries(bindingsByBase)) {
                code += `    nixScope${varAccess(baseName)} = {};\n`
            }

            // All `rec` bindings are LAZY (defGetter) — see the `let` path for
            // why eager binding breaks self-referential fixed points.
            for (const {name, value, isPlainInherit} of simpleBindings) {
                if (isPlainInherit) {
                    // No scope binding: the prototype chain (createScope) already
                    // resolves `name` to the enclosing scope, which is exactly
                    // what `inherit name;` means in a rec set.
                    continue
                }
                if (value.type === "select") {
                    code += `    defGetter(nixScope, ${JSON.stringify(name)}, ()=>(${nixNodeToJs(value.source)}[${JSON.stringify(value.attr)}]));\n`
                } else {
                    code += `    defGetter(nixScope, ${JSON.stringify(name)}, (nixScope) => (${nixNodeToJs(value)}));\n`
                }
            }

            // Add nested bindings (accessor must be rooted at `nixScope`).
            for (const [baseName, nestedBindings] of Object.entries(bindingsByBase)) {
                for (const {path, value} of nestedBindings) {
                    let accessor = `nixScope${varAccess(baseName)}`
                    for (let i = 0; i < path.length - 1; i++) {
                        const key = extractKeyString(path[i])
                        if (key === null) {
                            throw new NixError(`Dynamic attribute keys are not supported in rec sets`)
                        }
                        accessor += `[${JSON.stringify(key)}]`
                    }
                    const lastKey = extractKeyString(path[path.length - 1])
                    if (lastKey === null) {
                        throw new NixError(`Dynamic attribute keys are not supported in rec sets`)
                    }
                    // Lazy: eager assignment would evaluate the value during
                    // construction, breaking self-referential fixed points
                    // (e.g. lib/types.nix `nestedTypes.elemType = elemType`).
                    code += `    defGetter(${accessor}, ${JSON.stringify(lastKey)}, ()=>(${nixNodeToJs(value)}));\n`
                }
            }
            // Return a clean object with only the rec attrset's own bindings (not inherited scope)
            const allOwnKeys = [
                ...simpleBindings.map(b => b.name),
                ...Object.keys(bindingsByBase)
            ]
            code += `        const __result = {};\n`
            for (const key of allOwnKeys) {
                // Use defineProperty to preserve lazy getters from nixScope
                code += `        Object.defineProperty(__result, ${JSON.stringify(key)}, { enumerable: true, configurable: true, get() { return nixScope${varAccess(key)}; } });\n`
            }
            code += `        return __result;\n`
            code += `})`

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

                    if (pathParts.length === 1) {
                        const key = extractKeyString(pathParts[0])
                        if (key !== null) {
                            // Simple static key (identifier or string)
                            simpleBindings.push({ key, value })
                        } else {
                            // Dynamic key (interpolated string or other expression)
                            nestedBindings.push({ pathParts, value })
                        }
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
                } else if (binding.type === "inherit_from") {
                    // inherit (expr) x y z; means x = expr.x; y = expr.y; etc.
                    const bindingChildren = valueBasedChildren(binding)
                    const sourceExpr = bindingChildren.find(each => each.type !== "inherited_attrs" && each.type.endsWith("_expression"))
                    const inheritedAttrs = bindingChildren.find(each => each.type === "inherited_attrs")

                    if (inheritedAttrs && sourceExpr) {
                        const identifiers = valueBasedChildren(inheritedAttrs).filter(each => each.type === "identifier")
                        for (const id of identifiers) {
                            simpleBindings.push({
                                key: id.text,
                                // Value is sourceExpr.id (e.g., builtins.parseFlakeRef)
                                value: { type: "select", source: sourceExpr, attr: id.text }
                            })
                        }
                    }
                }
            }

            // Build the attrset with LAZY values: every value is a memoized
            // getter (defGetter) so it is only evaluated when demanded, matching
            // Nix. This is required for fixed points such as
            // lib.makeExtensible's `self = rattrs self // …`, where the returned
            // attrset's fields must stay unforced while `self` is being defined.
            // A new scope (createScope) is pushed so values resolve against the
            // enclosing scope; non-rec attrsets do not see their own keys.
            let code = `createScope(nixScope, (nixScope)=>{\n`
            code += `    const obj = {};\n`

            // Add simple bindings (lazy)
            for (const {key, value} of simpleBindings) {
                if (value.type === "select") {
                    // inherit (src) key;  ->  key = src.key  (lazy)
                    code += `    defGetter(obj, ${JSON.stringify(key)}, ()=>(${nixNodeToJs(value.source)}${varAccess(value.attr)}));\n`
                } else {
                    code += `    defGetter(obj, ${JSON.stringify(key)}, ()=>(${nixNodeToJs(value)}));\n`
                }
            }

            // Add nested bindings via the runtime `set` helper, which creates
            // intermediate attrsets and drops bindings with a null (dynamic)
            // attr name — e.g. `{ a.b.c = v; }` -> set(obj, ["a","b","c"], thunk).
            // The leaf value is passed as a thunk so it stays lazy too.
            for (const {pathParts, value} of nestedBindings) {
                const pathElems = pathParts.map(part => {
                    const key = extractKeyString(part)
                    return key !== null ? JSON.stringify(key) : `(${nixNodeToJs(part)})`
                })
                code += `    set(obj, [${pathElems.join(", ")}], ()=>(${nixNodeToJs(value)}));\n`
            }

            code += `    return obj;\n`
            code += `})`

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
        const isSimple = children[0]?.type == "identifier" && children[1]?.type !== "@"
        if (isSimple) {
            const argName = children[0].text
            const body = children.slice(-1)[0]
            // Solution: When a function is created, capture the current scope. When it's called,
            // use the captured scope as the parent (via prototype chain), not runtime.scopeStack.
            // Using Object.create() ensures getters from parent scopes are accessible.
            return `createFunc(/*arg:*/ ${JSON.stringify(argName)}, null, {}, nixScope, (nixScope)=>(
                ${nixNodeToJs(body).replace(/\n/g,"\n    ")}
            ))`
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
            // Nix allows the @-binding on either side: `{a,b}@args:` and
            // `args@{a,b}:`. Find the formals node wherever it is.
            const formalsNode = children.find(each => each.type == "formals")
            if (!formalsNode) {
                throw Error(`When handling a function, it didn't seem to be a simple function, but also didn't have <formals>. Not sure what happened:\n${node.text}`)
            }
            let argNames = []
            // Note: a trailing comma parses as a `formal` node with a missing
            // identifier (empty text) — skip those.
            const formals = formalsNode.children.filter(each=>each.type=="formal" && valueBasedChildren(each)[0]?.text)
            // A formal with a default has more than just the identifier
            const formalsWithDefaults = formals.filter(each=>{
                const formalChildren = valueBasedChildren(each)
                argNames.push(formalChildren[0].text)
                return formalChildren.length > 1 // Has default if more than just identifier
            })
            // builtins.functionArgs needs every formal name (true = has default),
            // and callPackage relies on it to know which args to inject.
            const hasEllipsis = formalsNode.children.some(each=>each.type=="ellipses")
            const argsMeta = formals.map(each=>{
                const formalChildren = valueBasedChildren(each)
                return `${JSON.stringify(formalChildren[0].text)}: ${formalChildren.length > 1}`
            }).join(", ")
            const metadata = `{args: {${argsMeta}}${hasEllipsis ? ", ellipsis: true" : ""}}`

            const defaulters = formalsWithDefaults.map(each=>{
                const formalChildren = valueBasedChildren(each)
                const argName = formalChildren[0].text
                const defaultValue = nixNodeToJs(formalChildren[2])
                // TODO: if this is a literal (any literal other than interpolated string) it can be passed as-is
                // otherwise it needs to be a function that accepts the other args before it
                
                // Wrap default value in IIFE to capture parent scope at evaluation time
                // This allows defaults to reference outer function parameters (e.g., lname: { shortName ? lname }: ...)
                return `${JSON.stringify(argName)}: (nixScope)=>(${defaultValue}),`
            }).join("")

            // Handle @ syntax on either side: `{a,b}@args:` or `args@{a,b}:`.
            let allArgsName = null
            const atIndex = children.findIndex(each=>each.type=="@")
            if (atIndex >= 0) {
                // The identifier adjacent to @ names the full argument set.
                const after = children[atIndex + 1]
                const before = children[atIndex - 1]
                if (after?.type === "identifier") {
                    allArgsName = after.text
                } else if (before?.type === "identifier") {
                    allArgsName = before.text
                }
            }
            
            const allArgsString = allArgsName ? `@${allArgsName}` : ""
            const translationHint = (`/* args: {\n${argNames.map(each=>"    "+each.replace(/\n|\r/g,"")+",").join("\n")}\n}${allArgsString} `).replace(/\*\//g,"* /") + "*/" 

            // The body is the last child (after the ":")
            const body = children.slice(-1)[0]
            return `createFunc({${defaulters}}, ${JSON.stringify(allArgsName)}, ${metadata}, nixScope, (nixScope)=>(
                ${nixNodeToJs(body).replace(/\n/g,"\n    ")}
            ))`
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
                // inherit x y z; binds the ENCLOSING scope's x/y/z (a scope
                // binding `x = nixScope.x` would blackhole).
                const identifiers = valueBasedChildren(binding).filter(each => each.type === "identifier")
                for (const id of identifiers) {
                    simpleBindings.push({
                        name: id.text,
                        value: id,
                        isConstant: false,
                        isPlainInherit: true
                    })
                }
            } else if (binding.type === "inherit_from") {
                // inherit (expr) x y z; means x = expr.x; y = expr.y; etc.
                const bindingChildren = valueBasedChildren(binding)
                const sourceExpr = bindingChildren.find(each => each.type !== "inherited_attrs" && each.type.endsWith("_expression"))
                const inheritedAttrs = bindingChildren.find(each => each.type === "inherited_attrs")

                if (inheritedAttrs && sourceExpr) {
                    const identifiers = valueBasedChildren(inheritedAttrs).filter(each => each.type === "identifier")
                    for (const id of identifiers) {
                        simpleBindings.push({
                            name: id.text,
                            // Value is sourceExpr.id (e.g., builtins.parseFlakeRef)
                            value: { type: "select", source: sourceExpr, attr: id.text },
                            isConstant: true
                        })
                    }
                }
            }
        }

        // Generate JavaScript code
        let code = `/*let*/ createScope(nixScope, (nixScope)=>{\n`

        // Create base objects for nested bindings
        for (const [baseName, _] of Object.entries(bindingsByBase)) {
            code += `        nixScope${varAccess(baseName)} = {};\n`
        }

        // All `let` bindings are LAZY (defGetter): Nix only evaluates a binding
        // when it is demanded. Eager assignment would force inherit-from sources
        // (e.g. `inherit (lib.trivial) …`) immediately, which re-enters
        // in-progress fixed points (self-referential lib modules) and yields
        // undefined.
        for (const {name, value, isPlainInherit} of simpleBindings) {
            if (isPlainInherit) {
                // `inherit name;` — the prototype chain (createScope) already
                // resolves `name` to the enclosing scope; no own binding needed.
                continue
            }
            if (value.type === "select") {
                // inherit (src) name;  ->  name = src.name  (lazy)
                code += `        defGetter(nixScope, ${JSON.stringify(name)}, ()=>(${nixNodeToJs(value.source)}[${JSON.stringify(value.attr)}]));\n`
            } else {
                code += `        defGetter(nixScope, ${JSON.stringify(name)}, (nixScope) => (${nixNodeToJs(value)}));\n`
            }
        }

        // Add nested bindings
        for (const [baseName, nestedBindings] of Object.entries(bindingsByBase)) {
            for (const {path, value} of nestedBindings) {
                let accessor = `nixScope${varAccess(baseName)}`
                for (let i = 0; i < path.length - 1; i++) {
                    accessor += `[${JSON.stringify(path[i].text)}]`
                }
                const lastKey = path[path.length - 1].text
                // Lazy for the same fixed-point reasons as simpleBindings above.
                code += `        defGetter(${accessor}, ${JSON.stringify(lastKey)}, ()=>(${nixNodeToJs(value)}));\n`
            }
        }

        code += `    return ${nixNodeToJs(body).trimStart()};\n`
        code += `})`

        return code
    } else if (node.type == "let_attrset_expression") {
        // Old-style Nix let:  let { x = 1; y = 2; body = x + y; }
        // All bindings except "body" are definitions; "body" is the return value.
        const children = valueBasedChildren(node)
        const bindingSet = children.find(each => each.type === "binding_set")
        const bindingSource = bindingSet ? valueBasedChildren(bindingSet) : children
        const bindings = bindingSource.filter(each =>
            each.type === "binding" || each.type === "inherit" || each.type === "inherit_from"
        )

        let bodyValue = null
        const simpleBindings = []

        for (const binding of bindings) {
            if (binding.type === "binding") {
                const bindingChildren = valueBasedChildren(binding)
                const attrpath = bindingChildren.find(each => each.type === "attrpath")
                const value = bindingChildren[bindingChildren.findIndex(each => each.text === "=") + 1]
                const pathParts = valueBasedChildren(attrpath).filter(each => each.type !== ".")

                if (pathParts.length === 1 && pathParts[0].type === "identifier" && pathParts[0].text === "body") {
                    bodyValue = value
                } else if (pathParts.length === 1 && pathParts[0].type === "identifier") {
                    simpleBindings.push({
                        name: pathParts[0].text,
                        value: value,
                        isConstant: isConstantExpression(value)
                    })
                }
            } else if (binding.type === "inherit") {
                const identifiers = valueBasedChildren(binding).filter(each => each.type === "identifier")
                for (const id of identifiers) {
                    simpleBindings.push({ name: id.text, value: id, isConstant: false, isPlainInherit: true })
                }
            }
        }

        if (!bodyValue) {
            throw Error(`let_attrset_expression missing "body" binding: ${node.text}`)
        }

        let code = `/*let*/ createScope(nixScope, (nixScope)=>{\n`
        for (const {name, value} of simpleBindings.filter(b => b.isConstant)) {
            code += `        nixScope${varAccess(name)} = ${nixNodeToJs(value)};\n`
        }
        for (const {name, value} of simpleBindings.filter(b => !b.isConstant && !b.isPlainInherit)) {
            // Plain `inherit name;` bindings are skipped: the prototype chain
            // already resolves them to the enclosing scope.
            code += `        defGetter(nixScope, ${JSON.stringify(name)}, (nixScope) => ${nixNodeToJs(value)});\n`
        }
        code += `    return ${nixNodeToJs(bodyValue).trimStart()};\n`
        code += `})`
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

        // Lazy `with`: the attrset thunk is only forced when an identifier
        // actually falls through to it (runtime.withScope handles precedence:
        // lexical > inner with > outer with). Eager evaluation/spreading would
        // re-enter in-progress fixed points like all-packages.nix `with self;`.
        let code = `((nixScope)=>{\n`
        code += `    runtime.scopeStack.push(nixScope);\n`
        code += `    try {\n`
        code += `        return ${nixNodeToJs(bodyExpr).trimStart()};\n`
        code += `    } finally {\n`
        code += `        runtime.scopeStack.pop();\n`
        code += `    }\n`
        code += `})(runtime.withScope(nixScope, ()=>(${nixNodeToJs(attrsetExpr)})))`

        return code
    } else if (node.type == "assert_expression") {
        // <assert_expression>
        //     <assert text="assert" />
        //     <binary_expression>...</binary_expression>
        //     <; text=";" />
        //     <string_expression>...</string_expression>
        // </assert_expression>

        // Assert expressions in Nix: assert condition; value
        // If condition is false, throw an error
        // If condition is true, return the value

        const children = valueBasedChildren(node)
        const assertIndex = children.findIndex(each => each.type === "assert")
        const semiIndex = children.findIndex(each => each.text === ";")

        const conditionExpr = children[assertIndex + 1]
        const valueExpr = children[semiIndex + 1]

        if (!conditionExpr || !valueExpr) {
            throw Error(`assert_expression missing condition or value: ${node.text}`)
        }

        // Generate: (condition ? value : throw error)
        // We use an IIFE to evaluate the condition once
        let code = `((_cond)=>{\n`
        code += `    if (!_cond) {\n`
        code += `        throw new Error("assertion failed: " + ${JSON.stringify(node.text.split(';')[0].replace('assert', '').trim())});\n`
        code += `    }\n`
        code += `    return ${nixNodeToJs(valueExpr).trimStart()};\n`
        code += `})(${nixNodeToJs(conditionExpr)})`

        return code
    } else if (node.type === "interpolation") {
        // <interpolation>
        //     <${ text="${" />
        //     <variable_expression>...</variable_expression>
        //     <} text="}" />
        // </interpolation>
        // Used in attrpath like: obj.${expr}
        const children = valueBasedChildren(node)
        // children[0] is "${", children[1] is the expression, children[2] is "}"
        if (children.length >= 2) {
            const expr = children[1]
            return nixNodeToJs(expr)
        } else {
            throw Error(`interpolation has unexpected structure: ${node.text}`)
        }
    } else {
        throw Error(`This is a bug with convertToJs(), it means this node was unexpected/unhandled and couldn't be converted: type=${JSON.stringify(node.type)}, ${JSON.stringify(node.text)}`)
    }
}


//
// internal-only helpers
//
const valueBasedChildren = (node)=>node.children.filter(each=>each.type!="comment"&&each.typeId>=0)

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

function varAccess(varName) {
    if (isValidKeyLiteral(varName)) {
        return `.${varName}`
    } else {
        return `[${JSON.stringify(varName)}]`
    }
}