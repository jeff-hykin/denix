import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default // args: {
//    nixpkgs,
//    system,
//    pkgs,
//    nixVersions,
//    libpath,
//    seed,
//    ,
//}
createFunc({"nixpkgs": (nixScope)=>((new Path(["../../.."], []))),"system": (nixScope)=>(nixScope["builtins"]["currentSystem"]),"pkgs": (nixScope)=>(nixScope["import"](nixScope["nixpkgs"])(({"config": {}, "overlays": [], "system": nixScope["system"]}))),"nixVersions": (nixScope)=>(nixScope["import"]((new Path(["../../tests/nix-for-tests.nix"], [])))(({"pkgs": nixScope["pkgs"]}))),"libpath": (nixScope)=>((new Path(["../.."], []))),"seed": (nixScope)=>(null),}, null, {}, (nixScope)=>(
                nixScope["pkgs"]["runCommand"]("lib-path-tests")(({"nativeBuildInputs": operators.listConcat([nixScope["nixVersions"]["stable"]], (((_withAttrs)=>{
        const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
        runtime.scopeStack.push(nixScope);
        try {
            return [nixScope["jq"],nixScope["bc"]];
        } finally {
            runtime.scopeStack.pop();
        }
    })(nixScope["pkgs"])))}))((new InterpolatedString(["\n    # Needed to make Nix evaluation work\n    export TEST_ROOT=$(pwd)/test-tmp\n    export NIX_BUILD_HOOK=\n    export NIX_CONF_DIR=$TEST_ROOT/etc\n    export NIX_LOCALSTATE_DIR=$TEST_ROOT/var\n    export NIX_LOG_DIR=$TEST_ROOT/var/log/nix\n    export NIX_STATE_DIR=$TEST_ROOT/var/nix\n    export NIX_STORE_DIR=$TEST_ROOT/store\n    export PAGER=cat\n\n    cp -r ", " lib\n    export TEST_LIB=$PWD/lib\n\n    echo \"Running unit tests lib/path/tests/unit.nix\"\n    nix-instantiate --eval --show-trace \\\n      --argstr libpath \"$TEST_LIB\" \\\n      lib/path/tests/unit.nix\n\n    echo \"Running property tests lib/path/tests/prop.sh\"\n    bash lib/path/tests/prop.sh ", "\n\n    touch $out\n  "], [()=>(nixScope["libpath"]), ()=>(nixScope["toString"](nixScope["seed"]))])))
            ))