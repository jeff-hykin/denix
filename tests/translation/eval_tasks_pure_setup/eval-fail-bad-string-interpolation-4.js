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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-fail-bad-string-interpolation-4.nix";

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "ha",
    (nixScope) => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
      createFunc(/*arg:*/ "y", null, {}, nixScope, (nixScope) => (
        createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(
            obj,
            "a",
            () => (apply(nixScope.x, mkThunk(() => (nixScope.y)))),
          );
          defGetter(
            obj,
            "b",
            () => (apply(nixScope.x, mkThunk(() => (nixScope.y)))),
          );
          defGetter(
            obj,
            "c",
            () => (apply(nixScope.x, mkThunk(() => (nixScope.y)))),
          );
          defGetter(
            obj,
            "d",
            () => (apply(nixScope.x, mkThunk(() => (nixScope.y)))),
          );
          defGetter(
            obj,
            "e",
            () => (apply(nixScope.x, mkThunk(() => (nixScope.y)))),
          );
          defGetter(
            obj,
            "f",
            () => (apply(nixScope.x, mkThunk(() => (nixScope.y)))),
          );
          defGetter(
            obj,
            "g",
            () => (apply(nixScope.x, mkThunk(() => (nixScope.y)))),
          );
          defGetter(
            obj,
            "h",
            () => (apply(nixScope.x, mkThunk(() => (nixScope.y)))),
          );
          defGetter(
            obj,
            "j",
            () => (apply(nixScope.x, mkThunk(() => (nixScope.y)))),
          );
          return obj;
        })
      ))
    ))),
  );
  defGetter(
    nixScope,
    "has",
    (
      nixScope,
    ) => (apply(
      apply(
        nixScope.ha,
        mkThunk(
          () => (apply(
            nixScope.ha,
            mkThunk(
              () => (apply(
                nixScope.ha,
                mkThunk(
                  () => (apply(
                    nixScope.ha,
                    mkThunk(
                      () => (createFunc(
                        /*arg:*/ "x",
                        null,
                        {},
                        nixScope,
                        (nixScope) => (
                          nixScope.x
                        ),
                      ))
                    ),
                  ))
                ),
              ))
            ),
          ))
        ),
      ),
      mkThunk(() => ("ha")),
    )),
  );
  defGetter(
    nixScope,
    "pkgs",
    (
      nixScope,
    ) => (apply(
      apply(nixScope.builtins["deepSeq"], mkThunk(() => (nixScope.has))),
      mkThunk(() => (nixScope.has)),
    )),
  );
  return (new InterpolatedString(["", ""], [() => (nixScope.pkgs)]));
});
