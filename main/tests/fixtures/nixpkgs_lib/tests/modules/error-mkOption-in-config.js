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
        obj["wrong1"] = nixScope["mkOption"]({});
        if (obj["nest"] === undefined) obj["nest"] = {};
        obj["nest"]["wrong2"] = nixScope["mkOption"]({});
        return obj;
    })();
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))