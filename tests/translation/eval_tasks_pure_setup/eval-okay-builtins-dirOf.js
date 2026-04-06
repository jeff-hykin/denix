import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter, apply } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;

export default ({
  "stringEmpty": apply(nixScope.dirOf, ""),
  "stringNoSep": apply(nixScope.dirOf, "filename"),
  "stringSingleDir": apply(nixScope.dirOf, "a/b"),
  "stringMultipleSeps": apply(nixScope.dirOf, "a///b"),
  "stringRoot": apply(nixScope.dirOf, "/"),
  "stringRootSlash": apply(nixScope.dirOf, "//"),
  "stringRootSlashSlash": apply(nixScope.dirOf, "///"),
  "stringRootA": apply(nixScope.dirOf, "/a"),
  "stringWithDot": apply(nixScope.dirOf, "a/b/c/./d"),
  "stringWithDotSep2": apply(nixScope.dirOf, "a/b/c/.//d"),
  "stringWithDotDot": apply(nixScope.dirOf, "a/b/c/../d"),
  "stringWithDotDotSep2": apply(nixScope.dirOf, "a/b/c/..//d"),
  "stringWithDotAndDotDot": apply(nixScope.dirOf, "a/b/c/.././d"),
  "stringWithDotAndDotDotSep2": apply(nixScope.dirOf, "a/b/c/.././/d"),
  "pathRoot": apply(nixScope.dirOf, new Path(["/."], [])),
  "pathDoesntExistRoot": apply(
    nixScope.dirOf,
    new Path(["/totallydoesntexistreally"], []),
  ),
  "pathDoesntExistNested1": apply(
    nixScope.dirOf,
    new Path(["/totallydoesntexistreally/subdir1"], []),
  ),
  "pathDoesntExistNested2": apply(
    nixScope.dirOf,
    new Path(["/totallydoesntexistreally/subdir1/subdir2"], []),
  ),
});
