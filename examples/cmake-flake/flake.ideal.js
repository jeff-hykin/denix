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
  "/Users/jeffhykin/repos/denix/examples/cmake-flake/flake.nix";

export default createScope(nixScope, (nixScope) => {
  const obj = {};
  defGetter(
    obj,
    "description",
    () => ("A CMake-built C program, realized by denix (impure: uses host cmake + compiler)."),
  );
  defGetter(obj, "inputs", () => ({}));
  defGetter(
    obj,
    "outputs",
    () => (createFunc(
      {},
      null,
      { args: { "self": false } },
      nixScope,
      (nixScope) => (
        /*let*/ createScope(nixScope, (nixScope) => {
          defGetter(
            nixScope,
            "system",
            (nixScope) => (nixScope.builtins["currentSystem"]),
          );
          return createScope(nixScope, (nixScope) => {
            const obj = {};
            set(
              obj,
              ["packages", nixScope.system, "default"],
              () => (apply(
                nixScope.derivation,
                mkThunk(() => (createScope(nixScope, (nixScope) => {
                  const obj = {};
                  defGetter(obj, "name", () => ("cmake-hello-1.0"));
                  defGetter(obj, "system", () => (nixScope.system));
                  defGetter(obj, "builder", () => ("/bin/sh"));
                  defGetter(
                    obj,
                    "PATH",
                    () => ("/opt/homebrew/bin:/usr/bin:/bin"),
                  );
                  defGetter(
                    obj,
                    "args",
                    () => [
                      "-c",
                      'set -e\nsrc="$PWD/src"\nmkdir -p "$src"\ncd "$src"\n\ncat > CMakeLists.txt <<\'CMAKELISTS\'\ncmake_minimum_required(VERSION 3.10)\nproject(cmake_hello C)\nadd_executable(cmake-hello main.c)\ninstall(TARGETS cmake-hello DESTINATION bin)\nCMAKELISTS\n\ncat > main.c <<\'MAINC\'\n#include <stdio.h>\nint main(void) {\n    printf("Hello from a CMake-built binary, via denix!\\n");\n    return 0;\n}\nMAINC\n\nmkdir -p build\ncd build\ncmake -DCMAKE_INSTALL_PREFIX="$out" -DCMAKE_BUILD_TYPE=Release ..\ncmake --build .\ncmake --install .\n',
                    ],
                  );
                  return obj;
                }))),
              )),
            );
            return obj;
          });
        })
      ),
    )),
  );
  return obj;
});
