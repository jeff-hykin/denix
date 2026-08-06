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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-builtins-dirOf.nix";

export default createScope(nixScope, (nixScope) => {
  const obj = {};
  defGetter(
    obj,
    "stringEmpty",
    () => (apply(nixScope.dirOf, mkThunk(() => ("")))),
  );
  defGetter(
    obj,
    "stringNoSep",
    () => (apply(nixScope.dirOf, mkThunk(() => ("filename")))),
  );
  defGetter(
    obj,
    "stringSingleDir",
    () => (apply(nixScope.dirOf, mkThunk(() => ("a/b")))),
  );
  defGetter(
    obj,
    "stringMultipleSeps",
    () => (apply(nixScope.dirOf, mkThunk(() => ("a///b")))),
  );
  defGetter(
    obj,
    "stringRoot",
    () => (apply(nixScope.dirOf, mkThunk(() => ("/")))),
  );
  defGetter(
    obj,
    "stringRootSlash",
    () => (apply(nixScope.dirOf, mkThunk(() => ("//")))),
  );
  defGetter(
    obj,
    "stringRootSlashSlash",
    () => (apply(nixScope.dirOf, mkThunk(() => ("///")))),
  );
  defGetter(
    obj,
    "stringRootA",
    () => (apply(nixScope.dirOf, mkThunk(() => ("/a")))),
  );
  defGetter(
    obj,
    "stringWithDot",
    () => (apply(nixScope.dirOf, mkThunk(() => ("a/b/c/./d")))),
  );
  defGetter(
    obj,
    "stringWithDotSep2",
    () => (apply(nixScope.dirOf, mkThunk(() => ("a/b/c/.//d")))),
  );
  defGetter(
    obj,
    "stringWithDotDot",
    () => (apply(nixScope.dirOf, mkThunk(() => ("a/b/c/../d")))),
  );
  defGetter(
    obj,
    "stringWithDotDotSep2",
    () => (apply(nixScope.dirOf, mkThunk(() => ("a/b/c/..//d")))),
  );
  defGetter(
    obj,
    "stringWithDotAndDotDot",
    () => (apply(nixScope.dirOf, mkThunk(() => ("a/b/c/.././d")))),
  );
  defGetter(
    obj,
    "stringWithDotAndDotDotSep2",
    () => (apply(nixScope.dirOf, mkThunk(() => ("a/b/c/.././/d")))),
  );
  defGetter(
    obj,
    "pathRoot",
    () => (apply(nixScope.dirOf, mkThunk(() => (new Path(["/."], []))))),
  );
  defGetter(
    obj,
    "pathDoesntExistRoot",
    () => (apply(
      nixScope.dirOf,
      mkThunk(() => (new Path(["/totallydoesntexistreally"], []))),
    )),
  );
  defGetter(
    obj,
    "pathDoesntExistNested1",
    () => (apply(
      nixScope.dirOf,
      mkThunk(() => (new Path(["/totallydoesntexistreally/subdir1"], []))),
    )),
  );
  defGetter(
    obj,
    "pathDoesntExistNested2",
    () => (apply(
      nixScope.dirOf,
      mkThunk(
        () => (new Path(["/totallydoesntexistreally/subdir1/subdir2"], []))
      ),
    )),
  );
  return obj;
});
