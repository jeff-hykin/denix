import { createRuntime, createFunc } from "../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default /**
  Functions that generate widespread file
  formats from nix data structures.

  They all follow a similar interface:

  ```nix
  generator { config-attrs } data
  ```

  `config-attrs` are “holes” in the generators
  with sensible default implementations that
  can be overwritten. The default implementations
  are mostly generators themselves, called with
  their respective default values; they can be reused.

  Tests can be found in ./tests/misc.nix

  Further Documentation can be found [here](#sec-generators).
*/

// args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["addErrorContext"] = nixScope["lib"]["addErrorContext"];
            nixScope["assertMsg"] = nixScope["lib"]["assertMsg"];
            nixScope["attrNames"] = nixScope["lib"]["attrNames"];
            nixScope["concatLists"] = nixScope["lib"]["concatLists"];
            nixScope["concatMapStringsSep"] = nixScope["lib"]["concatMapStringsSep"];
            nixScope["concatStrings"] = nixScope["lib"]["concatStrings"];
            nixScope["concatStringsSep"] = nixScope["lib"]["concatStringsSep"];
            nixScope["const"] = nixScope["lib"]["const"];
            nixScope["elem"] = nixScope["lib"]["elem"];
            nixScope["escape"] = nixScope["lib"]["escape"];
            nixScope["filter"] = nixScope["lib"]["filter"];
            nixScope["flatten"] = nixScope["lib"]["flatten"];
            nixScope["foldl"] = nixScope["lib"]["foldl"];
            nixScope["functionArgs"] = nixScope["lib"]["functionArgs"];
            nixScope["gvariant"] = nixScope["lib"]["gvariant"];
            nixScope["hasInfix"] = nixScope["lib"]["hasInfix"];
            nixScope["head"] = nixScope["lib"]["head"];
            nixScope["id"] = nixScope["lib"]["id"];
            nixScope["init"] = nixScope["lib"]["init"];
            nixScope["isAttrs"] = nixScope["lib"]["isAttrs"];
            nixScope["isBool"] = nixScope["lib"]["isBool"];
            nixScope["isDerivation"] = nixScope["lib"]["isDerivation"];
            nixScope["isFloat"] = nixScope["lib"]["isFloat"];
            nixScope["isFunction"] = nixScope["lib"]["isFunction"];
            nixScope["isInt"] = nixScope["lib"]["isInt"];
            nixScope["isList"] = nixScope["lib"]["isList"];
            nixScope["isPath"] = nixScope["lib"]["isPath"];
            nixScope["isString"] = nixScope["lib"]["isString"];
            nixScope["last"] = nixScope["lib"]["last"];
            nixScope["length"] = nixScope["lib"]["length"];
            nixScope["mapAttrs"] = nixScope["lib"]["mapAttrs"];
            nixScope["mapAttrsToList"] = nixScope["lib"]["mapAttrsToList"];
            nixScope["optionals"] = nixScope["lib"]["optionals"];
            nixScope["recursiveUpdate"] = nixScope["lib"]["recursiveUpdate"];
            nixScope["replaceStrings"] = nixScope["lib"]["replaceStrings"];
            nixScope["reverseList"] = nixScope["lib"]["reverseList"];
            nixScope["splitString"] = nixScope["lib"]["splitString"];
            nixScope["tail"] = nixScope["lib"]["tail"];
            nixScope["toList"] = nixScope["lib"]["toList"];
            nixScope["escapeNixIdentifier"] = nixScope["lib"]["strings"]["escapeNixIdentifier"];
            nixScope["floatToString"] = nixScope["lib"]["strings"]["floatToString"];
            nixScope["match"] = nixScope["lib"]["strings"]["match"];
            nixScope["split"] = nixScope["lib"]["strings"]["split"];
            nixScope["toJSON"] = nixScope["lib"]["strings"]["toJSON"];
            nixScope["typeOf"] = nixScope["lib"]["strings"]["typeOf"];
            nixScope["escapeXML"] = nixScope["lib"]["strings"]["escapeXML"];
            return operators.merge((function(){
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "mkValueStringDefault", {enumerable: true, get(){return 
    
    // args: {
    
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "err", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["t"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["abort"]((operators.add("generators.mkValueStringDefault: ", (new InterpolatedString(["", " not supported: ", ""], [()=>(nixScope["t"]), ()=>(nixScope["toPretty"]({})(nixScope["v"]))]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                return (operators.ifThenElse(nixScope["isInt"](nixScope["v"]), ()=>(nixScope["toString"](nixScope["v"])), ()=>((operators.ifThenElse(nixScope["isDerivation"](nixScope["v"]), ()=>(nixScope["toString"](nixScope["v"])), ()=>((operators.ifThenElse(nixScope["isString"](nixScope["v"]), ()=>(nixScope["v"]), ()=>((operators.ifThenElse(operators.equal(true, nixScope["v"]), ()=>("true"), ()=>((operators.ifThenElse(operators.equal(false, nixScope["v"]), ()=>("false"), ()=>((operators.ifThenElse(operators.equal(null, nixScope["v"]), ()=>("null"), ()=>((operators.ifThenElse(nixScope["isList"](nixScope["v"]), ()=>(nixScope["err"]("lists")(nixScope["v"])), ()=>((operators.ifThenElse(nixScope["isAttrs"](nixScope["v"]), ()=>(nixScope["err"]("attrsets")(nixScope["v"])), ()=>((operators.ifThenElse(nixScope["isFunction"](nixScope["v"]), ()=>(nixScope["err"]("functions")(nixScope["v"])), ()=>((operators.ifThenElse(nixScope["isFloat"](nixScope["v"]), ()=>(nixScope["floatToString"](nixScope["v"])), ()=>(nixScope["err"]("this value is")((nixScope["toString"](nixScope["v"])))))))))))))))))))))))))))))))));
            } finally {
                runtime.scopeStack.pop();
            }
        })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])
                ));}});
            Object.defineProperty(nixScope, "mkKeyValueDefault", {enumerable: true, get(){return 
    
    // args: {
    //    mkValueString,
    //}
    createFunc({"mkValueString": (nixScope)=>(nixScope["mkValueStringDefault"]({})),}, null, {}, (nixScope)=>(
                    (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["sep"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["k"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["", "", "", ""], [()=>(nixScope["escape"]([nixScope["sep"]])(nixScope["k"])), ()=>(nixScope["sep"]), ()=>(nixScope["mkValueString"](nixScope["v"]))])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])
                ));}});
            Object.defineProperty(nixScope, "toKeyValue", {enumerable: true, get(){return 
    
    // args: {
    //    mkKeyValue,
    //    listsAsDuplicateKeys,
    //    indent,
    //    ,
    //}
    createFunc({"mkKeyValue": (nixScope)=>(nixScope["mkKeyValueDefault"]({})("=")),"listsAsDuplicateKeys": (nixScope)=>(false),"indent": (nixScope)=>(""),}, null, {}, (nixScope)=>(
                    (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "mkLine", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["k"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(operators.add(nixScope["indent"], nixScope["mkKeyValue"](nixScope["k"])(nixScope["v"])), ""); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                Object.defineProperty(nixScope, "mkLines", {enumerable: true, get(){return (operators.ifThenElse(nixScope["listsAsDuplicateKeys"], ()=>((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["k"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["map"]((nixScope["mkLine"](nixScope["k"])))(((operators.ifThenElse(nixScope["isList"](nixScope["v"]), ()=>(nixScope["v"]), ()=>([nixScope["v"]]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])), ()=>((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["k"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return [(nixScope["mkLine"](nixScope["k"])(nixScope["v"]))]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))));}});
                return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["attrs"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["concatStrings"]((nixScope["concatLists"]((nixScope["mapAttrsToList"](nixScope["mkLines"])(nixScope["attrs"]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            } finally {
                runtime.scopeStack.pop();
            }
        })()
                ));}});
            Object.defineProperty(nixScope, "toINI", {enumerable: true, get(){return 
    
    // args: {
    //    mkSectionName,
    //    mkKeyValue,
    //    listsAsDuplicateKeys,
    //    ,
    //}
    createFunc({"mkSectionName": (nixScope)=>(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["escape"](["[","]"])(nixScope["name"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))),"mkKeyValue": (nixScope)=>(nixScope["mkKeyValueDefault"]({})("=")),"listsAsDuplicateKeys": (nixScope)=>(false),}, null, {}, (nixScope)=>(
                    (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["attrsOfAttrs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "mapAttrsToStringsSep", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["sep"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["mapFn"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["attrs"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["concatStringsSep"](nixScope["sep"])((nixScope["mapAttrsToList"](nixScope["mapFn"])(nixScope["attrs"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                Object.defineProperty(nixScope, "mkSection", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["sectName"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["sectValues"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add((new InterpolatedString(["\n          [", "]\n        "], [()=>(nixScope["mkSectionName"](nixScope["sectName"]))])), nixScope["toKeyValue"](({"mkKeyValue": nixScope["mkKeyValue"], "listsAsDuplicateKeys": nixScope["listsAsDuplicateKeys"]}))(nixScope["sectValues"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                return nixScope["mapAttrsToStringsSep"]("")(nixScope["mkSection"])(nixScope["attrsOfAttrs"]);
            } finally {
                runtime.scopeStack.pop();
            }
        })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])
                ));}});
            Object.defineProperty(nixScope, "toINIWithGlobalSection", {enumerable: true, get(){return 
    
    // args: {
    //    mkSectionName,
    //    mkKeyValue,
    //    listsAsDuplicateKeys,
    //    ,
    //}
    createFunc({"mkSectionName": (nixScope)=>(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["escape"](["[","]"])(nixScope["name"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))),"mkKeyValue": (nixScope)=>(nixScope["mkKeyValueDefault"]({})("=")),"listsAsDuplicateKeys": (nixScope)=>(false),}, null, {}, (nixScope)=>(
                    
        
        // args: {
        //    globalSection,
        //    sections,
        //    ,
        //}
        createFunc({"sections": (nixScope)=>({}),}, null, {}, (nixScope)=>(
                        operators.add(((operators.ifThenElse(operators.equal(nixScope["globalSection"], {}), ()=>(""), ()=>(operators.add((nixScope["toKeyValue"](({"mkKeyValue": nixScope["mkKeyValue"], "listsAsDuplicateKeys": nixScope["listsAsDuplicateKeys"]}))(nixScope["globalSection"])), ""))))), (nixScope["toINI"](({"mkSectionName": nixScope["mkSectionName"], "mkKeyValue": nixScope["mkKeyValue"], "listsAsDuplicateKeys": nixScope["listsAsDuplicateKeys"]}))(nixScope["sections"])))
                    ))
                ));}});
            Object.defineProperty(nixScope, "toGitINI", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["attrs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "mkSectionName", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "containsQuote", {enumerable: true, get(){return nixScope["hasInfix"](`"`)(nixScope["name"]);}});
            Object.defineProperty(nixScope, "sections", {enumerable: true, get(){return nixScope["splitString"](".")(nixScope["name"]);}});
            Object.defineProperty(nixScope, "section", {enumerable: true, get(){return nixScope["head"](nixScope["sections"]);}});
            Object.defineProperty(nixScope, "subsections", {enumerable: true, get(){return nixScope["tail"](nixScope["sections"]);}});
            Object.defineProperty(nixScope, "subsection", {enumerable: true, get(){return nixScope["concatStringsSep"](".")(nixScope["subsections"]);}});
            return (operators.ifThenElse(operators.or(nixScope["containsQuote"], operators.equal(nixScope["subsections"], [])), ()=>(nixScope["name"]), ()=>((new InterpolatedString(["", " \"", "\""], [()=>(nixScope["section"]), ()=>(nixScope["subsection"])])))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mkValueString", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "escapedV", {enumerable: true, get(){return (new InterpolatedString(["\"", "\""], [()=>(nixScope["replaceStrings"](["","	",`"`,""])(["n","t",`\\"`,""])(nixScope["v"]))]));}});
            return nixScope["mkValueStringDefault"]({})(((operators.ifThenElse(nixScope["isString"](nixScope["v"]), ()=>(nixScope["escapedV"]), ()=>(nixScope["v"])))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mkKeyValue", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["k"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "mkKeyValue", {enumerable: true, get(){return nixScope["mkKeyValueDefault"](({"mkValueString": nixScope["mkValueString"]}))(" = ")(nixScope["k"]);}});
            return nixScope["concatStringsSep"]("")((nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["kv"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add("", nixScope["mkKeyValue"](nixScope["kv"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["toList"](nixScope["v"])))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "gitFlattenAttrs", {enumerable: true, get(){return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "recurse", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.and(nixScope["isAttrs"](nixScope["value"]), operators.negate(nixScope["isDerivation"](nixScope["value"]))), ()=>(nixScope["mapAttrsToList"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["recurse"]((operators.listConcat([nixScope["name"]], nixScope["path"])))(nixScope["value"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["value"])), ()=>((operators.ifThenElse(operators.greaterThan(nixScope["length"](nixScope["path"]), 1n), ()=>((function(){
        const obj = {};
        if (obj[nixScope["concatStringsSep"](".")((nixScope["reverseList"]((nixScope["tail"](nixScope["path"])))))] === undefined) obj[nixScope["concatStringsSep"](".")((nixScope["reverseList"]((nixScope["tail"](nixScope["path"])))))] = {};
        obj[nixScope["concatStringsSep"](".")((nixScope["reverseList"]((nixScope["tail"](nixScope["path"])))))][nixScope["head"](nixScope["path"])] = nixScope["value"];
        return obj;
    })()), ()=>((function(){
        const obj = {};
        obj[nixScope["head"](nixScope["path"])] = nixScope["value"];
        return obj;
    })())))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["attrs"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["foldl"](nixScope["recursiveUpdate"])({})((nixScope["flatten"]((nixScope["recurse"]([])(nixScope["attrs"]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        } finally {
            runtime.scopeStack.pop();
        }
    })();}});
            Object.defineProperty(nixScope, "toINI_", {enumerable: true, get(){return nixScope["toINI"](({"mkKeyValue": nixScope["mkKeyValue"], "mkSectionName": nixScope["mkSectionName"]}));}});
            return nixScope["toINI_"]((nixScope["gitFlattenAttrs"](nixScope["attrs"])));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mkDconfKeyValue", {enumerable: true, get(){return nixScope["mkKeyValueDefault"](({"mkValueString": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["toString"]((nixScope["gvariant"]["mkValue"](nixScope["v"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}))("=");}});
            Object.defineProperty(nixScope, "toDconfINI", {enumerable: true, get(){return nixScope["toINI"](({"mkKeyValue": nixScope["mkDconfKeyValue"]}));}});
            Object.defineProperty(nixScope, "withRecursion", {enumerable: true, get(){return 
    
    // args: {
    //    depthLimit,
    //    throwOnDepthLimit,
    //    ,
    //}
    createFunc({"throwOnDepthLimit": (nixScope)=>(true),}, null, {}, (nixScope)=>(
                    ((_cond)=>{
            if (!_cond) {
                throw new Error("assertion failed: " + "isInt depthLimit");
            }
            return (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                nixScope["specialAttrs"] = ["__functor","__functionArgs","__toString","__pretty"];
                Object.defineProperty(nixScope, "stepIntoAttr", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["evalNext"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["elem"](nixScope["name"])(nixScope["specialAttrs"]), ()=>(nixScope["id"]), ()=>(nixScope["evalNext"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                Object.defineProperty(nixScope, "transform", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["depth"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.and(operators.notEqual(nixScope["depthLimit"], null), operators.greaterThan(nixScope["depth"], nixScope["depthLimit"])), ()=>((operators.ifThenElse(nixScope["throwOnDepthLimit"], ()=>(nixScope["throw"]((new InterpolatedString(["Exceeded maximum eval-depth limit of ", " while trying to evaluate with `generators.withRecursion'!"], [()=>(nixScope["toString"](nixScope["depthLimit"]))])))), ()=>(nixScope["const"]("<unevaluated>"))))), ()=>(nixScope["id"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                Object.defineProperty(nixScope, "mapAny", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["depth"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "evalNext", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mapAny"]((operators.add(nixScope["depth"], 1n)))((nixScope["transform"]((operators.add(nixScope["depth"], 1n)))(nixScope["x"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                return (operators.ifThenElse(nixScope["isAttrs"](nixScope["v"]), ()=>(nixScope["mapAttrs"]((nixScope["stepIntoAttr"](nixScope["evalNext"])))(nixScope["v"])), ()=>((operators.ifThenElse(nixScope["isList"](nixScope["v"]), ()=>(nixScope["map"](nixScope["evalNext"])(nixScope["v"])), ()=>(nixScope["transform"]((operators.add(nixScope["depth"], 1n)))(nixScope["v"])))))));
            } finally {
                runtime.scopeStack.pop();
            }
        })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                return nixScope["mapAny"](0n);
            } finally {
                runtime.scopeStack.pop();
            }
        })();
        })(nixScope["isInt"](nixScope["depthLimit"]))
                ));}});
            Object.defineProperty(nixScope, "toPretty", {enumerable: true, get(){return 
    
    // args: {
    //    allowPrettyValues,
    //    multiline,
    //    indent,
    //    ,
    //}
    createFunc({"allowPrettyValues": (nixScope)=>(false),"multiline": (nixScope)=>(true),"indent": (nixScope)=>(""),}, null, {}, (nixScope)=>(
                    (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "go", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["indent"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "introSpace", {enumerable: true, get(){return (operators.ifThenElse(nixScope["multiline"], ()=>((new InterpolatedString(["", "  "], [()=>(nixScope["indent"])]))), ()=>(" ")));}});
                Object.defineProperty(nixScope, "outroSpace", {enumerable: true, get(){return (operators.ifThenElse(nixScope["multiline"], ()=>((new InterpolatedString(["", ""], [()=>(nixScope["indent"])]))), ()=>(" ")));}});
                return (operators.ifThenElse(nixScope["isInt"](nixScope["v"]), ()=>(nixScope["toString"](nixScope["v"])), ()=>((operators.ifThenElse(nixScope["isFloat"](nixScope["v"]), ()=>(nixScope["builtins"]["toJSON"](nixScope["v"])), ()=>((operators.ifThenElse(nixScope["isString"](nixScope["v"]), ()=>((function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "lines", {enumerable: true, get(){return nixScope["filter"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return operators.negate(nixScope["isList"](nixScope["v"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["split"]("")(nixScope["v"])));}});
                Object.defineProperty(nixScope, "escapeSingleline", {enumerable: true, get(){return nixScope["escape"](["","","$"]);}});
                Object.defineProperty(nixScope, "escapeMultiline", {enumerable: true, get(){return nixScope["replaceStrings"](["$","''"])(["''","'''"]);}});
                Object.defineProperty(nixScope, "singlelineResult", {enumerable: true, get(){return operators.add(operators.add("", nixScope["concatStringsSep"]("n")((nixScope["map"](nixScope["escapeSingleline"])(nixScope["lines"])))), "");}});
                Object.defineProperty(nixScope, "multilineResult", {enumerable: true, get(){return (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "escapedLines", {enumerable: true, get(){return nixScope["map"](nixScope["escapeMultiline"])(nixScope["lines"]);}});
                Object.defineProperty(nixScope, "lastLine", {enumerable: true, get(){return nixScope["last"](nixScope["escapedLines"]);}});
                return operators.add(operators.add(operators.add(operators.add("''", nixScope["introSpace"]), nixScope["concatStringsSep"](nixScope["introSpace"])((nixScope["init"](nixScope["escapedLines"])))), ((operators.ifThenElse(operators.equal(nixScope["lastLine"], ""), ()=>(nixScope["outroSpace"]), ()=>(operators.add(nixScope["introSpace"], nixScope["lastLine"])))))), "''");
            } finally {
                runtime.scopeStack.pop();
            }
        })();}});
                return (operators.ifThenElse(operators.and(nixScope["multiline"], operators.greaterThan(nixScope["length"](nixScope["lines"]), 1n)), ()=>(nixScope["multilineResult"]), ()=>(nixScope["singlelineResult"])));
            } finally {
                runtime.scopeStack.pop();
            }
        })()), ()=>((operators.ifThenElse(operators.equal(true, nixScope["v"]), ()=>("true"), ()=>((operators.ifThenElse(operators.equal(false, nixScope["v"]), ()=>("false"), ()=>((operators.ifThenElse(operators.equal(null, nixScope["v"]), ()=>("null"), ()=>((operators.ifThenElse(nixScope["isPath"](nixScope["v"]), ()=>(nixScope["toString"](nixScope["v"])), ()=>((operators.ifThenElse(nixScope["isList"](nixScope["v"]), ()=>((operators.ifThenElse(operators.equal(nixScope["v"], []), ()=>("[ ]"), ()=>(operators.add(operators.add(operators.add(operators.add("[", nixScope["introSpace"]), nixScope["concatMapStringsSep"](nixScope["introSpace"])((nixScope["go"]((operators.add(nixScope["indent"], "  ")))))(nixScope["v"])), nixScope["outroSpace"]), "]"))))), ()=>((operators.ifThenElse(nixScope["isFunction"](nixScope["v"]), ()=>((function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "fna", {enumerable: true, get(){return nixScope["functionArgs"](nixScope["v"]);}});
                Object.defineProperty(nixScope, "showFnas", {enumerable: true, get(){return nixScope["concatStringsSep"](", ")((nixScope["mapAttrsToList"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["hasDefVal"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["hasDefVal"], ()=>(operators.add(nixScope["name"], "?")), ()=>(nixScope["name"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["fna"])));}});
                return (operators.ifThenElse(operators.equal(nixScope["fna"], {}), ()=>("<function>"), ()=>((new InterpolatedString(["<function, args: {", "}>"], [()=>(nixScope["showFnas"])])))));
            } finally {
                runtime.scopeStack.pop();
            }
        })()), ()=>((operators.ifThenElse(nixScope["isAttrs"](nixScope["v"]), ()=>((operators.ifThenElse(operators.and(operators.and(nixScope["allowPrettyValues"], operators.hasAttr(nixScope["v"], "__pretty")), operators.hasAttr(nixScope["v"], "val")), ()=>(nixScope["v"]["__pretty"](nixScope["v"]["val"])), ()=>((operators.ifThenElse(operators.equal(nixScope["v"], {}), ()=>("{ }"), ()=>((operators.ifThenElse(operators.and(operators.hasAttr(nixScope["v"], "type"), operators.equal(nixScope["v"]["type"], "derivation")), ()=>((new InterpolatedString(["<derivation ", ">"], [()=>(operators.selectOrDefault(nixScope["v"], ["name"], "???"))]))), ()=>(operators.add(operators.add(operators.add(operators.add("{", nixScope["introSpace"]), nixScope["concatStringsSep"](nixScope["introSpace"])((nixScope["mapAttrsToList"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["", " = ", ";"], [()=>(nixScope["escapeNixIdentifier"](nixScope["name"])), ()=>(nixScope["addErrorContext"]((new InterpolatedString(["while evaluating an attribute `", "`"], [()=>(nixScope["name"])])))((nixScope["go"]((operators.add(nixScope["indent"], "  ")))(nixScope["value"]))))])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["v"])))), nixScope["outroSpace"]), "}"))))))))))), ()=>(nixScope["abort"]((new InterpolatedString(["generators.toPretty: should never happen (v = ", ")"], [()=>(nixScope["v"])])))))))))))))))))))))))))))))))));
            } finally {
                runtime.scopeStack.pop();
            }
        })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                return nixScope["go"](nixScope["indent"]);
            } finally {
                runtime.scopeStack.pop();
            }
        })()
                ));}});
            Object.defineProperty(nixScope, "toPlist", {enumerable: true, get(){return 
    
    // args: {
    //    escape,
    //}
    createFunc({"escape": (nixScope)=>(false),}, null, {}, (nixScope)=>(
                    (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "expr", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["ind"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["x"], null), ()=>(""), ()=>((operators.ifThenElse(nixScope["isBool"](nixScope["x"]), ()=>(nixScope["bool"](nixScope["ind"])(nixScope["x"])), ()=>((operators.ifThenElse(nixScope["isInt"](nixScope["x"]), ()=>(nixScope["int"](nixScope["ind"])(nixScope["x"])), ()=>((operators.ifThenElse(nixScope["isString"](nixScope["x"]), ()=>(nixScope["str"](nixScope["ind"])(nixScope["x"])), ()=>((operators.ifThenElse(nixScope["isList"](nixScope["x"]), ()=>(nixScope["list"](nixScope["ind"])(nixScope["x"])), ()=>((operators.ifThenElse(nixScope["isAttrs"](nixScope["x"]), ()=>(nixScope["attrs"](nixScope["ind"])(nixScope["x"])), ()=>((operators.ifThenElse(nixScope["isPath"](nixScope["x"]), ()=>(nixScope["str"](nixScope["ind"])((nixScope["toString"](nixScope["x"])))), ()=>((operators.ifThenElse(nixScope["isFloat"](nixScope["x"]), ()=>(nixScope["float"](nixScope["ind"])(nixScope["x"])), ()=>(nixScope["abort"]((new InterpolatedString(["generators.toPlist: should never happen (v = ", ")"], [()=>(nixScope["v"])]))))))))))))))))))))))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                Object.defineProperty(nixScope, "literal", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["ind"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["ind"], nixScope["x"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                Object.defineProperty(nixScope, "maybeEscapeXML", {enumerable: true, get(){return (operators.ifThenElse(nixScope["escape"], ()=>(nixScope["escapeXML"]), ()=>((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))));}});
                Object.defineProperty(nixScope, "bool", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["ind"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["literal"](nixScope["ind"])(((operators.ifThenElse(nixScope["x"], ()=>("<true/>"), ()=>("<false/>"))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                Object.defineProperty(nixScope, "int", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["ind"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["literal"](nixScope["ind"])((new InterpolatedString(["<integer>", "</integer>"], [()=>(nixScope["toString"](nixScope["x"]))]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                Object.defineProperty(nixScope, "str", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["ind"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["literal"](nixScope["ind"])((new InterpolatedString(["<string>", "</string>"], [()=>(nixScope["maybeEscapeXML"](nixScope["x"]))]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                Object.defineProperty(nixScope, "key", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["ind"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["literal"](nixScope["ind"])((new InterpolatedString(["<key>", "</key>"], [()=>(nixScope["maybeEscapeXML"](nixScope["x"]))]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                Object.defineProperty(nixScope, "float", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["ind"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["literal"](nixScope["ind"])((new InterpolatedString(["<real>", "</real>"], [()=>(nixScope["toString"](nixScope["x"]))]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                Object.defineProperty(nixScope, "indent", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["ind"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["expr"]((new InterpolatedString(["", ""], [()=>(nixScope["ind"])]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                Object.defineProperty(nixScope, "item", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["ind"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["concatMapStringsSep"]("")((nixScope["indent"](nixScope["ind"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                Object.defineProperty(nixScope, "list", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["ind"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["concatStringsSep"]("")([(nixScope["literal"](nixScope["ind"])("<array>")),(nixScope["item"](nixScope["ind"])(nixScope["x"])),(nixScope["literal"](nixScope["ind"])("</array>"))]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                Object.defineProperty(nixScope, "attrs", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["ind"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["concatStringsSep"]("")([(nixScope["literal"](nixScope["ind"])("<dict>")),(nixScope["attr"](nixScope["ind"])(nixScope["x"])),(nixScope["literal"](nixScope["ind"])("</dict>"))]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                Object.defineProperty(nixScope, "attr", {enumerable: true, get(){return (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "attrFilter", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and(operators.notEqual(nixScope["name"], "_module"), operators.notEqual(nixScope["value"], null)); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["ind"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["concatStringsSep"]("")((nixScope["flatten"]((nixScope["mapAttrsToList"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["optionals"]((nixScope["attrFilter"](nixScope["name"])(nixScope["value"])))([(nixScope["key"]((new InterpolatedString(["", ""], [()=>(nixScope["ind"])])))(nixScope["name"])),(nixScope["expr"]((new InterpolatedString(["", ""], [()=>(nixScope["ind"])])))(nixScope["value"]))]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["x"]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            } finally {
                runtime.scopeStack.pop();
            }
        })();}});
                return nixScope["lib"]["warnIf"]((operators.and(operators.negate(nixScope["escape"]), nixScope["lib"]["oldestSupportedReleaseIsAtLeast"](2505n))))("Using `lib.generators.toPlist` without `escape = true` is deprecated")((new InterpolatedString(["\n        <?xml version=\"1.0\" encoding=\"UTF-8\"?>\n        <!DOCTYPE plist PUBLIC \"-//Apple Computer//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">\n        <plist version=\"1.0\">\n        ", "\n        </plist>"], [()=>(nixScope["expr"]("")(nixScope["v"]))])));
            } finally {
                runtime.scopeStack.pop();
            }
        })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])
                ));}});
            Object.defineProperty(nixScope, "toDhall", {enumerable: true, get(){return 
    
    // args: {
    
    //}@args
    createFunc({}, "args", {}, (nixScope)=>(
                    (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "concatItems", {enumerable: true, get(){return nixScope["concatStringsSep"](", ");}});
                return (operators.ifThenElse(nixScope["isAttrs"](nixScope["v"]), ()=>((new InterpolatedString(["{ ", " }"], [()=>(nixScope["concatItems"]((nixScope["mapAttrsToList"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["key"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["", " = ", ""], [()=>(nixScope["key"]), ()=>(nixScope["toDhall"](nixScope["args"])(nixScope["value"]))])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["v"]))))]))), ()=>((operators.ifThenElse(nixScope["isList"](nixScope["v"]), ()=>((new InterpolatedString(["[ ", " ]"], [()=>(nixScope["concatItems"]((nixScope["map"]((nixScope["toDhall"](nixScope["args"])))(nixScope["v"]))))]))), ()=>((operators.ifThenElse(nixScope["isInt"](nixScope["v"]), ()=>((new InterpolatedString(["", "", ""], [()=>((operators.ifThenElse(operators.lessThan(nixScope["v"], 0n), ()=>(""), ()=>("+")))), ()=>(nixScope["toString"](nixScope["v"]))]))), ()=>((operators.ifThenElse(nixScope["isBool"](nixScope["v"]), ()=>(((operators.ifThenElse(nixScope["v"], ()=>("True"), ()=>("False"))))), ()=>((operators.ifThenElse(nixScope["isFunction"](nixScope["v"]), ()=>(nixScope["abort"]("generators.toDhall: cannot convert a function to Dhall")), ()=>((operators.ifThenElse(operators.equal(nixScope["v"], null), ()=>(nixScope["abort"]("generators.toDhall: cannot convert a null to Dhall")), ()=>(nixScope["toJSON"](nixScope["v"])))))))))))))))))));
            } finally {
                runtime.scopeStack.pop();
            }
        })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])
                ));}});
            Object.defineProperty(nixScope, "toLua", {enumerable: true, get(){return 
    
    // args: {
    //    multiline,
    //    indent,
    //    asBindings,
    //    ,
    //}@args
    createFunc({"multiline": (nixScope)=>(true),"indent": (nixScope)=>(""),"asBindings": (nixScope)=>(false),}, "args", {}, (nixScope)=>(
                    (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                nixScope["innerIndent"] = (new InterpolatedString(["", "  "], [()=>(nixScope["indent"])]));
                Object.defineProperty(nixScope, "introSpace", {enumerable: true, get(){return (operators.ifThenElse(nixScope["multiline"], ()=>((new InterpolatedString(["", ""], [()=>(nixScope["innerIndent"])]))), ()=>(" ")));}});
                Object.defineProperty(nixScope, "outroSpace", {enumerable: true, get(){return (operators.ifThenElse(nixScope["multiline"], ()=>((new InterpolatedString(["", ""], [()=>(nixScope["indent"])]))), ()=>(" ")));}});
                Object.defineProperty(nixScope, "innerArgs", {enumerable: true, get(){return operators.merge(nixScope["args"], ({"indent": (operators.ifThenElse(nixScope["asBindings"], ()=>(nixScope["indent"]), ()=>(nixScope["innerIndent"]))), "asBindings": false}));}});
                Object.defineProperty(nixScope, "concatItems", {enumerable: true, get(){return nixScope["concatStringsSep"]((new InterpolatedString([",", ""], [()=>(nixScope["introSpace"])])));}});
                Object.defineProperty(nixScope, "isLuaInline", {enumerable: true, get(){return 
        
        // args: {
        //    _type,
        //}
        createFunc({"_type": (nixScope)=>(null),}, null, {}, (nixScope)=>(
                        operators.equal(nixScope["_type"], "lua-inline")
                    ));}});
                Object.defineProperty(nixScope, "generatedBindings", {enumerable: true, get(){return ((_cond)=>{
            if (!_cond) {
                throw new Error("assertion failed: " + "assertMsg (badVarNames == [ ]) \"Bad Lua var names: ${toPretty { } badVarNames}\"");
            }
            return nixScope["concatStrings"]((nixScope["mapAttrsToList"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["key"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["", "", " = ", ""], [()=>(nixScope["indent"]), ()=>(nixScope["key"]), ()=>(nixScope["toLua"](nixScope["innerArgs"])(nixScope["value"]))])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["v"])));
        })(nixScope["assertMsg"]((operators.equal(nixScope["badVarNames"], [])))((new InterpolatedString(["Bad Lua var names: ", ""], [()=>(nixScope["toPretty"]({})(nixScope["badVarNames"]))]))));}});
                Object.defineProperty(nixScope, "matchVarName", {enumerable: true, get(){return nixScope["match"]("[[:alpha:]_][[:alnum:]_]*(");}});
                Object.defineProperty(nixScope, "badVarNames", {enumerable: true, get(){return nixScope["filter"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(nixScope["matchVarName"](nixScope["name"]), null); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["attrNames"](nixScope["v"])));}});
                return (operators.ifThenElse(nixScope["asBindings"], ()=>(nixScope["generatedBindings"]), ()=>((operators.ifThenElse(operators.equal(nixScope["v"], null), ()=>("nil"), ()=>((operators.ifThenElse(operators.or(operators.or(operators.or(nixScope["isInt"](nixScope["v"]), nixScope["isFloat"](nixScope["v"])), nixScope["isString"](nixScope["v"])), nixScope["isBool"](nixScope["v"])), ()=>(nixScope["toJSON"](nixScope["v"])), ()=>((operators.ifThenElse(operators.or(nixScope["isPath"](nixScope["v"]), nixScope["isDerivation"](nixScope["v"])), ()=>(nixScope["toJSON"]((new InterpolatedString(["", ""], [()=>(nixScope["v"])])))), ()=>((operators.ifThenElse(nixScope["isList"](nixScope["v"]), ()=>(((operators.ifThenElse(operators.equal(nixScope["v"], []), ()=>("{}"), ()=>((new InterpolatedString(["{", "", "", "}"], [()=>(nixScope["introSpace"]), ()=>(nixScope["concatItems"]((nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["", ""], [()=>(nixScope["toLua"](nixScope["innerArgs"])(nixScope["value"]))])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["v"])))), ()=>(nixScope["outroSpace"])]))))))), ()=>((operators.ifThenElse(nixScope["isAttrs"](nixScope["v"]), ()=>(((operators.ifThenElse(nixScope["isLuaInline"](nixScope["v"]), ()=>((new InterpolatedString(["(", ")"], [()=>(nixScope["v"]["expr"])]))), ()=>((operators.ifThenElse(operators.equal(nixScope["v"], {}), ()=>("{}"), ()=>((new InterpolatedString(["{", "", "", "}"], [()=>(nixScope["introSpace"]), ()=>(nixScope["concatItems"]((nixScope["mapAttrsToList"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["key"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["[", "] = ", ""], [()=>(nixScope["toJSON"](nixScope["key"])), ()=>(nixScope["toLua"](nixScope["innerArgs"])(nixScope["value"]))])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["v"])))), ()=>(nixScope["outroSpace"])])))))))))), ()=>(nixScope["abort"]((new InterpolatedString(["generators.toLua: type ", " is unsupported"], [()=>(nixScope["typeOf"](nixScope["v"]))])))))))))))))))))))));
            } finally {
                runtime.scopeStack.pop();
            }
        })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])
                ));}});
            Object.defineProperty(nixScope, "mkLuaInline", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["expr"] = arg; runtime.scopeStack.push(nixScope); try { return ({"_type": "lua-inline", "expr": nixScope["expr"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })(), ({"toJSON": 
    
    // args: {
    
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    nixScope["lib"]["strings"]["toJSON"]
                )), "toYAML": 
    
    // args: {
    
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    nixScope["lib"]["strings"]["toJSON"]
                ))}));
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))