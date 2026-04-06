import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default [
  apply(
    nixScope.builtins["path"],
    {
      "path": new Path(["./."], []),
      "filter": createFunc(/*arg:*/ "path", null, {}, (nixScope) => (
        createFunc(/*arg:*/ "_", null, {}, (nixScope) => (
          operators.equal(apply(nixScope.baseNameOf, nixScope.path), "data")
        ))
      )),
      "recursive": true,
      "sha256": "1yhm3gwvg5a41yylymgblsclk95fs6jy72w0wv925mmidlhcq4sw",
      "name": "output",
    },
  ),
  apply(
    nixScope.builtins["path"],
    {
      "path": new Path(["../source_code/nix_lang/data"], []),
      "recursive": false,
      "sha256": "0k4lwj58f2w5yh92ilrwy9917pycipbrdrr13vbb3yd02j09vfxm",
      "name": "output",
    },
  ),
  apply(
    nixScope.builtins["path"],
    {
      "path": new Path(["../source_code/nix_lang/dir1"], []),
      "sha256": "02vlkcjkl1rvy081n6d40qi73biv2w4b9x9biklay4ncgk77zr1f",
      "name": "output",
    },
  ),
];
