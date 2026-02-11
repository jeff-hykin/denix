import { createRuntime } from "../../../../../runtime.js"
const runtime = createRuntime()

export default (function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        "a": (()=>{ const nixScope = runtime.scopeStack.slice(-1)[0]; return false; })(),
                        // inherit arguments
                        ...arg,
                        // all-args arg (if @ syntax is used)
                        
                    }
                    runtime.scopeStack.push(nixScope)
                    try {
                        return ({"options": ({"result": nixScope["lib"]["mkOption"]({})}), "config": (function(){
    const obj = {};
    obj["result"] = nixScope["a"];
    if (obj["_module"] === undefined) obj["_module"] = {};
    if (obj["_module"]["args"] === undefined) obj["_module"]["args"] = {};
    obj["_module"]["args"]["a"] = true;
    return obj;
})()})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })