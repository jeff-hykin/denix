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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-regression-20220125.nix";
const operators = runtime.operators;

export default operators.add(
  apply(
    createFunc(/*arg:*/ "__curPosFoo", null, {}, nixScope, (nixScope) => (
      nixScope.__curPosFoo
    )),
    mkThunk(() => (1n)),
  ),
  apply(
    createFunc(/*arg:*/ "__curPosBar", null, {}, nixScope, (nixScope) => (
      nixScope.__curPosBar
    )),
    mkThunk(() => (2n)),
  ),
);
