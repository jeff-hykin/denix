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
    if (obj["config"] === undefined) obj["config"] = {};
    obj["config"]["set"] = operators.merge(({"value": (operators.ifThenElse(operators.hasAttrPath(nixScope["options"], "set", "enable"), ()=>(360n), ()=>(7n)))}), nixScope["lib"]["optionalAttrs"]((operators.hasAttrPath(nixScope["options"], "set", "enable")))(({"enable": true})));
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })