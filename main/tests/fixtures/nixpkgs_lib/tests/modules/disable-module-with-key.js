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
            Object.defineProperty(nixScope, "moduleWithKey", {enumerable: true, get(){return ({"key": "disable-module-with-key.nix#moduleWithKey", "config": ({"enable": true})});}});
            return ({"options": ({"positive": nixScope["mkOption"](({"type": nixScope["types"]["submodule"](({"imports": [(new Path(["./declare-enable.nix"], [])),nixScope["moduleWithKey"]]})), "default": {}})), "negative": nixScope["mkOption"](({"type": nixScope["types"]["submodule"](({"imports": [(new Path(["./declare-enable.nix"], [])),nixScope["moduleWithKey"]], "disabledModules": [nixScope["moduleWithKey"]]})), "default": {}}))})});
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))