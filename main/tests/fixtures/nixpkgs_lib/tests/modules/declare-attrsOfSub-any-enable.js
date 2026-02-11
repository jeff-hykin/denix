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
            Object.defineProperty(nixScope, "submod", {enumerable: true, get(){return 
    
    // args: {
    
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    ({"options": ({"enable": nixScope["lib"]["mkOption"](({"default": false, "example": true, "type": nixScope["lib"]["types"]["bool"], "description": `
                    Some descriptive text
                  `}))})})
                ));}});
            return ({"options": ({"attrsOfSub": nixScope["lib"]["mkOption"](({"default": {}, "example": {}, "type": nixScope["lib"]["types"]["attrsOf"]((nixScope["lib"]["types"]["submodule"]([nixScope["submod"]]))), "description": `
            Some descriptive text
          `}))})});
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))