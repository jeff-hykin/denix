import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()

export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["sub"] = {};
            nixScope["sub"]["options"]["config"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["bool"], "default": false}));
            return (function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["submodule"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submoduleWith"](({"modules": [nixScope["sub"]]})), "default": {}}));
        return obj;
    })();
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))