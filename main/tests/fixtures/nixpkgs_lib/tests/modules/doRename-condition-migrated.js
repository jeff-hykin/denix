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
                        return ({"config": (function(){
    const obj = {};
    obj["result"] = ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "config.services.foos == {\n          \"\" = {\n            bar = \"baz\"");
    }
    return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "config.services.foo.bar == \"baz\"");
    }
    return true;
})(operators.equal(nixScope["config"]["services"]["foo"]["bar"], "baz"));
})(operators.equal(nixScope["config"]["services"]["foos"], ({"": ({"bar": "baz"})})));
    if (obj["services"] === undefined) obj["services"] = {};
    if (obj["services"]["foos"] === undefined) obj["services"]["foos"] = {};
    if (obj["services"]["foos"][""] === undefined) obj["services"]["foos"][""] = {};
    obj["services"]["foos"][""]["bar"] = "baz";
    return obj;
})()})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })