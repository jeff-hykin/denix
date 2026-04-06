import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js"
const {runtime, createFunc, createScope, defGetter, apply} = createRuntime()
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1]
runtime.currentFile = import.meta.url.startsWith("file://") ? import.meta.url.slice(7) : new URL(import.meta.url).pathname

export default /*let*/ createScope(nixScope=>{
        nixScope.x = {};
        nixScope.y = {};
        nixScope.a = apply(apply(nixScope.builtins["trace"], "used"), ({"a": 1n, "b": 2n}))["a"];
        nixScope.b = apply(apply(nixScope.builtins["trace"], "used"), ({"a": 1n, "b": 2n}))["b"];
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
        const __result = {};
        Object.defineProperty(__result, "c", { enumerable: true, get() { return nixScope.c; } });
        Object.defineProperty(__result, "d", { enumerable: true, get() { return nixScope.d; } });
        Object.defineProperty(__result, "x", { enumerable: true, get() { return nixScope.x; } });
        Object.defineProperty(__result, "__overrides", { enumerable: true, get() { return nixScope.__overrides; } });
        return __result;
}),nixScope.merged];
})