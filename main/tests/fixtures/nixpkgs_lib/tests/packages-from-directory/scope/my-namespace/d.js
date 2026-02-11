import { createRuntime } from "../../../../../../../runtime.js"
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
        throw new Error("assertion failed: " + "a == \"a\"");
    }
    return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "e == \"e\"");
    }
    return "d";
})(operators.equal(nixScope["e"], "e"));
})(operators.equal(nixScope["a"], "a"))
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })