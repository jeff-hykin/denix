import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js"
const {runtime, createFunc, createScope, defGetter} = createRuntime()
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1]
runtime.currentFile = import.meta.url.startsWith("file://") ? import.meta.url.slice(7) : new URL(import.meta.url).pathname

export default /*let*/ createScope(nixScope=>{
        nixScope.x = {};
        nixScope.y = {};
        nixScope.a = nixScope.builtins["trace"]("used")(({"a": 1n, "b": 2n}))["a"];
        nixScope.b = nixScope.builtins["trace"]("used")(({"a": 1n, "b": 2n}))["b"];
        nixScope.merged = ({"inner": createScope(nixScope=>{
    const obj = {};
        obj.d = nixScope.y.d
    return obj;
}), "inner": createScope(nixScope=>{
    const obj = {};
        obj.c = nixScope.x.c
    return obj;
})});
        nixScope.x["c"] = 3n;
        nixScope.y["d"] = 4n;
    return [nixScope.a,nixScope.b,/*rec*/createScope(nixScope=>{
    nixScope.x = {};
    nixScope.__overrides = {};
    nixScope.c = nixScope.x["c"];
    nixScope.d = nixScope.y["d"];
    .x["c"] = [];
    .__overrides["y"]["d"] = [];
        return nixScope;
}),nixScope.merged];
})