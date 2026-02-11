import { createRuntime, createFunc } from "../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default //
//
//
//
//
//
//
//
(function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["super"] = arg; runtime.scopeStack.push(nixScope); try { return ({"path": operators.merge(nixScope["super"]["path"], ({"splitRoot": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "parts", {enumerable: true, get(){return nixScope["super"]["path"]["splitRoot"](nixScope["path"]);}});
        Object.defineProperty(nixScope, "components", {enumerable: true, get(){return nixScope["self"]["path"]["subpath"]["components"](nixScope["parts"]["subpath"]);}});
        Object.defineProperty(nixScope, "count", {enumerable: true, get(){return nixScope["self"]["length"](nixScope["components"]);}});
        Object.defineProperty(nixScope, "rootIndex", {enumerable: true, get(){return operators.subtract(nixScope["count"], nixScope["self"]["lists"]["findFirstIndex"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["component"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(nixScope["component"], "mock-root"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["self"]["length"](nixScope["components"])))((nixScope["self"]["reverseList"](nixScope["components"]))));}});
        Object.defineProperty(nixScope, "root", {enumerable: true, get(){return nixScope["self"]["path"]["append"](nixScope["parts"]["root"])((nixScope["self"]["path"]["subpath"]["join"]((nixScope["self"]["take"](nixScope["rootIndex"])(nixScope["components"])))));}});
        Object.defineProperty(nixScope, "subpath", {enumerable: true, get(){return nixScope["self"]["path"]["subpath"]["join"]((nixScope["self"]["drop"](nixScope["rootIndex"])(nixScope["components"])));}});
        return ({"root": nixScope["root"], "subpath": nixScope["subpath"]});
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}))}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])