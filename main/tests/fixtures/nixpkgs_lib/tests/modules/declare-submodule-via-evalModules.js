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
    obj["options"]["submodule"] = nixScope["lib"]["mkOption"]((function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
    const obj = {};
        obj["type"] = nixScope["lib"]["evalModules"](({"modules": [(function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["inner"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["bool"], "default": false}));
    return obj;
})()]}))["type"];
        obj["default"] = {};
    return obj;
    } finally {
        runtime.scopeStack.pop();
    }
})());
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