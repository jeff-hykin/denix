import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()

export default // args: {
//    config,
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
        obj["options"]["bare-submodule"] = nixScope["mkOption"](({"type": nixScope["types"]["submoduleWith"](({"modules": [], "shorthandOnlyDefinesConfig": nixScope["config"]["shorthandOnlyDefinesConfig"]})), "default": {}}));
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["shorthandOnlyDefinesConfig"] = nixScope["mkOption"](({"default": false}));
        return obj;
    })();
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))