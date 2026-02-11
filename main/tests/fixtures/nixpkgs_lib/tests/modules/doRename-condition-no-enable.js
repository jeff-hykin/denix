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
                        return ({"config": ({"result": ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "config.services.foos == { }");
    }
    return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "!options.services.foo.bar.isDefined");
    }
    return true;
})(operators.negate(nixScope["options"]["services"]["foo"]["bar"]["isDefined"]));
})(operators.equal(nixScope["config"]["services"]["foos"], {}))})})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })