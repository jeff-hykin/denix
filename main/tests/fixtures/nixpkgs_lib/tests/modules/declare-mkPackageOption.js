import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["pkgs"] = {};
            nixScope["pkgs"]["hello"] = ({"type": "derivation", "pname": "hello"});
            return ({"options": ({"package": nixScope["lib"]["mkPackageOption"](nixScope["pkgs"])("hello")({}), "namedPackage": nixScope["lib"]["mkPackageOption"](nixScope["pkgs"])("Hello")(({"default": ["hello"]})), "namedPackageSingletonDefault": nixScope["lib"]["mkPackageOption"](nixScope["pkgs"])("Hello")(({"default": "hello"})), "pathPackage": nixScope["lib"]["mkPackageOption"](nixScope["pkgs"])(["hello"])({}), "packageWithExample": nixScope["lib"]["mkPackageOption"](nixScope["pkgs"])("hello")(({"example": "pkgs.hello.override { stdenv = pkgs.clangStdenv; }"})), "packageWithPathExample": nixScope["lib"]["mkPackageOption"](nixScope["pkgs"])("hello")(({"example": ["hello"]})), "packageWithExtraDescription": nixScope["lib"]["mkPackageOption"](nixScope["pkgs"])("hello")(({"extraDescription": "Example extra description."})), "undefinedPackage": nixScope["lib"]["mkPackageOption"](nixScope["pkgs"])("hello")(({"default": null})), "nullablePackage": nixScope["lib"]["mkPackageOption"](nixScope["pkgs"])("hello")(({"nullable": true, "default": null})), "nullablePackageWithDefault": nixScope["lib"]["mkPackageOption"](nixScope["pkgs"])("hello")(({"nullable": true})), "packageWithPkgsText": nixScope["lib"]["mkPackageOption"](nixScope["pkgs"])("hello")(({"pkgsText": "myPkgs"})), "packageFromOtherSet": (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "myPkgs", {enumerable: true, get(){return ({"hello": operators.merge(nixScope["pkgs"]["hello"], ({"pname": "hello-other"}))});}});
            return nixScope["lib"]["mkPackageOption"](nixScope["myPkgs"])("hello")({});
        } finally {
            runtime.scopeStack.pop();
        }
    })(), "packageInvalidIdentifier": (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["myPkgs"] = {};
            nixScope["myPkgs"]["\"123\""]["\"with\\\"quote\""] = (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["hello"] = nixScope["pkgs"]["hello"];
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })();
            return nixScope["lib"]["mkPackageOption"](nixScope["myPkgs"])(["123","with","hello"])({});
        } finally {
            runtime.scopeStack.pop();
        }
    })(), "packageInvalidIdentifierExample": nixScope["lib"]["mkPackageOption"](nixScope["pkgs"])("hello")(({"example": ["123","with","hello"]}))})});
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))