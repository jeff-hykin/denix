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
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["value"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["lazyAttrsOf"]((operators.merge(nixScope["lib"]["types"]["str"], (function(){
    const obj = {};
    if (obj["emptyValue"] === undefined) obj["emptyValue"] = {};
    obj["emptyValue"]["value"] = "empty";
    return obj;
})()))), "default": {}}));
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })