import {
  createRuntime,
  Path,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-builtins-dirOf.nix";

export default ({
  "stringEmpty": nixScope.dirOf(""),
  "stringNoSep": nixScope.dirOf("filename"),
  "stringSingleDir": nixScope.dirOf("a/b"),
  "stringMultipleSeps": nixScope.dirOf("a///b"),
  "stringRoot": nixScope.dirOf("/"),
  "stringRootSlash": nixScope.dirOf("//"),
  "stringRootSlashSlash": nixScope.dirOf("///"),
  "stringRootA": nixScope.dirOf("/a"),
  "stringWithDot": nixScope.dirOf("a/b/c/./d"),
  "stringWithDotSep2": nixScope.dirOf("a/b/c/.//d"),
  "stringWithDotDot": nixScope.dirOf("a/b/c/../d"),
  "stringWithDotDotSep2": nixScope.dirOf("a/b/c/..//d"),
  "stringWithDotAndDotDot": nixScope.dirOf("a/b/c/.././d"),
  "stringWithDotAndDotDotSep2": nixScope.dirOf("a/b/c/.././/d"),
  "pathRoot": nixScope.dirOf(new Path(["/."], [])),
  "pathDoesntExistRoot": nixScope.dirOf(
    new Path(["/totallydoesntexistreally"], []),
  ),
  "pathDoesntExistNested1": nixScope.dirOf(
    new Path(["/totallydoesntexistreally/subdir1"], []),
  ),
  "pathDoesntExistNested2": nixScope.dirOf(
    new Path(["/totallydoesntexistreally/subdir1/subdir2"], []),
  ),
});
