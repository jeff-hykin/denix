import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-curpos.nix";

export default //
/*let*/ createScope(nixScope, (nixScope) => {
  defGetter(nixScope, "x", (nixScope) => (nixScope.__curPos));
  defGetter(nixScope, "y", (nixScope) => (nixScope.__curPos));
  return [
    nixScope.x["line"],
    nixScope.x["column"],
    nixScope.y["line"],
    nixScope.y["column"],
  ];
});
