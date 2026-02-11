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
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["submodule"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submoduleWith"](({"modules": [(function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["inner"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["bool"], "default": false}));
    return obj;
})()]})), "default": {}}));
    if (obj["config"] === undefined) obj["config"] = {};
    obj["config"]["submodule"] = nixScope["lib"]["mkMerge"]([((function(arg){
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
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["outer"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["bool"], "default": false}));
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })),({"inner": true, "outer": true})]);
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })