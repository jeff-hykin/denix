import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default ({
  "bar": apply(
    nixScope.builtins["readFileType"],
    new Path(["../source_code/nix_lang/readDir/bar"], []),
  ),
  "foo": apply(
    nixScope.builtins["readFileType"],
    new Path(["../source_code/nix_lang/readDir/foo"], []),
  ),
  "linked": apply(
    nixScope.builtins["readFileType"],
    new Path(["../source_code/nix_lang/readDir/linked"], []),
  ),
  "ldir": apply(
    nixScope.builtins["readFileType"],
    new Path(["../source_code/nix_lang/readDir/ldir"], []),
  ),
});
