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
    obj["imports"] = [(nixScope["lib"]["modules"]["importApply"]((new Path(["./importApply-function.nix"], [])))(({"foo": "abc"})))];
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["value"] = nixScope["lib"]["mkOption"](({"default": 1n}));
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })