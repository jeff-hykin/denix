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
                        return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "_class == \"nixos\"");
    }
    return {};
})(operators.equal(nixScope["_class"], "nixos"))
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })