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
                        return ({"config": (function(){
    const obj = {};
    if (obj["_module"] === undefined) obj["_module"] = {};
    if (obj["_module"]["args"] === undefined) obj["_module"]["args"] = {};
    obj["_module"]["args"]["custom"] = true;
    return obj;
})()})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })