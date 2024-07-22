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
import { toFloat } from "./tools/generic.js"
import { sha256Hex, md5Hex, sha1Hex, sha512Hex } from "./tools/hashing.js"
import { jsonParseWithBigInt } from "./tools/json_parse.js"
import { lazyMap } from "./tools/lazy_array.js"

import { prexRawMatch } from "https://deno.land/x/prex@0.0.0.1/main.js"

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
    export class NixError extends Error {}
    export class NotImplemented extends Error {}

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
        // FIXME: should use single quotes instead of double, and probably some other things
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
            "toXML": ()=>{/*FIXME*/},
        
        // 
        // value generators
        // 
            "fromJSON": jsonParseWithBigInt, // can't be JSON.parse because plain int values need to become BigInts
            "fromTOML": ()=>{
                // needs to parse plain ints (no scientific or decimal) to BigInts
                /*FIXME*/
                throw new NotImplemented(`Sorry :( I don't support fromTOML yet'`)
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
                // (builtins.split "(a)b" "abc")             == [ "" [ "a" ] "c" ]
                // (builtins.split "([ac])" "abc")           == [ "" [ "a" ] "b" [ "c" ] "" ]
                // (builtins.split "(a)|(c)" "abc")          == [ "" [ "a" null ] "b" [ null "c" ] "" ]
                // (builtins.split "([[:upper:]]+)" " FOO ") == [ " " [ "FOO" ] " " ]
                
                // FIXME
                throw new NotImplemented(`Sorry :( I don't support builtins.split yet'`)
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
            "sort": ()=>{/*FIXME*/},
            "groupBy": ()=>{/*FIXME*/},
        
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
            "attrNames": (value)=>Object.getOwnPropertyNames(value).sorted(), // FIXME make sure JS's alphabetical sort is the same as nix's alphabetical sort
            "attrValues": (value)=>builtins.attrNames(value).map(each=>value[each]),
            "catAttrs": (attr)=>(list)=>{
                requireString(attr)
                for (const each of requireList(list)) {
                    const propertyNames = Object.getOwnPropertyNames(requireAttrSet(each))
                    propertyNames.includes(attr)
                }
            },
            "concatMap": ()=>{/*FIXME*/},
            "zipAttrsWith": ()=>{/*FIXME*/},
            "intersectAttrs": ()=>{/*FIXME*/},
            "listToAttrs": ()=>{/*FIXME*/},
            "mapAttrs": ()=>{/*FIXME*/},
            "removeAttrs": ()=>{/*FIXME*/},
        
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
            "trace": ()=>{/*FIXME*/},
            "traceVerbose": ()=>{/*FIXME*/},
            "tryEval": ()=>{/*FIXME*/},
            "seq": ()=>{/*FIXME*/},
            "deepSeq": ()=>{/*FIXME*/},
            "abort": (value)=>{ throw new NixError(`error: evaluation aborted with the following error message: ${nixRepr(value)}`) },
            "throw": ()=>{/*FIXME*/},
        
        // file system
            "getEnv": (string)=>Deno.env.get(requireString(string)),
            "readFile": (value)=>Deno.readTextFileSync(value.toString()),
            "baseNameOf": (value)=>FileSystem.basename(value), // FIXME: look up behavior on derivation inputs, and add type checking
            "dirOf": (value)=>FileSystem.dirname(value), // FIXME: look up behavior on derivation inputs, and add type checking
            "pathExists": (path)=>FileSystem.sync.info(path).exists,
            "toFile": ()=>{/*FIXME*/},
            "readFileType": ()=>{/*FIXME*/},
            "path": ()=>{/*FIXME*/},
                // kinda complicated:
                // https://nix-community.github.io/docnix/reference/builtins/builtins-path/
            
            "readDir": ()=>{/*FIXME*/},
                // NOTE: fails with input of "./." (not absolute path) works with input of ./. (path literal)
                // output { ".git" = "directory"; "main.js" = "regular"; scratch_work = "directory"; tests = "directory"; tools = "directory"; }
            
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
            "parseDrvName": ()=>{/*FIXME*/},
            "compareVersions": ()=>{/*FIXME*/},
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
        negative: (value)=>{/*FIXME*/},                     // -a
        listConcat: (value)=>{/*FIXME*/},                   // a ++ b
        add: (value, other)=>{},                            // a + b
            // number + number : Addition
            // string + string : String concatenation
            // path + path     : Path concatenation
            // path + string   : Path and string concatenation
            // string + path   : String and path concatenation
        subtract: (value, other)=>{},                       // a - b
        divide: (value)=>{/*FIXME*/},                       // a / b
        multiply: (value)=>{/*FIXME*/},                     // *a
        negate: (value)=>{/*FIXME*/},                       // !a
        merge: (value)=>{/*FIXME*/},                        // a // b
        equal: (value, other)=>{                            // a == b
            // NOTE: [] == [] is true in nix
            /*FIXME*/
        },
        notEqual: (value)=>{/*FIXME*/},                     // a != b
        greaterThan: (value, other)=>{/*FIXME*/},           // a > b
        greaterThanOrEqual: (value, other)=>{/*FIXME*/},    // a >= b
        lessThan: (value, other)=>{/*FIXME*/},              // a < b
        lessThanOrEqual: (value, other)=>{/*FIXME*/},       // a <= b
        and: (value)=>{/*FIXME*/},                          // a && b
        or: (value)=>{/*FIXME*/},                           // a || b
        implication: (value)=>{/*FIXME*/},                  // a -> b
        hasAttr: (value)=>{/*FIXME*/},                      // a ? b
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