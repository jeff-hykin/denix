import { createRuntime } from "../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default (function(arg){
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
    const obj = {};
    obj["freeformType"] = (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "a", {enumerable: true, get(){return nixScope["lib"]["types"]["attrsOf"]((nixScope["lib"]["types"]["submodule"]((function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["bar"] = nixScope["lib"]["mkOption"]({});
    return obj;
})())));}});
        return operators.merge(nixScope["a"], ({"merge": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return ({"freeformItems": nixScope["a"]["merge"](nixScope["loc"])(nixScope["defs"])}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));
    } finally {
        runtime.scopeStack.pop();
    }
})();
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["dummy"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["anything"], "default": {}}));
    if (obj["config"] === undefined) obj["config"] = {};
    if (obj["config"]["foo"] === undefined) obj["config"]["foo"] = {};
    obj["config"]["foo"]["bar"] = "ok";
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })