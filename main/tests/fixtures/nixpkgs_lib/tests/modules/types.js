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
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["storeDir"] = nixScope["builtins"]["storeDir"];
        nixScope["types"] = nixScope["lib"]["types"];
        nixScope["mkOption"] = nixScope["lib"]["mkOption"];
        return ({"options": ({"pathInStore": nixScope["mkOption"](({"type": nixScope["types"]["lazyAttrsOf"](nixScope["types"]["pathInStore"])}))}), "config": (function(){
    const obj = {};
    if (obj["pathInStore"] === undefined) obj["pathInStore"] = {};
    obj["pathInStore"]["ok1"] = (new InterpolatedString(["", "/0lz9p8xhf89kb1c1kk6jxrzskaiygnlh-bash-5.2-p15.drv"], [()=>(nixScope["storeDir"])]));
    if (obj["pathInStore"] === undefined) obj["pathInStore"] = {};
    obj["pathInStore"]["ok2"] = (new InterpolatedString(["", "/0fb3ykw9r5hpayd05sr0cizwadzq1d8q-bash-5.2-p15"], [()=>(nixScope["storeDir"])]));
    if (obj["pathInStore"] === undefined) obj["pathInStore"] = {};
    obj["pathInStore"]["ok3"] = (new InterpolatedString(["", "/0fb3ykw9r5hpayd05sr0cizwadzq1d8q-bash-5.2-p15/bin/bash"], [()=>(nixScope["storeDir"])]));
    if (obj["pathInStore"] === undefined) obj["pathInStore"] = {};
    obj["pathInStore"]["bad1"] = "";
    if (obj["pathInStore"] === undefined) obj["pathInStore"] = {};
    obj["pathInStore"]["bad2"] = (new InterpolatedString(["", ""], [()=>(nixScope["storeDir"])]));
    if (obj["pathInStore"] === undefined) obj["pathInStore"] = {};
    obj["pathInStore"]["bad3"] = (new InterpolatedString(["", "/"], [()=>(nixScope["storeDir"])]));
    if (obj["pathInStore"] === undefined) obj["pathInStore"] = {};
    obj["pathInStore"]["bad4"] = (new InterpolatedString(["", "/.links"], [()=>(nixScope["storeDir"])]));
    if (obj["pathInStore"] === undefined) obj["pathInStore"] = {};
    obj["pathInStore"]["bad5"] = "/foo/bar";
    return obj;
})()});
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })