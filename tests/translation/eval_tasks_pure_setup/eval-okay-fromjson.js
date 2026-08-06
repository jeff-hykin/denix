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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-fromjson.nix";
const operators = runtime.operators;

export default operators.equal(
  apply(
    nixScope.builtins["fromJSON"],
    mkThunk(
      () => ('{\n  "Video": {\n      "Title":  "The Penguin Chronicles",\n      "Width":  1920,\n      "Height": 1080,\n      "EmbeddedData": [3.14159, 23493,null, true  ,false, -10],\n      "Thumb": {\n          "Url":    "http://www.example.com/video/5678931",\n          "Width":  200,\n          "Height": 250\n      },\n      "Animated" : false,\n      "IDs": [116, 943, 234, 38793, true  ,false,null, -100],\n      "Escapes": "\\"\\\\\\/\\t\\n\\r\\t",\n      "Subtitle" : false,\n      "Latitude":  37.7668,\n      "Longitude": -122.3959\n    }\n}\n')
    ),
  ),
  createScope(nixScope, (nixScope) => {
    const obj = {};
    defGetter(obj, "Video", () => (createScope(nixScope, (nixScope) => {
      const obj = {};
      defGetter(obj, "Title", () => ("The Penguin Chronicles"));
      defGetter(obj, "Width", () => (1920n));
      defGetter(obj, "Height", () => (1080n));
      defGetter(
        obj,
        "EmbeddedData",
        () => [3.14159, 23493n, null, true, false, operators.subtract(0n, 10n)],
      );
      defGetter(obj, "Thumb", () => (createScope(nixScope, (nixScope) => {
        const obj = {};
        defGetter(obj, "Url", () => ("http://www.example.com/video/5678931"));
        defGetter(obj, "Width", () => (200n));
        defGetter(obj, "Height", () => (250n));
        return obj;
      })));
      defGetter(obj, "Animated", () => (false));
      defGetter(
        obj,
        "IDs",
        () => [
          116n,
          943n,
          234n,
          38793n,
          true,
          false,
          null,
          operators.subtract(0n, 100n),
        ],
      );
      defGetter(obj, "Escapes", () => ('"\\\/\t\n\r\t'));
      defGetter(obj, "Subtitle", () => (false));
      defGetter(obj, "Latitude", () => (37.7668));
      defGetter(obj, "Longitude", () => (-122.3959));
      return obj;
    })));
    return obj;
  }),
);
