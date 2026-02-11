import { createRuntime, createFunc } from "../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default // args: {
//    lib,
//    pkgs,
//    ,
//}
createFunc({"lib": (nixScope)=>(nixScope["pkgs"]["lib"]),}, null, {}, (nixScope)=>(
                nixScope["builtins"]["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["attr"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["pkg"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["lib"]["versionAtLeast"](nixScope["pkg"]["version"])("2.29pre"), ()=>(nixScope["pkg"]["overrideScope"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["finalScope"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prevScope"] = arg; runtime.scopeStack.push(nixScope); try { return ({"aws-sdk-cpp": null}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))), ()=>(nixScope["pkg"]["override"](({"withAWS": false}))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["pkgs"]["nixVersions"])
            ))