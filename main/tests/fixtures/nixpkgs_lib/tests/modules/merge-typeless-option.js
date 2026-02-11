import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()

export default // args: {

//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "typeless", {enumerable: true, get(){return 
    
    // args: {
    //    lib,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    (function(){
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["group"] = nixScope["lib"]["mkOption"]({});
            return obj;
        })()
                ));}});
            Object.defineProperty(nixScope, "childOfTypeless", {enumerable: true, get(){return 
    
    // args: {
    //    lib,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    (function(){
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            if (obj["options"]["group"] === undefined) obj["options"]["group"] = {};
            obj["options"]["group"]["enable"] = nixScope["lib"]["mkEnableOption"]("nothing");
            return obj;
        })()
                ));}});
            return (function(){
        const obj = {};
        obj["imports"] = [nixScope["typeless"],nixScope["childOfTypeless"]];
        if (obj["config"] === undefined) obj["config"] = {};
        if (obj["config"]["group"] === undefined) obj["config"]["group"] = {};
        obj["config"]["group"]["enable"] = false;
        return obj;
    })();
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))