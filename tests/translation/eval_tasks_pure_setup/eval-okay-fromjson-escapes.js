import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default //
//
apply(
  nixScope.builtins["fromJSON"],
  `"quote \\" reverse solidus \\\\ solidus \\/ backspace \\b formfeed \\f newline \\n carriage return \\r horizontal tab \\t 1 char unicode encoded backspace \\u0008 1 char unicode encoded e with accent \\u00e9 2 char unicode encoded s with caron \\u0161 3 char unicode encoded rightwards arrow \\u2192"`,
);
