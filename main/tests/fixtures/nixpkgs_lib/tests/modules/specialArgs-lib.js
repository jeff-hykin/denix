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
    obj["options"] = ({"result": nixScope["lib"]["mkOption"]({}), "weird": nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submoduleWith"]((function(){
    const obj = {};
    obj["modules"] = [];
    if (obj["specialArgs"] === undefined) obj["specialArgs"] = {};
    obj["specialArgs"]["lib"] = {};
    return obj;
})())}))});
    if (obj["config"] === undefined) obj["config"] = {};
    obj["config"]["weird"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["args"] = arg; runtime.scopeStack.push(nixScope); try { return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "args.lib == { }");
    }
    return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "args.specialArgs == { lib = { }");
    }
    return (function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["foo"] = nixScope["lib"]["mkOption"]({});
    if (obj["config"] === undefined) obj["config"] = {};
    obj["config"]["foo"] = nixScope["lib"]["mkIf"](true)("alright");
    return obj;
})();
})(operators.equal(nixScope["args"]["specialArgs"], ({"lib": {}})));
})(operators.equal(nixScope["args"]["lib"], {})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
    if (obj["config"] === undefined) obj["config"] = {};
    obj["config"]["result"] = ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "config.weird.foo == \"alright\"");
    }
    return "ok";
})(operators.equal(nixScope["config"]["weird"]["foo"], "alright"));
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })