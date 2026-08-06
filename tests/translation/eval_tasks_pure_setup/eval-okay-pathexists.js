import {
  createRuntime,
  Path,
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
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-pathexists.nix";
const operators = runtime.operators;

export default ((((((((((((((((((((((((((((((apply(
  nixScope.builtins["pathExists"],
  mkThunk(
    () => (new Path([
      "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/lib.nix",
    ], []))
  ),
)) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (apply(
        nixScope.builtins["toPath"],
        mkThunk(
          () => (new Path([
            "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/lib.nix",
          ], []))
        ),
      ))
    ),
  ))) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (apply(
        nixScope.builtins["toString"],
        mkThunk(
          () => (new Path([
            "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/lib.nix",
          ], []))
        ),
      ))
    ),
  ))) &&
  (operators.negate(
    apply(
      nixScope.builtins["pathExists"],
      mkThunk(
        () => (operators.add(
          apply(
            nixScope.builtins["toString"],
            mkThunk(
              () => (new Path([
                "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/lib.nix",
              ], []))
            ),
          ),
          "/",
        ))
      ),
    ),
  ))) &&
  (operators.negate(
    apply(
      nixScope.builtins["pathExists"],
      mkThunk(
        () => (operators.add(
          apply(
            nixScope.builtins["toString"],
            mkThunk(
              () => (new Path([
                "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/lib.nix",
              ], []))
            ),
          ),
          "/.",
        ))
      ),
    ),
  ))) &&
  (operators.negate(
    apply(
      nixScope.builtins["pathExists"],
      mkThunk(
        () => (operators.add(
          apply(
            nixScope.builtins["toString"],
            mkThunk(
              () => (new Path([
                "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/lib.nix",
              ], []))
            ),
          ),
          "/./",
        ))
      ),
    ),
  ))) &&
  (operators.negate(
    apply(
      nixScope.builtins["pathExists"],
      mkThunk(
        () => (operators.add(
          apply(
            nixScope.builtins["toString"],
            mkThunk(
              () => (new Path([
                "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/lib.nix",
              ], []))
            ),
          ),
          "/./.",
        ))
      ),
    ),
  ))) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (operators.add(
        apply(
          nixScope.builtins["toString"],
          mkThunk(
            () => (new Path(
              ["/Users/jeffhykin/repos/denix/tests/translation"],
              [],
            ))
          ),
        ),
        "/lang/lib.nix",
      ))
    ),
  ))) &&
  (operators.negate(
    apply(
      nixScope.builtins["pathExists"],
      mkThunk(
        () => (operators.add(
          apply(
            nixScope.builtins["toString"],
            mkThunk(
              () => (new Path([
                "/Users/jeffhykin/repos/denix/tests/translation",
              ], []))
            ),
          ),
          "lang/lib.nix",
        ))
      ),
    ),
  ))) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (operators.add(
        apply(
          nixScope.builtins["toString"],
          mkThunk(
            () => (new Path([
              "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup",
            ], []))
          ),
        ),
        "/../lang/lib.nix",
      ))
    ),
  ))) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (operators.add(
        apply(
          nixScope.builtins["toString"],
          mkThunk(
            () => (new Path([
              "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup",
            ], []))
          ),
        ),
        "/../lang/../source_code/nix_lang/lib.nix",
      ))
    ),
  ))) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (apply(
        nixScope.builtins["toString"],
        mkThunk(
          () => (new Path([
            "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup",
          ], []))
        ),
      ))
    ),
  ))) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (operators.add(
        apply(
          nixScope.builtins["toString"],
          mkThunk(
            () => (new Path([
              "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup",
            ], []))
          ),
        ),
        "/",
      ))
    ),
  ))) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (operators.add(
        apply(
          nixScope.builtins["toString"],
          mkThunk(
            () => (new Path([
              "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup",
            ], []))
          ),
        ),
        "/../lang",
      ))
    ),
  ))) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (operators.add(
        apply(
          nixScope.builtins["toString"],
          mkThunk(
            () => (new Path([
              "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup",
            ], []))
          ),
        ),
        "/../lang/",
      ))
    ),
  ))) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (operators.add(
        apply(
          nixScope.builtins["toString"],
          mkThunk(
            () => (new Path([
              "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup",
            ], []))
          ),
        ),
        "/../lang/.",
      ))
    ),
  ))) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (operators.add(
        apply(
          nixScope.builtins["toString"],
          mkThunk(
            () => (new Path([
              "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup",
            ], []))
          ),
        ),
        "/../lang/./",
      ))
    ),
  ))) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (operators.add(
        apply(
          nixScope.builtins["toString"],
          mkThunk(
            () => (new Path([
              "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup",
            ], []))
          ),
        ),
        "/../lang//./",
      ))
    ),
  ))) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (operators.add(
        apply(
          nixScope.builtins["toString"],
          mkThunk(
            () => (new Path([
              "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup",
            ], []))
          ),
        ),
        "/../lang/..",
      ))
    ),
  ))) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (operators.add(
        apply(
          nixScope.builtins["toString"],
          mkThunk(
            () => (new Path([
              "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup",
            ], []))
          ),
        ),
        "/../lang/../",
      ))
    ),
  ))) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (operators.add(
        apply(
          nixScope.builtins["toString"],
          mkThunk(
            () => (new Path([
              "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup",
            ], []))
          ),
        ),
        "/../lang/..//",
      ))
    ),
  ))) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (apply(
        nixScope.builtins["toPath"],
        mkThunk(
          () => (apply(
            nixScope.builtins["toString"],
            mkThunk(
              () => (new Path([
                "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/lib.nix",
              ], []))
            ),
          ))
        ),
      ))
    ),
  ))) &&
  (operators.negate(
    apply(
      nixScope.builtins["pathExists"],
      mkThunk(
        () => (apply(
          nixScope.builtins["toPath"],
          mkThunk(
            () => (apply(
              nixScope.builtins["toString"],
              mkThunk(
                () => (new Path([
                  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/bla.nix",
                ], []))
              ),
            ))
          ),
        ))
      ),
    ),
  ))) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (apply(
        nixScope.builtins["toPath"],
        mkThunk(() => (createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(
            obj,
            "__toString",
            () => (createFunc(/*arg:*/ "x", null, {}, nixScope, (nixScope) => (
              apply(
                nixScope.builtins["toString"],
                mkThunk(
                  () => (new Path([
                    "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/lib.nix",
                  ], []))
                ),
              )
            ))),
          );
          return obj;
        }))),
      ))
    ),
  ))) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (apply(
        nixScope.builtins["toPath"],
        mkThunk(() => (createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(
            obj,
            "outPath",
            () => (apply(
              nixScope.builtins["toString"],
              mkThunk(
                () => (new Path([
                  "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/lib.nix",
                ], []))
              ),
            )),
          );
          return obj;
        }))),
      ))
    ),
  ))) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (new Path([
        "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/lib.nix",
      ], []))
    ),
  ))) &&
  (operators.negate(
    apply(
      nixScope.builtins["pathExists"],
      mkThunk(
        () => (new Path([
          "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/bla.nix",
        ], []))
      ),
    ),
  ))) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (new Path([
        "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/symlink-resolution/foo/overlays/overlay.nix",
      ], []))
    ),
  ))) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (new Path([
        "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/symlink-resolution/broken",
      ], []))
    ),
  ))) &&
  (apply(
    nixScope.builtins["pathExists"],
    mkThunk(
      () => (operators.add(
        apply(
          nixScope.builtins["toString"],
          mkThunk(
            () => (new Path([
              "/Users/jeffhykin/repos/denix/tests/translation/source_code/nix_lang/symlink-resolution/foo/overlays",
            ], []))
          ),
        ),
        "/.",
      ))
    ),
  )));
