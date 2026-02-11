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
            Object.defineProperty(nixScope, "myconf", {enumerable: true, get(){return nixScope["lib"]["evalModules"](({"modules": [{}]}));}});
            return ({"imports": [nixScope["myconf"]]});
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))