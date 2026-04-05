import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-readFileType.nix";

export default ({
  "bar": nixScope.builtins["readFileType"](
    new Path(["../source_code/nix_lang/readDir/bar"], []),
  ),
  "foo": nixScope.builtins["readFileType"](
    new Path(["../source_code/nix_lang/readDir/foo"], []),
  ),
  "linked": nixScope.builtins["readFileType"](
    new Path(["../source_code/nix_lang/readDir/linked"], []),
  ),
  "ldir": nixScope.builtins["readFileType"](
    new Path(["../source_code/nix_lang/readDir/ldir"], []),
  ),
});
