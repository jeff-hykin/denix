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
    obj["options"]["theType"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["optionType"]}));
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["theOption"] = nixScope["lib"]["mkOption"](({"type": nixScope["config"]["theType"]}));
    if (obj["config"] === undefined) obj["config"] = {};
    obj["config"]["theType"] = nixScope["lib"]["mkMerge"]([(nixScope["lib"]["types"]["submodule"]((function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["int"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["int"], "default": 10n}));
    return obj;
})())),(nixScope["lib"]["types"]["submodule"]((function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["str"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["str"]}));
    return obj;
})()))]);
    if (obj["config"] === undefined) obj["config"] = {};
    if (obj["config"]["theOption"] === undefined) obj["config"]["theOption"] = {};
    obj["config"]["theOption"]["str"] = "hello";
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })