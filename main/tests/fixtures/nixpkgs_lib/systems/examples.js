import { createRuntime, createFunc } from "../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default //
//
//


// args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "platforms", {enumerable: true, get(){return nixScope["import"]((new Path(["./platforms.nix"], [])))(({"lib": nixScope["lib"]}));}});
            Object.defineProperty(nixScope, "riscv", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["bits"] = arg; runtime.scopeStack.push(nixScope); try { return ({"config": (new InterpolatedString(["riscv", "-unknown-linux-gnu"], [()=>(nixScope["bits"])]))}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return (function(){
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
        nixScope["powernv"] = ({"config": "powerpc64le-unknown-linux-gnu"});
        nixScope["musl-power"] = ({"config": "powerpc64le-unknown-linux-musl"});
        nixScope["ppc64-elfv1"] = (function(){
        const obj = {};
        obj["config"] = "powerpc64-unknown-linux-gnuabielfv1";
        if (obj["rust"] === undefined) obj["rust"] = {};
        obj["rust"]["rustcTarget"] = "powerpc64-unknown-linux-gnu";
        return obj;
    })();
        nixScope["ppc64-elfv2"] = ({"config": "powerpc64-unknown-linux-gnuabielfv2"});
        nixScope["ppc64-musl"] = ({"config": "powerpc64-unknown-linux-musl", "gcc": ({"abi": "elfv2"})});
        nixScope["armv7l-hf-multiplatform"] = ({"config": "armv7l-unknown-linux-gnueabihf"});
        nixScope["aarch64-multiplatform"] = ({"config": "aarch64-unknown-linux-gnu"});
        nixScope["aarch64-multiplatform-musl"] = ({"config": "aarch64-unknown-linux-musl"});
        nixScope["gnu64"] = ({"config": "x86_64-unknown-linux-gnu"});
        nixScope["gnu32"] = ({"config": "i686-unknown-linux-gnu"});
        nixScope["musl64"] = ({"config": "x86_64-unknown-linux-musl"});
        nixScope["musl32"] = ({"config": "i686-unknown-linux-musl"});
        nixScope["riscv64-musl"] = ({"config": "riscv64-unknown-linux-musl"});
        nixScope["riscv64-embedded"] = ({"config": "riscv64-none-elf", "libc": "newlib"});
        nixScope["riscv32-embedded"] = ({"config": "riscv32-none-elf", "libc": "newlib"});
        nixScope["mips64-embedded"] = ({"config": "mips64-none-elf", "libc": "newlib"});
        nixScope["mips-embedded"] = ({"config": "mips-none-elf", "libc": "newlib"});
        nixScope["mmix"] = ({"config": "mmix-unknown-mmixware", "libc": "newlib"});
        nixScope["rx-embedded"] = ({"config": "rx-none-elf", "libc": "newlib"});
        nixScope["msp430"] = ({"config": "msp430-elf", "libc": "newlib"});
        nixScope["avr"] = ({"config": "avr"});
        nixScope["vc4"] = ({"config": "vc4-elf", "libc": "newlib"});
        nixScope["or1k"] = ({"config": "or1k-elf", "libc": "newlib"});
        nixScope["m68k"] = ({"config": "m68k-unknown-linux-gnu"});
        nixScope["s390"] = ({"config": "s390-unknown-linux-gnu"});
        nixScope["s390x"] = ({"config": "s390x-unknown-linux-gnu"});
        nixScope["arm-embedded"] = ({"config": "arm-none-eabi", "libc": "newlib"});
        nixScope["arm-embedded-nano"] = ({"config": "arm-none-eabi", "libc": "newlib-nano"});
        nixScope["armhf-embedded"] = ({"config": "arm-none-eabihf", "libc": "newlib", "gcc": ({"arch": "armv5t", "fpu": "vfp"})});
        nixScope["aarch64-embedded"] = (function(){
        const obj = {};
        obj["config"] = "aarch64-none-elf";
        obj["libc"] = "newlib";
        if (obj["rust"] === undefined) obj["rust"] = {};
        obj["rust"]["rustcTarget"] = "aarch64-unknown-none";
        return obj;
    })();
        nixScope["aarch64be-embedded"] = ({"config": "aarch64_be-none-elf", "libc": "newlib"});
        nixScope["ppc-embedded"] = ({"config": "powerpc-none-eabi", "libc": "newlib"});
        nixScope["ppcle-embedded"] = ({"config": "powerpcle-none-eabi", "libc": "newlib"});
        nixScope["i686-embedded"] = ({"config": "i686-elf", "libc": "newlib"});
        nixScope["x86_64-embedded"] = ({"config": "x86_64-elf", "libc": "newlib"});
        nixScope["microblaze-embedded"] = ({"config": "microblazeel-none-elf", "libc": "newlib"});
        nixScope["x86_64-unknown-redox"] = ({"config": "x86_64-unknown-redox", "libc": "relibc"});
        nixScope["aarch64-darwin"] = ({"config": "arm64-apple-darwin", "xcodePlatform": "MacOSX", "platform": {}});
        nixScope["x86_64-darwin"] = ({"config": "x86_64-apple-darwin", "xcodePlatform": "MacOSX", "platform": {}});
        nixScope["mingw32"] = ({"config": "i686-w64-mingw32", "libc": "msvcrt"});
        nixScope["mingwW64"] = ({"config": "x86_64-w64-mingw32", "libc": "msvcrt"});
        nixScope["ucrt64"] = ({"config": "x86_64-w64-mingw32", "libc": "ucrt"});
        nixScope["x86_64-netbsd"] = ({"config": "x86_64-unknown-netbsd"});
        nixScope["ghcjs"] = ({"config": "javascript-unknown-ghcjs"});
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "ppc64", {enumerable: true, get(){return nixScope["ppc64-elfv2"];}});
            Object.defineProperty(nixScope, "sheevaplug", {enumerable: true, get(){return operators.merge(({"config": "armv5tel-unknown-linux-gnueabi"}), nixScope["platforms"]["sheevaplug"]);}});
            Object.defineProperty(nixScope, "raspberryPi", {enumerable: true, get(){return operators.merge(({"config": "armv6l-unknown-linux-gnueabihf"}), nixScope["platforms"]["raspberrypi"]);}});
            Object.defineProperty(nixScope, "bluefield2", {enumerable: true, get(){return operators.merge(({"config": "aarch64-unknown-linux-gnu"}), nixScope["platforms"]["bluefield2"]);}});
            Object.defineProperty(nixScope, "remarkable1", {enumerable: true, get(){return operators.merge(({"config": "armv7l-unknown-linux-gnueabihf"}), nixScope["platforms"]["zero-gravitas"]);}});
            Object.defineProperty(nixScope, "remarkable2", {enumerable: true, get(){return operators.merge(({"config": "armv7l-unknown-linux-gnueabihf"}), nixScope["platforms"]["zero-sugar"]);}});
            Object.defineProperty(nixScope, "armv7a-android-prebuilt", {enumerable: true, get(){return operators.merge((function(){
        const obj = {};
        obj["config"] = "armv7a-unknown-linux-androideabi";
        obj["androidSdkVersion"] = "33";
        obj["androidNdkVersion"] = "26";
        obj["useAndroidPrebuilt"] = true;
        if (obj["rust"] === undefined) obj["rust"] = {};
        obj["rust"]["rustcTarget"] = "armv7-linux-androideabi";
        return obj;
    })(), nixScope["platforms"]["armv7a-android"]);}});
            Object.defineProperty(nixScope, "aarch64-android-prebuilt", {enumerable: true, get(){return (function(){
        const obj = {};
        obj["config"] = "aarch64-unknown-linux-android";
        obj["androidSdkVersion"] = "33";
        obj["androidNdkVersion"] = "26";
        obj["useAndroidPrebuilt"] = true;
        if (obj["rust"] === undefined) obj["rust"] = {};
        obj["rust"]["rustcTarget"] = "aarch64-linux-android";
        return obj;
    })();}});
            Object.defineProperty(nixScope, "aarch64-android", {enumerable: true, get(){return ({"config": "aarch64-unknown-linux-android", "androidSdkVersion": "33", "androidNdkVersion": "26", "libc": "bionic", "useAndroidPrebuilt": false, "useLLVM": true});}});
            Object.defineProperty(nixScope, "pogoplug4", {enumerable: true, get(){return operators.merge(({"config": "armv5tel-unknown-linux-gnueabi"}), nixScope["platforms"]["pogoplug4"]);}});
            Object.defineProperty(nixScope, "ben-nanonote", {enumerable: true, get(){return operators.merge(({"config": "mipsel-unknown-linux-uclibc"}), nixScope["platforms"]["ben_nanonote"]);}});
            Object.defineProperty(nixScope, "fuloongminipc", {enumerable: true, get(){return operators.merge(({"config": "mipsel-unknown-linux-gnu"}), nixScope["platforms"]["fuloong2f_n32"]);}});
            Object.defineProperty(nixScope, "mips-linux-gnu", {enumerable: true, get(){return operators.merge(({"config": "mips-unknown-linux-gnu"}), nixScope["platforms"]["gcc_mips32r2_o32"]);}});
            Object.defineProperty(nixScope, "mipsel-linux-gnu", {enumerable: true, get(){return operators.merge(({"config": "mipsel-unknown-linux-gnu"}), nixScope["platforms"]["gcc_mips32r2_o32"]);}});
            Object.defineProperty(nixScope, "mips64-linux-gnuabin32", {enumerable: true, get(){return operators.merge(({"config": "mips64-unknown-linux-gnuabin32"}), nixScope["platforms"]["gcc_mips64r2_n32"]);}});
            Object.defineProperty(nixScope, "mips64el-linux-gnuabin32", {enumerable: true, get(){return operators.merge(({"config": "mips64el-unknown-linux-gnuabin32"}), nixScope["platforms"]["gcc_mips64r2_n32"]);}});
            Object.defineProperty(nixScope, "mips64-linux-gnuabi64", {enumerable: true, get(){return operators.merge(({"config": "mips64-unknown-linux-gnuabi64"}), nixScope["platforms"]["gcc_mips64r2_64"]);}});
            Object.defineProperty(nixScope, "mips64el-linux-gnuabi64", {enumerable: true, get(){return operators.merge(({"config": "mips64el-unknown-linux-gnuabi64"}), nixScope["platforms"]["gcc_mips64r2_64"]);}});
            Object.defineProperty(nixScope, "muslpi", {enumerable: true, get(){return operators.merge(nixScope["raspberryPi"], ({"config": "armv6l-unknown-linux-musleabihf"}));}});
            Object.defineProperty(nixScope, "gnu64_simplekernel", {enumerable: true, get(){return operators.merge(nixScope["gnu64"], nixScope["platforms"]["pc_simplekernel"]);}});
            Object.defineProperty(nixScope, "riscv64", {enumerable: true, get(){return nixScope["riscv"]("64");}});
            Object.defineProperty(nixScope, "riscv32", {enumerable: true, get(){return nixScope["riscv"]("32");}});
            Object.defineProperty(nixScope, "loongarch64-linux", {enumerable: true, get(){return nixScope["lib"]["recursiveUpdate"](nixScope["platforms"]["loongarch64-multiplatform"])(({"config": "loongarch64-unknown-linux-gnu"}));}});
            Object.defineProperty(nixScope, "loongarch64-linux-embedded", {enumerable: true, get(){return nixScope["lib"]["recursiveUpdate"](nixScope["platforms"]["loongarch64-multiplatform"])(({"config": "loongarch64-unknown-linux-gnu", "gcc": ({"arch": "loongarch64", "strict-align": true})}));}});
            Object.defineProperty(nixScope, "iphone64", {enumerable: true, get(){return ({"config": "arm64-apple-ios", "darwinSdkVersion": "14.3", "xcodeVer": "12.3", "xcodePlatform": "iPhoneOS", "useiOSPrebuilt": true});}});
            Object.defineProperty(nixScope, "iphone64-simulator", {enumerable: true, get(){return ({"config": "x86_64-apple-ios", "darwinSdkVersion": "14.3", "xcodeVer": "12.3", "xcodePlatform": "iPhoneSimulator", "darwinPlatform": "ios-simulator", "useiOSPrebuilt": true});}});
            Object.defineProperty(nixScope, "ucrtAarch64", {enumerable: true, get(){return (function(){
        const obj = {};
        obj["config"] = "aarch64-w64-mingw32";
        obj["libc"] = "ucrt";
        obj["useLLVM"] = true;
        if (obj["rust"] === undefined) obj["rust"] = {};
        obj["rust"]["rustcTarget"] = "aarch64-pc-windows-gnullvm";
        return obj;
    })();}});
            Object.defineProperty(nixScope, "x86_64-windows", {enumerable: true, get(){return ({"config": "x86_64-pc-windows-msvc", "useLLVM": true});}});
            Object.defineProperty(nixScope, "aarch64-windows", {enumerable: true, get(){return ({"config": "aarch64-pc-windows-msvc", "useLLVM": true});}});
            Object.defineProperty(nixScope, "aarch64-freebsd", {enumerable: true, get(){return ({"config": "aarch64-unknown-freebsd", "useLLVM": true});}});
            Object.defineProperty(nixScope, "x86_64-freebsd", {enumerable: true, get(){return ({"config": "x86_64-unknown-freebsd", "useLLVM": true});}});
            Object.defineProperty(nixScope, "x86_64-netbsd-llvm", {enumerable: true, get(){return ({"config": "x86_64-unknown-netbsd", "useLLVM": true});}});
            Object.defineProperty(nixScope, "x86_64-openbsd", {enumerable: true, get(){return ({"config": "x86_64-unknown-openbsd", "useLLVM": true});}});
            Object.defineProperty(nixScope, "wasi32", {enumerable: true, get(){return ({"config": "wasm32-unknown-wasi", "useLLVM": true});}});
            Object.defineProperty(nixScope, "wasm32-unknown-none", {enumerable: true, get(){return (function(){
        const obj = {};
        obj["config"] = "wasm32-unknown-none";
        obj["useLLVM"] = true;
        if (obj["rust"] === undefined) obj["rust"] = {};
        obj["rust"]["rustcTarget"] = "wasm32-unknown-unknown";
        return obj;
    })();}});
            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })();
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))