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
            nixScope["types"] = nixScope["lib"]["types"];
            nixScope["mkOption"] = nixScope["lib"]["mkOption"];
            return ({"options": ({"opt": nixScope["mkOption"](({"type": nixScope["types"]["attrTag"](({"int": nixScope["types"]["int"]})), "default": ({"int": 1n})}))})});
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))