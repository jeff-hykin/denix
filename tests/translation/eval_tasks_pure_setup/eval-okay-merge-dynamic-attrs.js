import {
  createRuntime,
  InterpolatedString,
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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-merge-dynamic-attrs.nix";
const operators = runtime.operators;

export default createScope(nixScope, (nixScope) => {
  const obj = {};
  defGetter(obj, "set1", () => (createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "a", () => (1n));
    return obj;
  })));
  defGetter(obj, "set1", () => (createScope(nixScope, (nixScope) => {
    const obj = {};
    set(obj, [
      new InterpolatedString(["", ""], [() => (operators.add("b", ""))]),
    ], () => (2n));
    return obj;
  })));
  defGetter(obj, "set2", () => (createScope(nixScope, (nixScope) => {
    const obj = {};
    set(obj, [
      new InterpolatedString(["", ""], [() => (operators.add("b", ""))]),
    ], () => (2n));
    return obj;
  })));
  defGetter(obj, "set2", () => (createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "a", () => (1n));
    return obj;
  })));
  set(obj, ["set3", "a"], () => (1n));
  set(obj, [
    "set3",
    new InterpolatedString(["", ""], [() => (operators.add("b", ""))]),
  ], () => (2n));
  set(obj, [
    "set4",
    new InterpolatedString(["", ""], [() => (operators.add("b", ""))]),
  ], () => (2n));
  set(obj, ["set4", "a"], () => (1n));
  return obj;
});
