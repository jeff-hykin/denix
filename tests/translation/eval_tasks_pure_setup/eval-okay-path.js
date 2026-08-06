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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-path.nix";
const operators = runtime.operators;

export default [
  apply(
    nixScope.builtins["path"],
    mkThunk(() => (createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(
        obj,
        "path",
        () => (new Path([
          "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup",
        ], [])),
      );
      defGetter(
        obj,
        "filter",
        () => (createFunc(/*arg:*/ "path", null, {}, nixScope, (nixScope) => (
          createFunc(/*arg:*/ "_", null, {}, nixScope, (nixScope) => (
            operators.equal(
              apply(nixScope.baseNameOf, mkThunk(() => (nixScope.path))),
              "data",
            )
          ))
        ))),
      );
      defGetter(obj, "recursive", () => (true));
      defGetter(
        obj,
        "sha256",
        () => ("1yhm3gwvg5a41yylymgblsclk95fs6jy72w0wv925mmidlhcq4sw"),
      );
      defGetter(obj, "name", () => ("output"));
      return obj;
    }))),
  ),
  apply(
    nixScope.builtins["path"],
    mkThunk(() => (createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(
        obj,
        "path",
        () => (new Path([
          "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/data",
        ], [])),
      );
      defGetter(obj, "recursive", () => (false));
      defGetter(
        obj,
        "sha256",
        () => ("0k4lwj58f2w5yh92ilrwy9917pycipbrdrr13vbb3yd02j09vfxm"),
      );
      defGetter(obj, "name", () => ("output"));
      return obj;
    }))),
  ),
  apply(
    nixScope.builtins["path"],
    mkThunk(() => (createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(
        obj,
        "path",
        () => (new Path([
          "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/dir1",
        ], [])),
      );
      defGetter(
        obj,
        "sha256",
        () => ("02vlkcjkl1rvy081n6d40qi73biv2w4b9x9biklay4ncgk77zr1f"),
      );
      defGetter(obj, "name", () => ("output"));
      return obj;
    }))),
  ),
];
