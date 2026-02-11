import { createRuntime, createFunc } from "../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default /**
  Module System option handling.
*/

// args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["all"] = nixScope["lib"]["all"];
            nixScope["collect"] = nixScope["lib"]["collect"];
            nixScope["concatLists"] = nixScope["lib"]["concatLists"];
            nixScope["concatMap"] = nixScope["lib"]["concatMap"];
            nixScope["concatMapStringsSep"] = nixScope["lib"]["concatMapStringsSep"];
            nixScope["filter"] = nixScope["lib"]["filter"];
            nixScope["foldl'"] = nixScope["lib"]["foldl'"];
            nixScope["head"] = nixScope["lib"]["head"];
            nixScope["tail"] = nixScope["lib"]["tail"];
            nixScope["isAttrs"] = nixScope["lib"]["isAttrs"];
            nixScope["isBool"] = nixScope["lib"]["isBool"];
            nixScope["isDerivation"] = nixScope["lib"]["isDerivation"];
            nixScope["isFunction"] = nixScope["lib"]["isFunction"];
            nixScope["isInt"] = nixScope["lib"]["isInt"];
            nixScope["isList"] = nixScope["lib"]["isList"];
            nixScope["isString"] = nixScope["lib"]["isString"];
            nixScope["length"] = nixScope["lib"]["length"];
            nixScope["mapAttrs"] = nixScope["lib"]["mapAttrs"];
            nixScope["optional"] = nixScope["lib"]["optional"];
            nixScope["optionals"] = nixScope["lib"]["optionals"];
            nixScope["take"] = nixScope["lib"]["take"];
            nixScope["attrByPath"] = nixScope["lib"]["attrsets"]["attrByPath"];
            nixScope["optionalAttrs"] = nixScope["lib"]["attrsets"]["optionalAttrs"];
            nixScope["showAttrPath"] = nixScope["lib"]["attrsets"]["showAttrPath"];
            nixScope["concatMapStrings"] = nixScope["lib"]["strings"]["concatMapStrings"];
            nixScope["concatStringsSep"] = nixScope["lib"]["strings"]["concatStringsSep"];
            nixScope["mkOptionType"] = nixScope["lib"]["types"]["mkOptionType"];
            nixScope["last"] = nixScope["lib"]["lists"]["last"];
            nixScope["toList"] = nixScope["lib"]["lists"]["toList"];
            Object.defineProperty(nixScope, "prioritySuggestion", {enumerable: true, get(){return `
        Use \`lib.mkForce value\` or \`lib.mkDefault value\` to change the priority on any of these definitions.
      `;}});
            return (function(){
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
        nixScope["unknownModule"] = "<unknown-file>";
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "isOption", {enumerable: true, get(){return nixScope["lib"]["isType"]("option");}});
            Object.defineProperty(nixScope, "mkOption", {enumerable: true, get(){return 
    
    // args: {
    //    default,
    //    defaultText,
    //    example,
    //    description,
    //    relatedPackages,
    //    type,
    //    apply,
    //    internal,
    //    visible,
    //    readOnly,
    //    ,
    //}@attrs
    createFunc({"default": (nixScope)=>(null),"defaultText": (nixScope)=>(null),"example": (nixScope)=>(null),"description": (nixScope)=>(null),"relatedPackages": (nixScope)=>(null),"type": (nixScope)=>(null),"apply": (nixScope)=>(null),"internal": (nixScope)=>(null),"visible": (nixScope)=>(null),"readOnly": (nixScope)=>(null),}, "attrs", {}, (nixScope)=>(
                    operators.merge(nixScope["attrs"], ({"_type": "option"}))
                ));}});
            Object.defineProperty(nixScope, "mkEnableOption", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkOption"](({"default": false, "example": true, "description": (new InterpolatedString(["Whether to enable ", "."], [()=>(nixScope["name"])])), "type": nixScope["lib"]["types"]["bool"]})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mkPackageOption", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["pkgs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return 
    
    // args: {
    //    nullable,
    //    default,
    //    example,
    //    extraDescription,
    //    pkgsText,
    //    ,
    //}
    createFunc({"nullable": (nixScope)=>(false),"default": (nixScope)=>(nixScope["name"]),"example": (nixScope)=>(null),"extraDescription": (nixScope)=>(""),"pkgsText": (nixScope)=>("pkgs"),}, null, {}, (nixScope)=>(
                    (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "name'", {enumerable: true, get(){return (operators.ifThenElse(nixScope["isList"](nixScope["name"]), ()=>(nixScope["last"](nixScope["name"])), ()=>(nixScope["name"])));}});
                Object.defineProperty(nixScope, "default'", {enumerable: true, get(){return nixScope["toList"](nixScope["default"]);}});
                Object.defineProperty(nixScope, "defaultText", {enumerable: true, get(){return nixScope["showAttrPath"](nixScope["default'"]);}});
                Object.defineProperty(nixScope, "defaultValue", {enumerable: true, get(){return nixScope["attrByPath"](nixScope["default'"])((nixScope["throw"]((new InterpolatedString(["", " cannot be found in ", ""], [()=>(nixScope["defaultText"]), ()=>(nixScope["pkgsText"])])))))(nixScope["pkgs"]);}});
                Object.defineProperty(nixScope, "defaults", {enumerable: true, get(){return (operators.ifThenElse(operators.notEqual(nixScope["default"], null), ()=>(({"default": nixScope["defaultValue"], "defaultText": nixScope["literalExpression"]((new InterpolatedString(["", ".", ""], [()=>(nixScope["pkgsText"]), ()=>(nixScope["defaultText"])])))})), ()=>(nixScope["optionalAttrs"](nixScope["nullable"])(({"default": null})))));}});
                return nixScope["mkOption"]((operators.merge(nixScope["defaults"], operators.merge(({"description": operators.add(operators.add((new InterpolatedString(["The ", " package to use."], [()=>(nixScope["name'"])])), ((operators.ifThenElse(operators.equal(nixScope["extraDescription"], ""), ()=>(""), ()=>(" "))))), nixScope["extraDescription"]), "type": ((_withAttrs)=>{
            const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
            runtime.scopeStack.push(nixScope);
            try {
                return ((operators.ifThenElse(nixScope["nullable"], ()=>(nixScope["nullOr"]), ()=>(nixScope["lib"]["id"]))))(nixScope["package"]);
            } finally {
                runtime.scopeStack.pop();
            }
        })(nixScope["lib"]["types"])}), nixScope["optionalAttrs"]((operators.notEqual(nixScope["example"], null)))(({"example": nixScope["literalExpression"](((operators.ifThenElse(nixScope["isList"](nixScope["example"]), ()=>((new InterpolatedString(["", ".", ""], [()=>(nixScope["pkgsText"]), ()=>(nixScope["showAttrPath"](nixScope["example"]))]))), ()=>(nixScope["example"])))))}))))));
            } finally {
                runtime.scopeStack.pop();
            }
        })()
                )); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mkPackageOptionMD", {enumerable: true, get(){return nixScope["lib"]["warn"]("mkPackageOptionMD is deprecated and will be removed in 25.05; please use mkPackageOption.")(nixScope["mkPackageOption"]);}});
            Object.defineProperty(nixScope, "mkSinkUndeclaredOptions", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["attrs"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkOption"]((operators.merge(({"internal": true, "visible": false, "default": false, "description": "Sink for option definitions.", "type": nixScope["mkOptionType"](({"name": "sink", "check": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return true; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "merge": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return false; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})), "apply": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["throw"]("Option value is not readable because the option is not declared."); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}), nixScope["attrs"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mergeDefaultOption", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "list", {enumerable: true, get(){return nixScope["getValues"](nixScope["defs"]);}});
            return (operators.ifThenElse(operators.equal(nixScope["length"](nixScope["list"]), 1n), ()=>(nixScope["head"](nixScope["list"])), ()=>((operators.ifThenElse(nixScope["all"](nixScope["isFunction"])(nixScope["list"]), ()=>((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mergeDefaultOption"](nixScope["loc"])((nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["f"](nixScope["x"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["list"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])), ()=>((operators.ifThenElse(nixScope["all"](nixScope["isList"])(nixScope["list"]), ()=>(nixScope["concatLists"](nixScope["list"])), ()=>((operators.ifThenElse(nixScope["all"](nixScope["isAttrs"])(nixScope["list"]), ()=>(nixScope["foldl'"](nixScope["lib"]["mergeAttrs"])({})(nixScope["list"])), ()=>((operators.ifThenElse(nixScope["all"](nixScope["isBool"])(nixScope["list"]), ()=>(nixScope["foldl'"](nixScope["lib"]["or"])(false)(nixScope["list"])), ()=>((operators.ifThenElse(nixScope["all"](nixScope["isString"])(nixScope["list"]), ()=>(nixScope["lib"]["concatStrings"](nixScope["list"])), ()=>((operators.ifThenElse(operators.and(nixScope["all"](nixScope["isInt"])(nixScope["list"]), nixScope["all"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(nixScope["x"], nixScope["head"](nixScope["list"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["list"])), ()=>(nixScope["head"](nixScope["list"])), ()=>(nixScope["throw"]((new InterpolatedString(["Cannot merge definitions of `", "'. Definition values:", ""], [()=>(nixScope["showOption"](nixScope["loc"])), ()=>(nixScope["showDefs"](nixScope["defs"]))]))))))))))))))))))))))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mergeOneOption", {enumerable: true, get(){return nixScope["mergeUniqueOption"](({"message": ""}));}});
            Object.defineProperty(nixScope, "mergeUniqueOption", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["args"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["length"](nixScope["defs"]), 1n), ()=>(nixScope["merge"](nixScope["loc"])(nixScope["defs"])), ()=>(((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "length defs > 1");
        }
        return nixScope["throw"]((new InterpolatedString(["The option `", "' is defined multiple times while it's expected to be unique.", "Definition values:", "", ""], [()=>(nixScope["showOption"](nixScope["loc"])), ()=>(nixScope["message"]), ()=>(nixScope["showDefs"](nixScope["defs"])), ()=>(nixScope["prioritySuggestion"])])));
    })(operators.greaterThan(nixScope["length"](nixScope["defs"]), 1n))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mergeEqualOption", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["defs"], []), ()=>(nixScope["abort"]("This case should never happen.")), ()=>((operators.ifThenElse(operators.equal(nixScope["length"](nixScope["defs"]), 1n), ()=>((nixScope["head"](nixScope["defs"]))["value"]), ()=>((nixScope["foldl'"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["first"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.notEqual(nixScope["def"]["value"], nixScope["first"]["value"]), ()=>(nixScope["throw"]((new InterpolatedString(["The option `", "' has conflicting definition values:", "", ""], [()=>(nixScope["showOption"](nixScope["loc"])), ()=>(nixScope["showDefs"]([nixScope["first"],nixScope["def"]])), ()=>(nixScope["prioritySuggestion"])])))), ()=>(nixScope["first"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["head"](nixScope["defs"])))((nixScope["tail"](nixScope["defs"]))))["value"])))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "getValues", {enumerable: true, get(){return nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]["value"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])));}});
            Object.defineProperty(nixScope, "getFiles", {enumerable: true, get(){return nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]["file"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])));}});
            Object.defineProperty(nixScope, "optionAttrSetToDocList", {enumerable: true, get(){return nixScope["optionAttrSetToDocList'"]([]);}});
            Object.defineProperty(nixScope, "optionAttrSetToDocList'", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["options"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["concatMap"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["opt"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "name", {enumerable: true, get(){return nixScope["showOption"](nixScope["opt"]["loc"]);}});
            Object.defineProperty(nixScope, "docOption", {enumerable: true, get(){return operators.merge(({"loc": nixScope["opt"]["loc"], "name": nixScope["name"], "description": operators.selectOrDefault(nixScope["opt"], ["description"], null), "declarations": nixScope["filter"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.notEqual(nixScope["x"], nixScope["unknownModule"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["opt"]["declarations"]), "internal": operators.selectOrDefault(nixScope["opt"], ["internal"], false), "visible": (operators.ifThenElse((operators.and(operators.hasAttr(nixScope["opt"], "visible"), operators.equal(nixScope["opt"]["visible"], "shallow"))), ()=>(true), ()=>(operators.selectOrDefault(nixScope["opt"], ["visible"], true)))), "readOnly": operators.selectOrDefault(nixScope["opt"], ["readOnly"], false), "type": operators.selectOrDefault(nixScope["opt"], ["type", "description"], "unspecified")}), operators.merge(nixScope["optionalAttrs"]((operators.hasAttr(nixScope["opt"], "example")))(({"example": nixScope["builtins"]["addErrorContext"]((new InterpolatedString(["while evaluating the example of option `", "`"], [()=>(nixScope["name"])])))((nixScope["renderOptionValue"](nixScope["opt"]["example"])))})), operators.merge(nixScope["optionalAttrs"]((operators.or(operators.hasAttr(nixScope["opt"], "defaultText"), operators.hasAttr(nixScope["opt"], "default"))))(({"default": nixScope["builtins"]["addErrorContext"]((new InterpolatedString(["while evaluating the ", " of option `", "`"], [()=>((operators.ifThenElse(operators.hasAttr(nixScope["opt"], "defaultText"), ()=>("defaultText"), ()=>("default value")))), ()=>(nixScope["name"])])))((nixScope["renderOptionValue"]((operators.selectOrDefault(nixScope["opt"], ["defaultText"], nixScope["opt"]["default"])))))})), nixScope["optionalAttrs"]((operators.and(operators.hasAttr(nixScope["opt"], "relatedPackages"), operators.notEqual(nixScope["opt"]["relatedPackages"], null))))((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["relatedPackages"] = nixScope["opt"]["relatedPackages"];
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })()))));}});
            Object.defineProperty(nixScope, "subOptions", {enumerable: true, get(){return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "ss", {enumerable: true, get(){return nixScope["opt"]["type"]["getSubOptions"](nixScope["opt"]["loc"]);}});
            return (operators.ifThenElse(operators.notEqual(nixScope["ss"], {}), ()=>(nixScope["optionAttrSetToDocList'"](nixScope["opt"]["loc"])(nixScope["ss"])), ()=>([])));
        } finally {
            runtime.scopeStack.pop();
        }
    })();}});
            Object.defineProperty(nixScope, "subOptionsVisible", {enumerable: true, get(){return operators.and(nixScope["docOption"]["visible"], operators.notEqual(operators.selectOrDefault(nixScope["opt"], ["visible"], null), "shallow"));}});
            return operators.listConcat([nixScope["docOption"]], nixScope["optionals"](nixScope["subOptionsVisible"])(nixScope["subOptions"]));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["collect"](nixScope["isOption"])(nixScope["options"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "scrubOptionValue", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["isDerivation"](nixScope["x"]), ()=>(({"type": "derivation", "drvPath": nixScope["x"]["name"], "outPath": nixScope["x"]["name"], "name": nixScope["x"]["name"]})), ()=>((operators.ifThenElse(nixScope["isList"](nixScope["x"]), ()=>(nixScope["map"](nixScope["scrubOptionValue"])(nixScope["x"])), ()=>((operators.ifThenElse(nixScope["isAttrs"](nixScope["x"]), ()=>(nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["scrubOptionValue"](nixScope["v"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["removeAttrs"](nixScope["x"])(["_args"])))), ()=>(nixScope["x"]))))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "renderOptionValue", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.and(operators.hasAttr(nixScope["v"], "_type"), operators.hasAttr(nixScope["v"], "text")), ()=>(nixScope["v"]), ()=>(nixScope["literalExpression"]((nixScope["lib"]["generators"]["toPretty"](({"multiline": true, "allowPrettyValues": true}))(nixScope["v"])))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "literalExpression", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["text"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.negate(nixScope["isString"](nixScope["text"])), ()=>(nixScope["throw"]("literalExpression expects a string.")), ()=>(({"_type": "literalExpression", "text": nixScope["text"]})))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "literalExample", {enumerable: true, get(){return nixScope["lib"]["warn"]("lib.literalExample is deprecated, use lib.literalExpression instead, or use lib.literalMD for a non-Nix description.")(nixScope["literalExpression"]);}});
            Object.defineProperty(nixScope, "literalMD", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["text"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.negate(nixScope["isString"](nixScope["text"])), ()=>(nixScope["throw"]("literalMD expects a string.")), ()=>(({"_type": "literalMD", "text": nixScope["text"]})))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "showOption", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["parts"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "isNamedPlaceholder", {enumerable: true, get(){return nixScope["builtins"]["match"]("<(.*)>");}});
            Object.defineProperty(nixScope, "escapeOptionPart", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["part"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.or(operators.equal(nixScope["part"], "*"), operators.notEqual(nixScope["isNamedPlaceholder"](nixScope["part"]), null)), ()=>(nixScope["part"]), ()=>(nixScope["lib"]["strings"]["escapeNixIdentifier"](nixScope["part"])))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return (nixScope["concatStringsSep"]("."))((nixScope["map"](nixScope["escapeOptionPart"])(nixScope["parts"])));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "showFiles", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["files"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["concatStringsSep"](" and ")((nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["`", "'"], [()=>(nixScope["f"])])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["files"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "showDefs", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["concatMapStrings"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "prettyEval", {enumerable: true, get(){return nixScope["builtins"]["tryEval"]((nixScope["lib"]["generators"]["toPretty"]({})((nixScope["lib"]["generators"]["withRecursion"](({"depthLimit": 10n, "throwOnDepthLimit": false}))(nixScope["def"]["value"])))));}});
            Object.defineProperty(nixScope, "lines", {enumerable: true, get(){return nixScope["filter"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return operators.negate(nixScope["isList"](nixScope["v"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["builtins"]["split"]("")(nixScope["prettyEval"]["value"])));}});
            Object.defineProperty(nixScope, "value", {enumerable: true, get(){return nixScope["concatStringsSep"]("    ")((operators.listConcat(nixScope["take"](5n)(nixScope["lines"]), nixScope["optional"]((operators.greaterThan(nixScope["length"](nixScope["lines"]), 5n)))("..."))));}});
            Object.defineProperty(nixScope, "result", {enumerable: true, get(){return (operators.ifThenElse(operators.negate(nixScope["prettyEval"]["success"]), ()=>(""), ()=>((operators.ifThenElse(operators.greaterThan(nixScope["length"](nixScope["lines"]), 1n), ()=>(operators.add(":", nixScope["value"])), ()=>(operators.add(": ", nixScope["value"])))))));}});
            return (new InterpolatedString(["- In `", "'", ""], [()=>(nixScope["def"]["file"]), ()=>(nixScope["result"])]));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["defs"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "showOptionWithDefLocs", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["opt"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["\n    ", ", with values defined in:\n    ", "\n  "], [()=>(nixScope["showOption"](nixScope["opt"]["loc"])), ()=>(nixScope["concatMapStringsSep"]("")(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defFile"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["  - ", ""], [()=>(nixScope["defFile"])])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["opt"]["files"]))])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })();
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))