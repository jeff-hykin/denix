import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()

export default // args: {
//    lib,
//    config,
//}
createFunc({}, null, {}, (nixScope)=>(
                ({"imports": [(nixScope["lib"]["doRename"](({"from": ["a","b"], "to": ["c","d","e"], "warn": true, "use": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "visible": true})))], "options": (function(){
        const obj = {};
        obj["warnings"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["listOf"](nixScope["lib"]["types"]["str"])}));
        obj["result"] = nixScope["lib"]["mkOption"]({});
        if (obj["c"] === undefined) obj["c"] = {};
        if (obj["c"]["d"] === undefined) obj["c"]["d"] = {};
        obj["c"]["d"]["e"] = nixScope["lib"]["mkOption"]({});
        return obj;
    })(), "config": (function(){
        const obj = {};
        obj["result"] = nixScope["lib"]["concatStringsSep"]("%")(nixScope["config"]["warnings"]);
        if (obj["a"] === undefined) obj["a"] = {};
        obj["a"]["b"] = 1234n;
        return obj;
    })()})
            ))