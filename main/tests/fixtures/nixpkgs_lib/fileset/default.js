import { createRuntime } from "../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default /**
  <!-- This anchor is here for backwards compatibility -->
  []{#sec-fileset}

  The [`lib.fileset`](#sec-functions-library-fileset) library allows you to work with _file sets_.
  A file set is a (mathematical) set of local files that can be added to the Nix store for use in Nix derivations.
  File sets are easy and safe to use, providing obvious and composable semantics with good error messages to prevent mistakes.

  # Overview {#sec-fileset-overview}

  Basics:
  - [Implicit coercion from paths to file sets](#sec-fileset-path-coercion)

  - [`lib.fileset.maybeMissing`](#function-library-lib.fileset.maybeMissing):

    Create a file set from a path that may be missing.

  - [`lib.fileset.trace`](#function-library-lib.fileset.trace)/[`lib.fileset.traceVal`](#function-library-lib.fileset.trace):

    Pretty-print file sets for debugging.

  - [`lib.fileset.toSource`](#function-library-lib.fileset.toSource):

    Add files in file sets to the store to use as derivation sources.

  - [`lib.fileset.toList`](#function-library-lib.fileset.toList):

    The list of files contained in a file set.

  Combinators:
  - [`lib.fileset.union`](#function-library-lib.fileset.union)/[`lib.fileset.unions`](#function-library-lib.fileset.unions):

    Create a larger file set from all the files in multiple file sets.

  - [`lib.fileset.intersection`](#function-library-lib.fileset.intersection):

    Create a smaller file set from only the files in both file sets.

  - [`lib.fileset.difference`](#function-library-lib.fileset.difference):

    Create a smaller file set containing all files that are in one file set, but not another one.

  Filtering:
  - [`lib.fileset.fileFilter`](#function-library-lib.fileset.fileFilter):

    Create a file set from all files that satisisfy a predicate in a directory.

  Utilities:
  - [`lib.fileset.fromSource`](#function-library-lib.fileset.fromSource):

    Create a file set from a `lib.sources`-based value.

  - [`lib.fileset.gitTracked`](#function-library-lib.fileset.gitTracked)/[`lib.fileset.gitTrackedWith`](#function-library-lib.fileset.gitTrackedWith):

    Create a file set from all tracked files in a local Git repository.

  If you need more file set functions,
  see [this issue](https://github.com/NixOS/nixpkgs/issues/266356) to request it.

  # Implicit coercion from paths to file sets {#sec-fileset-path-coercion}

  All functions accepting file sets as arguments can also accept [paths](https://nixos.org/manual/nix/stable/language/values.html#type-path) as arguments.
  Such path arguments are implicitly coerced to file sets containing all files under that path:
  - A path to a file turns into a file set containing that single file.
  - A path to a directory turns into a file set containing all files _recursively_ in that directory.

  If the path points to a non-existent location, an error is thrown.

  ::: {.note}
  Just like in Git, file sets cannot represent empty directories.
  Because of this, a path to a directory that contains no files (recursively) will turn into a file set containing no files.
  :::

  :::{.note}
  File set coercion does _not_ add any of the files under the coerced paths to the store.
  Only the [`toSource`](#function-library-lib.fileset.toSource) function adds files to the Nix store, and only those files contained in the `fileset` argument.
  This is in contrast to using [paths in string interpolation](https://nixos.org/manual/nix/stable/language/values.html#type-path), which does add the entire referenced path to the store.
  :::

  ## Example {#sec-fileset-path-coercion-example}

  Assume we are in a local directory with a file hierarchy like this:
  ```
  ├─ a/
  │  ├─ x (file)
  │  └─ b/
  │     └─ y (file)
  └─ c/
     └─ d/
  ```

  Here's a listing of which files get included when different path expressions get coerced to file sets:
  - `./.` as a file set contains both `a/x` and `a/b/y` (`c/` does not contain any files and is therefore omitted).
  - `./a` as a file set contains both `a/x` and `a/b/y`.
  - `./a/x` as a file set contains only `a/x`.
  - `./a/b` as a file set contains only `a/b/y`.
  - `./c` as a file set is empty, since neither `c` nor `c/d` contain any files.
*/(function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        
                        // inherit arguments
                        ...arg,
                        // all-args arg (if @ syntax is used)
                        
                    }
                    runtime.scopeStack.push(nixScope)
                    try {
                        return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["_coerce"] = nixScope["import"]((new Path(["./internal.nix"], [])))(({"lib": nixScope["lib"]}))["_coerce"];
        nixScope["_singleton"] = nixScope["import"]((new Path(["./internal.nix"], [])))(({"lib": nixScope["lib"]}))["_singleton"];
        nixScope["_coerceMany"] = nixScope["import"]((new Path(["./internal.nix"], [])))(({"lib": nixScope["lib"]}))["_coerceMany"];
        nixScope["_toSourceFilter"] = nixScope["import"]((new Path(["./internal.nix"], [])))(({"lib": nixScope["lib"]}))["_toSourceFilter"];
        nixScope["_fromSourceFilter"] = nixScope["import"]((new Path(["./internal.nix"], [])))(({"lib": nixScope["lib"]}))["_fromSourceFilter"];
        nixScope["_toList"] = nixScope["import"]((new Path(["./internal.nix"], [])))(({"lib": nixScope["lib"]}))["_toList"];
        nixScope["_unionMany"] = nixScope["import"]((new Path(["./internal.nix"], [])))(({"lib": nixScope["lib"]}))["_unionMany"];
        nixScope["_fileFilter"] = nixScope["import"]((new Path(["./internal.nix"], [])))(({"lib": nixScope["lib"]}))["_fileFilter"];
        nixScope["_printFileset"] = nixScope["import"]((new Path(["./internal.nix"], [])))(({"lib": nixScope["lib"]}))["_printFileset"];
        nixScope["_intersection"] = nixScope["import"]((new Path(["./internal.nix"], [])))(({"lib": nixScope["lib"]}))["_intersection"];
        nixScope["_difference"] = nixScope["import"]((new Path(["./internal.nix"], [])))(({"lib": nixScope["lib"]}))["_difference"];
        nixScope["_fromFetchGit"] = nixScope["import"]((new Path(["./internal.nix"], [])))(({"lib": nixScope["lib"]}))["_fromFetchGit"];
        nixScope["_fetchGitSubmodulesMinver"] = nixScope["import"]((new Path(["./internal.nix"], [])))(({"lib": nixScope["lib"]}))["_fetchGitSubmodulesMinver"];
        nixScope["_emptyWithoutBase"] = nixScope["import"]((new Path(["./internal.nix"], [])))(({"lib": nixScope["lib"]}))["_emptyWithoutBase"];
        nixScope["isBool"] = nixScope["builtins"]["isBool"];
        nixScope["isList"] = nixScope["builtins"]["isList"];
        nixScope["isPath"] = nixScope["builtins"]["isPath"];
        nixScope["pathExists"] = nixScope["builtins"]["pathExists"];
        nixScope["seq"] = nixScope["builtins"]["seq"];
        nixScope["typeOf"] = nixScope["builtins"]["typeOf"];
        nixScope["nixVersion"] = nixScope["builtins"]["nixVersion"];
        nixScope["elemAt"] = nixScope["lib"]["lists"]["elemAt"];
        nixScope["imap0"] = nixScope["lib"]["lists"]["imap0"];
        nixScope["hasPrefix"] = nixScope["lib"]["path"]["hasPrefix"];
        nixScope["splitRoot"] = nixScope["lib"]["path"]["splitRoot"];
        nixScope["isStringLike"] = nixScope["lib"]["strings"]["isStringLike"];
        nixScope["versionOlder"] = nixScope["lib"]["strings"]["versionOlder"];
        nixScope["pathType"] = nixScope["lib"]["filesystem"]["pathType"];
        nixScope["cleanSourceWith"] = nixScope["lib"]["sources"]["cleanSourceWith"];
        nixScope["isFunction"] = nixScope["lib"]["trivial"]["isFunction"];
        nixScope["pipe"] = nixScope["lib"]["trivial"]["pipe"];
        return ({"maybeMissing": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.negate(nixScope["isPath"](nixScope["path"])), ()=>((operators.ifThenElse(nixScope["isStringLike"](nixScope["path"]), ()=>(nixScope["throw"]((new InterpolatedString(["lib.fileset.maybeMissing: Argument (\"", "\") is a string-like value, but it should be a path instead."], [()=>(nixScope["toString"](nixScope["path"]))])))), ()=>(nixScope["throw"]((new InterpolatedString(["lib.fileset.maybeMissing: Argument is of type ", ", but it should be a path instead."], [()=>(nixScope["typeOf"](nixScope["path"]))]))))))), ()=>((operators.ifThenElse(operators.negate(nixScope["pathExists"](nixScope["path"])), ()=>(nixScope["_emptyWithoutBase"]), ()=>(nixScope["_singleton"](nixScope["path"]))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "trace": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fileset"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "actualFileset", {enumerable: true, get(){return nixScope["_coerce"]("lib.fileset.trace: Argument")(nixScope["fileset"]);}});
        return nixScope["seq"]((nixScope["_printFileset"](nixScope["actualFileset"])))(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "traceVal": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fileset"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "actualFileset", {enumerable: true, get(){return nixScope["_coerce"]("lib.fileset.traceVal: Argument")(nixScope["fileset"]);}});
        return nixScope["seq"]((nixScope["_printFileset"](nixScope["actualFileset"])))(nixScope["actualFileset"]);
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "toSource": (function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        
                        // inherit arguments
                        ...arg,
                        // all-args arg (if @ syntax is used)
                        
                    }
                    runtime.scopeStack.push(nixScope)
                    try {
                        return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "filesetArg", {enumerable: true, get(){return nixScope["fileset"];}});
        return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "fileset", {enumerable: true, get(){return nixScope["_coerce"]("lib.fileset.toSource: `fileset`")(nixScope["filesetArg"]);}});
        Object.defineProperty(nixScope, "rootFilesystemRoot", {enumerable: true, get(){return (nixScope["splitRoot"](nixScope["root"]))["root"];}});
        Object.defineProperty(nixScope, "filesetFilesystemRoot", {enumerable: true, get(){return (nixScope["splitRoot"](nixScope["fileset"]["_internalBase"]))["root"];}});
        Object.defineProperty(nixScope, "sourceFilter", {enumerable: true, get(){return nixScope["_toSourceFilter"](nixScope["fileset"]);}});
        return (operators.ifThenElse(operators.negate(nixScope["isPath"](nixScope["root"])), ()=>((operators.ifThenElse(operators.hasAttr(nixScope["root"], "_isLibCleanSourceWith"), ()=>(nixScope["throw"](`
          lib.fileset.toSource: \`root\` is a \`lib.sources\`-based value, but it should be a path instead.
              To use a \`lib.sources\`-based value, convert it to a file set using \`lib.fileset.fromSource\` and pass it as \`fileset\`.
              Note that this only works for sources created from paths.`)), ()=>((operators.ifThenElse(nixScope["isStringLike"](nixScope["root"]), ()=>(nixScope["throw"]((new InterpolatedString(["\n          lib.fileset.toSource: \\`root\\` (", ") is a string-like value, but it should be a path instead.\n              Paths in strings are not supported by \\`lib.fileset\\`, use \\`lib.sources\\` or derivations instead."], [()=>(nixScope["toString"](nixScope["root"]))])))), ()=>(nixScope["throw"]((new InterpolatedString(["lib.fileset.toSource: \\`root\\` is of type ", ", but it should be a path instead."], [()=>(nixScope["typeOf"](nixScope["root"]))])))))))))), ()=>((operators.ifThenElse(operators.and(operators.negate(nixScope["fileset"]["_internalIsEmptyWithoutBase"]), operators.notEqual(nixScope["rootFilesystemRoot"], nixScope["filesetFilesystemRoot"])), ()=>(nixScope["throw"]((new InterpolatedString(["\n        lib.fileset.toSource: Filesystem roots are not the same for \\`fileset\\` and \\`root\\` (", "):\n            \\`root\\`: Filesystem root is \"", "\"\n            \\`fileset\\`: Filesystem root is \"", "\"\n            Different filesystem roots are not supported."], [()=>(nixScope["toString"](nixScope["root"])), ()=>(nixScope["toString"](nixScope["rootFilesystemRoot"])), ()=>(nixScope["toString"](nixScope["filesetFilesystemRoot"]))])))), ()=>((operators.ifThenElse(operators.negate(nixScope["pathExists"](nixScope["root"])), ()=>(nixScope["throw"]((new InterpolatedString(["lib.fileset.toSource: \\`root\\` (", ") is a path that does not exist."], [()=>(nixScope["toString"](nixScope["root"]))])))), ()=>((operators.ifThenElse(operators.notEqual(nixScope["pathType"](nixScope["root"]), "directory"), ()=>(nixScope["throw"]((new InterpolatedString(["\n        lib.fileset.toSource: \\`root\\` (", ") is a file, but it should be a directory instead. Potential solutions:\n            - If you want to import the file into the store _without_ a containing directory, use string interpolation or \\`builtins.path\\` instead of this function.\n            - If you want to import the file into the store _with_ a containing directory, set \\`root\\` to the containing directory, such as ", ", and set \\`fileset\\` to the file path."], [()=>(nixScope["toString"](nixScope["root"])), ()=>(nixScope["toString"]((nixScope["dirOf"](nixScope["root"]))))])))), ()=>((operators.ifThenElse(operators.and(operators.negate(nixScope["fileset"]["_internalIsEmptyWithoutBase"]), operators.negate(nixScope["hasPrefix"](nixScope["root"])(nixScope["fileset"]["_internalBase"]))), ()=>(nixScope["throw"]((new InterpolatedString(["\n        lib.fileset.toSource: \\`fileset\\` could contain files in ", ", which is not under the \\`root\\` (", "). Potential solutions:\n            - Set \\`root\\` to ", " or any directory higher up. This changes the layout of the resulting store path.\n            - Set \\`fileset\\` to a file set that cannot contain files outside the \\`root\\` (", "). This could change the files included in the result."], [()=>(nixScope["toString"](nixScope["fileset"]["_internalBase"])), ()=>(nixScope["toString"](nixScope["root"])), ()=>(nixScope["toString"](nixScope["fileset"]["_internalBase"])), ()=>(nixScope["toString"](nixScope["root"]))])))), ()=>(nixScope["seq"](nixScope["sourceFilter"])(nixScope["cleanSourceWith"])(({"name": "source", "src": nixScope["root"], "filter": nixScope["sourceFilter"]})))))))))))))))));
    } finally {
        runtime.scopeStack.pop();
    }
})();
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                }), "toList": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fileset"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["_toList"]((nixScope["_coerce"]("lib.fileset.toList: Argument")(nixScope["fileset"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "union": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fileset1"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fileset2"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["_unionMany"]((nixScope["_coerceMany"]("lib.fileset.union")([({"context": "First argument", "value": nixScope["fileset1"]}),({"context": "Second argument", "value": nixScope["fileset2"]})]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "unions": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["filesets"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.negate(nixScope["isList"](nixScope["filesets"])), ()=>(nixScope["throw"]((new InterpolatedString(["lib.fileset.unions: Argument is of type ", ", but it should be a list instead."], [()=>(nixScope["typeOf"](nixScope["filesets"]))])))), ()=>(nixScope["pipe"](nixScope["filesets"])([(nixScope["imap0"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["i"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["el"] = arg; runtime.scopeStack.push(nixScope); try { return ({"context": (new InterpolatedString(["Element ", ""], [()=>(nixScope["toString"](nixScope["i"]))])), "value": nixScope["el"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))),(nixScope["_coerceMany"]("lib.fileset.unions")),nixScope["_unionMany"]])))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "intersection": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fileset1"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fileset2"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "filesets", {enumerable: true, get(){return nixScope["_coerceMany"]("lib.fileset.intersection")([({"context": "First argument", "value": nixScope["fileset1"]}),({"context": "Second argument", "value": nixScope["fileset2"]})]);}});
        return nixScope["_intersection"]((nixScope["elemAt"](nixScope["filesets"])(0n)))((nixScope["elemAt"](nixScope["filesets"])(1n)));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "difference": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["positive"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["negative"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "filesets", {enumerable: true, get(){return nixScope["_coerceMany"]("lib.fileset.difference")([({"context": "First argument (positive set)", "value": nixScope["positive"]}),({"context": "Second argument (negative set)", "value": nixScope["negative"]})]);}});
        return nixScope["_difference"]((nixScope["elemAt"](nixScope["filesets"])(0n)))((nixScope["elemAt"](nixScope["filesets"])(1n)));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "fileFilter": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["predicate"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.negate(nixScope["isFunction"](nixScope["predicate"])), ()=>(nixScope["throw"]((new InterpolatedString(["lib.fileset.fileFilter: First argument is of type ", ", but it should be a function instead."], [()=>(nixScope["typeOf"](nixScope["predicate"]))])))), ()=>((operators.ifThenElse(operators.negate(nixScope["isPath"](nixScope["path"])), ()=>((operators.ifThenElse(operators.equal(operators.selectOrDefault(nixScope["path"], ["_type"], ""), "fileset"), ()=>(nixScope["throw"](`
          lib.fileset.fileFilter: Second argument is a file set, but it should be a path instead.
              If you need to filter files in a file set, use \`intersection fileset (fileFilter pred ./.)\` instead.`)), ()=>(nixScope["throw"]((new InterpolatedString(["lib.fileset.fileFilter: Second argument is of type ", ", but it should be a path instead."], [()=>(nixScope["typeOf"](nixScope["path"]))]))))))), ()=>((operators.ifThenElse(operators.negate(nixScope["pathExists"](nixScope["path"])), ()=>(nixScope["throw"]((new InterpolatedString(["lib.fileset.fileFilter: Second argument (", ") is a path that does not exist."], [()=>(nixScope["toString"](nixScope["path"]))])))), ()=>(nixScope["_fileFilter"](nixScope["predicate"])(nixScope["path"])))))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "fromSource": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["source"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "isFiltered", {enumerable: true, get(){return operators.hasAttr(nixScope["source"], "_isLibCleanSourceWith");}});
        Object.defineProperty(nixScope, "path", {enumerable: true, get(){return (operators.ifThenElse(nixScope["isFiltered"], ()=>(nixScope["source"]["origSrc"]), ()=>(nixScope["source"])));}});
        return (operators.ifThenElse(operators.negate(nixScope["isPath"](nixScope["path"])), ()=>((operators.ifThenElse(nixScope["isStringLike"](nixScope["path"]), ()=>(nixScope["throw"]((new InterpolatedString(["\n          lib.fileset.fromSource: The source origin of the argument is a string-like value (\"", "\"), but it should be a path instead.\n              Sources created from paths in strings cannot be turned into file sets, use \\`lib.sources\\` or derivations instead."], [()=>(nixScope["toString"](nixScope["path"]))])))), ()=>(nixScope["throw"]((new InterpolatedString(["lib.fileset.fromSource: The source origin of the argument is of type ", ", but it should be a path instead."], [()=>(nixScope["typeOf"](nixScope["path"]))]))))))), ()=>((operators.ifThenElse(operators.negate(nixScope["pathExists"](nixScope["path"])), ()=>(nixScope["throw"]((new InterpolatedString(["lib.fileset.fromSource: The source origin (", ") of the argument is a path that does not exist."], [()=>(nixScope["toString"](nixScope["path"]))])))), ()=>((operators.ifThenElse(nixScope["isFiltered"], ()=>(nixScope["_fromSourceFilter"](nixScope["path"])(nixScope["source"]["filter"])), ()=>(nixScope["_singleton"](nixScope["path"]))))))))));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "gitTracked": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["_fromFetchGit"]("gitTracked")("argument")(nixScope["path"])({}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "gitTrackedWith": (function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        "recurseSubmodules": (()=>{ const nixScope = runtime.scopeStack.slice(-1)[0]; return false; })(),
                        // inherit arguments
                        ...arg,
                        // all-args arg (if @ syntax is used)
                        
                    }
                    runtime.scopeStack.push(nixScope)
                    try {
                        return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.negate(nixScope["isBool"](nixScope["recurseSubmodules"])), ()=>(nixScope["throw"]((new InterpolatedString(["lib.fileset.gitTrackedWith: Expected the attribute `recurseSubmodules` of the first argument to be a boolean, but it's a ", " instead."], [()=>(nixScope["typeOf"](nixScope["recurseSubmodules"]))])))), ()=>((operators.ifThenElse(operators.and(nixScope["recurseSubmodules"], nixScope["versionOlder"](nixScope["nixVersion"])(nixScope["_fetchGitSubmodulesMinver"])), ()=>(nixScope["throw"]((new InterpolatedString(["lib.fileset.gitTrackedWith: Setting the attribute `recurseSubmodules` to `true` is only supported for Nix version ", " and after, but Nix version ", " is used."], [()=>(nixScope["_fetchGitSubmodulesMinver"]), ()=>(nixScope["nixVersion"])])))), ()=>(nixScope["_fromFetchGit"]("gitTrackedWith")("second argument")(nixScope["path"])((nixScope["lib"]["optionalAttrs"](nixScope["recurseSubmodules"])(({"submodules": true})))))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })});
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })