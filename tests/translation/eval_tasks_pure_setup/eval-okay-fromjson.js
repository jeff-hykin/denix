import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default operators.equal(
  apply(
    nixScope.builtins["fromJSON"],
    `
  {
    "Video": {
        "Title":  "The Penguin Chronicles",
        "Width":  1920,
        "Height": 1080,
        "EmbeddedData": [3.14159, 23493,null, true  ,false, -10],
        "Thumb": {
            "Url":    "http://www.example.com/video/5678931",
            "Width":  200,
            "Height": 250
        },
        "Animated" : false,
        "IDs": [116, 943, 234, 38793, true  ,false,null, -100],
        "Escapes": "\\"\\\\\\/\\t\\n\\r\\t",
        "Subtitle" : false,
        "Latitude":  37.7668,
        "Longitude": -122.3959
      }
  }
`,
  ),
  {
    "Video": {
      "Title": "The Penguin Chronicles",
      "Width": 1920n,
      "Height": 1080n,
      "EmbeddedData": [
        3.14159,
        23493n,
        null,
        true,
        false,
        operators.subtract(0n, 10n),
      ],
      "Thumb": {
        "Url": "http://www.example.com/video/5678931",
        "Width": 200n,
        "Height": 250n,
      },
      "Animated": false,
      "IDs": [
        116n,
        943n,
        234n,
        38793n,
        true,
        false,
        null,
        operators.subtract(0n, 100n),
      ],
      "Escapes": '"\\\/\t\n\r\t',
      "Subtitle": false,
      "Latitude": 37.7668,
      "Longitude": -122.3959,
    },
  },
);
