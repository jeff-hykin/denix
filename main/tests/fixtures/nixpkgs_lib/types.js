import { createRuntime, createFunc } from "../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default //
//


// args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["elem"] = nixScope["lib"]["elem"];
            nixScope["flip"] = nixScope["lib"]["flip"];
            nixScope["isAttrs"] = nixScope["lib"]["isAttrs"];
            nixScope["isBool"] = nixScope["lib"]["isBool"];
            nixScope["isDerivation"] = nixScope["lib"]["isDerivation"];
            nixScope["isFloat"] = nixScope["lib"]["isFloat"];
            nixScope["isFunction"] = nixScope["lib"]["isFunction"];
            nixScope["isInt"] = nixScope["lib"]["isInt"];
            nixScope["isList"] = nixScope["lib"]["isList"];
            nixScope["isString"] = nixScope["lib"]["isString"];
            nixScope["isStorePath"] = nixScope["lib"]["isStorePath"];
            nixScope["throwIf"] = nixScope["lib"]["throwIf"];
            nixScope["toDerivation"] = nixScope["lib"]["toDerivation"];
            nixScope["toList"] = nixScope["lib"]["toList"];
            nixScope["all"] = nixScope["lib"]["lists"]["all"];
            nixScope["concatLists"] = nixScope["lib"]["lists"]["concatLists"];
            nixScope["count"] = nixScope["lib"]["lists"]["count"];
            nixScope["elemAt"] = nixScope["lib"]["lists"]["elemAt"];
            nixScope["filter"] = nixScope["lib"]["lists"]["filter"];
            nixScope["foldl'"] = nixScope["lib"]["lists"]["foldl'"];
            nixScope["head"] = nixScope["lib"]["lists"]["head"];
            nixScope["imap1"] = nixScope["lib"]["lists"]["imap1"];
            nixScope["last"] = nixScope["lib"]["lists"]["last"];
            nixScope["length"] = nixScope["lib"]["lists"]["length"];
            nixScope["tail"] = nixScope["lib"]["lists"]["tail"];
            nixScope["attrNames"] = nixScope["lib"]["attrsets"]["attrNames"];
            nixScope["filterAttrs"] = nixScope["lib"]["attrsets"]["filterAttrs"];
            nixScope["hasAttr"] = nixScope["lib"]["attrsets"]["hasAttr"];
            nixScope["mapAttrs"] = nixScope["lib"]["attrsets"]["mapAttrs"];
            nixScope["optionalAttrs"] = nixScope["lib"]["attrsets"]["optionalAttrs"];
            nixScope["zipAttrsWith"] = nixScope["lib"]["attrsets"]["zipAttrsWith"];
            nixScope["getFiles"] = nixScope["lib"]["options"]["getFiles"];
            nixScope["getValues"] = nixScope["lib"]["options"]["getValues"];
            nixScope["mergeDefaultOption"] = nixScope["lib"]["options"]["mergeDefaultOption"];
            nixScope["mergeEqualOption"] = nixScope["lib"]["options"]["mergeEqualOption"];
            nixScope["mergeOneOption"] = nixScope["lib"]["options"]["mergeOneOption"];
            nixScope["mergeUniqueOption"] = nixScope["lib"]["options"]["mergeUniqueOption"];
            nixScope["showFiles"] = nixScope["lib"]["options"]["showFiles"];
            nixScope["showOption"] = nixScope["lib"]["options"]["showOption"];
            nixScope["concatMapStringsSep"] = nixScope["lib"]["strings"]["concatMapStringsSep"];
            nixScope["concatStringsSep"] = nixScope["lib"]["strings"]["concatStringsSep"];
            nixScope["escapeNixString"] = nixScope["lib"]["strings"]["escapeNixString"];
            nixScope["hasInfix"] = nixScope["lib"]["strings"]["hasInfix"];
            nixScope["isStringLike"] = nixScope["lib"]["strings"]["isStringLike"];
            nixScope["boolToString"] = nixScope["lib"]["trivial"]["boolToString"];
            nixScope["mergeDefinitions"] = nixScope["lib"]["modules"]["mergeDefinitions"];
            nixScope["fixupOptionType"] = nixScope["lib"]["modules"]["fixupOptionType"];
            nixScope["mergeOptionDecls"] = nixScope["lib"]["modules"]["mergeOptionDecls"];
            Object.defineProperty(nixScope, "inAttrPosSuffix", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "pos", {enumerable: true, get(){return nixScope["builtins"]["unsafeGetAttrPos"](nixScope["name"])(nixScope["v"]);}});
            return (operators.ifThenElse(operators.equal(nixScope["pos"], null), ()=>(""), ()=>((new InterpolatedString([" at ", ":", ":", ""], [()=>(nixScope["pos"]["file"]), ()=>(nixScope["toString"](nixScope["pos"]["line"])), ()=>(nixScope["toString"](nixScope["pos"]["column"]))])))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "elemTypeFunctor", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return 
    
    // args: {
    //    elemType,
    //}@payload
    createFunc({}, "payload", {}, (nixScope)=>(
                    ({"name": nixScope["name"], "payload": nixScope["payload"], "wrappedDeprecationMessage": nixScope["makeWrappedDeprecationMessage"](nixScope["payload"]), "type": nixScope["outer_types"]["types"][nixScope["name"]], "binOp": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["a"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["b"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "merged", {enumerable: true, get(){return nixScope["a"]["elemType"]["typeMerge"](nixScope["b"]["elemType"]["functor"]);}});
                return (operators.ifThenElse(operators.equal(nixScope["merged"], null), ()=>(null), ()=>(({"elemType": nixScope["merged"]}))));
            } finally {
                runtime.scopeStack.pop();
            }
        })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})
                )); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "makeWrappedDeprecationMessage", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["payload"] = arg; runtime.scopeStack.push(nixScope); try { return 
    
    // args: {
    //    loc,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    nixScope["lib"]["warn"]((new InterpolatedString(["\n      The deprecated \\`", "functor.wrapped\\` attribute ", "is accessed, use \\`", "nestedTypes.elemType\\` instead.\n    "], [()=>(nixScope["lib"]["optionalString"]((operators.notEqual(nixScope["loc"], null)))("type.")), ()=>(nixScope["lib"]["optionalString"]((operators.notEqual(nixScope["loc"], null)))((new InterpolatedString(["of the option `", "` "], [()=>(nixScope["showOption"](nixScope["loc"]))])))), ()=>(nixScope["lib"]["optionalString"]((operators.notEqual(nixScope["loc"], null)))("type."))])))(nixScope["payload"]["elemType"])
                )); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "outer_types", {enumerable: true, get(){return (function(){
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "isType", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["type"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal((operators.selectOrDefault(nixScope["x"], ["_type"], "")), nixScope["type"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "setType", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["typeName"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["value"], ({"_type": nixScope["typeName"]})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "defaultTypeMerge", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f'"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "mergedWrapped", {enumerable: true, get(){return nixScope["f"]["wrapped"]["typeMerge"](nixScope["f'"]["wrapped"]["functor"]);}});
            Object.defineProperty(nixScope, "mergedPayload", {enumerable: true, get(){return nixScope["f"]["binOp"](nixScope["f"]["payload"])(nixScope["f'"]["payload"]);}});
            Object.defineProperty(nixScope, "hasPayload", {enumerable: true, get(){return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "(f'.payload != null) == (f.payload != null)");
        }
        return operators.notEqual(nixScope["f"]["payload"], null);
    })(operators.equal((operators.notEqual(nixScope["f'"]["payload"], null)), (operators.notEqual(nixScope["f"]["payload"], null))));}});
            Object.defineProperty(nixScope, "hasWrapped", {enumerable: true, get(){return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "(f'.wrapped != null) == (f.wrapped != null)");
        }
        return operators.notEqual(nixScope["f"]["wrapped"], null);
    })(operators.equal((operators.notEqual(nixScope["f'"]["wrapped"], null)), (operators.notEqual(nixScope["f"]["wrapped"], null))));}});
            Object.defineProperty(nixScope, "typeFromPayload", {enumerable: true, get(){return (operators.ifThenElse(operators.equal(nixScope["mergedPayload"], null), ()=>(null), ()=>(nixScope["f"]["type"](nixScope["mergedPayload"]))));}});
            Object.defineProperty(nixScope, "typeFromWrapped", {enumerable: true, get(){return (operators.ifThenElse(operators.equal(nixScope["mergedWrapped"], null), ()=>(null), ()=>(nixScope["f"]["type"](nixScope["mergedWrapped"]))));}});
            return (operators.ifThenElse(operators.notEqual(nixScope["f"]["name"], nixScope["f'"]["name"]), ()=>(null), ()=>((operators.ifThenElse(nixScope["hasPayload"], ()=>((operators.ifThenElse(operators.hasAttr(nixScope["f"], "wrappedDeprecationMessage"), ()=>(nixScope["typeFromPayload"]), ()=>((operators.ifThenElse(nixScope["hasWrapped"], ()=>(nixScope["throw"]((new InterpolatedString(["\n            Type ", " defines both \\`functor.payload\\` and \\`functor.wrapped\\` at the same time, which is not supported.\n\n            Use either \\`functor.payload\\` or \\`functor.wrapped\\` but not both.\n\n            If your code worked before remove either \\`functor.wrapped\\` or \\`functor.payload\\` from the type definition.\n          "], [()=>(nixScope["f"]["name"])])))), ()=>(nixScope["typeFromPayload"]))))))), ()=>((operators.ifThenElse(nixScope["hasWrapped"], ()=>(nixScope["typeFromWrapped"]), ()=>(nixScope["f"]["type"])))))))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "defaultFunctor", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return ({"name": nixScope["name"], "type": operators.selectOrDefault(nixScope["types"], [nixScope["name"]], null), "wrapped": null, "payload": null, "binOp": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["a"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["b"] = arg; runtime.scopeStack.push(nixScope); try { return null; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "isOptionType", {enumerable: true, get(){return nixScope["isType"]("option-type");}});
            Object.defineProperty(nixScope, "mkOptionType", {enumerable: true, get(){return 
    
    // args: {
    //    name,
    //    description,
    //    descriptionClass,
    //    check,
    //    merge,
    //    emptyValue,
    //    getSubOptions,
    //    getSubModules,
    //    substSubModules,
    //    typeMerge,
    //    functor,
    //    deprecationMessage,
    //    nestedTypes,
    //    ,
    //}
    createFunc({"description": (nixScope)=>(null),"descriptionClass": (nixScope)=>(null),"check": (nixScope)=>(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return true; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))),"merge": (nixScope)=>(nixScope["mergeDefaultOption"]),"emptyValue": (nixScope)=>({}),"getSubOptions": (nixScope)=>((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prefix"] = arg; runtime.scopeStack.push(nixScope); try { return {}; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])),"getSubModules": (nixScope)=>(null),"substSubModules": (nixScope)=>((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return null; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])),"typeMerge": (nixScope)=>(nixScope["defaultTypeMerge"](nixScope["functor"])),"functor": (nixScope)=>(nixScope["defaultFunctor"](nixScope["name"])),"deprecationMessage": (nixScope)=>(null),"nestedTypes": (nixScope)=>({}),}, null, {}, (nixScope)=>(
                    ({"_type": "option-type", "name": nixScope["name"], "check": nixScope["check"], "merge": nixScope["merge"], "emptyValue": nixScope["emptyValue"], "getSubOptions": nixScope["getSubOptions"], "getSubModules": nixScope["getSubModules"], "substSubModules": nixScope["substSubModules"], "typeMerge": nixScope["typeMerge"], "deprecationMessage": nixScope["deprecationMessage"], "nestedTypes": nixScope["nestedTypes"], "descriptionClass": nixScope["descriptionClass"], "functor": (operators.ifThenElse(operators.hasAttr(nixScope["functor"], "wrappedDeprecationMessage"), ()=>(operators.merge(nixScope["functor"], ({"wrapped": nixScope["functor"]["wrappedDeprecationMessage"](({"loc": null}))}))), ()=>(nixScope["functor"]))), "description": (operators.ifThenElse(operators.equal(nixScope["description"], null), ()=>(nixScope["name"]), ()=>(nixScope["description"])))})
                ));}});
            Object.defineProperty(nixScope, "optionDescriptionPhrase", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["unparenthesize"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["t"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["unparenthesize"]((operators.selectOrDefault(nixScope["t"], ["descriptionClass"], null))), ()=>(nixScope["t"]["description"]), ()=>((new InterpolatedString(["(", ")"], [()=>(nixScope["t"]["description"])]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "noCheckForDocsModule", {enumerable: true, get(){return (function(){
        const obj = {};
        obj["_file"] = "<built-in module that disables checks for the purpose of documentation generation>";
        if (obj["config"] === undefined) obj["config"] = {};
        if (obj["config"]["_module"] === undefined) obj["config"]["_module"] = {};
        obj["config"]["_module"]["check"] = nixScope["lib"]["mkForce"](false);
        return obj;
    })();}});
            Object.defineProperty(nixScope, "types", {enumerable: true, get(){return (function(){
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "raw", {enumerable: true, get(){return nixScope["mkOptionType"](({"name": "raw", "description": "raw value", "descriptionClass": "noun", "check": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return true; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "merge": nixScope["mergeOneOption"]}));}});
            Object.defineProperty(nixScope, "anything", {enumerable: true, get(){return nixScope["mkOptionType"](({"name": "anything", "description": "anything", "descriptionClass": "noun", "check": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return true; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "merge": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "getType", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.and(nixScope["isAttrs"](nixScope["value"]), nixScope["isStringLike"](nixScope["value"])), ()=>("stringCoercibleSet"), ()=>(nixScope["builtins"]["typeOf"](nixScope["value"])))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "commonType", {enumerable: true, get(){return nixScope["foldl'"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["type"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["getType"](nixScope["def"]["value"]), nixScope["type"]), ()=>(nixScope["type"]), ()=>(nixScope["throw"]((new InterpolatedString(["The option `", "' has conflicting option types in ", ""], [()=>(nixScope["showOption"](nixScope["loc"])), ()=>(nixScope["showFiles"]((nixScope["getFiles"](nixScope["defs"]))))])))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["getType"]((nixScope["head"](nixScope["defs"]))["value"])))(nixScope["defs"]);}});
            Object.defineProperty(nixScope, "mergeFunction", {enumerable: true, get(){return operators.selectOrDefault(({"set": (nixScope["attrsOf"](nixScope["anything"]))["merge"], "stringCoercibleSet": nixScope["mergeOneOption"], "lambda": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["arg"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["anything"]["merge"]((operators.listConcat(nixScope["loc"], ["<function body>"])))((nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return ({"file": nixScope["def"]["file"], "value": nixScope["def"]["value"](nixScope["arg"])}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["defs"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}), [nixScope["commonType"]], nixScope["mergeEqualOption"]);}});
            return nixScope["mergeFunction"](nixScope["loc"])(nixScope["defs"]);
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));}});
            Object.defineProperty(nixScope, "unspecified", {enumerable: true, get(){return nixScope["mkOptionType"](({"name": "unspecified", "description": "unspecified value", "descriptionClass": "noun"}));}});
            Object.defineProperty(nixScope, "bool", {enumerable: true, get(){return nixScope["mkOptionType"](({"name": "bool", "description": "boolean", "descriptionClass": "noun", "check": nixScope["isBool"], "merge": nixScope["mergeEqualOption"]}));}});
            Object.defineProperty(nixScope, "boolByOr", {enumerable: true, get(){return nixScope["mkOptionType"](({"name": "boolByOr", "description": "boolean (merged using or)", "descriptionClass": "noun", "check": nixScope["isBool"], "merge": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["foldl'"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["result"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return operators.or(nixScope["result"], nixScope["def"]["value"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(false)(nixScope["defs"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));}});
            Object.defineProperty(nixScope, "int", {enumerable: true, get(){return nixScope["mkOptionType"](({"name": "int", "description": "signed integer", "descriptionClass": "noun", "check": nixScope["isInt"], "merge": nixScope["mergeEqualOption"]}));}});
            Object.defineProperty(nixScope, "ints", {enumerable: true, get(){return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "betweenDesc", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["lowest"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["highest"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["", " and ", " (both inclusive)"], [()=>(nixScope["toString"](nixScope["lowest"])), ()=>(nixScope["toString"](nixScope["highest"]))])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "between", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["lowest"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["highest"] = arg; runtime.scopeStack.push(nixScope); try { return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "lib.assertMsg (lowest <= highest) \"ints.between: lowest must be smaller than highest\"");
        }
        return operators.merge(nixScope["addCheck"](nixScope["int"])(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and(operators.greaterThanOrEqual(nixScope["x"], nixScope["lowest"]), operators.lessThanOrEqual(nixScope["x"], nixScope["highest"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))), ({"name": "intBetween", "description": (new InterpolatedString(["integer between ", ""], [()=>(nixScope["betweenDesc"](nixScope["lowest"])(nixScope["highest"]))]))}));
    })(nixScope["lib"]["assertMsg"]((operators.lessThanOrEqual(nixScope["lowest"], nixScope["highest"])))("ints.between: lowest must be smaller than highest")); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "ign", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["lowest"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["highest"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["docStart"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["between"](nixScope["lowest"])(nixScope["highest"]), ({"name": nixScope["name"], "description": operators.add(nixScope["docStart"], (new InterpolatedString(["; between ", ""], [()=>(nixScope["betweenDesc"](nixScope["lowest"])(nixScope["highest"]))])))})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "unsign", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["bit"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["range"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["ign"](0n)((operators.subtract(nixScope["range"], 1n)))((new InterpolatedString(["unsignedInt", ""], [()=>(nixScope["toString"](nixScope["bit"]))])))((new InterpolatedString(["", " bit unsigned integer"], [()=>(nixScope["toString"](nixScope["bit"]))]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "sign", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["bit"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["range"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["ign"]((operators.subtract(0n, (operators.divide(nixScope["range"], 2n)))))((operators.subtract(operators.divide(nixScope["range"], 2n), 1n)))((new InterpolatedString(["signedInt", ""], [()=>(nixScope["toString"](nixScope["bit"]))])))((new InterpolatedString(["", " bit signed integer"], [()=>(nixScope["toString"](nixScope["bit"]))]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return ({"between": nixScope["between"], "unsigned": operators.merge(nixScope["addCheck"](nixScope["types"]["int"])(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.greaterThanOrEqual(nixScope["x"], 0n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))), ({"name": "unsignedInt", "description": "unsigned integer, meaning >=0", "descriptionClass": "nonRestrictiveClause"})), "positive": operators.merge(nixScope["addCheck"](nixScope["types"]["int"])(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.greaterThan(nixScope["x"], 0n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))), ({"name": "positiveInt", "description": "positive integer, meaning >0", "descriptionClass": "nonRestrictiveClause"})), "u8": nixScope["unsign"](8n)(256n), "u16": nixScope["unsign"](16n)(65536n), "u32": nixScope["unsign"](32n)(4294967296n), "s8": nixScope["sign"](8n)(256n), "s16": nixScope["sign"](16n)(65536n), "s32": nixScope["sign"](32n)(4294967296n)});
        } finally {
            runtime.scopeStack.pop();
        }
    })();}});
            Object.defineProperty(nixScope, "port", {enumerable: true, get(){return nixScope["ints"]["u16"];}});
            Object.defineProperty(nixScope, "float", {enumerable: true, get(){return nixScope["mkOptionType"](({"name": "float", "description": "floating point number", "descriptionClass": "noun", "check": nixScope["isFloat"], "merge": nixScope["mergeEqualOption"]}));}});
            Object.defineProperty(nixScope, "number", {enumerable: true, get(){return nixScope["either"](nixScope["int"])(nixScope["float"]);}});
            Object.defineProperty(nixScope, "numbers", {enumerable: true, get(){return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "betweenDesc", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["lowest"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["highest"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["", " and ", " (both inclusive)"], [()=>(nixScope["builtins"]["toJSON"](nixScope["lowest"])), ()=>(nixScope["builtins"]["toJSON"](nixScope["highest"]))])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return ({"between": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["lowest"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["highest"] = arg; runtime.scopeStack.push(nixScope); try { return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "lib.assertMsg (lowest <= highest) \"numbers.between: lowest must be smaller than highest\"");
        }
        return operators.merge(nixScope["addCheck"](nixScope["number"])(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and(operators.greaterThanOrEqual(nixScope["x"], nixScope["lowest"]), operators.lessThanOrEqual(nixScope["x"], nixScope["highest"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))), ({"name": "numberBetween", "description": (new InterpolatedString(["integer or floating point number between ", ""], [()=>(nixScope["betweenDesc"](nixScope["lowest"])(nixScope["highest"]))]))}));
    })(nixScope["lib"]["assertMsg"]((operators.lessThanOrEqual(nixScope["lowest"], nixScope["highest"])))("numbers.between: lowest must be smaller than highest")); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "nonnegative": operators.merge(nixScope["addCheck"](nixScope["number"])(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.greaterThanOrEqual(nixScope["x"], 0n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))), ({"name": "numberNonnegative", "description": "nonnegative integer or floating point number, meaning >=0", "descriptionClass": "nonRestrictiveClause"})), "positive": operators.merge(nixScope["addCheck"](nixScope["number"])(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.greaterThan(nixScope["x"], 0n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))), ({"name": "numberPositive", "description": "positive integer or floating point number, meaning >0", "descriptionClass": "nonRestrictiveClause"}))});
        } finally {
            runtime.scopeStack.pop();
        }
    })();}});
            Object.defineProperty(nixScope, "str", {enumerable: true, get(){return nixScope["mkOptionType"](({"name": "str", "description": "string", "descriptionClass": "noun", "check": nixScope["isString"], "merge": nixScope["mergeEqualOption"]}));}});
            Object.defineProperty(nixScope, "nonEmptyStr", {enumerable: true, get(){return nixScope["mkOptionType"]((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["name"] = "nonEmptyStr";
            obj["description"] = "non-empty string";
            obj["descriptionClass"] = "noun";
            obj["check"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and(nixScope["str"]["check"](nixScope["x"]), operators.equal(nixScope["builtins"]["match"]("[ ")(nixScope["x"]), null)); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["merge"] = nixScope["str"]["merge"];
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })());}});
            Object.defineProperty(nixScope, "singleLineStr", {enumerable: true, get(){return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["check"] = nixScope["strMatching"]("[^")["check"];
            nixScope["merge"] = nixScope["strMatching"]("[^")["merge"];
            return nixScope["mkOptionType"](({"name": "singleLineStr", "description": "(optionally newline-terminated) single-line string", "descriptionClass": "noun", "check": nixScope["check"], "merge": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["lib"]["removeSuffix"]("")((nixScope["merge"](nixScope["loc"])(nixScope["defs"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));
        } finally {
            runtime.scopeStack.pop();
        }
    })();}});
            Object.defineProperty(nixScope, "strMatching", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["pattern"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkOptionType"]((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["name"] = (new InterpolatedString(["strMatching ", ""], [()=>(nixScope["escapeNixString"](nixScope["pattern"]))]));
            obj["description"] = (new InterpolatedString(["string matching the pattern ", ""], [()=>(nixScope["pattern"])]));
            obj["descriptionClass"] = "noun";
            obj["check"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and(nixScope["str"]["check"](nixScope["x"]), operators.notEqual(nixScope["builtins"]["match"](nixScope["pattern"])(nixScope["x"]), null)); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["merge"] = nixScope["str"]["merge"];
            obj["functor"] = operators.merge(nixScope["defaultFunctor"]("strMatching"), ({"type": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["payload"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["strMatching"](nixScope["payload"]["pattern"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "payload": ({"pattern": nixScope["pattern"]}), "binOp": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["lhs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["rhs"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["lhs"], nixScope["rhs"]), ()=>(nixScope["lhs"]), ()=>(null))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })()); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "separatedString", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["sep"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkOptionType"]((function(){
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
        nixScope["name"] = "separatedString";
        nixScope["descriptionClass"] = "noun";
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "description", {enumerable: true, get(){return (operators.ifThenElse(operators.equal(nixScope["sep"], ""), ()=>("Concatenated string"), ()=>((new InterpolatedString(["strings concatenated with ", ""], [()=>(nixScope["builtins"]["toJSON"](nixScope["sep"]))])))));}});
            Object.defineProperty(nixScope, "check", {enumerable: true, get(){return nixScope["isString"];}});
            Object.defineProperty(nixScope, "merge", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["concatStringsSep"](nixScope["sep"])((nixScope["getValues"](nixScope["defs"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "functor", {enumerable: true, get(){return operators.merge((nixScope["defaultFunctor"](nixScope["name"])), ({"payload": ({"sep": nixScope["sep"]}), "type": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["payload"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["types"]["separatedString"](nixScope["payload"]["sep"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "binOp": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["lhs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["rhs"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["lhs"]["sep"], nixScope["rhs"]["sep"]), ()=>((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["sep"] = nixScope["lhs"]["sep"];
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })()), ()=>(null))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));}});
            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })()); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "lines", {enumerable: true, get(){return nixScope["separatedString"]("");}});
            Object.defineProperty(nixScope, "commas", {enumerable: true, get(){return nixScope["separatedString"](",");}});
            Object.defineProperty(nixScope, "envVar", {enumerable: true, get(){return nixScope["separatedString"](":");}});
            Object.defineProperty(nixScope, "string", {enumerable: true, get(){return nixScope["lib"]["warn"]("The type `types.string` is deprecated. See https://github.com/NixOS/nixpkgs/pull/66346 for better alternative types.")((operators.merge(nixScope["separatedString"](""), ({"name": "string"}))));}});
            Object.defineProperty(nixScope, "passwdEntry", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["entryType"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["addCheck"](nixScope["entryType"])(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["str"] = arg; runtime.scopeStack.push(nixScope); try { return operators.negate((operators.or(nixScope["hasInfix"](":")(nixScope["str"]), nixScope["hasInfix"]("")(nixScope["str"])))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))), ({"name": (new InterpolatedString(["passwdEntry ", ""], [()=>(nixScope["entryType"]["name"])])), "description": (new InterpolatedString(["", ", not containing newlines or colons"], [()=>(nixScope["optionDescriptionPhrase"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["class"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(nixScope["class"], "noun"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["entryType"]))])), "descriptionClass": "nonRestrictiveClause"})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "attrs", {enumerable: true, get(){return nixScope["mkOptionType"](({"name": "attrs", "description": "attribute set", "check": nixScope["isAttrs"], "merge": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["foldl'"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["res"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["res"], nixScope["def"]["value"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))({}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "emptyValue": ({"value": {}})}));}});
            Object.defineProperty(nixScope, "package", {enumerable: true, get(){return nixScope["mkOptionType"](({"name": "package", "descriptionClass": "noun", "check": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.or(nixScope["isDerivation"](nixScope["x"]), nixScope["isStorePath"](nixScope["x"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "merge": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "res", {enumerable: true, get(){return nixScope["mergeOneOption"](nixScope["loc"])(nixScope["defs"]);}});
            return (operators.ifThenElse(operators.or(nixScope["builtins"]["isPath"](nixScope["res"]), (operators.and(nixScope["builtins"]["isString"](nixScope["res"]), operators.negate(nixScope["builtins"]["hasContext"](nixScope["res"]))))), ()=>(nixScope["toDerivation"](nixScope["res"])), ()=>(nixScope["res"])));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));}});
            Object.defineProperty(nixScope, "shellPackage", {enumerable: true, get(){return operators.merge(nixScope["package"], ({"check": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and(nixScope["isDerivation"](nixScope["x"]), nixScope["hasAttr"]("shellPath")(nixScope["x"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));}});
            Object.defineProperty(nixScope, "pkgs", {enumerable: true, get(){return nixScope["addCheck"]((operators.merge(nixScope["unique"](({"message": "A Nixpkgs pkgs set can not be merged with another pkgs set."}))(nixScope["attrs"]), ({"name": "pkgs", "descriptionClass": "noun", "description": "Nixpkgs package set"}))))(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal((operators.selectOrDefault(nixScope["x"], ["_type"], null)), "pkgs"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])));}});
            Object.defineProperty(nixScope, "path", {enumerable: true, get(){return nixScope["pathWith"](({"absolute": true}));}});
            Object.defineProperty(nixScope, "pathInStore", {enumerable: true, get(){return nixScope["pathWith"](({"inStore": true}));}});
            Object.defineProperty(nixScope, "pathWith", {enumerable: true, get(){return 
    
    // args: {
    //    inStore,
    //    absolute,
    //    ,
    //}
    createFunc({"inStore": (nixScope)=>(null),"absolute": (nixScope)=>(null),}, null, {}, (nixScope)=>(
                    nixScope["throwIf"]((operators.and(operators.and(operators.and(operators.notEqual(nixScope["inStore"], null), operators.notEqual(nixScope["absolute"], null)), nixScope["inStore"]), operators.negate(nixScope["absolute"]))))("In pathWith, inStore means the path must be absolute")(nixScope["mkOptionType"])(({"name": "path", "description": (operators.add(operators.add(((operators.ifThenElse(operators.equal(nixScope["absolute"], null), ()=>(""), ()=>(((operators.ifThenElse(nixScope["absolute"], ()=>("absolute "), ()=>("relative ")))))))), "path"), ((operators.ifThenElse(operators.equal(nixScope["inStore"], null), ()=>(""), ()=>(((operators.ifThenElse(nixScope["inStore"], ()=>(" in the Nix store"), ()=>(" not in the Nix store")))))))))), "descriptionClass": "noun", "merge": nixScope["mergeEqualOption"], "functor": operators.merge(nixScope["defaultFunctor"]("path"), ({"type": nixScope["pathWith"], "payload": ({"inStore": nixScope["inStore"], "absolute": nixScope["absolute"]}), "binOp": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["lhs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["rhs"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["lhs"], nixScope["rhs"]), ()=>(nixScope["lhs"]), ()=>(null))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})), "check": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "isInStore", {enumerable: true, get(){return nixScope["lib"]["path"]["hasStorePathPrefix"](((operators.ifThenElse(nixScope["builtins"]["isPath"](nixScope["x"]), ()=>(nixScope["x"]), ()=>(operators.add((new Path(["/."], [])), nixScope["builtins"]["unsafeDiscardStringContext"](nixScope["x"])))))));}});
                Object.defineProperty(nixScope, "isAbsolute", {enumerable: true, get(){return operators.equal(nixScope["builtins"]["substring"](0n)(1n)((nixScope["toString"](nixScope["x"]))), "/");}});
                Object.defineProperty(nixScope, "isExpectedType", {enumerable: true, get(){return ((operators.ifThenElse(operators.or(operators.equal(nixScope["inStore"], null), nixScope["inStore"]), ()=>(nixScope["isStringLike"](nixScope["x"])), ()=>(nixScope["isString"](nixScope["x"])))));}});
                return operators.and(operators.and(nixScope["isExpectedType"], (operators.or(operators.equal(nixScope["inStore"], null), operators.equal(nixScope["inStore"], nixScope["isInStore"])))), (operators.or(operators.equal(nixScope["absolute"], null), operators.equal(nixScope["absolute"], nixScope["isAbsolute"]))));
            } finally {
                runtime.scopeStack.pop();
            }
        })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}))
                ));}});
            Object.defineProperty(nixScope, "listOf", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["elemType"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkOptionType"]((function(){
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
        nixScope["nestedTypes"] = {};
        nixScope["name"] = "listOf";
        nixScope["description"] = (new InterpolatedString(["list of ", ""], [()=>(nixScope["optionDescriptionPhrase"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["class"] = arg; runtime.scopeStack.push(nixScope); try { return operators.or(operators.equal(nixScope["class"], "noun"), operators.equal(nixScope["class"], "composite")); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["elemType"]))]));
        nixScope["descriptionClass"] = "composite";
        nixScope["emptyValue"] = ({"value": []});
        nixScope["nestedTypes"]["elemType"] = nixScope["elemType"];
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "check", {enumerable: true, get(){return nixScope["isList"];}});
            Object.defineProperty(nixScope, "merge", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]["value"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["filter"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.hasAttr(nixScope["x"], "value"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["concatLists"]((nixScope["imap1"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["imap1"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def'"] = arg; runtime.scopeStack.push(nixScope); try { return (nixScope["mergeDefinitions"]((operators.listConcat(nixScope["loc"], [(new InterpolatedString(["[definition ", "-entry ", "]"], [()=>(nixScope["toString"](nixScope["n"])), ()=>(nixScope["toString"](nixScope["m"]))]))])))(nixScope["elemType"])([(function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["file"] = nixScope["def"]["file"];
            obj["value"] = nixScope["def'"];
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })()]))["optionalValue"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["def"]["value"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["defs"]))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "getSubOptions", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prefix"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["elemType"]["getSubOptions"]((operators.listConcat(nixScope["prefix"], ["*"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "getSubModules", {enumerable: true, get(){return nixScope["elemType"]["getSubModules"];}});
            Object.defineProperty(nixScope, "substSubModules", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["listOf"]((nixScope["elemType"]["substSubModules"](nixScope["m"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "functor", {enumerable: true, get(){return operators.merge((nixScope["elemTypeFunctor"](nixScope["name"])(({"elemType": nixScope["elemType"]}))), ({"type": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["payload"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["types"]["listOf"](nixScope["payload"]["elemType"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));}});
            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })()); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "nonEmptyListOf", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["elemType"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "list", {enumerable: true, get(){return nixScope["addCheck"]((nixScope["types"]["listOf"](nixScope["elemType"])))(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["l"] = arg; runtime.scopeStack.push(nixScope); try { return operators.notEqual(nixScope["l"], []); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])));}});
            return operators.merge(nixScope["list"], ({"description": (new InterpolatedString(["non-empty ", ""], [()=>(nixScope["optionDescriptionPhrase"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["class"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(nixScope["class"], "noun"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["list"]))])), "emptyValue": {}, "substSubModules": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["nonEmptyListOf"]((nixScope["elemType"]["substSubModules"](nixScope["m"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "attrsOf", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["elemType"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["attrsWith"](({"elemType": nixScope["elemType"]})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "lazyAttrsOf", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["elemType"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["attrsWith"](({"elemType": nixScope["elemType"], "lazy": true})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "attrsWith", {enumerable: true, get(){return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "pushPositions", {enumerable: true, get(){return nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["file"] = nixScope["def"]["file"];
            obj["value"] = nixScope["v"];
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["def"]["value"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])));}});
            Object.defineProperty(nixScope, "binOp", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["lhs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["rhs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "elemType", {enumerable: true, get(){return nixScope["lhs"]["elemType"]["typeMerge"](nixScope["rhs"]["elemType"]["functor"]);}});
            Object.defineProperty(nixScope, "lazy", {enumerable: true, get(){return (operators.ifThenElse(operators.equal(nixScope["lhs"]["lazy"], nixScope["rhs"]["lazy"]), ()=>(nixScope["lhs"]["lazy"]), ()=>(null)));}});
            Object.defineProperty(nixScope, "placeholder", {enumerable: true, get(){return (operators.ifThenElse(operators.equal(nixScope["lhs"]["placeholder"], nixScope["rhs"]["placeholder"]), ()=>(nixScope["lhs"]["placeholder"]), ()=>((operators.ifThenElse(operators.equal(nixScope["lhs"]["placeholder"], "name"), ()=>(nixScope["rhs"]["placeholder"]), ()=>((operators.ifThenElse(operators.equal(nixScope["rhs"]["placeholder"], "name"), ()=>(nixScope["lhs"]["placeholder"]), ()=>(null)))))))));}});
            return (operators.ifThenElse(operators.or(operators.or(operators.equal(nixScope["elemType"], null), operators.equal(nixScope["lazy"], null)), operators.equal(nixScope["placeholder"], null)), ()=>(null), ()=>(({"elemType": nixScope["elemType"], "lazy": nixScope["lazy"], "placeholder": nixScope["placeholder"]}))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return 
    
    // args: {
    //    elemType,
    //    lazy,
    //    placeholder,
    //    ,
    //}
    createFunc({"lazy": (nixScope)=>(false),"placeholder": (nixScope)=>("name"),}, null, {}, (nixScope)=>(
                    nixScope["mkOptionType"]((function(){
            const obj = {};
            obj["name"] = (operators.ifThenElse(nixScope["lazy"], ()=>("lazyAttrsOf"), ()=>("attrsOf")));
            obj["description"] = operators.add(((operators.ifThenElse(nixScope["lazy"], ()=>("lazy attribute set"), ()=>("attribute set")))), (new InterpolatedString([" of ", ""], [()=>(nixScope["optionDescriptionPhrase"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["class"] = arg; runtime.scopeStack.push(nixScope); try { return operators.or(operators.equal(nixScope["class"], "noun"), operators.equal(nixScope["class"], "composite")); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["elemType"]))])));
            obj["descriptionClass"] = "composite";
            obj["check"] = nixScope["isAttrs"];
            obj["merge"] = (operators.ifThenElse(nixScope["lazy"], ()=>(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["zipAttrsWith"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "merged", {enumerable: true, get(){return nixScope["mergeDefinitions"]((operators.listConcat(nixScope["loc"], [nixScope["name"]])))(nixScope["elemType"])(nixScope["defs"]);}});
                return operators.selectOrDefault(nixScope["merged"], ["optionalValue", "value"], operators.selectOrDefault(nixScope["elemType"], ["emptyValue", "value"], nixScope["merged"]["mergedValue"]));
            } finally {
                runtime.scopeStack.pop();
            }
        })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["pushPositions"](nixScope["defs"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))), ()=>(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["v"]["value"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["filterAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return operators.hasAttr(nixScope["v"], "value"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["zipAttrsWith"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return (nixScope["mergeDefinitions"]((operators.listConcat(nixScope["loc"], [nixScope["name"]])))(nixScope["elemType"])((nixScope["defs"])))["optionalValue"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["pushPositions"](nixScope["defs"]))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))));
            obj["emptyValue"] = ({"value": {}});
            obj["getSubOptions"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prefix"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["elemType"]["getSubOptions"]((operators.listConcat(nixScope["prefix"], [(new InterpolatedString(["<", ">"], [()=>(nixScope["placeholder"])]))]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["getSubModules"] = nixScope["elemType"]["getSubModules"];
            obj["substSubModules"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["attrsWith"](({"elemType": nixScope["elemType"]["substSubModules"](nixScope["m"]), "lazy": nixScope["lazy"], "placeholder": nixScope["placeholder"]})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["functor"] = operators.merge((nixScope["elemTypeFunctor"]("attrsWith")(({"elemType": nixScope["elemType"], "lazy": nixScope["lazy"], "placeholder": nixScope["placeholder"]}))), ({"binOp": nixScope["binOp"]}));
            if (obj["nestedTypes"] === undefined) obj["nestedTypes"] = {};
            obj["nestedTypes"]["elemType"] = nixScope["elemType"];
            return obj;
        })())
                ));
        } finally {
            runtime.scopeStack.pop();
        }
    })();}});
            Object.defineProperty(nixScope, "loaOf", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["elemType"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["types"]["attrsOf"](nixScope["elemType"]), (function(){
        const obj = {};
        obj["name"] = "loaOf";
        obj["deprecationMessage"] = operators.add(operators.add("Mixing lists with attribute values is no longer", " possible; please use `types.attrsOf` instead. See"), " https://github.com/NixOS/nixpkgs/issues/1800 for the motivation.");
        if (obj["nestedTypes"] === undefined) obj["nestedTypes"] = {};
        obj["nestedTypes"]["elemType"] = nixScope["elemType"];
        return obj;
    })()); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "attrTag", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["tags"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "tags_", {enumerable: true, get(){return nixScope["tags"];}});
            return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "tags", {enumerable: true, get(){return nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["opt"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["builtins"]["addErrorContext"]((new InterpolatedString(["while checking that attrTag tag ", " is an option with a type", ""], [()=>(nixScope["lib"]["strings"]["escapeNixIdentifier"](nixScope["n"])), ()=>(nixScope["inAttrPosSuffix"](nixScope["tags_"])(nixScope["n"]))])))((operators.merge(nixScope["throwIf"]((operators.notEqual(operators.selectOrDefault(nixScope["opt"], ["_type"], null), "option")))((new InterpolatedString(["In attrTag, each tag value must be an option, but tag ", " ", ""], [()=>(nixScope["lib"]["strings"]["escapeNixIdentifier"](nixScope["n"])), ()=>((operators.ifThenElse(operators.hasAttr(nixScope["opt"], "_type"), ()=>((operators.ifThenElse(operators.equal(nixScope["opt"]["_type"], "option-type"), ()=>("was a bare type, not wrapped in mkOption."), ()=>((new InterpolatedString(["was of type ", "."], [()=>(nixScope["lib"]["strings"]["escapeNixString"](nixScope["opt"]["_type"]))])))))), ()=>("was not."))))])))(nixScope["opt"]), ({"declarations": operators.selectOrDefault(nixScope["opt"], ["declarations"], ((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "pos", {enumerable: true, get(){return nixScope["builtins"]["unsafeGetAttrPos"](nixScope["n"])(nixScope["tags_"]);}});
            return (operators.ifThenElse(operators.equal(nixScope["pos"], null), ()=>([]), ()=>([nixScope["pos"]["file"]])));
        } finally {
            runtime.scopeStack.pop();
        }
    })())), "declarationPositions": operators.selectOrDefault(nixScope["opt"], ["declarationPositions"], ((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "pos", {enumerable: true, get(){return nixScope["builtins"]["unsafeGetAttrPos"](nixScope["n"])(nixScope["tags_"]);}});
            return (operators.ifThenElse(operators.equal(nixScope["pos"], null), ()=>([]), ()=>([nixScope["pos"]])));
        } finally {
            runtime.scopeStack.pop();
        }
    })()))})))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["tags_"]);}});
            Object.defineProperty(nixScope, "choicesStr", {enumerable: true, get(){return nixScope["concatMapStringsSep"](", ")(nixScope["lib"]["strings"]["escapeNixIdentifier"])((nixScope["attrNames"](nixScope["tags"])));}});
            return nixScope["mkOptionType"](({"name": "attrTag", "description": "attribute-tagged union", "descriptionClass": "noun", "getSubOptions": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prefix"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["tagName"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["tagOption"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["tagOption"], ({"loc": operators.listConcat(nixScope["prefix"], [nixScope["tagName"]])})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["tags"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "check": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and(operators.and(nixScope["isAttrs"](nixScope["v"]), operators.equal(nixScope["length"]((nixScope["attrNames"](nixScope["v"]))), 1n)), operators.hasAttr(nixScope["tags"], nixScope["head"]((nixScope["attrNames"](nixScope["v"]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "merge": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "choice", {enumerable: true, get(){return nixScope["head"]((nixScope["attrNames"]((nixScope["head"](nixScope["defs"]))["value"])));}});
            Object.defineProperty(nixScope, "checkedValueDefs", {enumerable: true, get(){return nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "(length (attrNames def.value)) == 1");
        }
        return (operators.ifThenElse(operators.notEqual((nixScope["head"]((nixScope["attrNames"](nixScope["def"]["value"])))), nixScope["choice"]), ()=>(nixScope["throw"]((new InterpolatedString(["The option `", "` is defined both as `", "` and `", "`, in ", "."], [()=>(nixScope["showOption"](nixScope["loc"])), ()=>(nixScope["choice"]), ()=>(nixScope["head"]((nixScope["attrNames"](nixScope["def"]["value"])))), ()=>(nixScope["showFiles"]((nixScope["getFiles"](nixScope["defs"]))))])))), ()=>((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["file"] = nixScope["def"]["file"];
            obj["value"] = nixScope["def"]["value"][nixScope["choice"]];
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })())));
    })(operators.equal((nixScope["length"]((nixScope["attrNames"](nixScope["def"]["value"])))), 1n)); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["defs"]);}});
            return (operators.ifThenElse(operators.hasAttr(nixScope["tags"], nixScope["choice"]), ()=>((function(){
        const obj = {};
        obj[nixScope["choice"]] = (nixScope["lib"]["modules"]["evalOptionValue"]((operators.listConcat(nixScope["loc"], [nixScope["choice"]])))(nixScope["tags"][nixScope["choice"]])(nixScope["checkedValueDefs"]))["value"];
        return obj;
    })()), ()=>(nixScope["throw"]((new InterpolatedString(["The option `", "` is defined as ", ", but ", " is not among the valid choices (", "). Value ", " was defined in ", "."], [()=>(nixScope["showOption"](nixScope["loc"])), ()=>(nixScope["lib"]["strings"]["escapeNixIdentifier"](nixScope["choice"])), ()=>(nixScope["lib"]["strings"]["escapeNixIdentifier"](nixScope["choice"])), ()=>(nixScope["choicesStr"]), ()=>(nixScope["choice"]), ()=>(nixScope["showFiles"]((nixScope["getFiles"](nixScope["defs"]))))]))))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "nestedTypes": nixScope["tags"], "functor": operators.merge(nixScope["defaultFunctor"]("attrTag"), ({"type": 
    
    // args: {
    //    tags,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    nixScope["types"]["attrTag"](nixScope["tags"])
                )), "payload": ({"tags": nixScope["tags"]}), "binOp": (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "wrapOptionDecl", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["option"] = arg; runtime.scopeStack.push(nixScope); try { return ({"options": nixScope["option"], "_file": "<attrTag {...}>", "pos": null}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["a"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["b"] = arg; runtime.scopeStack.push(nixScope); try { return ({"tags": operators.merge(nixScope["a"]["tags"], operators.merge(nixScope["b"]["tags"], nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["tagName"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["bOpt"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["lib"]["mergeOptionDecls"]([nixScope["tagName"]])([(nixScope["wrapOptionDecl"](nixScope["a"]["tags"][nixScope["tagName"]])),(nixScope["wrapOptionDecl"](nixScope["bOpt"]))]), ({"declarations": operators.listConcat(nixScope["a"]["tags"][nixScope["tagName"]]["declarations"], nixScope["bOpt"]["declarations"]), "declarationPositions": operators.listConcat(nixScope["a"]["tags"][nixScope["tagName"]]["declarationPositions"], nixScope["bOpt"]["declarationPositions"])})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["builtins"]["intersectAttrs"](nixScope["a"]["tags"])(nixScope["b"]["tags"])))))}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        } finally {
            runtime.scopeStack.pop();
        }
    })()}))}));
        } finally {
            runtime.scopeStack.pop();
        }
    })();
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "luaInline", {enumerable: true, get(){return nixScope["mkOptionType"](({"name": "luaInline", "description": "inline lua", "descriptionClass": "noun", "check": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(operators.selectOrDefault(nixScope["x"], ["_type"], null), "lua-inline"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "merge": nixScope["mergeEqualOption"]}));}});
            Object.defineProperty(nixScope, "uniq", {enumerable: true, get(){return nixScope["unique"](({"message": ""}));}});
            Object.defineProperty(nixScope, "unique", {enumerable: true, get(){return 
    
    // args: {
    //    message,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["type"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkOptionType"]((function(){
            const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
            nixScope["nestedTypes"] = {};
            nixScope["name"] = "unique";
            nixScope["description"] = nixScope["type"]["description"];
            nixScope["descriptionClass"] = nixScope["type"]["descriptionClass"];
            nixScope["check"] = nixScope["type"]["check"];
            nixScope["nestedTypes"]["elemType"] = nixScope["type"];
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "merge", {enumerable: true, get(){return nixScope["mergeUniqueOption"]((function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
            const obj = {};
                obj["message"] = nixScope["message"];
                obj["merge"] = nixScope["type"]["merge"];
            return obj;
            } finally {
                runtime.scopeStack.pop();
            }
        })());}});
                Object.defineProperty(nixScope, "emptyValue", {enumerable: true, get(){return nixScope["type"]["emptyValue"];}});
                Object.defineProperty(nixScope, "getSubOptions", {enumerable: true, get(){return nixScope["type"]["getSubOptions"];}});
                Object.defineProperty(nixScope, "getSubModules", {enumerable: true, get(){return nixScope["type"]["getSubModules"];}});
                Object.defineProperty(nixScope, "substSubModules", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["uniq"]((nixScope["type"]["substSubModules"](nixScope["m"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                Object.defineProperty(nixScope, "functor", {enumerable: true, get(){return operators.merge(nixScope["elemTypeFunctor"](nixScope["name"])(({"elemType": nixScope["type"]})), ({"type": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["payload"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["types"]["unique"](({"message": nixScope["message"]}))(nixScope["payload"]["elemType"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));}});
                return nixScope;
            } finally {
                runtime.scopeStack.pop();
            }
        })()); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])
                ));}});
            Object.defineProperty(nixScope, "nullOr", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["elemType"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkOptionType"]((function(){
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
        nixScope["nestedTypes"] = {};
        nixScope["name"] = "nullOr";
        nixScope["description"] = (new InterpolatedString(["null or ", ""], [()=>(nixScope["optionDescriptionPhrase"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["class"] = arg; runtime.scopeStack.push(nixScope); try { return operators.or(operators.equal(nixScope["class"], "noun"), operators.equal(nixScope["class"], "conjunction")); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["elemType"]))]));
        nixScope["descriptionClass"] = "conjunction";
        nixScope["nestedTypes"]["elemType"] = nixScope["elemType"];
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "check", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.or(operators.equal(nixScope["x"], null), nixScope["elemType"]["check"](nixScope["x"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "merge", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "nrNulls", {enumerable: true, get(){return nixScope["count"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(nixScope["def"]["value"], null); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["defs"]);}});
            return (operators.ifThenElse(operators.equal(nixScope["nrNulls"], nixScope["length"](nixScope["defs"])), ()=>(null), ()=>((operators.ifThenElse(operators.notEqual(nixScope["nrNulls"], 0n), ()=>(nixScope["throw"]((new InterpolatedString(["The option `", "` is defined both null and not null, in ", "."], [()=>(nixScope["showOption"](nixScope["loc"])), ()=>(nixScope["showFiles"]((nixScope["getFiles"](nixScope["defs"]))))])))), ()=>(nixScope["elemType"]["merge"](nixScope["loc"])(nixScope["defs"])))))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "emptyValue", {enumerable: true, get(){return ({"value": null});}});
            Object.defineProperty(nixScope, "getSubOptions", {enumerable: true, get(){return nixScope["elemType"]["getSubOptions"];}});
            Object.defineProperty(nixScope, "getSubModules", {enumerable: true, get(){return nixScope["elemType"]["getSubModules"];}});
            Object.defineProperty(nixScope, "substSubModules", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["nullOr"]((nixScope["elemType"]["substSubModules"](nixScope["m"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "functor", {enumerable: true, get(){return operators.merge((nixScope["elemTypeFunctor"](nixScope["name"])(({"elemType": nixScope["elemType"]}))), ({"type": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["payload"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["types"]["nullOr"](nixScope["payload"]["elemType"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));}});
            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })()); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "functionTo", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["elemType"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkOptionType"]((function(){
        const obj = {};
        obj["name"] = "functionTo";
        obj["description"] = (new InterpolatedString(["function that evaluates to a(n) ", ""], [()=>(nixScope["optionDescriptionPhrase"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["class"] = arg; runtime.scopeStack.push(nixScope); try { return operators.or(operators.equal(nixScope["class"], "noun"), operators.equal(nixScope["class"], "composite")); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["elemType"]))]));
        obj["descriptionClass"] = "composite";
        obj["check"] = nixScope["isFunction"];
        obj["merge"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return ({"__functionArgs": nixScope["lib"]["zipAttrsWith"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["lib"]["all"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["lib"]["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fn"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["lib"]["functionArgs"](nixScope["fn"]["value"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["defs"]))), "__functor": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["callerArgs"] = arg; runtime.scopeStack.push(nixScope); try { return (nixScope["mergeDefinitions"]((operators.listConcat(nixScope["loc"], ["<function body>"])))(nixScope["elemType"])((nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fn"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["file"] = nixScope["fn"]["file"];
            obj["value"] = nixScope["fn"]["value"](nixScope["callerArgs"]);
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["defs"]))))["mergedValue"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        obj["getSubOptions"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prefix"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["elemType"]["getSubOptions"]((operators.listConcat(nixScope["prefix"], ["<function body>"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        obj["getSubModules"] = nixScope["elemType"]["getSubModules"];
        obj["substSubModules"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["functionTo"]((nixScope["elemType"]["substSubModules"](nixScope["m"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        obj["functor"] = operators.merge((nixScope["elemTypeFunctor"]("functionTo")(({"elemType": nixScope["elemType"]}))), ({"type": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["payload"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["types"]["functionTo"](nixScope["payload"]["elemType"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));
        if (obj["nestedTypes"] === undefined) obj["nestedTypes"] = {};
        obj["nestedTypes"]["elemType"] = nixScope["elemType"];
        return obj;
    })()); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "submodule", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["modules"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["submoduleWith"](({"shorthandOnlyDefinesConfig": true, "modules": nixScope["toList"](nixScope["modules"])})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "deferredModule", {enumerable: true, get(){return nixScope["deferredModuleWith"]({});}});
            Object.defineProperty(nixScope, "deferredModuleWith", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["attrs"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkOptionType"]((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["name"] = "deferredModule";
            obj["description"] = "module";
            obj["descriptionClass"] = "noun";
            obj["check"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.or(operators.or(nixScope["isAttrs"](nixScope["x"]), nixScope["isFunction"](nixScope["x"])), nixScope["path"]["check"](nixScope["x"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["merge"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return ({"imports": operators.listConcat(nixScope["staticModules"], nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["lib"]["setDefaultModuleLocation"]((new InterpolatedString(["", ", via option ", ""], [()=>(nixScope["def"]["file"]), ()=>(nixScope["showOption"](nixScope["loc"]))])))(nixScope["def"]["value"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["defs"]))}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["getSubOptions"] = nixScope["submoduleWith"](({"modules": nixScope["staticModules"]}))["getSubOptions"];
            obj["getSubModules"] = nixScope["submoduleWith"](({"modules": nixScope["staticModules"]}))["getSubModules"];
            obj["substSubModules"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["deferredModuleWith"]((operators.merge(nixScope["attrs"], ({"staticModules": nixScope["m"]})))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["functor"] = operators.merge(nixScope["defaultFunctor"]("deferredModuleWith"), ({"type": nixScope["types"]["deferredModuleWith"], "payload": ({"staticModules": nixScope["staticModules"]}), "binOp": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["lhs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["rhs"] = arg; runtime.scopeStack.push(nixScope); try { return ({"staticModules": operators.listConcat(nixScope["lhs"]["staticModules"], nixScope["rhs"]["staticModules"])}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })()); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "optionType", {enumerable: true, get(){return nixScope["mkOptionType"](({"name": "optionType", "description": "optionType", "descriptionClass": "noun", "check": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(operators.selectOrDefault(nixScope["value"], ["_type"], null), "option-type"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "merge": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["length"](nixScope["defs"]), 1n), ()=>((nixScope["head"](nixScope["defs"]))["value"]), ()=>((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "optionModules", {enumerable: true, get(){return nixScope["map"]((
    
    // args: {
    //    value,
    //    file,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    ({"_file": nixScope["file"], "options": nixScope["lib"]["mkOption"](({"type": nixScope["value"]}))})
                ))))(nixScope["defs"]);}});
            Object.defineProperty(nixScope, "mergedOption", {enumerable: true, get(){return nixScope["fixupOptionType"](nixScope["loc"])((nixScope["mergeOptionDecls"](nixScope["loc"])(nixScope["optionModules"])));}});
            return nixScope["mergedOption"]["type"];
        } finally {
            runtime.scopeStack.pop();
        }
    })()))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));}});
            Object.defineProperty(nixScope, "submoduleWith", {enumerable: true, get(){return 
    
    // args: {
    //    modules,
    //    specialArgs,
    //    shorthandOnlyDefinesConfig,
    //    description,
    //    class,
    //    ,
    //}@attrs
    createFunc({"specialArgs": (nixScope)=>({}),"shorthandOnlyDefinesConfig": (nixScope)=>(false),"description": (nixScope)=>(null),"class": (nixScope)=>(null),}, "attrs", {}, (nixScope)=>(
                    (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                nixScope["evalModules"] = nixScope["lib"]["modules"]["evalModules"];
                nixScope["name"] = "submodule";
                Object.defineProperty(nixScope, "allModules", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["map"]((
        
        // args: {
        //    value,
        //    file,
        //}
        createFunc({}, null, {}, (nixScope)=>(
                        (operators.ifThenElse(operators.and(nixScope["isAttrs"](nixScope["value"]), nixScope["shorthandOnlyDefinesConfig"]), ()=>(({"_file": nixScope["file"], "config": nixScope["value"]})), ()=>(({"_file": nixScope["file"], "imports": [nixScope["value"]]}))))
                    ))))(nixScope["defs"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                Object.defineProperty(nixScope, "base", {enumerable: true, get(){return nixScope["evalModules"](({"class": nixScope["class"], "specialArgs": nixScope["specialArgs"], "modules": operators.listConcat([(function(){
            const obj = {};
            if (obj["_module"] === undefined) obj["_module"] = {};
            if (obj["_module"]["args"] === undefined) obj["_module"]["args"] = {};
            obj["_module"]["args"]["name"] = nixScope["lib"]["mkOptionDefault"]("‹name›");
            return obj;
        })()], nixScope["modules"])}));}});
                Object.defineProperty(nixScope, "freeformType", {enumerable: true, get(){return nixScope["base"]["_module"]["freeformType"];}});
                return nixScope["mkOptionType"](({"name": nixScope["name"], "description": (operators.ifThenElse(operators.notEqual(nixScope["description"], null), ()=>(nixScope["description"]), ()=>((function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "docsEval", {enumerable: true, get(){return nixScope["base"]["extendModules"](({"modules": [nixScope["noCheckForDocsModule"]]}));}});
                return operators.selectOrDefault(nixScope["docsEval"], ["_module", "freeformType", "description"], nixScope["name"]);
            } finally {
                runtime.scopeStack.pop();
            }
        })()))), "check": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.or(operators.or(nixScope["isAttrs"](nixScope["x"]), nixScope["isFunction"](nixScope["x"])), nixScope["path"]["check"](nixScope["x"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "merge": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return (nixScope["base"]["extendModules"](({"modules": operators.listConcat([(function(){
            const obj = {};
            if (obj["_module"] === undefined) obj["_module"] = {};
            if (obj["_module"]["args"] === undefined) obj["_module"]["args"] = {};
            obj["_module"]["args"]["name"] = nixScope["last"](nixScope["loc"]);
            return obj;
        })()], nixScope["allModules"](nixScope["defs"])), "prefix": nixScope["loc"]})))["config"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "emptyValue": ({"value": {}}), "getSubOptions": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prefix"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                nixScope["freeformType"] = nixScope["docsEval"]["_module"]["freeformType"];
                Object.defineProperty(nixScope, "docsEval", {enumerable: true, get(){return (nixScope["base"]["extendModules"](({"prefix": nixScope["prefix"], "modules": [nixScope["noCheckForDocsModule"]]})));}});
                return operators.merge(nixScope["docsEval"]["options"], nixScope["optionalAttrs"]((operators.notEqual(nixScope["freeformType"], null)))(({"_freeformOptions": nixScope["freeformType"]["getSubOptions"](nixScope["prefix"])})));
            } finally {
                runtime.scopeStack.pop();
            }
        })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "getSubModules": nixScope["modules"], "substSubModules": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["submoduleWith"]((operators.merge(nixScope["attrs"], ({"modules": nixScope["m"]})))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "nestedTypes": nixScope["lib"]["optionalAttrs"]((operators.notEqual(nixScope["freeformType"], null)))(({"freeformType": nixScope["freeformType"]})), "functor": operators.merge(nixScope["defaultFunctor"](nixScope["name"]), ({"type": nixScope["types"]["submoduleWith"], "payload": ({"modules": nixScope["modules"], "class": nixScope["class"], "specialArgs": nixScope["specialArgs"], "shorthandOnlyDefinesConfig": nixScope["shorthandOnlyDefinesConfig"], "description": nixScope["description"]}), "binOp": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["lhs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["rhs"] = arg; runtime.scopeStack.push(nixScope); try { return ({"class": (operators.ifThenElse(operators.equal(operators.selectOrDefault(nixScope["lhs"], ["class"], null), null), ()=>(operators.selectOrDefault(nixScope["rhs"], ["class"], null)), ()=>((operators.ifThenElse(operators.equal(operators.selectOrDefault(nixScope["rhs"], ["class"], null), null), ()=>(operators.selectOrDefault(nixScope["lhs"], ["class"], null)), ()=>((operators.ifThenElse(operators.equal(operators.selectOrDefault(nixScope["lhs"], ["class"], null), nixScope["rhs"]["class"]), ()=>(operators.selectOrDefault(nixScope["lhs"], ["class"], null)), ()=>(nixScope["throw"]((new InterpolatedString(["A submoduleWith option is declared multiple times with conflicting class values ", " and ", "."], [()=>(nixScope["toString"](nixScope["lhs"]["class"])), ()=>(nixScope["toString"](nixScope["rhs"]["class"]))])))))))))))), "modules": operators.listConcat(nixScope["lhs"]["modules"], nixScope["rhs"]["modules"]), "specialArgs": (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "intersecting", {enumerable: true, get(){return nixScope["builtins"]["intersectAttrs"](nixScope["lhs"]["specialArgs"])(nixScope["rhs"]["specialArgs"]);}});
                return (operators.ifThenElse(operators.equal(nixScope["intersecting"], {}), ()=>(operators.merge(nixScope["lhs"]["specialArgs"], nixScope["rhs"]["specialArgs"])), ()=>(nixScope["throw"]((new InterpolatedString(["A submoduleWith option is declared multiple times with the same specialArgs ", ""], [()=>(nixScope["toString"]((nixScope["attrNames"](nixScope["intersecting"]))))]))))));
            } finally {
                runtime.scopeStack.pop();
            }
        })(), "shorthandOnlyDefinesConfig": (operators.ifThenElse(operators.equal(nixScope["lhs"]["shorthandOnlyDefinesConfig"], null), ()=>(nixScope["rhs"]["shorthandOnlyDefinesConfig"]), ()=>((operators.ifThenElse(operators.equal(nixScope["rhs"]["shorthandOnlyDefinesConfig"], null), ()=>(nixScope["lhs"]["shorthandOnlyDefinesConfig"]), ()=>((operators.ifThenElse(operators.equal(nixScope["lhs"]["shorthandOnlyDefinesConfig"], nixScope["rhs"]["shorthandOnlyDefinesConfig"]), ()=>(nixScope["lhs"]["shorthandOnlyDefinesConfig"]), ()=>(nixScope["throw"]("A submoduleWith option is declared multiple times with conflicting shorthandOnlyDefinesConfig values")))))))))), "description": (operators.ifThenElse(operators.equal(nixScope["lhs"]["description"], null), ()=>(nixScope["rhs"]["description"]), ()=>((operators.ifThenElse(operators.equal(nixScope["rhs"]["description"], null), ()=>(nixScope["lhs"]["description"]), ()=>((operators.ifThenElse(operators.equal(nixScope["lhs"]["description"], nixScope["rhs"]["description"]), ()=>(nixScope["lhs"]["description"]), ()=>(nixScope["throw"]("A submoduleWith option is declared multiple times with conflicting descriptions"))))))))))}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}))}));
            } finally {
                runtime.scopeStack.pop();
            }
        })()
                ));}});
            Object.defineProperty(nixScope, "enum", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["values"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["unique"] = nixScope["lib"]["lists"]["unique"];
            Object.defineProperty(nixScope, "show", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["builtins"]["isString"](nixScope["v"]), ()=>((new InterpolatedString(["\"", "\""], [()=>(nixScope["v"])]))), ()=>((operators.ifThenElse(nixScope["builtins"]["isInt"](nixScope["v"]), ()=>(nixScope["builtins"]["toString"](nixScope["v"])), ()=>((operators.ifThenElse(nixScope["builtins"]["isBool"](nixScope["v"]), ()=>(nixScope["boolToString"](nixScope["v"])), ()=>((new InterpolatedString(["<", ">"], [()=>(nixScope["builtins"]["typeOf"](nixScope["v"]))]))))))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return nixScope["mkOptionType"]((function(){
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
        nixScope["name"] = "enum";
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "description", {enumerable: true, get(){return (operators.ifThenElse(operators.equal(nixScope["values"], []), ()=>("impossible (empty enum)"), ()=>((operators.ifThenElse(operators.equal(nixScope["builtins"]["length"](nixScope["values"]), 1n), ()=>((new InterpolatedString(["value ", " (singular enum)"], [()=>(nixScope["show"]((nixScope["builtins"]["head"](nixScope["values"]))))]))), ()=>((new InterpolatedString(["one of ", ""], [()=>(nixScope["concatMapStringsSep"](", ")(nixScope["show"])(nixScope["values"]))]))))))));}});
            Object.defineProperty(nixScope, "descriptionClass", {enumerable: true, get(){return (operators.ifThenElse(operators.lessThan(nixScope["builtins"]["length"](nixScope["values"]), 2n), ()=>("noun"), ()=>("conjunction")));}});
            Object.defineProperty(nixScope, "check", {enumerable: true, get(){return nixScope["flip"](nixScope["elem"])(nixScope["values"]);}});
            Object.defineProperty(nixScope, "merge", {enumerable: true, get(){return nixScope["mergeEqualOption"];}});
            Object.defineProperty(nixScope, "functor", {enumerable: true, get(){return operators.merge((nixScope["defaultFunctor"](nixScope["name"])), ({"payload": ({"values": nixScope["values"]}), "type": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["payload"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["types"]["enum"](nixScope["payload"]["values"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "binOp": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["a"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["b"] = arg; runtime.scopeStack.push(nixScope); try { return ({"values": nixScope["unique"]((operators.listConcat(nixScope["a"]["values"], nixScope["b"]["values"])))}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));}});
            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })());
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "either", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["t1"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["t2"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkOptionType"]((function(){
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
        nixScope["nestedTypes"] = {};
        nixScope["name"] = "either";
        nixScope["descriptionClass"] = "conjunction";
        nixScope["nestedTypes"]["left"] = nixScope["t1"];
        nixScope["nestedTypes"]["right"] = nixScope["t2"];
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "description", {enumerable: true, get(){return (operators.ifThenElse(operators.equal(operators.selectOrDefault(nixScope["t1"], ["descriptionClass"], null), "nonRestrictiveClause"), ()=>((new InterpolatedString(["", ", or ", ""], [()=>(nixScope["t1"]["description"]), ()=>(nixScope["optionDescriptionPhrase"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["class"] = arg; runtime.scopeStack.push(nixScope); try { return operators.or(operators.equal(nixScope["class"], "noun"), operators.equal(nixScope["class"], "conjunction")); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["t2"]))]))), ()=>((new InterpolatedString(["", " or ", ""], [()=>(nixScope["optionDescriptionPhrase"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["class"] = arg; runtime.scopeStack.push(nixScope); try { return operators.or(operators.equal(nixScope["class"], "noun"), operators.equal(nixScope["class"], "conjunction")); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["t1"])), ()=>(nixScope["optionDescriptionPhrase"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["class"] = arg; runtime.scopeStack.push(nixScope); try { return operators.or(operators.or(operators.equal(nixScope["class"], "noun"), operators.equal(nixScope["class"], "conjunction")), operators.equal(nixScope["class"], "composite")); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["t2"]))])))));}});
            Object.defineProperty(nixScope, "check", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.or(nixScope["t1"]["check"](nixScope["x"]), nixScope["t2"]["check"](nixScope["x"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "merge", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "defList", {enumerable: true, get(){return nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["d"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["d"]["value"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["defs"]);}});
            return (operators.ifThenElse(nixScope["all"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["t1"]["check"](nixScope["x"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["defList"]), ()=>(nixScope["t1"]["merge"](nixScope["loc"])(nixScope["defs"])), ()=>((operators.ifThenElse(nixScope["all"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["t2"]["check"](nixScope["x"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["defList"]), ()=>(nixScope["t2"]["merge"](nixScope["loc"])(nixScope["defs"])), ()=>(nixScope["mergeOneOption"](nixScope["loc"])(nixScope["defs"])))))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "typeMerge", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f'"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "mt1", {enumerable: true, get(){return nixScope["t1"]["typeMerge"]((nixScope["elemAt"](nixScope["f'"]["payload"]["elemType"])(0n))["functor"]);}});
            Object.defineProperty(nixScope, "mt2", {enumerable: true, get(){return nixScope["t2"]["typeMerge"]((nixScope["elemAt"](nixScope["f'"]["payload"]["elemType"])(1n))["functor"]);}});
            return (operators.ifThenElse(operators.and(operators.and((operators.equal(nixScope["name"], nixScope["f'"]["name"])), (operators.notEqual(nixScope["mt1"], null))), (operators.notEqual(nixScope["mt2"], null))), ()=>(nixScope["functor"]["type"](nixScope["mt1"])(nixScope["mt2"])), ()=>(null)));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "functor", {enumerable: true, get(){return nixScope["elemTypeFunctor"](nixScope["name"])(({"elemType": [nixScope["t1"],nixScope["t2"]]}));}});
            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })()); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "oneOf", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["ts"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "head'", {enumerable: true, get(){return (operators.ifThenElse(operators.equal(nixScope["ts"], []), ()=>(nixScope["throw"]("types.oneOf needs to get at least one type in its argument")), ()=>(nixScope["head"](nixScope["ts"]))));}});
            Object.defineProperty(nixScope, "tail'", {enumerable: true, get(){return nixScope["tail"](nixScope["ts"]);}});
            return nixScope["foldl'"](nixScope["either"])(nixScope["head'"])(nixScope["tail'"]);
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "coercedTo", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["coercedType"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["coerceFunc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["finalType"] = arg; runtime.scopeStack.push(nixScope); try { return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "lib.assertMsg (\n          coercedType.getSubModules == null\n        ) \"coercedTo: coercedType must not have submodules (it’s a ${coercedType.description})\"");
        }
        return nixScope["mkOptionType"]((function(){
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
        nixScope["nestedTypes"] = {};
        nixScope["name"] = "coercedTo";
        nixScope["description"] = (new InterpolatedString(["", " or ", " convertible to it"], [()=>(nixScope["optionDescriptionPhrase"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["class"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(nixScope["class"], "noun"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["finalType"])), ()=>(nixScope["optionDescriptionPhrase"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["class"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(nixScope["class"], "noun"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["coercedType"]))]));
        nixScope["nestedTypes"]["coercedType"] = nixScope["coercedType"];
        nixScope["nestedTypes"]["finalType"] = nixScope["finalType"];
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "check", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.or((operators.and(nixScope["coercedType"]["check"](nixScope["x"]), nixScope["finalType"]["check"]((nixScope["coerceFunc"](nixScope["x"]))))), nixScope["finalType"]["check"](nixScope["x"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "merge", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "coerceVal", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["val"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["coercedType"]["check"](nixScope["val"]), ()=>(nixScope["coerceFunc"](nixScope["val"])), ()=>(nixScope["val"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return nixScope["finalType"]["merge"](nixScope["loc"])((nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["def"], ({"value": nixScope["coerceVal"](nixScope["def"]["value"])})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["defs"])));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "emptyValue", {enumerable: true, get(){return nixScope["finalType"]["emptyValue"];}});
            Object.defineProperty(nixScope, "getSubOptions", {enumerable: true, get(){return nixScope["finalType"]["getSubOptions"];}});
            Object.defineProperty(nixScope, "getSubModules", {enumerable: true, get(){return nixScope["finalType"]["getSubModules"];}});
            Object.defineProperty(nixScope, "substSubModules", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["coercedTo"](nixScope["coercedType"])(nixScope["coerceFunc"])((nixScope["finalType"]["substSubModules"](nixScope["m"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "typeMerge", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["t"] = arg; runtime.scopeStack.push(nixScope); try { return null; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "functor", {enumerable: true, get(){return operators.merge((nixScope["defaultFunctor"](nixScope["name"])), ({"wrappedDeprecationMessage": nixScope["makeWrappedDeprecationMessage"](({"elemType": nixScope["finalType"]}))}));}});
            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })());
    })(nixScope["lib"]["assertMsg"]((operators.equal(nixScope["coercedType"]["getSubModules"], null)))((new InterpolatedString(["coercedTo: coercedType must not have submodules (it’s a ", ")"], [()=>(nixScope["coercedType"]["description"])])))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "addCheck", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["elemType"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["check"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["elemType"], ({"check": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and(nixScope["elemType"]["check"](nixScope["x"]), nixScope["check"](nixScope["x"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })();}});
            Object.defineProperty(nixScope, "mergeTypes", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["a"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["b"] = arg; runtime.scopeStack.push(nixScope); try { return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "isOptionType a && isOptionType b");
        }
        return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "merged", {enumerable: true, get(){return nixScope["a"]["typeMerge"](nixScope["b"]["functor"]);}});
            return (operators.ifThenElse(operators.equal(nixScope["merged"], null), ()=>(nixScope["setType"]("merge-error")(({"error": "Cannot merge types"}))), ()=>(nixScope["merged"])));
        } finally {
            runtime.scopeStack.pop();
        }
    })();
    })(operators.and(nixScope["isOptionType"](nixScope["a"]), nixScope["isOptionType"](nixScope["b"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })();}});
            return operators.merge(nixScope["outer_types"], nixScope["outer_types"]["types"]);
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))