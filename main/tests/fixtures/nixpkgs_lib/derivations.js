import { createRuntime, createFunc } from "../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["genAttrs"] = nixScope["lib"]["genAttrs"];
            nixScope["isString"] = nixScope["lib"]["isString"];
            nixScope["mapAttrs"] = nixScope["lib"]["mapAttrs"];
            nixScope["removeAttrs"] = nixScope["lib"]["removeAttrs"];
            nixScope["throwIfNot"] = nixScope["lib"]["throwIfNot"];
            Object.defineProperty(nixScope, "showMaybeAttrPosPre", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prefix"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["attrName"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "pos", {enumerable: true, get(){return nixScope["builtins"]["unsafeGetAttrPos"](nixScope["attrName"])(nixScope["v"]);}});
            return (operators.ifThenElse(operators.equal(nixScope["pos"], null), ()=>(""), ()=>((new InterpolatedString(["", "", ":", ":", ""], [()=>(nixScope["prefix"]), ()=>(nixScope["pos"]["file"]), ()=>(nixScope["toString"](nixScope["pos"]["line"])), ()=>(nixScope["toString"](nixScope["pos"]["column"]))])))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "showMaybePackagePosPre", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prefix"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["pkg"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.and(operators.hasAttrPath(nixScope["pkg"], "meta", "position"), nixScope["isString"](nixScope["pkg"]["meta"]["position"])), ()=>((new InterpolatedString(["", "", ""], [()=>(nixScope["prefix"]), ()=>(nixScope["pkg"]["meta"]["position"])]))), ()=>(""))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return ({"lazyDerivation": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["args"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "checked", {enumerable: true, get(){return nixScope["throwIfNot"]((operators.equal(operators.selectOrDefault(nixScope["derivation"], ["type"], null), "derivation")))("lazyDerivation: input must be a derivation.")(nixScope["throwIfNot"])((operators.equal(nixScope["derivation"]["outputs"], nixScope["outputs"])))((new InterpolatedString(["\n            lib.lazyDerivation: The derivation ", " has outputs that don't match the assumed outputs.\n\n            Assumed outputs passed to lazyDerivation", ":\n                ", ";\n\n            Actual outputs of the derivation", ":\n                ", "\n\n            If the outputs are known ahead of evaluating the derivation,\n            then update the lazyDerivation call to match the actual outputs, in the same order.\n            If lazyDerivation is passed a literal value, just change it to the actual outputs.\n            As a result it will work as before / as intended.\n\n            Otherwise, when the outputs are dynamic and can't be known ahead of time, it won't\n            be possible to add laziness, but lib.lazyDerivation may still be useful for trimming\n            the attributes.\n            If you want to keep trimming the attributes, make sure that the package is in a\n            variable (don't evaluate it twice!) and pass the variable and its outputs attribute\n            to lib.lazyDerivation. This largely defeats laziness, but keeps the trimming.\n            If none of the above works for you, replace the lib.lazyDerivation call by the\n            expression in the derivation argument.\n          "], [()=>(operators.selectOrDefault(nixScope["derivation"], ["name"], "<unknown>")), ()=>(nixScope["showMaybeAttrPosPre"](",")("outputs")(nixScope["args"])), ()=>(nixScope["lib"]["generators"]["toPretty"](({"multiline": false}))(nixScope["outputs"])), ()=>(nixScope["showMaybePackagePosPre"](",")(nixScope["derivation"])), ()=>(nixScope["lib"]["generators"]["toPretty"](({"multiline": false}))(nixScope["derivation"]["outputs"]))])))(nixScope["derivation"]);}});
            return operators.merge((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["type"] = "derivation";
            obj["outPath"] = nixScope["checked"]["outPath"];
            obj["outputName"] = nixScope["checked"]["outputName"];
            obj["drvPath"] = nixScope["checked"]["drvPath"];
            obj["name"] = nixScope["checked"]["name"];
            obj["system"] = nixScope["checked"]["system"];
            obj["outputs"] = nixScope["outputs"];
            obj["meta"] = operators.selectOrDefault(nixScope["args"], ["meta"], nixScope["checked"]["meta"]);
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })(), operators.merge(nixScope["genAttrs"](nixScope["outputs"])(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["outputName"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["checked"][nixScope["outputName"]]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))), nixScope["passthru"]));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "optionalDrvAttr": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["cond"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["cond"], ()=>(nixScope["value"]), ()=>(null))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "warnOnInstantiate": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["msg"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["drv"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "drvToWrap", {enumerable: true, get(){return nixScope["removeAttrs"](nixScope["drv"])(["meta","name","type","outputName"]);}});
            return operators.merge(nixScope["drv"], nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["lib"]["warn"](nixScope["msg"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["drvToWrap"]));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])});
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))