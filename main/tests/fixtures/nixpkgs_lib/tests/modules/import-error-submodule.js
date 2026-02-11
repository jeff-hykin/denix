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
            return (function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["foo"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submodule"]({}), "default": {}}));
        if (obj["config"] === undefined) obj["config"] = {};
        obj["config"]["foo"] = 
    
    // args: {
    
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    ({"imports": [nixScope["myconf"]]})
                ));
        return obj;
    })();
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))