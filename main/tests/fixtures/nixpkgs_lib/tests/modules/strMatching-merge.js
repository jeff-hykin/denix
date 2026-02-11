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
                        return ({"imports": [(function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["sm"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["strMatching"]("(.*")}));
    return obj;
})(),(function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["sm"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["strMatching"]("(.*")}));
    return obj;
})()]})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })