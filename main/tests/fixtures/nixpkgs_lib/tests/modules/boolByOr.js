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
                        return (function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["value"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["lazyAttrsOf"](nixScope["lib"]["types"]["boolByOr"])}));
    if (obj["config"] === undefined) obj["config"] = {};
    obj["config"]["value"] = ({"falseFalse": nixScope["lib"]["mkMerge"]([false,false]), "trueFalse": nixScope["lib"]["mkMerge"]([true,false]), "falseTrue": nixScope["lib"]["mkMerge"]([false,true]), "trueTrue": nixScope["lib"]["mkMerge"]([true,true])});
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })