import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default (apply(nixScope.builtins["derivationStrict"], {
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
