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
    obj["config"] = ({"foo": (function(arg){
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
        throw new Error("assertion failed: " + "_prefix == [ \"foo\" ]");
    }
    return (function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["ok"] = nixScope["lib"]["mkOption"]({});
    if (obj["config"] === undefined) obj["config"] = {};
    obj["config"]["ok"] = true;
    return obj;
})();
})(operators.equal(nixScope["_prefix"], ["foo"]))
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })});
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["foo"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submodule"]({}), "default": {}}));
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })