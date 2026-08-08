import { createRuntime } from "https://raw.esm.sh/gh/jeff-hykin/denix@2cf7d788/main/runtime.js";
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
runtime.currentFile = "/Users/jeffhykin/repos/denix/main/corepkgs/fetchurl.nix";
const operators = runtime.operators;

export default createFunc(
  {
    "system": (nixScope) => (""),
    "hash": (nixScope) => (""),
    "md5": (nixScope) => (""),
    "sha1": (nixScope) => (""),
    "sha256": (nixScope) => (""),
    "sha512": (nixScope) => (""),
    "outputHash": (
      nixScope,
    ) => (operators.ifThenElse(
      operators.notEqual(nixScope.hash, ""),
      () => (nixScope.hash),
      () => (operators.ifThenElse(
        operators.notEqual(nixScope.sha512, ""),
        () => (nixScope.sha512),
        () => (operators.ifThenElse(
          operators.notEqual(nixScope.sha1, ""),
          () => (nixScope.sha1),
          () => (operators.ifThenElse(
            operators.notEqual(nixScope.md5, ""),
            () => (nixScope.md5),
            () => (nixScope.sha256),
          )),
        )),
      )),
    )),
    "outputHashAlgo": (
      nixScope,
    ) => (operators.ifThenElse(
      operators.notEqual(nixScope.hash, ""),
      () => (""),
      () => (operators.ifThenElse(
        operators.notEqual(nixScope.sha512, ""),
        () => ("sha512"),
        () => (operators.ifThenElse(
          operators.notEqual(nixScope.sha1, ""),
          () => ("sha1"),
          () => (operators.ifThenElse(
            operators.notEqual(nixScope.md5, ""),
            () => ("md5"),
            () => ("sha256"),
          )),
        )),
      )),
    )),
    "executable": (nixScope) => (false),
    "unpack": (nixScope) => (false),
    "name": (
      nixScope,
    ) => (apply(
      nixScope.baseNameOf,
      mkThunk(() => (apply(nixScope.toString, mkThunk(() => (nixScope.url))))),
    )),
    "impure": (nixScope) => (false),
  },
  null,
  {
    args: {
      "system": true,
      "url": false,
      "hash": true,
      "md5": true,
      "sha1": true,
      "sha256": true,
      "sha512": true,
      "outputHash": true,
      "outputHashAlgo": true,
      "executable": true,
      "unpack": true,
      "name": true,
      "impure": true,
    },
  },
  nixScope,
  (nixScope) => (
    apply(
      nixScope.derivation,
      mkThunk(() => (operators.merge(
        createScope(nixScope, (nixScope) => {
          const obj = {};
          defGetter(obj, "builder", () => ("builtin:fetchurl"));
          defGetter(
            obj,
            "outputHashMode",
            () => (operators.ifThenElse(
              (nixScope.unpack) || (nixScope.executable),
              () => ("recursive"),
              () => ("flat"),
            )),
          );
          defGetter(obj, "name", () => (nixScope.name));
          defGetter(obj, "url", () => (nixScope.url));
          defGetter(obj, "executable", () => (nixScope.executable));
          defGetter(obj, "unpack", () => (nixScope.unpack));
          defGetter(obj, "system", () => ("builtin"));
          defGetter(obj, "preferLocalBuild", () => (true));
          defGetter(
            obj,
            "impureEnvVars",
            () => [
              "http_proxy",
              "https_proxy",
              "ftp_proxy",
              "all_proxy",
              "no_proxy",
            ],
          );
          defGetter(obj, "urls", () => [nixScope.url]);
          return obj;
        }),
        operators.ifThenElse(
          nixScope.impure,
          () => (createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "__impure", () => (true));
            return obj;
          })),
          () => (createScope(nixScope, (nixScope) => {
            const obj = {};
            defGetter(obj, "outputHashAlgo", () => (nixScope.outputHashAlgo));
            defGetter(obj, "outputHash", () => (nixScope.outputHash));
            return obj;
          })),
        ),
      ))),
    )
  ),
);
