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
                        return ({"config": operators.merge(({"value": (operators.ifThenElse(operators.hasAttr(nixScope["options"], "enable"), ()=>(360n), ()=>(7n)))}), nixScope["lib"]["optionalAttrs"]((operators.hasAttr(nixScope["options"], "enable")))(({"enable": true})))})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })