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
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "foo", {enumerable: true, get(){return nixScope["lib"]["mkOptionType"](({"name": "foo", "functor": operators.merge(nixScope["lib"]["types"]["defaultFunctor"]("foo"), ({"wrapped": nixScope["lib"]["types"]["int"], "payload": 10n}))}));}});
        return (function(){
    const obj = {};
    obj["imports"] = [(function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["foo"] = nixScope["lib"]["mkOption"](({"type": nixScope["foo"]}));
    return obj;
})(),(function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["foo"] = nixScope["lib"]["mkOption"](({"type": nixScope["foo"]}));
    return obj;
})()];
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["result"] = nixScope["lib"]["mkOption"](({"default": nixScope["builtins"]["seq"](nixScope["options"]["foo"])(null)}));
    return obj;
})();
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })