import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-derivation-legacy.nix";

export default (nixScope.builtins["derivationStrict"]({
  "name": "eval-okay-derivation-legacy",
  "system": "x86_64-linux",
  "builder": "/dontcare",
  "__structuredAttrs": true,
  "allowedReferences": [],
  "disallowedReferences": [],
  "allowedRequisites": [],
  "disallowedRequisites": [],
  "maxSize": 1234n,
  "maxClosureSize": 12345n,
}))["out"];
