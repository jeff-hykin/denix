import { createRuntime } from "../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default /**
  Some functions for manipulating meta attributes, as well as the
  name attribute.
*/(function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        
                        // inherit arguments
                        ...arg,
                        // all-args arg (if @ syntax is used)
                        
                    }
                    runtime.scopeStack.push(nixScope)
                    try {
                        return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["matchAttrs"] = nixScope["lib"]["matchAttrs"];
        nixScope["any"] = nixScope["lib"]["any"];
        nixScope["all"] = nixScope["lib"]["all"];
        nixScope["isDerivation"] = nixScope["lib"]["isDerivation"];
        nixScope["getBin"] = nixScope["lib"]["getBin"];
        nixScope["assertMsg"] = nixScope["lib"]["assertMsg"];
        nixScope["mapAttrs'"] = nixScope["lib"]["attrsets"]["mapAttrs'"];
        nixScope["filterAttrs"] = nixScope["lib"]["attrsets"]["filterAttrs"];
        nixScope["isString"] = nixScope["builtins"]["isString"];
        nixScope["match"] = nixScope["builtins"]["match"];
        nixScope["typeOf"] = nixScope["builtins"]["typeOf"];
        return (function(){
    const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
    nixScope["defaultPriority"] = 5n;
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "addMetaAttrs", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["newAttrs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["drv"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["drv"], ({"meta": operators.merge((operators.selectOrDefault(nixScope["drv"], ["meta"], {})), nixScope["newAttrs"])})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "dontDistribute", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["drv"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["addMetaAttrs"](({"hydraPlatforms": []}))(nixScope["drv"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "setName", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["drv"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["drv"], ({"name": nixScope["name"]})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "updateName", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["updater"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["drv"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["drv"], ({"name": nixScope["updater"]((nixScope["drv"]["name"]))})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "appendToName", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["suffix"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["updateName"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "x", {enumerable: true, get(){return nixScope["builtins"]["parseDrvName"](nixScope["name"]);}});
        return (new InterpolatedString(["", "-", "-", ""], [()=>(nixScope["x"]["name"]), ()=>(nixScope["suffix"]), ()=>(nixScope["x"]["version"])]));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "mapDerivationAttrset", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["set"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["lib"]["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["pkg"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["lib"]["isDerivation"](nixScope["pkg"]), ()=>((nixScope["f"](nixScope["pkg"]))), ()=>(nixScope["pkg"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["set"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "setPrio", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["priority"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["addMetaAttrs"](({"priority": nixScope["priority"]})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "lowPrio", {enumerable: true, get(){return nixScope["setPrio"](10n);}});
        Object.defineProperty(nixScope, "lowPrioSet", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["set"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mapDerivationAttrset"](nixScope["lowPrio"])(nixScope["set"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "hiPrio", {enumerable: true, get(){return nixScope["setPrio"]((-10n));}});
        Object.defineProperty(nixScope, "hiPrioSet", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["set"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mapDerivationAttrset"](nixScope["hiPrio"])(nixScope["set"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "platformMatch", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["platform"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["elem"] = arg; runtime.scopeStack.push(nixScope); try { return ((operators.ifThenElse(nixScope["isString"](nixScope["elem"]), ()=>(operators.and(operators.hasAttr(nixScope["platform"], "system"), operators.equal(nixScope["elem"], nixScope["platform"]["system"]))), ()=>(nixScope["matchAttrs"](((operators.ifThenElse(operators.hasAttr(nixScope["elem"], "parsed"), ()=>(nixScope["elem"]), ()=>(({"parsed": nixScope["elem"]}))))))(nixScope["platform"]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "availableOn", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["platform"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["pkg"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and((operators.or((operators.negate(operators.hasAttrPath(nixScope["pkg"], "meta", "platforms"))), nixScope["any"]((nixScope["platformMatch"](nixScope["platform"])))(nixScope["pkg"]["meta"]["platforms"]))), nixScope["all"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["elem"] = arg; runtime.scopeStack.push(nixScope); try { return operators.negate(nixScope["platformMatch"](nixScope["platform"])(nixScope["elem"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((operators.selectOrDefault(nixScope["pkg"], ["meta", "badPlatforms"], [])))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "licensesSpdx", {enumerable: true, get(){return nixScope["mapAttrs'"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_key"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["license"] = arg; runtime.scopeStack.push(nixScope); try { return ({"name": nixScope["license"]["spdxId"], "value": nixScope["license"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["filterAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_key"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["license"] = arg; runtime.scopeStack.push(nixScope); try { return operators.hasAttr(nixScope["license"], "spdxId"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["lib"]["licenses"])));}});
        Object.defineProperty(nixScope, "getLicenseFromSpdxId", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["licstr"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["getLicenseFromSpdxIdOr"](nixScope["licstr"])((nixScope["lib"]["warn"]((new InterpolatedString(["getLicenseFromSpdxId: No license matches the given SPDX ID: ", ""], [()=>(nixScope["licstr"])])))(({"shortName": nixScope["licstr"]})))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "getLicenseFromSpdxIdOr", {enumerable: true, get(){return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "lowercaseLicenses", {enumerable: true, get(){return nixScope["lib"]["mapAttrs'"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return ({"name": nixScope["lib"]["toLower"](nixScope["name"]), "value": nixScope["value"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["licensesSpdx"]);}});
        return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["licstr"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["default"] = arg; runtime.scopeStack.push(nixScope); try { return operators.selectOrDefault(nixScope["lowercaseLicenses"], [nixScope["lib"]["toLower"](nixScope["licstr"])], nixScope["default"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
    } finally {
        runtime.scopeStack.pop();
    }
})();}});
        Object.defineProperty(nixScope, "getExe", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["getExe'"](nixScope["x"])((operators.selectOrDefault(nixScope["x"], ["meta", "mainProgram"], (nixScope["lib"]["warn"]((new InterpolatedString(["getExe: Package ", " does not have the meta.mainProgram attribute. We'll assume that the main program has the same name for now, but this behavior is deprecated, because it leads to surprising errors when the assumption does not hold. If the package has a main program, please set `meta.mainProgram` in its definition to make this warning go away. Otherwise, if the package does not have a main program, or if you don't control its definition, use getExe' to specify the name to the program, such as lib.getExe' foo bar."], [()=>(nixScope["lib"]["strings"]["escapeNixIdentifier"](operators.selectOrDefault(nixScope["x"], ["meta", "name"], operators.selectOrDefault(nixScope["x"], ["pname"], nixScope["x"]["name"]))))])))(nixScope["lib"]["getName"])(nixScope["x"]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "getExe'", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["y"] = arg; runtime.scopeStack.push(nixScope); try { return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "assertMsg (isDerivation x)\n      \"lib.meta.getExe': The first argument is of type ${typeOf x}, but it should be a derivation instead.\"");
    }
    return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "assertMsg (isString y)\n      \"lib.meta.getExe': The second argument is of type ${typeOf y}, but it should be a string instead.\"");
    }
    return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "assertMsg (match \".*/.*\" y == null)\n      \"lib.meta.getExe': The second argument \\\"${y}\\\" is a nested path with a \\\"/\\\" character, but it should just be the name of the executable instead.\"");
    }
    return (new InterpolatedString(["", "/bin/", ""], [()=>(nixScope["getBin"](nixScope["x"])), ()=>(nixScope["y"])]));
})(nixScope["assertMsg"]((operators.equal(nixScope["match"](".*/.*")(nixScope["y"]), null)))((new InterpolatedString(["lib.meta.getExe': The second argument ", " is a nested path with a / character, but it should just be the name of the executable instead."], [()=>(nixScope["y"])]))));
})(nixScope["assertMsg"]((nixScope["isString"](nixScope["y"])))((new InterpolatedString(["lib.meta.getExe': The second argument is of type ", ", but it should be a string instead."], [()=>(nixScope["typeOf"](nixScope["y"]))]))));
})(nixScope["assertMsg"]((nixScope["isDerivation"](nixScope["x"])))((new InterpolatedString(["lib.meta.getExe': The first argument is of type ", ", but it should be a derivation instead."], [()=>(nixScope["typeOf"](nixScope["x"]))])))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        return nixScope;
    } finally {
        runtime.scopeStack.pop();
    }
})();
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })