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
    obj["options"]["conditionalWorks"] = nixScope["lib"]["mkOption"](({"default": operators.negate(operators.hasAttr(nixScope["config"]["value"], "foo"))}));
    if (obj["config"] === undefined) obj["config"] = {};
    if (obj["config"]["value"] === undefined) obj["config"]["value"] = {};
    obj["config"]["value"]["foo"] = nixScope["lib"]["mkIf"](false)("should not be defined");
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })