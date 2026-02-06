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
import { prexRawMatch } from "https://deno.land/x/prex@0.0.0.1/main.js"
import { parse as tomlParse } from "https://deno.land/std@0.224.0/toml/mod.ts"

// core stuff
import { NixError, NotImplemented } from "./errors.js"

// hard parts right now:
    // builtins.fetchGit
    // builtins.sort
    // operators.equality
    // builtins.fromTOML
    // builtins.fetchMercurial
    // create the value-to-env-var function for derivations

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
                    each=>requireString(each),each.toString()
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
                const output = prexRawMatch(regex.toString(), str.toString())
                if (output.length==0){
                    return null
                } else {
                    return output.slice(1,)
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
                if (typeof s == 'string') {
                    return s.slice(start,start+len)
                } else if (s instanceof InterpolatedString) {
                    // be lazy for InterpolatedStrings
                    return new InterpolatedString([""], [()=>s.toString().slice(start,start+len)])
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
            "fetchurl": (url)=>{/*FIXME*/}, // not available in restricted mode
            "fetchTarball": ()=>{/*FIXME*/},
            "fetchGit": ()=>{/*FIXME*/}, // TODO: use git binary from ahgamut/superconfigure
            "fetchMercurial": ()=>{/*FIXME*/},
            "fetchTree": ()=>{/*FIXME*/}, // experimental

        // misc
            "import": ()=>{/*FIXME*/},
            "scopedImport": ()=>{/*FIXME*/},
            "functionArgs": ()=>{/*FIXME*/},
        
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
            "toFile": ()=>{/*FIXME*/},
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
            "path": ()=>{/*FIXME*/},
                // kinda complicated:
                // https://nix-community.github.io/docnix/reference/builtins/builtins-path/
            
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
            
            "findFile": (list)=>(string)=>{/*FIXME*/},
                // https://nix-community.github.io/docnix/reference/builtins/builtins-findfile/
                // list[0] == { path = "/Users/jeffhykin/.nix-defexpr/channels"; prefix = ""; }
        
        // nix-y derivation-y stuff
            "nixPath": ()=>{/*FIXME*/},
            "storeDir": ()=>{/*FIXME*/},
            "storePath": ()=>{/*FIXME*/},
            "derivation": ({name, system, builder, args, outputs, meta})=>{
                // https://nix.dev/manual/nix/2.18/language/derivations.html

                // name: must be a string
                // builder: a derivation or local file path
                // args: optional list of strings (command-line arguments for the builder)
                // outputs: an optional list of strings, default ["out"]
                    // each of these becomes an environment variable containing a temp path to a folder
                
                // let returnValue = {
                //     all         
                //     drvAttrs    
                //     name        
                //     outPath     
                //     system
                //     builder     
                //     drvPath     
                //     out         
                //     outputName  
                //     type
                // }
                
                // Every attribute is passed as an environment variable to the builder.
                    // Strings and numbers are just passed verbatim.
                    // true becomes "1"
                    // false and null become ""
                    // A path (e.g., ../foo/sources.tar) causes the referenced file to be copied to the store; its location in the store is put in the environment variable. The idea is that all sources should reside in the Nix store, since all inputs to a derivation should reside in the Nix store.
                    // A derivation, 1. gets built 2. its output path becomes the environment variable
                    // lists are concatenated with spaces
                // args: a list of strings
                    // Each string is a command-line argument to the builder.

                // https://nixos.org/manual/nix/stable/language/derivations.html
                // FIXME
                // {
                //     "/nix/store/z3hhlxbckx4g3n9sw91nnvlkjvyw754p-myname.drv": {
                //         outputs: {
                //             out: {
                //                 path: "/nix/store/40s0qmrfb45vlh6610rk29ym318dswdr-myname",
                //             },
                //         },
                //         inputSrcs: [],
                //         inputDrvs: {},
                //         platform: "mysystem",
                //         builder: "mybuilder",
                //         args: [],
                //         env: {
                //             builder: "mybuilder",
                //             name: "myname",
                //             out: "/nix/store/40s0qmrfb45vlh6610rk29ym318dswdr-myname",
                //             system,
                //         },
                //     },
                // }
            },
            "derivationStrict": ()=>{/*FIXME*/},
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
            "getFlake": ()=>{/*FIXME*/},
            "parseFlakeRef": ()=>{/*FIXME*/},
            "placeholder": ()=>{/*FIXME*/},
        
        // context (these are going to be a pain)
            "addErrorContext": ()=>{/*FIXME*/},
            "appendContext": ()=>{/*FIXME*/},
            "getContext": ()=>{/*FIXME*/},
            "hasContext": ()=>{/*FIXME*/},
            "unsafeDiscardStringContext": ()=>{/*FIXME*/},
        
        // complicated to explain functionality 
            "filterSource": ()=>{/*FIXME*/},
            "flakeRefToString": ()=>{/*FIXME*/},
            "genericClosure": ()=>{/*FIXME*/},
            "unsafeDiscardOutputDependency": ()=>{/*FIXME*/},
            "unsafeGetAttrPos": ()=>{/*FIXME*/},
    }
    builtins.builtins = builtins
    Object.freeze(builtins)

    export const operators = {
        negative: (value)=>typeof value == "bigint"?-value:-toFloat(value),
        listConcat: (value, other)=>{
            requireList(value)
            requireList(other)
            return value.concat(other)
        },
        add: (value, other)=>{},                            // a + b
            // number + number : Addition
            // string + string : String concatenation
            // path + path     : Path concatenation
            // path + string   : Path and string concatenation
            // string + path   : String and path concatenation
        subtract: (value, other)=>{},                       // a - b
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
    }
    
    export const createRuntime = ()=>{
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
        }
    }