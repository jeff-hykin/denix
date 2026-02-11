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
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["foo"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["nullOr"](nixScope["lib"]["types"]["str"]), "default": null}));
    if (obj["config"] === undefined) obj["config"] = {};
    obj["config"]["foo"] = nixScope["lib"]["mkIf"]((operators.hasAttr(nixScope["config"], "value")))(nixScope["config"]["value"]);
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })