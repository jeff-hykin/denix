import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()

export default // args: {
//    lib,
//    extendModules,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["mkOption"] = nixScope["lib"]["mkOption"];
            nixScope["mkOverride"] = nixScope["lib"]["mkOverride"];
            nixScope["types"] = nixScope["lib"]["types"];
            return ({"imports": [(function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["sub"] = nixScope["mkOption"](({"default": {}, "type": nixScope["types"]["submodule"]((
    
    // args: {
    //    config,
    //    extendModules,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    (function(){
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["value"] = nixScope["mkOption"](({"type": nixScope["types"]["int"]}));
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["specialisation"] = nixScope["mkOption"]((function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
            const obj = {};
                obj["default"] = {};
                obj["type"] = nixScope["extendModules"](({"modules": [({"specialisation": nixScope["mkOverride"](0n)({})})]}))["type"];
            return obj;
            } finally {
                runtime.scopeStack.pop();
            }
        })());
            return obj;
        })()
                ))))}));
        return obj;
    })(),(function(){
        const obj = {};
        if (obj["config"] === undefined) obj["config"] = {};
        if (obj["config"]["sub"] === undefined) obj["config"]["sub"] = {};
        obj["config"]["sub"]["value"] = 1n;
        return obj;
    })()]});
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))