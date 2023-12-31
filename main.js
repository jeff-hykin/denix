import { OperatingSystem } from "https://deno.land/x/quickr@0.6.51/main/operating_system.js"
import { FileSystem } from "https://deno.land/x/quickr@0.6.51/main/file_system.js"
import { run, hasCommand, throwIfFails, zipInto, mergeInto, returnAsString, Timeout, Env, Cwd, Stdin, Stdout, Stderr, Out, Overwrite, AppendTo } from "https://deno.land/x/quickr@0.6.51/main/run.js"
import { Console, black, white, red, green, blue, yellow, cyan, magenta, lightBlack, lightWhite, lightRed, lightGreen, lightBlue, lightYellow, lightMagenta, lightCyan, blackBackground, whiteBackground, redBackground, greenBackground, blueBackground, yellowBackground, magentaBackground, cyanBackground, lightBlackBackground, lightRedBackground, lightGreenBackground, lightYellowBackground, lightBlueBackground, lightMagentaBackground, lightCyanBackground, lightWhiteBackground, bold, reset, dim, italic, underline, inverse, strikethrough, gray, grey, lightGray, lightGrey, grayBackground, greyBackground, lightGrayBackground, lightGreyBackground, } from "https://deno.land/x/quickr@0.6.51/main/console.js"
import { zip, enumerate, count, permute, combinations, wrapAroundGet } from "https://deno.land/x/good@1.5.1.0/array.js"
import { toString as safeToString } from "https://deno.land/x/good@1.5.1.0/string.js"
import { deepCopy, deepCopySymbol, allKeyDescriptions, deepSortObject, shallowSortObject, isGeneratorType,isAsyncIterable, isSyncIterable, isTechnicallyIterable, isSyncIterableObjectOrContainer, allKeys } from "https://deno.land/x/good@1.5.1.0/value.js"

import { nixFileToXml, parse } from "./tools/parsing.js"
import { StackManager } from "./tools/analysis.js"
import { toFloat } from "./tools/generic.js"

// Design explanation (converting nix to JavaScript)
    // 1. First there is a top-level wrapper function: nixJsRuntime()
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

class NixError extends Error {}
class NotImplemented extends Error {}

class Interpolater {
    constructor(strings, getters) {
        this.strings = strings
        this.getters = getters
        this.cached = null
    }
    toString() {
        if (this.cached == null) {
            const chunks = []
            for (const [string,getter] of zip(this.strings,this.getters)) {
                if (string) {
                    chunks.push(string)
                }
                if (getter) {
                    const value = getter()
                    // if its a derivation
                    if (value.outPath) {
                        value = value.outPath
                    }
                    if (!builtins.isString(value)) {
                        throw new NixError(`error: cannot coerce ${builtins.typeOf(value)} to a string`)
                    }
                    chunks.push(
                        value.toString()
                    )
                }
            }
            // free up memory
            delete this.strings
            delete this.getters
            this.cached = chunks.join("")
        }
        return this.cached
    }
}

export class InterpolatedString extends Interpolater {
}

export class Path extends Interpolater {
}

const builtins = {
    // constants
        "null": null,
        "false": false,
        "true": true,
        "builtins": undefined,
        "langVersion": 6,
        "nixVersion": "2.18.1",
    
    // 
    // checker functions
    // 
        "isNull": (value)=>value === null,
        "isBool": (value)=>value===true||value===false,
        "isInt": (value)=>typeof value == "bigint",
        "isFloat": (value)=>typeof value == "number",
        "isPath": (value)=>value instanceof Path,
        "isString": (value)=> value instanceof InterpolatedString || typeof value == "string",
        "isList": (value)=>value instanceof Array,
        "isAttrs": (value)=>Object.getPrototypeOf({}) == Object.getPrototypeOf(value),
        "isFunction": (value)=>value instanceof Function,
        "typeOf": (value)=>{
            switch (typeof value) {
                case "boolean":  return "bool"  ; break;
                case "bigint":   return "int"   ; break;
                case "number":   return "float" ; break;
                case "string":   return "string"; break;
                case "function": return "lambda"; break;
                case "object":
                    if (value == null) {
                        return "null"
                    } else if (value instanceof InterpolatedString) {
                        return "string"
                    } else if (value instanceof Path) {
                        return "path"
                    } else if (value instanceof Array) {
                        return "list"
                    } else if (Object.getPrototypeOf({}) == Object.getPrototypeOf(value)) {
                        return "set"
                    } else {
                        throw Error(`Called builtins.typeOf, which only works with valid nix values, but instead got type ${typeof value}, with a value of: ${safeToString(value)} `)
                    }
                    break;
                default:
                    throw Error(`Called builtins.typeOf, which only works with valid nix values, but instead got type ${typeof value}, with a value of: ${safeToString(value)} `)
            }
        },
    
    // 
    // math
    // 
        "lessThan": (value1)=>(value2)=>value1<value2,
        "add": (value1)=>(value2)=>{
            if (typeof value1 == "bigint" && typeof value2 == "bigint") {
                return value1+value2
            } else {
                return toFloat(value1)+toFloat(value2)
            }
        },
        "sub": (value1)=>(value2)=>{
            if (typeof value1 == "bigint" && typeof value2 == "bigint") {
                return value1-value2
            } else {
                return toFloat(value1)-toFloat(value2)
            }
        },
        "div": (value1)=>(value2)=>{
            if (typeof value1 == "bigint" && typeof value2 == "bigint") {
                return value1/value2
            } else {
                return toFloat(value1)/toFloat(value2)
            }
        },
        "mul": (value1)=>(value2)=>{
            if (typeof value1 == "bigint" && typeof value2 == "bigint") {
                return value1*value2
            } else {
                return toFloat(value1)*toFloat(value2)
            }
        },
        "ceil": (value)=>typeof value == "bigint"?value:BigInt(Math.ceil(value)),
        "floor": (value)=>typeof value == "bigint"?value:BigInt(Math.floor(value)),
    
    // 
    // bitwise
    // 
        "bitAnd": ()=>{/*FIXME*/},
        "bitOr": ()=>{/*FIXME*/},
        "bitXor": ()=>{/*FIXME*/},
    
    // to-value functions
        "toString": (value)=>{
            switch (typeof value) {
                case "boolean":
                    if (value) {
                        return "1"
                    } else {
                        return "0"
                    }
                case "string":
                    return value
                case "number":
                    const output = `${value}`
                    // need to add a decimal if one is missing
                    if (output.match(/\./)) {
                        return output
                    } else {
                        return output+".0"
                    }
                case "bigint":
                    return `${value}` 
                case "function":
                    throw new NixError(`error: cannot coerce a function to a string`)
                case "object":
                    if (value == null) {
                        return ""
                    } else if (value instanceof InterpolatedString) {
                        // TODO: its unclear if there's a case when this should return value instead of value.toString()
                        return value.toString()
                    } else if (value instanceof Array) {
                        return value.flat(Infinity).map(each=>builtins.toString(each)).join(" ")
                    } else if (Object.getPrototypeOf({}) == Object.getPrototypeOf(value)) {
                        throw new NixError(`error: cannot coerce a set to a string`)
                    } else if (value instanceof Path) {
                        return FileSystem.makeAbsolutePath(value.toString())
                    } else {
                        throw Error(`Called builtins.toJSON, which only works with valid nix values, but instead got type ${typeof value}, with a value of: ${safeToString(value)} `)
                    }
                    break;
                default:
                    throw Error(`Called builtins.toJSON, which only works with valid nix values, but instead got type ${typeof value}, with a value of: ${safeToString(value)} `)
            }
        },
        "toJSON": (value)=>{
            switch (typeof value) {
                case "boolean":
                case "string":
                    return JSON.stringify(value);
                case "number":
                    const output = JSON.stringify(value)
                    // need to add a decimal if one is missing
                    if (output.match(/\./)) {
                        return output
                    } else {
                        return output+".0"
                    }
                    break;
                case "bigint":
                    return JSON.stringify(`${value}`-0)
                case "function":
                    throw new NixError(`error: cannot convert a function to JSON`)
                case "object":
                    if (value == null) {
                        return "null"
                    } else if (value instanceof InterpolatedString) {
                        return value.toString()
                    } else if (value instanceof Array) {
                        return `[${value.map(each=>builtins.toJSON(each)).join(",")}]`
                    } else if (Object.getPrototypeOf({}) == Object.getPrototypeOf(value)) {
                        const keys = Object.getOwnPropertyNames(value)
                        const entries = []
                        for (const each of keys) {
                            entries.push(`${JSON.stringify(each)}:${builtins.toJSON(value[each])}`)
                        }
                        return `{${entries.join(",")}}`
                    } else if (value instanceof Path) {
                        const absolutePath = FileSystem.makeAbsolutePath(value.toString())
                        const itemInfo = FileSystem.sync.info(absolutePath)
                        if (!itemInfo.exists) {
                            throw new NixError(`error: getting status of ${JSON.stringify(absolutePath)}: No such file or directory`)
                        } else {
                            // FIXME:
                                // Nix will
                                // create a hash of the file/directory
                                // create a /nix/store/ entry under that hash
                                // copy all the files to that location and strip them of information (reset the touched-date etc)
                                // then JSON.stringify the /nix/store path, and return that value
                            throw new NotImplemented(`Sorry :( I don't support toJSON of paths yet'`)
                        }
                    } else {
                        throw Error(`Called builtins.toJSON, which only works with valid nix values, but instead got type ${typeof value}, with a value of: ${safeToString(value)} `)
                    }
                    break;
                default:
                    throw Error(`Called builtins.toJSON, which only works with valid nix values, but instead got type ${typeof value}, with a value of: ${safeToString(value)} `)
            }
        },
        "toXML": ()=>{/*FIXME*/},
        "toPath": (value)=>{
            // NOTE: nix has deprecated this, which is good cause its stupid
            // it returns a string not a path

            // derivations can be converted to a string
            if (value.outPath) {
                value = value.outPath
            }
            if (value instanceof Path) {
                return FileSystem.makeAbsolutePath(value.toString())
            }
            if (!builtins.isString(value)) {
                throw new NixError(`error: cannot coerce ${builtins.typeOf(value)} to a string`)
            }
            value = value.toString()

            if (!FileSystem.isAbsolutePath(value)) {
                throw Error(`error: string ${nixRepr(value)} doesn't represent an absolute path`)
            }
            // yup all that work for nuthin
            return value
        },
    
    // 
    // value generators
    // 
        "genList": ()=>{/*FIXME*/},
        "fromJSON": ()=>{/*FIXME*/}, // NOTE: this is going to need to be parsed MANUALLY because "1" becomes an int while "1.0" becomes a normal number
        "fromTOML": ()=>{/*FIXME*/},

    // 
    // string helpers
    // 
        "concatStringsSep": ()=>{/*FIXME*/},
        "replaceStrings": ()=>{/*FIXME*/},
        "match": ()=>{/*FIXME*/},
        "split": ()=>{/*FIXME*/},
        "splitVersion": ()=>{/*FIXME*/},
        "stringLength": ()=>{/*FIXME*/},
        "substring": ()=>{/*FIXME*/},
    
    // 
    // list helpers
    // 
        "length": (value)=>value.length,
        "all": (func)=>(list)=>list.length==0||list.every(func), 
        "any": (func)=>(list)=>list.some(func),                  
        "filter": (func)=>(list)=>list.filter(func),             
        "concatLists": (lists)=>assertIsList(list)&&lists.flat(1),
        "elem": (value)=>(list)=>assertIsList(list)&&list.includes(value),
        "elemAt": (list)=>(index)=>{
            assertIsList(list)
            if (index>=list.length) {
                throw new NixError(`error: list index ${index} is out of bounds`)
            }
            // NOTE: this is actually not what nix does: nix throws an error that is almost certainly a bug:
            //        error: value is the partially applied built-in function 'elemAt' while an integer was expected
            if (index < 0) {
                throw new NixError(`error: list index ${index} is out of bounds (index cannot be negative)`)
            }
            return list[index]
        },
        "foldl'": ()=>{/*FIXME*/},
        "head": ()=>{/*FIXME*/},
        "tail": ()=>{/*FIXME*/},
        "groupBy": ()=>{/*FIXME*/},
        "map": ()=>{/*FIXME*/},
        "partition": ()=>{/*FIXME*/},
        "sort": ()=>{/*FIXME*/},
    
    // 
    // attr helpers
    // 
        "hasAttr": ()=>{/*FIXME*/},
        "getAttr": ()=>{/*FIXME*/},
        "attrNames": (value)=>Object.getOwnPropertyNames(value).sorted(), // FIXME make sure JS's alphabetical sort is the same as nix's alphabetical sort
        "attrValues": (value)=>builtins.attrNames(value).map(each=>value[each]),
        "catAttrs": ()=>{/*FIXME*/},
        "concatMap": ()=>{/*FIXME*/},
        "zipAttrsWith": ()=>{/*FIXME*/},
        "intersectAttrs": ()=>{/*FIXME*/},
        "listToAttrs": ()=>{/*FIXME*/},
        "mapAttrs": ()=>{/*FIXME*/},
        "removeAttrs": ()=>{/*FIXME*/},
    
    // 
    // hashers
    // 
        "hashFile": ()=>{/*FIXME*/},
        "hashString": ()=>{/*FIXME*/},
    
    // evaluation control
        "break": (value)=>value, // NOTE: we just ignore the debugging aspect
        "trace": ()=>{/*FIXME*/},
        "traceVerbose": ()=>{/*FIXME*/},
        "tryEval": ()=>{/*FIXME*/},
        "seq": ()=>{/*FIXME*/},
        "deepSeq": ()=>{/*FIXME*/},
        "abort": (value)=>{ throw new NixError(`error: evaluation aborted with the following error message: ${nixRepr(value)}`) },
        "throw": ()=>{/*FIXME*/},
    
    // file system
        "toFile": ()=>{/*FIXME*/},
        "path": ()=>{/*FIXME*/},
            // kinda complicated:
            // https://nix-community.github.io/docnix/reference/builtins/builtins-path/
        "pathExists": ()=>{/*FIXME*/},
        "readDir": ()=>{/*FIXME*/},
            // NOTE: fails with input of "./." (not absolute path) works with input of ./. (path literal)
            // output { ".git" = "directory"; "main.js" = "regular"; scratch_work = "directory"; tests = "directory"; tools = "directory"; }
        "readFile": (value)=>Deno.readTextFileSync(value.toString()),
        "readFileType": ()=>{/*FIXME*/},
        "baseNameOf": (value)=>FileSystem.basename(value), // FIXME: look up behavior on derivation inputs, and add type checking
        "dirOf": (value)=>FileSystem.dirname(value), // FIXME: look up behavior on derivation inputs, and add type checking
        "findFile": (list)=>(string)=>{/*FIXME*/},
            // https://nix-community.github.io/docnix/reference/builtins/builtins-findfile/
            // list[0] == { path = "/Users/jeffhykin/.nix-defexpr/channels"; prefix = ""; }
    
    // host machine
        "currentSystem": ()=>{/*FIXME*/},
        "currentTime": ()=>{/*FIXME*/},
        "getEnv": (string)=>Deno.env.get(string), // FIXME: validate argument is string

    // context (these are going to be a pain)
        "addErrorContext": ()=>{/*FIXME*/},
        "appendContext": ()=>{/*FIXME*/},
        "getContext": ()=>{/*FIXME*/},
        "hasContext": ()=>{/*FIXME*/},
        "unsafeDiscardStringContext": ()=>{/*FIXME*/},
    
    // fetchers
        "fetchurl": ()=>{/*FIXME*/},
        "fetchTarball": ()=>{/*FIXME*/},
        "fetchGit": ()=>{/*FIXME*/}, // TODO: use git binary from ahgamut/superconfigure
        "fetchMercurial": ()=>{/*FIXME*/},
        "fetchTree": ()=>{/*FIXME*/},

    // misc
        "import": ()=>{/*FIXME*/},
        "scopedImport": ()=>{/*FIXME*/},
        "functionArgs": ()=>{/*FIXME*/},
    
    // nix-y derivation-y stuff
        "nixPath": ()=>{/*FIXME*/},
        "storeDir": ()=>{/*FIXME*/},
        "storePath": ()=>{/*FIXME*/},
        "derivation": ()=>{/*FIXME*/},
        "derivationStrict": ()=>{/*FIXME*/},
        "parseDrvName": ()=>{/*FIXME*/},
        "compareVersions": ()=>{/*FIXME*/},
        "getFlake": ()=>{/*FIXME*/},
        "parseFlakeRef": ()=>{/*FIXME*/},
        "placeholder": ()=>{/*FIXME*/},
        
    // complicated to explain functionality 
        "filterSource": ()=>{/*FIXME*/},
        "flakeRefToString": ()=>{/*FIXME*/},
        "genericClosure": ()=>{/*FIXME*/},
        "unsafeDiscardOutputDependency": ()=>{/*FIXME*/},
        "unsafeGetAttrPos": ()=>{/*FIXME*/},
}
builtins.builtins = builtins
Object.freeze(builtins)

