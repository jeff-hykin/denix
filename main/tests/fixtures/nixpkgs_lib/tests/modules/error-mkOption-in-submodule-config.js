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
            return (function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["sub"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submodule"](({"wrong2": nixScope["mkOption"]({})})), "default": {}}));
        return obj;
    })();
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))