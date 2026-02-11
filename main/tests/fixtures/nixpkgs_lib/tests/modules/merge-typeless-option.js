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
        Object.defineProperty(nixScope, "typeless", {enumerable: true, get(){return (function(arg){
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
    obj["options"]["group"] = nixScope["lib"]["mkOption"]({});
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                });}});
        Object.defineProperty(nixScope, "childOfTypeless", {enumerable: true, get(){return (function(arg){
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
    if (obj["options"]["group"] === undefined) obj["options"]["group"] = {};
    obj["options"]["group"]["enable"] = nixScope["lib"]["mkEnableOption"]("nothing");
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                });}});
        return (function(){
    const obj = {};
    obj["imports"] = [nixScope["typeless"],nixScope["childOfTypeless"]];
    if (obj["config"] === undefined) obj["config"] = {};
    if (obj["config"]["group"] === undefined) obj["config"]["group"] = {};
    obj["config"]["group"]["enable"] = false;
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