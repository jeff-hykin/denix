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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-attrs3.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "config",
    (nixScope) => (createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(obj, "hostName", () => ("itchy"));
      defGetter(obj, "foo", () => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "a", () => ("a"));
        set(obj, ["b", "c"], () => ("c"));
        return obj;
      })));
      set(obj, ["services", "sshd", "enable"], () => (true));
      set(obj, ["services", "sshd", "port"], () => (22n));
      set(obj, ["services", "httpd", "port"], () => (80n));
      set(obj, [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ], () => ("x"));
      return obj;
    })),
  );
  return (operators.ifThenElse(
    nixScope.config["services"]["sshd"]["enable"],
    () => (operators.add(
      operators.add(
        operators.add(
          new InterpolatedString(["foo ", " ", " ", ""], [
            () => (apply(
              nixScope.toString,
              mkThunk(() => (nixScope.config["services"]["sshd"]["port"])),
            )),
            () => (apply(
              nixScope.toString,
              mkThunk(() => (nixScope.config["services"]["httpd"]["port"])),
            )),
            () => (nixScope.config["hostName"]),
          ]),
          new InterpolatedString(["", ""], [
            () => (nixScope
              .config["a"]["b"]["c"]["d"]["e"]["f"]["g"]["h"]["i"]["j"]["k"][
                "l"
              ]["m"]["n"]["o"]["p"]["q"]["r"]["s"]["t"]["u"]["v"]["w"]["x"][
                "y"
              ]["z"]),
          ]),
        ),
        new InterpolatedString(["", ""], [() => (nixScope.config["foo"]["a"])]),
      ),
      new InterpolatedString(["", ""], [
        () => (nixScope.config["foo"]["b"]["c"]),
      ]),
    )),
    () => ("bar"),
  ));
});
