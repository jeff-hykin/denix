import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const {
  runtime,
  createFunc,
  createScope,
  defGetter,
  apply,
  set,
  force,
  mkThunk,
} = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-readFileType.nix";

export default createScope(nixScope, (nixScope) => {
  const obj = {};
  defGetter(
    obj,
    "bar",
    () => (apply(
      nixScope.builtins["readFileType"],
      mkThunk(
        () => (new Path([
          "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/readDir/bar",
        ], []))
      ),
    )),
  );
  defGetter(
    obj,
    "foo",
    () => (apply(
      nixScope.builtins["readFileType"],
      mkThunk(
        () => (new Path([
          "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/readDir/foo",
        ], []))
      ),
    )),
  );
  defGetter(
    obj,
    "linked",
    () => (apply(
      nixScope.builtins["readFileType"],
      mkThunk(
        () => (new Path([
          "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/readDir/linked",
        ], []))
      ),
    )),
  );
  defGetter(
    obj,
    "ldir",
    () => (apply(
      nixScope.builtins["readFileType"],
      mkThunk(
        () => (new Path([
          "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/readDir/ldir",
        ], []))
      ),
    )),
  );
  return obj;
});
