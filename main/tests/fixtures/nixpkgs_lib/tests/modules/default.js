import { createRuntime } from "../../../../../runtime.js"
const runtime = createRuntime()

export default (function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        "lib": (()=>{ const nixScope = runtime.scopeStack.slice(-1)[0]; return nixScope["import"]((new Path(["../.."], []))); })(),"modules": (()=>{ const nixScope = runtime.scopeStack.slice(-1)[0]; return []; })(),
                        // inherit arguments
                        ...arg,
                        // all-args arg (if @ syntax is used)
                        
                    }
                    runtime.scopeStack.push(nixScope)
                    try {
                        return (function(){
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
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })