import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()

export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["submodule"] = nixScope["lib"]["mkOption"]((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["type"] = nixScope["lib"]["evalModules"](({"modules": [(function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["inner"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["bool"], "default": false}));
        return obj;
    })()]}))["type"];
            obj["default"] = {};
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })());
        if (obj["config"] === undefined) obj["config"] = {};
        obj["config"]["submodule"] = nixScope["lib"]["mkMerge"]([(
    
    // args: {
    //    lib,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    (function(){
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["outer"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["bool"], "default": false}));
            return obj;
        })()
                ))),({"inner": true, "outer": true})]);
        return obj;
    })()
            ))