const operators = {
    negative: (value)=>{/*FIXME*/},
    membershipCheck: (value)=>{/*FIXME*/},
    listConcat: (value)=>{/*FIXME*/},
    plus: (value)=>{/*FIXME*/},
        // number + number : Addition
        // string + string : String concatenation
        // path + path     : Path concatenation
        // path + string   : Path and string concatenation
        // string + path   : String and path concatenation
    minus: (value)=>{/*FIXME*/},
    divide: (value)=>{/*FIXME*/},
    multiply: (value)=>{/*FIXME*/},
    negate: (value)=>{/*FIXME*/},
    merge: (value)=>{/*FIXME*/},
    lessThan: (value)=>{/*FIXME*/},
    lessThanOrEqual: (value)=>{/*FIXME*/},
    greaterThan: (value)=>{/*FIXME*/},
    greaterThanOrEqual: (value)=>{/*FIXME*/},
    equality: (value)=>{/*FIXME*/},
    inequality: (value)=>{/*FIXME*/},
    and: (value)=>{/*FIXME*/},
    or: (value)=>{/*FIXME*/},
    implication: (value)=>{/*FIXME*/},
}

// this function will not be called directly, rather this is the outermost wrapper around every nix-runtime
const nixJsRuntime = ()=>{
    const runtime = {
        scopeStack: [],
        rootScope: {
            builtins,
            true: builtins.true,
            false: builtins.false,
            null: builtins.null,
            import: builtins.import,
            // FIXME: there are some other default-global names
        },
    }
    runtime.scopeStack.push(runtime.rootScope)

    /*###I'll BE REPLACED###*/
}

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
    return nixJsRuntime.toString().replace(`/*###I'll BE REPLACED###*/`, output)
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
    } else if (node.type == "string_expression") {
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
        // more complicated function:
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
const assertIsList = (value)=>{
    if (!(list instanceof Array)) {
        throw new NixError(`error: value is ${builtins.typeOf(list)} while a list was expected`)
    }
    return true
}

const nixRepr = (value)=>{
    // FIXME: should use single quotes instead of double, and probably some other things
    return JSON.stringify(value)
}
