import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default // args: {
//    _class,
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "nixosModule", {enumerable: true, get(){return 
    
    // args: {
    
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    (function(){
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["foo"] = nixScope["lib"]["mkOption"](({"default": "bar"}));
            return obj;
        })()
                ));}});
            Object.defineProperty(nixScope, "darwinModule", {enumerable: true, get(){return 
    
    // args: {
    
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    (function(){
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["bar"] = nixScope["lib"]["mkOption"](({"default": "foo"}));
            return obj;
        })()
                ));}});
            return ({"imports": [(nixScope["lib"]["optionalAttrs"]((operators.equal(nixScope["_class"], "nixos")))(nixScope["nixosModule"])),(nixScope["lib"]["optionalAttrs"]((operators.equal(nixScope["_class"], "darwin")))(nixScope["darwinModule"]))]});
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))