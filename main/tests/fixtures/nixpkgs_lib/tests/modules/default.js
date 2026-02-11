import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()

export default // args: {
//    lib,
//    modules,
//    ,
//}
createFunc({"lib": (nixScope)=>(nixScope["import"]((new Path(["../.."], [])))),"modules": (nixScope)=>([]),}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["config"] = nixScope["lib"]["evalModules"]((function(){
        const obj = {};
        obj["modules"] = nixScope["modules"];
        if (obj["specialArgs"] === undefined) obj["specialArgs"] = {};
        obj["specialArgs"]["modulesPath"] = (new Path(["./."], []));
        return obj;
    })())["config"];
            obj["options"] = nixScope["lib"]["evalModules"]((function(){
        const obj = {};
        obj["modules"] = nixScope["modules"];
        if (obj["specialArgs"] === undefined) obj["specialArgs"] = {};
        obj["specialArgs"]["modulesPath"] = (new Path(["./."], []));
        return obj;
    })())["options"];
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))