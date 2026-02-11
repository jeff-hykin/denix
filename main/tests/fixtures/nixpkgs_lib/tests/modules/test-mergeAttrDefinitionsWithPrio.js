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
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "defs", {enumerable: true, get(){return nixScope["lib"]["modules"]["mergeAttrDefinitionsWithPrio"](nixScope["options"]["_module"]["args"]);}});
        Object.defineProperty(nixScope, "assertLazy", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["pos"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["throw"]((new InterpolatedString(["", ":", ":", ": The test must not evaluate this the assertLazy thunk, but it did. Unexpected strictness leads to unexpected errors and performance problems."], [()=>(nixScope["pos"]["file"]), ()=>(nixScope["toString"](nixScope["pos"]["line"])), ()=>(nixScope["toString"](nixScope["pos"]["column"]))]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        return (function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["result"] = nixScope["lib"]["mkOption"]({});
    if (obj["config"] === undefined) obj["config"] = {};
    if (obj["config"]["_module"] === undefined) obj["config"]["_module"] = {};
    obj["config"]["_module"]["args"] = ({"default": nixScope["lib"]["mkDefault"]((nixScope["assertLazy"](nixScope["__curPos"]))), "regular": null, "force": nixScope["lib"]["mkForce"]((nixScope["assertLazy"](nixScope["__curPos"]))), "unused": nixScope["assertLazy"](nixScope["__curPos"])});
    if (obj["config"] === undefined) obj["config"] = {};
    obj["config"]["result"] = ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "defs.default.highestPrio == (lib.mkDefault (assertLazy __curPos)).priority");
    }
    return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "defs.regular.highestPrio == lib.modules.defaultOverridePriority");
    }
    return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "defs.force.highestPrio == (lib.mkForce (assertLazy __curPos)).priority");
    }
    return true;
})(operators.equal(nixScope["defs"]["force"]["highestPrio"], (nixScope["lib"]["mkForce"]((nixScope["assertLazy"](nixScope["__curPos"]))))["priority"]));
})(operators.equal(nixScope["defs"]["regular"]["highestPrio"], nixScope["lib"]["modules"]["defaultOverridePriority"]));
})(operators.equal(nixScope["defs"]["default"]["highestPrio"], (nixScope["lib"]["mkDefault"]((nixScope["assertLazy"](nixScope["__curPos"]))))["priority"]));
    return obj;
})();
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })