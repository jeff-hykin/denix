import { OperatingSystem } from "https://deno.land/x/quickr@0.6.51/main/operating_system.js"
import { FileSystem } from "https://deno.land/x/quickr@0.6.51/main/file_system.js"
import { run, hasCommand, throwIfFails, zipInto, mergeInto, returnAsString, Timeout, Env, Cwd, Stdin, Stdout, Stderr, Out, Overwrite, AppendTo } from "https://deno.land/x/quickr@0.6.51/main/run.js"
import { Console, black, white, red, green, blue, yellow, cyan, magenta, lightBlack, lightWhite, lightRed, lightGreen, lightBlue, lightYellow, lightMagenta, lightCyan, blackBackground, whiteBackground, redBackground, greenBackground, blueBackground, yellowBackground, magentaBackground, cyanBackground, lightBlackBackground, lightRedBackground, lightGreenBackground, lightYellowBackground, lightBlueBackground, lightMagentaBackground, lightCyanBackground, lightWhiteBackground, bold, reset, dim, italic, underline, inverse, strikethrough, gray, grey, lightGray, lightGrey, grayBackground, greyBackground, lightGrayBackground, lightGreyBackground, } from "https://deno.land/x/quickr@0.6.51/main/console.js"
import { zip, enumerate, count, permute, combinations, wrapAroundGet } from "https://deno.land/x/good@1.5.1.0/array.js"
import { toString as safeToString } from "https://deno.land/x/good@1.5.1.0/string.js"
import { deepCopy, deepCopySymbol, allKeyDescriptions, deepSortObject, shallowSortObject, isGeneratorType,isAsyncIterable, isSyncIterable, isTechnicallyIterable, isSyncIterableObjectOrContainer, allKeys } from "https://deno.land/x/good@1.5.1.0/value.js"
import { escapeRegexMatch } from "https://deno.land/x/good@1.7.1.1/flattened/escape_regex_match.js"

//  tools
import { StackManager } from "../tools/analysis.js"
import { toFloat } from "../tools/generic.js"
import { sha256Hex, md5Hex, sha1Hex, sha512Hex } from "../tools/hashing.js"
import { jsonParseWithBigInt } from "../tools/json_parse.js"
import { lazyMap } from "../tools/lazy_array.js"
// Removed prex dependency due to WASM initialization issues
// Replaced with custom POSIX regex converter below
import { parse as tomlParse } from "https://deno.land/std@0.224.0/toml/mod.ts"
import { serializeDerivation, computeDrvPath, computeOutputPath } from "../tools/store_path.js"

// core stuff
import { NixError, NotImplemented } from "./errors.js"

// import system
import { ImportCache } from "./import_cache.js"
import { resolveImportPath } from "../tools/import_resolver.js"
import { loadAndEvaluateSync } from "./import_loader.js"

// hard parts right now:
    // builtins.fetchGit
    // builtins.sort
    // operators.equality
    // builtins.fromTOML
    // builtins.fetchMercurial
    // create the value-to-env-var function for derivations

//
// Import state (shared across runtime instances)
//
    // Global state for import functions (gets set by createRuntime)
    const globalImportState = {
        importFn: null,
        scopedImportFn: null,
    }

//
// classes
//


    export class Interpolater {
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

// 
// helpers (mostly arg checking tools)
// 
    const requireInt = (value)=>{
        if (typeof value!='bigint') {
            throw new NixError(`error: value is a ${builtins.typeOf(value)} while an integer was expected`)
        }
        return value
    }
    const requireAttrSet = (value)=>{
        if (!builtins.isAttrs(value)) {
            throw new NixError(`error: value is a ${builtins.typeOf(value)} while a set was expected`)
        }
        return value
    }
    const requireString = (value)=>{
        if (!builtins.isString(value)) {
            throw new NixError(`error: value is a ${builtins.typeOf(value)} while a string was expected`)
        }
        return value
    }
    const requireList = (value)=>{
        if (!builtins.isList(value)) {
            throw new NixError(`error: value is a ${builtins.typeOf(value)} while a list was expected`)
        }
        return value
    }
    const nixRepr = (value)=>{
        if (typeof value === 'string') {
            return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\t/g, '\\t')}"`
        }
        return JSON.stringify(value)
    }

    // Convert POSIX regex patterns to JavaScript-compatible regex
    // Nix uses POSIX extended regex which includes character classes like [[:space:]], [[:upper:]], etc.
    const posixToJsRegex = (posixPattern) => {
        // Map POSIX character classes to JavaScript equivalents
        const posixClasses = {
            'alnum': 'a-zA-Z0-9',
            'alpha': 'a-zA-Z',
            'blank': ' \\t',
            'cntrl': '\\x00-\\x1F\\x7F',
            'digit': '0-9',
            'graph': '\\x21-\\x7E',
            'lower': 'a-z',
            'print': '\\x20-\\x7E',
            'punct': '\\x21-\\x2F\\x3A-\\x40\\x5B-\\x60\\x7B-\\x7E',
            'space': ' \\t\\r\\n\\v\\f',
            'upper': 'A-Z',
            'xdigit': '0-9A-Fa-f',
        }

        let jsPattern = posixPattern
        for (const [className, jsClass] of Object.entries(posixClasses)) {
            // Replace [[:xxx:]] with the JavaScript equivalent
            jsPattern = jsPattern.replace(new RegExp(`\\[\\[:${className}:\\]\\]`, 'g'), `[${jsClass}]`)
        }

        return jsPattern
    }

// 
// actual runtime stuff
// 
    export const builtins = {
        // constants
            "null": null,
            "false": false,
            "true": true,
            "builtins": undefined,
            "langVersion": 6,
            "nixVersion": "2.18.1",
            // impure
            "currentSystem": `${Deno.build.arch}-${Deno.build.os}`, // for sure works on mac and linux, but probably not anything more exotic
            "currentTime": BigInt(Math.round((new Date().getTime())/1000)), // time program started (not dynamic in nix, even in the repl)
        
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
            "bitAnd": (value1)=>(value2)=>requireInt(value1)&requireInt(value2),
            "bitOr": (value1)=>(value2)=>requireInt(value1)|requireInt(value2),
            "bitXor": (value1)=>(value2)=>requireInt(value1)^requireInt(value2),
        
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
                            return `[${value.map(builtins.toJSON).join(",")}]`
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
            "toXML": (e)=>{
                const toXml = (value) => {
                    switch (typeof value) {
                        case "boolean":
                            return `<bool value="${value ? 'true' : 'false'}" />`
                        case "string":
                            return `<string value="${value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}" />`
                        case "number":
                            return `<float value="${value}" />`
                        case "bigint":
                            return `<int value="${value}" />`
                        case "function":
                            return `<function />`
                        case "object":
                            if (value === null) {
                                return `<null />`
                            } else if (value instanceof InterpolatedString) {
                                return toXml(value.toString())
                            } else if (value instanceof Path) {
                                return toXml(FileSystem.makeAbsolutePath(value.toString()))
                            } else if (value instanceof Array) {
                                return `<list>${value.map(toXml).join('')}</list>`
                            } else if (Object.getPrototypeOf({}) == Object.getPrototypeOf(value)) {
                                const attrs = Object.keys(value).map(key =>
                                    `<attr name="${key.replace(/"/g, '&quot;')}">${toXml(value[key])}</attr>`
                                ).join('')
                                return `<attrs>${attrs}</attrs>`
                            }
                    }
                    return `<unknown />`
                }
                return `<?xml version='1.0' encoding='utf-8'?>\n${toXml(e)}\n`
            },
        
        // 
        // value generators
        //
            "fromJSON": jsonParseWithBigInt, // can't be JSON.parse because plain int values need to become BigInts
            "fromTOML": (tomlString)=>{
                const parsed = tomlParse(requireString(tomlString).toString())
                // recursively convert all integer numbers to BigInts to match Nix behavior
                const convertIntsToBigInt = (value) => {
                    if (typeof value === "number" && Number.isInteger(value)) {
                        return BigInt(value)
                    } else if (Array.isArray(value)) {
                        return value.map(convertIntsToBigInt)
                    } else if (value && typeof value === "object") {
                        const result = {}
                        for (const [k, v] of Object.entries(value)) {
                            result[k] = convertIntsToBigInt(v)
                        }
                        return result
                    }
                    return value
                }
                return convertIntsToBigInt(parsed)
            },

        // 
        // string helpers
        // 
            // (concatStringsSep "/" ["usr" "local" "bin"]) == "usr/local/bin".
            "concatStringsSep": (separator)=>(list)=>{
                requireString(separator)
                requireList(list)
                // .toString is to handle interpolated strings
                return list.map(
                    each => {
                        requireString(each)
                        return each.toString()
                    }
                ).join(separator.toString())
            },
            // (builtins.replaceStrings ["oo" "a"] ["a" "i"] "foobar") == "fabir"
            "replaceStrings": (from)=>(to)=>(str)=>{
                requireString(str)
                requireList(from)
                requireList(to)
                if (from.length != to.length) {
                    throw new NixError(`error: 'from' and 'to' arguments passed to builtins.replaceStrings have different lengths`)
                }
                const pattern = new RegExp(
                    from.map(each=>escapeRegexMatch(each.toString())).join("|"),
                    "g"
                )
                return str.replace(
                    pattern,
                    // TODO: note there is slightly different behavior here 
                    // if the replacement is not a string, this converts it to a string (for some things)
                    // nix lazily throws an error if the replacement is not a string
                    stringMatch=>to[from.indexOf(stringMatch)].toString()
                )
            },
            "match": (regex)=>(str)=>{
                // builtins.match "ab" "abc" => null.
                // builtins.match "abc" "abc" => [ ].
                // builtins.match "a(b)(c)" "abc" => [ "b" "c" ].
                // builtins.match "[[:space:]]+([[:upper:]]+)[[:space:]]+" "  FOO   " => [ "FOO" ].
                const regexStr = requireString(regex).toString()
                const stringStr = requireString(str).toString()

                // Convert POSIX regex to JavaScript regex
                const jsRegexStr = posixToJsRegex(regexStr)

                try {
                    const re = new RegExp(`^(?:${jsRegexStr})$`)
                    const match = stringStr.match(re)

                    if (!match) {
                        return null
                    }

                    // Return capture groups (exclude full match at index 0)
                    const captureGroups = match.slice(1)
                    return captureGroups
                } catch (error) {
                    throw new NixError(`error: invalid regular expression '${regexStr}'`)
                }
            },
            "split": (regex)=>(str)=>{
                const regexStr = requireString(regex).toString()
                const string = requireString(str).toString()
                const re = new RegExp(regexStr, 'g')
                const result = []
                let lastIndex = 0
                let match

                while ((match = re.exec(string)) !== null) {
                    result.push(string.slice(lastIndex, match.index))
                    const groups = []
                    for (let i = 1; i < match.length; i++) {
                        groups.push(match[i] === undefined ? null : match[i])
                    }
                    result.push(groups)
                    lastIndex = re.lastIndex
                }
                result.push(string.slice(lastIndex))
                return result
            },
            // (builtins.splitVersion ""                       ) == [ ]
            // (builtins.splitVersion "1.1.3.4.4.43.a.a"       ) == [ "1" "1" "3" "4" "4" "43" "a" "a" ]
            // (builtins.splitVersion "1.1.3.4.4.43.aa"        ) == [ "1" "1" "3" "4" "4" "43" "aa" ]
            // (builtins.splitVersion "1.1.3.4.4.43aa"         ) == [ "1" "1" "3" "4" "4" "43" "aa" ]
            // (builtins.splitVersion "1.1.3.4a.4.43aa"        ) == [ "1" "1" "3" "4" "a" "4" "43" "aa" ]
            // (builtins.splitVersion "1.1.3.a4a.4.43aa"       ) == [ "1" "1" "3" "a" "4" "a" "4" "43" "aa" ]
            // (builtins.splitVersion "1.1.3.a4a.4.43aa$()$I"  ) == [ "1" "1" "3" "a" "4" "a" "4" "43" "aa$()$I" ]
            // (builtins.splitVersion "1.1.3.a4a.4.43aa$()$Ia" ) == [ "1" "1" "3" "a" "4" "a" "4" "43" "aa$()$Ia" ]
            // (builtins.splitVersion "1.1.3.a4a.4.43aa$()$Ia4") == [ "1" "1" "3" "a" "4" "a" "4" "43" "aa$()$Ia" "4" ]
            // (builtins.splitVersion "1.1.3.a4a.4.+43aa$()$@@@@@(#*@!$^(@!*$%^/-><*(I|a4") == [ "1" "1" "3" "a" "4" "a" "4" "+" "43" "aa$()$@@@@@(#*@!$^(@!*$%^/" "><*(I|a" "4" ]
            // TODO: there may be edgecases I'm missing for splitVersion
            "splitVersion": (s)=>(   s.length == 0   ?    []    :     s.toString().split(/\.|(?<=\d)(?=\D)|(?<=\D)(?=\d)/g)   ),
            "stringLength": (s)=>{
                if (typeof s == 'string') {
                    return s.length
                } else if (s instanceof InterpolatedString) {
                    return s.toString().length
                }
            },
            "substring": (start)=>(len)=>(s)=>{
                // Convert BigInt to number for slice
                const startNum = typeof start === 'bigint' ? Number(start) : start
                const lenNum = typeof len === 'bigint' ? Number(len) : len
                if (typeof s == 'string') {
                    return s.slice(startNum, startNum + lenNum)
                } else if (s instanceof InterpolatedString) {
                    // be lazy for InterpolatedStrings
                    return new InterpolatedString([""], [()=>s.toString().slice(startNum, startNum + lenNum)])
                }
            },
        
        // 
        // list helpers
        // 
            "length": (value)=>value.length,
            "all": (func)=>(list)=>list.length==0||list.every(func), 
            "any": (func)=>(list)=>list.some(func),                  
            "filter": (func)=>(list)=>list.filter(func),             
            "concatLists": (lists)=>requireList(list)&&lists.flat(1),
            "elem": (value)=>(list)=>requireList(list)&&list.includes(value),
            "elemAt": (list)=>(index)=>{
                requireList(list)
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
            "head": (list)=>[list[0]],
            "tail": (list)=>list.slice(1),
            "map": (f)=>(list)=>lazyMap(list, f), // its lazy but behaves like a real array (proxy object)
            // (builtins.partition (x: x > 10) [1 23 9 3 42]) == { right = [ 23 42 ]; wrong = [ 1 9 3 ]; }
            "partition": (pred)=>(list)=>{
                let computed = false
                const right = []
                const wrong = []
                const compute = ()=>{
                    for (const each of list) {
                        if (pred(each)) {
                            right.push(each)
                        } else {
                            wrong.push(each)
                        }
                    }
                }
                return {
                    get right() {
                        !computed && compute()
                        return right
                    },
                    get wrong() {
                        !computed && compute()
                        return wrong
                    },
                }
            },
            // builtins.genList (x: x * x) 0 => [ ]
            // builtins.genList (x: x * x) 5 => [ 0 1 4 9 16 ]
            "genList": (func)=>(index)=>{
                if (index < 0) {
                    throw new NixError(`error: genList index ${index} cannot be negative`)
                }
                let output = [...new Array(index)]
                while (index > 0) {
                    output[--index] = func(index)
                }
                return output
            },
            // builtins.foldl' (x: y: x + y) "a" ["b" "c" "d"]  => "abcd"
            // builtins.foldl' (x: y: x + y) 0 [1 2 3] => 6
            "foldl'": (op)=>(nul)=>(list)=>list.reduce((acc,each)=>op(acc)(each),nul), // TODO: check more edgecases on this
            "sort": (comparator)=>(list)=>{
                requireList(list)
                return [...list].sort((a, b) => comparator(a)(b) ? -1 : (comparator(b)(a) ? 1 : 0))
            },
            "groupBy": (f)=>(list)=>{
                requireList(list)
                const result = {}
                for (const item of list) {
                    const key = requireString(f(item)).toString()
                    if (!result[key]) {
                        result[key] = []
                    }
                    result[key].push(item)
                }
                return result
            },
        
        // 
        // attr helpers
        // 
            "hasAttr": (attr)=>(attrSet)=>Object.getOwnPropertyNames(requireAttrSet(attrSet)).includes(requireString(attr)),
            "getAttr": (attr)=>(attrSet)=>{
                if (!Object.getOwnPropertyNames(requireAttrSet(attrSet)).includes(requireString(attr))) {
                    throw new NixError(`error: attribute ${nixRepr(attr)} missing`)
                }
                return attrSet[attr]
            },
            "attrNames": (value)=>Object.getOwnPropertyNames(value).sort(),
            "attrValues": (value)=>builtins.attrNames(value).map(each=>value[each]),
            "catAttrs": (attr)=>(list)=>{
                const attrName = requireString(attr).toString()
                requireList(list)
                const result = []
                for (const each of list) {
                    requireAttrSet(each)
                    if (each.hasOwnProperty(attrName)) {
                        result.push(each[attrName])
                    }
                }
                return result
            },
            "concatMap": (f)=>(list)=>{
                requireList(list)
                const result = []
                for (const item of list) {
                    const mapped = f(item)
                    requireList(mapped)
                    result.push(...mapped)
                }
                return result
            },
            "zipAttrsWith": (f)=>(list)=>{
                requireList(list)
                const collected = {}
                for (const attrset of list) {
                    requireAttrSet(attrset)
                    for (const [key, value] of Object.entries(attrset)) {
                        if (!collected[key]) {
                            collected[key] = []
                        }
                        collected[key].push(value)
                    }
                }
                const result = {}
                for (const [key, values] of Object.entries(collected)) {
                    result[key] = f(key)(values)
                }
                return result
            },
            "intersectAttrs": (e1)=>(e2)=>{
                requireAttrSet(e1)
                requireAttrSet(e2)
                const result = {}
                for (const key of Object.keys(e1)) {
                    if (e2.hasOwnProperty(key)) {
                        result[key] = e2[key]
                    }
                }
                return result
            },
            "listToAttrs": (list)=>{
                requireList(list)
                const result = {}
                for (const item of list) {
                    requireAttrSet(item)
                    const name = requireString(item.name).toString()
                    if (!result.hasOwnProperty(name)) {
                        result[name] = item.value
                    }
                }
                return result
            },
            "mapAttrs": (f)=>(attrset)=>{
                requireAttrSet(attrset)
                const result = {}
                for (const [name, value] of Object.entries(attrset)) {
                    result[name] = f(name)(value)
                }
                return result
            },
            "removeAttrs": (set)=>(list)=>{
                requireAttrSet(set)
                requireList(list)
                const result = {}
                for (const key of Object.keys(set)) {
                    if (!list.includes(key)) {
                        result[key] = set[key]
                    }
                }
                return result
            },
        
        // 
        // hashers
        // 
            "hashString": (hashFuncName)=>(stringContent)=>{ // example (builtins.hashString "sha256" "hello") => "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
                if (hashFuncName == "sha256") {
                    return sha256Hex(stringContent)
                } else if (hashFuncName == "md5") {
                    return md5Hex(stringContent)
                } else if (hashFuncName == "sha1") {
                    return sha1Hex(stringContent)
                } else if (hashFuncName == "sha512") {
                    return sha512Hex(stringContent)
                } else {
                    throw new NixError(`error: unknown hash algorithm ${nixRepr(hashFuncName)}`)
                }
            },
            "hashFile": (hashFuncName)=>(path)=>{ // only hashes the file contents
                return builtins.hashString(hashFuncName)(FileSystem.sync.readBytes(path))
            },
        
        // fetchers
            "fetchurl": (url)=>{
                throw new NotImplemented(`builtins.fetchurl requires network layer and store implementation`)
            },
            "fetchTarball": (url)=>{
                throw new NotImplemented(`builtins.fetchTarball requires network layer, tar extraction, and store implementation`)
            },
            "fetchGit": (args)=>{
                throw new NotImplemented(`builtins.fetchGit requires git binary integration and store implementation`)
            },
            "fetchMercurial": (args)=>{
                throw new NotImplemented(`builtins.fetchMercurial requires hg binary integration and store implementation`)
            },
            "fetchTree": (args)=>{
                throw new NotImplemented(`builtins.fetchTree is an experimental feature requiring fetch system and store implementation`)
            },
            "fetchClosure": (args)=>{
                throw new NotImplemented(`builtins.fetchClosure requires binary cache support and store implementation (experimental feature)`)
            },

        // misc
            // Note: import and scopedImport delegate to runtime-initialized versions
            // We use a shared state object that gets initialized by createRuntime()
            "import": (path)=>{
                if (!globalImportState.importFn) {
                    throw new NixError(`builtins.import called before runtime initialization`)
                }
                return globalImportState.importFn(path)
            },
            "scopedImport": (scope)=>(path)=>{
                if (!globalImportState.scopedImportFn) {
                    throw new NixError(`builtins.scopedImport called before runtime initialization`)
                }
                return globalImportState.scopedImportFn(scope)(path)
            },
            "functionArgs": (f)=>{
                if (!builtins.isFunction(f)) {
                    throw new NixError(`error: 'functionArgs' requires a function, got ${builtins.typeOf(f)}`)
                }
                // If function has __functionArgs metadata (set during parsing/evaluation), return it
                if (f.__functionArgs) {
                    return f.__functionArgs
                }
                // Otherwise return empty set (no formal args or not tracked)
                return {}
            },
        
        // evaluation control
            "break": (value)=>value, // NOTE: we just ignore the debugging aspect
            "trace": (e1)=>(e2)=>{
                console.error(builtins.toString(e1))
                return e2
            },
            "traceVerbose": (e1)=>(e2)=>{
                if (Deno.env.get("NIX_TRACE_VERBOSE")) {
                    console.error(builtins.toString(e1))
                }
                return e2
            },
            "tryEval": (e)=>{
                try {
                    return { success: true, value: e }
                } catch (error) {
                    if (error instanceof NixError) {
                        return { success: false, value: false }
                    }
                    throw error
                }
            },
            "seq": (e1)=>(e2)=>{
                e1
                return e2
            },
            "deepSeq": (e1)=>(e2)=>{
                const deepEval = (val) => {
                    if (val instanceof Array) {
                        for (const item of val) {
                            deepEval(item)
                        }
                    } else if (builtins.isAttrs(val)) {
                        for (const key of Object.keys(val)) {
                            deepEval(val[key])
                        }
                    }
                }
                deepEval(e1)
                return e2
            },
            "abort": (value)=>{ throw new NixError(`error: evaluation aborted with the following error message: ${nixRepr(value)}`) },
            "throw": (s)=>{ throw new NixError(requireString(s).toString()) },
        
        // file system
            "getEnv": (string)=>Deno.env.get(requireString(string)),
            "readFile": (value)=>Deno.readTextFileSync(value.toString()),
            "baseNameOf": (value)=>{
                if (value && value.outPath) {
                    value = value.outPath
                }
                if (value instanceof Path) {
                    return FileSystem.basename(value.toString())
                }
                if (builtins.isString(value)) {
                    return FileSystem.basename(value.toString())
                }
                throw new NixError(`error: cannot coerce ${builtins.typeOf(value)} to a string`)
            },
            "dirOf": (value)=>{
                if (value && value.outPath) {
                    value = value.outPath
                }
                if (value instanceof Path) {
                    return FileSystem.dirname(value.toString())
                }
                if (builtins.isString(value)) {
                    return FileSystem.dirname(value.toString())
                }
                throw new NixError(`error: cannot coerce ${builtins.typeOf(value)} to a string`)
            },
            "pathExists": (path)=>FileSystem.sync.info(path).exists,
            "toFile": (name)=>(content)=>{
                // In real Nix, this writes content to /nix/store/<hash>-<name>
                // For now, we'll compute the correct store path but not actually write it
                const nameStr = requireString(name).toString()
                const contentStr = requireString(content).toString()

                // Validate name (no slashes allowed)
                if (nameStr.includes("/")) {
                    throw new NixError(`error: 'toFile' name cannot contain '/'`)
                }

                // Compute store path using text method (similar to .drv files)
                // Fingerprint: "text:sha256:<content-hash>:/nix/store:<name>"
                const contentHash = sha256Hex(contentStr)
                const fingerprint = `text:sha256:${contentHash}:/nix/store:${nameStr}`
                const fingerprintHash = sha256Hex(fingerprint)

                // Convert to bytes and XOR-fold to 20 bytes
                const hashBytes = new Uint8Array(32)
                for (let i = 0; i < 32; i++) {
                    hashBytes[i] = parseInt(fingerprintHash.slice(i * 2, i * 2 + 2), 16)
                }
                const compressed = new Uint8Array(20)
                for (let i = 0; i < 32; i++) {
                    compressed[i % 20] ^= hashBytes[i]
                }

                // Reverse bytes for Nix base-32 encoding
                const reversed = new Uint8Array(compressed.length)
                for (let i = 0; i < compressed.length; i++) {
                    reversed[i] = compressed[compressed.length - 1 - i]
                }

                // Nix base-32 alphabet
                const alphabet = "0123456789abcdfghijklmnpqrsvwxyz"
                let hash32 = ""
                let bits = 0n
                for (const byte of reversed) {
                    bits = (bits << 8n) | BigInt(byte)
                }
                while (bits > 0n) {
                    hash32 = alphabet[Number(bits % 32n)] + hash32
                    bits = bits / 32n
                }
                hash32 = hash32.padStart(32, "0")

                const storePath = `/nix/store/${hash32}-${nameStr}`

                // Return path (note: file not actually written in this implementation)
                return storePath
            },
            "readFileType": (p)=>{
                const absolutePath = FileSystem.makeAbsolutePath(p.toString())
                try {
                    const stat = Deno.statSync(absolutePath)
                    if (stat.isFile) return "regular"
                    if (stat.isDirectory) return "directory"
                    if (stat.isSymlink) return "symlink"
                    return "unknown"
                } catch {
                    return "unknown"
                }
            },
            "path": (args)=>{
                throw new NotImplemented(`builtins.path requires full store implementation with filtering support. See: https://nix-community.github.io/docnix/reference/builtins/builtins-path/`)
            },
            
            "readDir": (path)=>{
                const absolutePath = FileSystem.makeAbsolutePath(path.toString())
                const result = {}
                for (const entry of Deno.readDirSync(absolutePath)) {
                    if (entry.isFile) {
                        result[entry.name] = "regular"
                    } else if (entry.isDirectory) {
                        result[entry.name] = "directory"
                    } else if (entry.isSymlink) {
                        result[entry.name] = "symlink"
                    } else {
                        result[entry.name] = "unknown"
                    }
                }
                return result
            },
            
            "findFile": (searchPath)=>(lookup)=>{
                // https://nix-community.github.io/docnix/reference/builtins/builtins-findfile/
                // searchPath is a list like [{ path = "/some/path"; prefix = ""; }]
                // lookup is a string like "nixpkgs" or "nixpkgs/pkgs"
                requireList(searchPath)
                const lookupStr = requireString(lookup).toString()

                for (const entry of searchPath) {
                    requireAttrSet(entry)
                    const prefix = requireString(entry.prefix || "").toString()
                    const path = requireString(entry.path).toString()

                    // Check if lookup starts with this prefix
                    if (prefix) {
                        if (lookupStr === prefix || lookupStr.startsWith(prefix + "/")) {
                            // Remove prefix from lookup and check in path
                            const suffix = lookupStr.slice(prefix.length).replace(/^\//, "")
                            const fullPath = suffix ? FileSystem.join(path, suffix) : path

                            if (FileSystem.sync.info(fullPath).exists) {
                                return new Path([""], [()=>FileSystem.makeAbsolutePath(fullPath)])
                            }
                        }
                    } else {
                        // No prefix, just check directly
                        const fullPath = FileSystem.join(path, lookupStr)
                        if (FileSystem.sync.info(fullPath).exists) {
                            return new Path([""], [()=>FileSystem.makeAbsolutePath(fullPath)])
                        }
                    }
                }

                throw new NixError(`error: file '${lookupStr}' was not found in the Nix search path`)
            },
        
        // nix-y derivation-y stuff
            "nixPath": ()=>{
                // Returns NIX_PATH as a list of attrsets
                const nixPath = Deno.env.get("NIX_PATH") || ""
                if (!nixPath) return []

                return nixPath.split(":").map(entry => {
                    const [prefix, path] = entry.includes("=")
                        ? entry.split("=", 2)
                        : ["", entry]
                    return { prefix, path }
                })
            },
            "storeDir": ()=>"/nix/store",
            "storePath": (path)=>{
                const pathStr = requireString(path).toString()
                const storeDir = "/nix/store"

                // Check if path is in store
                if (!pathStr.startsWith(storeDir + "/")) {
                    throw new NixError(`error: path '${pathStr}' is not in the Nix store`)
                }

                // Validate store path format: /nix/store/<hash>-<name>
                const storePath = pathStr.slice(storeDir.length + 1)
                const parts = storePath.split("/")[0] // Get first component
                if (!parts.match(/^[a-z0-9]{32}-.+$/)) {
                    throw new NixError(`error: path '${pathStr}' is not a valid store path`)
                }

                return pathStr
            },
            "derivation": (attrs)=>{
                // https://nix.dev/manual/nix/2.18/language/derivations.html

                // Validate required attributes
                if (!attrs.name) throw new NixError("derivation requires 'name' attribute")
                if (!attrs.system) throw new NixError("derivation requires 'system' attribute")
                if (!attrs.builder) throw new NixError("derivation requires 'builder' attribute")

                const name = requireString(attrs.name).toString()
                const system = requireString(attrs.system).toString()

                // Builder can be a string or derivation
                let builder
                if (typeof attrs.builder === "string") {
                    builder = attrs.builder
                } else if (attrs.builder?.type === "derivation") {
                    builder = attrs.builder.outPath
                } else {
                    builder = requireString(attrs.builder).toString()
                }

                // Args default to empty list
                const builderArgs = attrs.args ? requireList(attrs.args).map(a => requireString(a).toString()) : []

                // Outputs default to ["out"]
                const outputNames = attrs.outputs ? requireList(attrs.outputs).map(o => requireString(o).toString()) : ["out"]

                // Reserved attributes that don't become env vars
                const reserved = new Set(["name", "system", "builder", "args", "outputs"])

                // Build environment variables from all attributes
                const env = {}
                for (const [key, value] of Object.entries(attrs)) {
                    if (reserved.has(key)) continue

                    // Convert value to environment variable string
                    if (value === null) {
                        env[key] = ""
                    } else if (value === true) {
                        env[key] = "1"
                    } else if (value === false) {
                        env[key] = ""
                    } else if (typeof value === "string") {
                        env[key] = value
                    } else if (typeof value === "number" || typeof value === "bigint") {
                        env[key] = String(value)
                    } else if (Array.isArray(value)) {
                        env[key] = value.map(v => requireString(v).toString()).join(" ")
                    } else if (value?.type === "derivation") {
                        env[key] = value.outPath
                    } else if (value?.constructor?.name === "Path") {
                        // TODO: copy path to store
                        env[key] = value.toString()
                    } else {
                        env[key] = requireString(value).toString()
                    }
                }

                // Add required env vars
                env.name = name
                env.builder = builder
                env.system = system

                // Create derivation structure for serialization (phase 1: empty output paths)
                const drvStructure = {
                    outputs: outputNames.map(o => [o, "", "", ""]),
                    inputDrvs: [],
                    inputSrcs: [],
                    system: system,
                    builder: builder,
                    args: builderArgs,
                    env: { ...env }
                }

                // Serialize to compute paths (with empty output paths in env)
                const drvSerializedForHash = serializeDerivation(drvStructure)
                const storeDir = "/nix/store"

                // Compute output paths based on the serialization
                const outputPaths = {}
                for (const outputName of outputNames) {
                    const outputPath = computeOutputPath(drvSerializedForHash, outputName, name, storeDir)
                    outputPaths[outputName] = outputPath
                    env[outputName] = outputPath
                }

                // Update derivation structure with actual output paths for final .drv
                drvStructure.outputs = outputNames.map(o => [o, outputPaths[o], "", ""])
                drvStructure.env = env

                // Now compute drvPath from the complete serialization (with filled paths!)
                const drvSerializedFinal = serializeDerivation(drvStructure)
                const drvPath = computeDrvPath(drvSerializedFinal, name, storeDir)

                // Build the return value
                const derivation = {
                    type: "derivation",
                    name: name,
                    system: system,
                    builder: builder,
                    args: builderArgs,
                    outputs: outputNames,
                    outputName: outputNames[0], // default output
                    drvPath: drvPath,
                    outPath: outputPaths[outputNames[0]],
                }

                // Add each output as a property
                for (const outputName of outputNames) {
                    derivation[outputName] = outputPaths[outputName]
                }

                // 'all' attribute contains all outputs
                derivation.all = outputNames.map(o => outputPaths[o])

                // 'drvAttrs' contains the attributes that went into the derivation
                derivation.drvAttrs = { ...attrs }

                // Make derivation coerce to string (return outPath)
                derivation.toString = () => derivation.outPath
                derivation[Symbol.toPrimitive] = () => derivation.outPath

                return derivation
            },
            "derivationStrict": (attrs)=>{
                // derivationStrict is identical to derivation in modern Nix
                // The "strict" version was historical - both now strictly evaluate all attributes before building
                return builtins.derivation(attrs)
            },
            "parseDrvName": (s)=>{
                const str = requireString(s).toString()
                const match = str.match(/^(.*?)-([^-]*(?:-[^a-zA-Z].*)?)$/)
                if (match) {
                    return { name: match[1], version: match[2] }
                } else {
                    return { name: str, version: "" }
                }
            },
            "compareVersions": (s1)=>(s2)=>{
                const v1 = builtins.splitVersion(requireString(s1))
                const v2 = builtins.splitVersion(requireString(s2))
                const maxLen = Math.max(v1.length, v2.length)
                for (let i = 0; i < maxLen; i++) {
                    const p1 = v1[i] || ""
                    const p2 = v2[i] || ""
                    const n1 = parseInt(p1)
                    const n2 = parseInt(p2)
                    if (!isNaN(n1) && !isNaN(n2)) {
                        if (n1 < n2) return -1
                        if (n1 > n2) return 1
                    } else {
                        if (p1 < p2) return -1
                        if (p1 > p2) return 1
                    }
                }
                return 0
            },
            "getFlake": (flakeRef)=>{
                throw new NotImplemented(`builtins.getFlake requires flake system with network fetching, lock files, and evaluation`)
            },
            "parseFlakeRef": (flakeRef)=>{
                // Parse flake reference string into structured form
                // Examples:
                //   "nixpkgs" -> { type: "indirect", id: "nixpkgs" }
                //   "github:NixOS/nixpkgs" -> { type: "github", owner: "NixOS", repo: "nixpkgs" }
                //   "path:/path/to/flake" -> { type: "path", path: "/path/to/flake" }
                //   "git+https://..." -> { type: "git", url: "https://..." }

                const ref = requireString(flakeRef).toString()

                // Git URL with explicit git+ prefix
                if (ref.startsWith("git+")) {
                    const url = ref.slice(4)
                    return { type: "git", url }
                }

                // GitHub shorthand: github:owner/repo[/ref]
                if (ref.startsWith("github:")) {
                    const parts = ref.slice(7).split("/")
                    const result = { type: "github", owner: parts[0], repo: parts[1] }
                    if (parts[2]) result.ref = parts[2]
                    return result
                }

                // GitLab shorthand: gitlab:owner/repo[/ref]
                if (ref.startsWith("gitlab:")) {
                    const parts = ref.slice(7).split("/")
                    const result = { type: "gitlab", owner: parts[0], repo: parts[1] }
                    if (parts[2]) result.ref = parts[2]
                    return result
                }

                // Path reference: path:/absolute/path or /absolute/path
                if (ref.startsWith("path:")) {
                    return { type: "path", path: ref.slice(5) }
                }
                if (ref.startsWith("/")) {
                    return { type: "path", path: ref }
                }
                if (ref.startsWith("./") || ref.startsWith("../")) {
                    return { type: "path", path: ref }
                }

                // Tarball URL
                if (ref.startsWith("http://") || ref.startsWith("https://")) {
                    return { type: "tarball", url: ref }
                }

                // Indirect reference (registry lookup)
                return { type: "indirect", id: ref }
            },
            "placeholder": (outputName)=>{
                const name = requireString(outputName).toString()
                // Returns a placeholder string for use in derivation env vars
                // The actual hash is computed during build
                // Format: /1rz4g4znpzjwh1xymhjpm42vipw92pr73vdgl6xs1hycac8kf2n9
                // For now, we generate a deterministic placeholder based on output name
                const hash = sha256Hex(name).slice(0, 32)
                return `/${hash}`
            },
            "outputOf": (derivationReference)=>(outputName)=>{
                // Returns output path of a derivation
                // derivationReference is a string (store path or placeholder)
                // outputName is the output to reference (e.g., "out")
                const drvRef = requireString(derivationReference).toString()
                const output = requireString(outputName).toString()

                // In full Nix with dynamic-derivations, this would:
                // - Parse the derivation reference
                // - Look up the actual derivation
                // - Return the specified output path or placeholder
                // For now, we return a placeholder since we don't have full store support
                const hash = sha256Hex(drvRef + ":" + output).slice(0, 32)
                return `/${hash}`
            },
        
        // context (these are going to be a pain)
            "addErrorContext": (context)=>(value)=>{
                // In full Nix, this adds context to error messages
                // For now, we just return the value (context is lost)
                return value
            },
            "appendContext": (s)=>(context)=>{
                requireString(s)
                requireAttrSet(context)
                // In full Nix, this attaches context metadata to strings
                // For now, just return the string (contexts not tracked)
                return s.toString()
            },
            "getContext": (s)=>{
                requireString(s)
                // In full Nix, returns an attrset describing the string's context
                // For now, return empty set (no context tracking)
                return {}
            },
            "hasContext": (s)=>{
                requireString(s)
                // In full Nix, returns true if string has context
                // For now, always return false (no context tracking)
                return false
            },
            "unsafeDiscardStringContext": (s)=>{
                requireString(s)
                // Remove context from string (for now, just return the string)
                return s.toString()
            },
        
        // complicated to explain functionality
            "filterSource": (filter)=>(path)=>{
                throw new NotImplemented(`builtins.filterSource requires full store implementation with predicate-based file filtering`)
            },
            "flakeRefToString": (attrs)=>{
                // Convert structured flake reference to string
                requireAttrSet(attrs)
                const type = requireString(attrs.type || "indirect").toString()

                switch (type) {
                    case "github":
                        const owner = requireString(attrs.owner).toString()
                        const repo = requireString(attrs.repo).toString()
                        let result = `github:${owner}/${repo}`
                        if (attrs.ref) {
                            result += `/${requireString(attrs.ref).toString()}`
                        }
                        return result

                    case "gitlab":
                        const glOwner = requireString(attrs.owner).toString()
                        const glRepo = requireString(attrs.repo).toString()
                        let glResult = `gitlab:${glOwner}/${glRepo}`
                        if (attrs.ref) {
                            glResult += `/${requireString(attrs.ref).toString()}`
                        }
                        return glResult

                    case "git":
                        const url = requireString(attrs.url).toString()
                        return `git+${url}`

                    case "path":
                        const path = requireString(attrs.path).toString()
                        return `path:${path}`

                    case "tarball":
                        return requireString(attrs.url).toString()

                    case "indirect":
                        return requireString(attrs.id).toString()

                    default:
                        throw new NixError(`error: unknown flake reference type: ${type}`)
                }
            },
            "genericClosure": (attrset)=>{
                requireAttrSet(attrset)

                const startSet = requireList(attrset.startSet)
                const operatorFn = attrset.operator
                if (!builtins.isFunction(operatorFn)) {
                    throw new NixError(`error: 'operator' attribute must be a function`)
                }

                const result = []
                const seen = new Map() // Track by key to avoid duplicates
                const queue = [...startSet]

                while (queue.length > 0) {
                    const item = queue.shift()
                    requireAttrSet(item)

                    if (!item.hasOwnProperty('key')) {
                        throw new NixError(`error: attribute 'key' required in genericClosure item`)
                    }

                    const key = builtins.toString(item.key)

                    if (!seen.has(key)) {
                        seen.set(key, true)
                        result.push(item)

                        const newItems = operatorFn(item)
                        requireList(newItems)
                        queue.push(...newItems)
                    }
                }

                return result
            },
            "unsafeDiscardOutputDependency": (s)=>{
                requireString(s)
                // In full Nix, removes output dependency from string context
                // For now, just return the string (no context tracking)
                return s.toString()
            },
            "unsafeGetAttrPos": (attr)=>(attrset)=>{
                requireString(attr)
                requireAttrSet(attrset)
                // In full Nix, returns source position of attribute
                // Would require AST tracking during evaluation
                // Return null (position unknown)
                return null
            },
    }
    builtins.builtins = builtins
    Object.freeze(builtins)

    export const operators = {
        ifThenElse: (condition, thenFn, elseFn)=>{
            // Nix requires strict boolean values in if conditions
            if (typeof condition !== "boolean") {
                throw new NixError(`error: expected a Boolean but found ${builtins.typeOf(condition)}: ${nixRepr(condition)}`)
            }
            return condition ? thenFn() : elseFn()
        },
        negative: (value)=>typeof value == "bigint"?-value:-toFloat(value),
        listConcat: (value, other)=>{
            requireList(value)
            requireList(other)
            return value.concat(other)
        },
        add: (value, other)=>{
            const vType = builtins.typeOf(value)
            const oType = builtins.typeOf(other)

            if ((vType === "int" || vType === "float") && (oType === "int" || oType === "float")) {
                if (typeof value == "bigint" && typeof other == "bigint") {
                    return value + other
                } else {
                    return toFloat(value) + toFloat(other)
                }
            } else if (vType === "string" && oType === "string") {
                return value.toString() + other.toString()
            } else if (vType === "path" && oType === "path") {
                return new Path([""], [()=>value.toString() + other.toString()])
            } else if (vType === "path" && oType === "string") {
                return new Path([""], [()=>value.toString() + other.toString()])
            } else if (vType === "string" && oType === "path") {
                return value.toString() + other.toString()
            } else {
                throw new NixError(`error: cannot add ${vType} to ${oType}`)
            }
        },
        subtract: (value, other)=>{
            if (typeof value == "bigint" && typeof other == "bigint") {
                return value - other
            } else {
                return toFloat(value) - toFloat(other)
            }
        },
        divide: (value, other)=>{
            if (typeof value == "bigint" && typeof other == "bigint") {
                return value/other
            } else {
                return toFloat(value)/toFloat(other)
            }
        },
        multiply: (value, other)=>{
            if (typeof value == "bigint" && typeof other == "bigint") {
                return value*other
            } else {
                return toFloat(value)*toFloat(other)
            }
        },
        negate: (value)=>!value,
        merge: (value, other)=>{
            requireAttrSet(value)
            requireAttrSet(other)
            return {...value, ...other}
        },
        equal: (value, other)=>{
            if (value === other) return true
            if (typeof value !== typeof other) return false
            if (value instanceof Array && other instanceof Array) {
                if (value.length !== other.length) return false
                for (let i = 0; i < value.length; i++) {
                    if (!operators.equal(value[i], other[i])) return false
                }
                return true
            }
            if (builtins.isAttrs(value) && builtins.isAttrs(other)) {
                const keys1 = Object.keys(value).sort()
                const keys2 = Object.keys(other).sort()
                if (keys1.length !== keys2.length) return false
                for (let i = 0; i < keys1.length; i++) {
                    if (keys1[i] !== keys2[i]) return false
                    if (!operators.equal(value[keys1[i]], other[keys2[i]])) return false
                }
                return true
            }
            return false
        },
        notEqual: (value, other)=>!operators.equal(value, other),
        greaterThan: (value, other)=>value>other,
        greaterThanOrEqual: (value, other)=>value>=other,
        lessThan: (value, other)=>value<other,
        lessThanOrEqual: (value, other)=>value<=other,
        and: (value, other)=>value&&other,
        or: (value, other)=>value||other,
        implication: (value, other)=>!value||other,
        hasAttr: (attrset, attr)=>{
            requireAttrSet(attrset)
            requireString(attr)
            return attrset.hasOwnProperty(attr.toString())
        },
        hasAttrPath: (attrset, ...attrPath)=>{
            // Check if a nested attribute path exists
            // e.g., hasAttrPath({a: {b: {c: 1}}}, "a", "b", "c") => true
            let current = attrset
            for (const attr of attrPath) {
                if (typeof current !== "object" || current === null || Array.isArray(current)) {
                    return false
                }
                const attrStr = requireString(attr).toString()
                if (!current.hasOwnProperty(attrStr)) {
                    return false
                }
                current = current[attrStr]
            }
            return true
        },
        selectOrDefault: (attrset, attrPath, defaultValue)=>{
            // Select a nested attribute with a default value if it doesn't exist
            // e.g., selectOrDefault({a: {b: 1}}, ["a", "b"], "default") => 1
            // e.g., selectOrDefault({a: {}}, ["a", "b"], "default") => "default"
            let current = attrset
            for (const attr of attrPath) {
                if (typeof current !== "object" || current === null || Array.isArray(current)) {
                    return defaultValue
                }
                const attrStr = requireString(attr).toString()
                if (!current.hasOwnProperty(attrStr)) {
                    return defaultValue
                }
                current = current[attrStr]
            }
            return current
        },
    }
    
    export const createRuntime = ()=>{
        // Create import cache for this runtime instance
        const importCache = new ImportCache()

        // Create runtime object that will be passed to builtins
        const runtime = {
            builtins,
            operators,
            InterpolatedString,
            Path,
            importCache,
            currentFile: null, // Track current file for relative imports
        }

        // Initialize import functions with runtime context
        globalImportState.importFn = (path) => {
            // Convert Path object to string if needed
            const pathStr = path instanceof Path ? path.toString() : requireString(path).toString()

            // Resolve path relative to current file
            const absPath = runtime.currentFile
                ? resolveImportPath(runtime.currentFile, pathStr)
                : FileSystem.makeAbsolutePath(pathStr)

            // Check cache first
            if (importCache.has(absPath)) {
                return importCache.get(absPath)
            }

            // Track import stack for circular detection
            importCache.pushStack(absPath)

            try {
                // Save current file context
                const prevFile = runtime.currentFile
                runtime.currentFile = absPath

                // Load and evaluate the file
                const result = loadAndEvaluateSync(absPath, runtime)

                // Cache result
                importCache.set(absPath, result)

                // Restore previous file context
                runtime.currentFile = prevFile

                return result
            } finally {
                importCache.popStack()
            }
        }

        globalImportState.scopedImportFn = (scope) => (path) => {
            // scopedImport is like import but with a custom scope
            // This allows overriding builtins and other values
            requireAttrSet(scope)

            // Convert Path object to string if needed
            const pathStr = path instanceof Path ? path.toString() : requireString(path).toString()

            // Resolve path relative to current file
            const absPath = runtime.currentFile
                ? resolveImportPath(runtime.currentFile, pathStr)
                : FileSystem.makeAbsolutePath(pathStr)

            // Note: scopedImport does NOT use cache (Nix behavior)
            // Each call evaluates fresh with the new scope

            // Track import stack for circular detection
            importCache.pushStack(absPath)

            try {
                // Save current file context
                const prevFile = runtime.currentFile
                runtime.currentFile = absPath

                // Create a modified runtime with custom scope
                const scopedRuntime = {
                    ...runtime,
                    builtins: {
                        ...runtime.builtins,
                        ...scope, // Override with custom scope
                    },
                }

                // Load and evaluate the file with scoped runtime
                const result = loadAndEvaluateSync(absPath, scopedRuntime)

                // Restore previous file context
                runtime.currentFile = prevFile

                return result
            } finally {
                importCache.popStack()
            }
        }

        const rootScope = {
            builtins,
            true: builtins.true,
            false: builtins.false,
            null: builtins.null,

            // https://nixos.org/manual/nix/stable/language/builtins.html
            derivation: builtins.derivation,
            import: builtins.import,
            abort: builtins.abort,
            throw: builtins.throw,
        }
        return {
            scopeStack: [rootScope],
            rootScope: rootScope,
            runtime, // Expose runtime for use by import system
            importCache,
        }
    }