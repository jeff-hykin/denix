import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()

export default /**
  Simulate a migration from a single-instance `services.foo` to a multi instance
  `services.foos.<name>` module, where `name = ""` serves as the legacy /
  compatibility instance.

  - No instances must exist, unless one is defined in the multi-instance module,
  or if the legacy enable option is set to true.
  - The legacy instance options must be renamed to the new instance, if it exists.

  The relevant scenarios are tested in separate files:
  - ./doRename-condition-enable.nix
  - ./doRename-condition-no-enable.nix
*/

// args: {
//    config,
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["mkOption"] = nixScope["lib"]["mkOption"];
            nixScope["mkEnableOption"] = nixScope["lib"]["mkEnableOption"];
            nixScope["types"] = nixScope["lib"]["types"];
            nixScope["doRename"] = nixScope["lib"]["doRename"];
            return ({"options": (function(){
        const obj = {};
        obj["result"] = nixScope["mkOption"]({});
        if (obj["services"] === undefined) obj["services"] = {};
        if (obj["services"]["foo"] === undefined) obj["services"]["foo"] = {};
        obj["services"]["foo"]["enable"] = nixScope["mkEnableOption"]("foo");
        if (obj["services"] === undefined) obj["services"] = {};
        obj["services"]["foos"] = nixScope["mkOption"](({"type": nixScope["types"]["attrsOf"]((nixScope["types"]["submodule"](({"options": ({"bar": nixScope["mkOption"](({"type": nixScope["types"]["str"]}))})})))), "default": {}}));
        return obj;
    })(), "imports": [(nixScope["doRename"](({"from": ["services","foo","bar"], "to": ["services","foos","","bar"], "visible": true, "warn": false, "use": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "withPriority": true, "condition": nixScope["config"]["services"]["foo"]["enable"]})))]});
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))