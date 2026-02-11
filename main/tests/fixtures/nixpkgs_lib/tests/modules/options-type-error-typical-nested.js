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
                        return ({"options": (function(){
    const obj = {};
    if (obj["result"] === undefined) obj["result"] = {};
    obj["result"]["here"] = nixScope["lib"]["types"]["str"];
    return obj;
})()})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })