import { createRuntime } from "../../../../../../runtime.js"
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
                        return (function(){
    const obj = {};
    obj["config"] = nixScope["lib"]["mkMerge"]([(function(){
    const obj = {};
    if (obj["value"] === undefined) obj["value"] = {};
    obj["value"]["mkiffalse"] = nixScope["lib"]["mkIf"](false)({});
    return obj;
})(),(function(){
    const obj = {};
    if (obj["value"] === undefined) obj["value"] = {};
    obj["value"]["mkiftrue"] = nixScope["lib"]["mkIf"](true)({});
    return obj;
})(),(function(){
    const obj = {};
    if (obj["value"] === undefined) obj["value"] = {};
    obj["value"]["mkdefault"] = nixScope["lib"]["mkDefault"](0n);
    return obj;
})(),(function(){
    const obj = {};
    if (obj["value"] === undefined) obj["value"] = {};
    obj["value"]["mkdefault"] = 1n;
    return obj;
})(),(function(){
    const obj = {};
    if (obj["value"] === undefined) obj["value"] = {};
    obj["value"]["mkmerge"] = nixScope["lib"]["mkMerge"]([{}]);
    return obj;
})(),(function(){
    const obj = {};
    if (obj["value"] === undefined) obj["value"] = {};
    obj["value"]["mkbefore"] = nixScope["lib"]["mkBefore"](true);
    return obj;
})(),(function(){
    const obj = {};
    if (obj["value"] === undefined) obj["value"] = {};
    obj["value"]["nested"] = nixScope["lib"]["mkMerge"]([({"foo": nixScope["lib"]["mkDefault"](0n), "bar": nixScope["lib"]["mkIf"](false)(0n)}),(nixScope["lib"]["mkIf"](true)(({"foo": nixScope["lib"]["mkIf"](true)((nixScope["lib"]["mkForce"](1n))), "bar": ({"baz": nixScope["lib"]["mkDefault"]("baz")})})))]);
    return obj;
})()]);
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["value"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["anything"]}));
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })