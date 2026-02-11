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
            nixScope["mkOption"] = nixScope["lib"]["mkOption"];
            nixScope["types"] = nixScope["lib"]["types"];
            return (function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        if (obj["options"]["bare-submodule"] === undefined) obj["options"]["bare-submodule"] = {};
        obj["options"]["bare-submodule"]["deep"] = nixScope["mkOption"](({"type": nixScope["types"]["int"], "default": 2n}));
        return obj;
    })();
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))