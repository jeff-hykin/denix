import { createRuntime } from "../../../../../runtime.js"
const runtime = createRuntime()

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
        Object.defineProperty(nixScope, "deathtrapArgs", {enumerable: true, get(){return nixScope["lib"]["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["k"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["throw"]((new InterpolatedString(["The module system is too strict, accessing an unused option's ", " mkOption-attribute."], [()=>(nixScope["k"])]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["lib"]["functionArgs"](nixScope["lib"]["mkOption"])));}});
        return (function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["value"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["attrsOf"](nixScope["lib"]["types"]["str"]), "default": {}}));
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["testing-laziness-so-don't-read-me"] = nixScope["lib"]["mkOption"](nixScope["deathtrapArgs"]);
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