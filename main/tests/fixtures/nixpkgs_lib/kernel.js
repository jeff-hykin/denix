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
            nixScope["mkIf"] = nixScope["lib"]["mkIf"];
            nixScope["versionAtLeast"] = nixScope["lib"]["versionAtLeast"];
            nixScope["versionOlder"] = nixScope["lib"]["versionOlder"];
            return ({"option": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["x"], ({"optional": true})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "yes": ({"tristate": "y", "optional": false}), "no": ({"tristate": "n", "optional": false}), "module": ({"tristate": "m", "optional": false}), "unset": ({"tristate": null, "optional": false}), "freeform": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return ({"freeform": nixScope["x"], "optional": false}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "whenHelpers": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["version"] = arg; runtime.scopeStack.push(nixScope); try { return ({"whenAtLeast": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["ver"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkIf"]((nixScope["versionAtLeast"](nixScope["version"])(nixScope["ver"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "whenOlder": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["ver"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkIf"]((nixScope["versionOlder"](nixScope["version"])(nixScope["ver"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "whenBetween": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["verLow"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["verHigh"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkIf"]((operators.and(nixScope["versionAtLeast"](nixScope["version"])(nixScope["verLow"]), nixScope["versionOlder"](nixScope["version"])(nixScope["verHigh"])))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])});
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))