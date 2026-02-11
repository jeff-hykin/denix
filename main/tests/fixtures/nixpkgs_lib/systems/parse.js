import { createRuntime } from "../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
(function(arg){
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
        nixScope["all"] = nixScope["lib"]["all"];
        nixScope["any"] = nixScope["lib"]["any"];
        nixScope["attrValues"] = nixScope["lib"]["attrValues"];
        nixScope["elem"] = nixScope["lib"]["elem"];
        nixScope["elemAt"] = nixScope["lib"]["elemAt"];
        nixScope["hasPrefix"] = nixScope["lib"]["hasPrefix"];
        nixScope["id"] = nixScope["lib"]["id"];
        nixScope["length"] = nixScope["lib"]["length"];
        nixScope["mapAttrs"] = nixScope["lib"]["mapAttrs"];
        nixScope["mergeOneOption"] = nixScope["lib"]["mergeOneOption"];
        nixScope["optionalString"] = nixScope["lib"]["optionalString"];
        nixScope["splitString"] = nixScope["lib"]["splitString"];
        nixScope["versionAtLeast"] = nixScope["lib"]["versionAtLeast"];
        nixScope["match"] = nixScope["lib"]["strings"]["match"];
        nixScope["isAarch32"] = nixScope["lib"]["systems"]["inspect"]["predicates"]["isAarch32"];
        nixScope["isBigEndian"] = nixScope["lib"]["systems"]["inspect"]["predicates"]["isBigEndian"];
        nixScope["isDarwin"] = nixScope["lib"]["systems"]["inspect"]["predicates"]["isDarwin"];
        nixScope["isLinux"] = nixScope["lib"]["systems"]["inspect"]["predicates"]["isLinux"];
        nixScope["isPower64"] = nixScope["lib"]["systems"]["inspect"]["predicates"]["isPower64"];
        nixScope["isWindows"] = nixScope["lib"]["systems"]["inspect"]["predicates"]["isWindows"];
        nixScope["enum"] = nixScope["lib"]["types"]["enum"];
        nixScope["float"] = nixScope["lib"]["types"]["float"];
        nixScope["isType"] = nixScope["lib"]["types"]["isType"];
        nixScope["mkOptionType"] = nixScope["lib"]["types"]["mkOptionType"];
        nixScope["number"] = nixScope["lib"]["types"]["number"];
        nixScope["setType"] = nixScope["lib"]["types"]["setType"];
        nixScope["string"] = nixScope["lib"]["types"]["string"];
        nixScope["types"] = nixScope["lib"]["types"]["types"];
        Object.defineProperty(nixScope, "setTypes", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["type"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "type.check value");
    }
    return nixScope["setType"](nixScope["type"]["name"])((operators.merge(({"name": nixScope["name"]}), nixScope["value"])));
})(nixScope["type"]["check"](nixScope["value"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "removeAbiSuffix", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "found", {enumerable: true, get(){return nixScope["match"]("(.*)e?abi.*")(nixScope["x"]);}});
        return (operators.ifThenElse(operators.equal(nixScope["found"], null), ()=>(nixScope["x"]), ()=>(nixScope["elemAt"](nixScope["found"])(0n))));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        return (function(){
    const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
    nixScope["types"] = {};
    nixScope["types"]["openSignificantByte"] = nixScope["mkOptionType"](({"name": "significant-byte", "description": "Endianness", "merge": nixScope["mergeOneOption"]}));
    nixScope["types"]["significantByte"] = nixScope["enum"]((nixScope["attrValues"](nixScope["significantBytes"])));
    nixScope["types"]["bitWidth"] = nixScope["enum"]([8n,16n,32n,64n,128n]);
    nixScope["types"]["openCpuType"] = nixScope["mkOptionType"](({"name": "cpu-type", "description": "instruction set architecture name and information", "merge": nixScope["mergeOneOption"], "check": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and(nixScope["types"]["bitWidth"]["check"](nixScope["x"]["bits"]), ((operators.ifThenElse(operators.lessThan(8n, nixScope["x"]["bits"]), ()=>(nixScope["types"]["significantByte"]["check"](nixScope["x"]["significantByte"])), ()=>(operators.negate((operators.hasAttr(nixScope["x"], "significantByte")))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));
    nixScope["types"]["cpuType"] = nixScope["enum"]((nixScope["attrValues"](nixScope["cpuTypes"])));
    nixScope["types"]["openVendor"] = nixScope["mkOptionType"](({"name": "vendor", "description": "vendor for the platform", "merge": nixScope["mergeOneOption"]}));
    nixScope["types"]["vendor"] = nixScope["enum"]((nixScope["attrValues"](nixScope["vendors"])));
    nixScope["types"]["openExecFormat"] = nixScope["mkOptionType"](({"name": "exec-format", "description": "executable container used by the kernel", "merge": nixScope["mergeOneOption"]}));
    nixScope["types"]["execFormat"] = nixScope["enum"]((nixScope["attrValues"](nixScope["execFormats"])));
    nixScope["types"]["openKernelFamily"] = nixScope["mkOptionType"](({"name": "exec-format", "description": "executable container used by the kernel", "merge": nixScope["mergeOneOption"]}));
    nixScope["types"]["kernelFamily"] = nixScope["enum"]((nixScope["attrValues"](nixScope["kernelFamilies"])));
    nixScope["types"]["openKernel"] = nixScope["mkOptionType"](({"name": "kernel", "description": "kernel name and information", "merge": nixScope["mergeOneOption"], "check": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and(nixScope["types"]["execFormat"]["check"](nixScope["x"]["execFormat"]), nixScope["all"](nixScope["types"]["kernelFamily"]["check"])((nixScope["attrValues"](nixScope["x"]["families"])))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));
    nixScope["types"]["kernel"] = nixScope["enum"]((nixScope["attrValues"](nixScope["kernels"])));
    nixScope["types"]["openAbi"] = nixScope["mkOptionType"](({"name": "abi", "description": "binary interface for compiled code and syscalls", "merge": nixScope["mergeOneOption"]}));
    nixScope["types"]["abi"] = nixScope["enum"]((nixScope["attrValues"](nixScope["abis"])));
    nixScope["types"]["parsedPlatform"] = nixScope["mkOptionType"](({"name": "system", "description": "fully parsed representation of llvm- or nix-style platform tuple", "merge": nixScope["mergeOneOption"], "check": (function(arg){
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
                        return operators.and(operators.and(operators.and(nixScope["types"]["cpuType"]["check"](nixScope["cpu"]), nixScope["types"]["vendor"]["check"](nixScope["vendor"])), nixScope["types"]["kernel"]["check"](nixScope["kernel"])), nixScope["types"]["abi"]["check"](nixScope["abi"]))
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })}));
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "significantBytes", {enumerable: true, get(){return nixScope["setTypes"](nixScope["types"]["openSignificantByte"])(({"bigEndian": {}, "littleEndian": {}}));}});
        Object.defineProperty(nixScope, "cpuTypes", {enumerable: true, get(){return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["bigEndian"] = nixScope["significantBytes"]["bigEndian"];
        nixScope["littleEndian"] = nixScope["significantBytes"]["littleEndian"];
        return operators.merge(nixScope["setTypes"](nixScope["types"]["openCpuType"])(({"arm": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "arm"}), "armv5tel": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "arm", "version": "5", "arch": "armv5t"}), "armv6m": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "arm", "version": "6", "arch": "armv6-m"}), "armv6l": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "arm", "version": "6", "arch": "armv6"}), "armv7a": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "arm", "version": "7", "arch": "armv7-a"}), "armv7r": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "arm", "version": "7", "arch": "armv7-r"}), "armv7m": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "arm", "version": "7", "arch": "armv7-m"}), "armv7l": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "arm", "version": "7", "arch": "armv7"}), "armv8a": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "arm", "version": "8", "arch": "armv8-a"}), "armv8r": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "arm", "version": "8", "arch": "armv8-a"}), "armv8m": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "arm", "version": "8", "arch": "armv8-m"}), "aarch64": ({"bits": 64n, "significantByte": nixScope["littleEndian"], "family": "arm", "version": "8", "arch": "armv8-a"}), "aarch64_be": ({"bits": 64n, "significantByte": nixScope["bigEndian"], "family": "arm", "version": "8", "arch": "armv8-a"}), "i386": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "x86", "arch": "i386"}), "i486": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "x86", "arch": "i486"}), "i586": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "x86", "arch": "i586"}), "i686": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "x86", "arch": "i686"}), "x86_64": ({"bits": 64n, "significantByte": nixScope["littleEndian"], "family": "x86", "arch": "x86-64"}), "microblaze": ({"bits": 32n, "significantByte": nixScope["bigEndian"], "family": "microblaze"}), "microblazeel": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "microblaze"}), "mips": ({"bits": 32n, "significantByte": nixScope["bigEndian"], "family": "mips"}), "mipsel": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "mips"}), "mips64": ({"bits": 64n, "significantByte": nixScope["bigEndian"], "family": "mips"}), "mips64el": ({"bits": 64n, "significantByte": nixScope["littleEndian"], "family": "mips"}), "mmix": ({"bits": 64n, "significantByte": nixScope["bigEndian"], "family": "mmix"}), "m68k": ({"bits": 32n, "significantByte": nixScope["bigEndian"], "family": "m68k"}), "powerpc": ({"bits": 32n, "significantByte": nixScope["bigEndian"], "family": "power"}), "powerpc64": ({"bits": 64n, "significantByte": nixScope["bigEndian"], "family": "power"}), "powerpc64le": ({"bits": 64n, "significantByte": nixScope["littleEndian"], "family": "power"}), "powerpcle": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "power"}), "riscv32": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "riscv"}), "riscv64": ({"bits": 64n, "significantByte": nixScope["littleEndian"], "family": "riscv"}), "s390": ({"bits": 32n, "significantByte": nixScope["bigEndian"], "family": "s390"}), "s390x": ({"bits": 64n, "significantByte": nixScope["bigEndian"], "family": "s390"}), "sparc": ({"bits": 32n, "significantByte": nixScope["bigEndian"], "family": "sparc"}), "sparc64": ({"bits": 64n, "significantByte": nixScope["bigEndian"], "family": "sparc"}), "wasm32": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "wasm"}), "wasm64": ({"bits": 64n, "significantByte": nixScope["littleEndian"], "family": "wasm"}), "alpha": ({"bits": 64n, "significantByte": nixScope["littleEndian"], "family": "alpha"}), "rx": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "rx"}), "msp430": ({"bits": 16n, "significantByte": nixScope["littleEndian"], "family": "msp430"}), "avr": ({"bits": 8n, "family": "avr"}), "vc4": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "vc4"}), "or1k": ({"bits": 32n, "significantByte": nixScope["bigEndian"], "family": "or1k"}), "loongarch64": ({"bits": 64n, "significantByte": nixScope["littleEndian"], "family": "loongarch"}), "javascript": ({"bits": 32n, "significantByte": nixScope["littleEndian"], "family": "javascript"})})), ({"arm64": nixScope["cpuTypes"]["aarch64"]}));
    } finally {
        runtime.scopeStack.pop();
    }
})();}});
        Object.defineProperty(nixScope, "gnuNetBSDDefaultExecFormat", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["cpu"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.or(operators.or(operators.or((operators.and(operators.equal(nixScope["cpu"]["family"], "arm"), operators.equal(nixScope["cpu"]["bits"], 32n))), (operators.and(operators.equal(nixScope["cpu"]["family"], "sparc"), operators.equal(nixScope["cpu"]["bits"], 32n)))), (operators.and(operators.equal(nixScope["cpu"]["family"], "m68k"), operators.equal(nixScope["cpu"]["bits"], 32n)))), (operators.and(operators.equal(nixScope["cpu"]["family"], "x86"), operators.equal(nixScope["cpu"]["bits"], 32n)))), ()=>(nixScope["execFormats"]["aout"]), ()=>(nixScope["execFormats"]["elf"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "isCompatible", {enumerable: true, get(){return ((_withAttrs)=>{
    const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
    runtime.scopeStack.push(nixScope);
    try {
        return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["a"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["b"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["any"](nixScope["id"])([(operators.and(operators.equal(nixScope["b"], nixScope["i386"]), nixScope["isCompatible"](nixScope["a"])(nixScope["i486"]))),(operators.and(operators.equal(nixScope["b"], nixScope["i486"]), nixScope["isCompatible"](nixScope["a"])(nixScope["i586"]))),(operators.and(operators.equal(nixScope["b"], nixScope["i586"]), nixScope["isCompatible"](nixScope["a"])(nixScope["i686"]))),(operators.and(operators.equal(nixScope["b"], nixScope["i686"]), nixScope["isCompatible"](nixScope["a"])(nixScope["x86_64"]))),(operators.and(operators.equal(nixScope["b"], nixScope["arm"]), nixScope["isCompatible"](nixScope["a"])(nixScope["armv5tel"]))),(operators.and(operators.equal(nixScope["b"], nixScope["armv5tel"]), nixScope["isCompatible"](nixScope["a"])(nixScope["armv6l"]))),(operators.and(operators.equal(nixScope["b"], nixScope["armv6l"]), nixScope["isCompatible"](nixScope["a"])(nixScope["armv6m"]))),(operators.and(operators.equal(nixScope["b"], nixScope["armv6m"]), nixScope["isCompatible"](nixScope["a"])(nixScope["armv7l"]))),(operators.and(operators.equal(nixScope["b"], nixScope["armv7l"]), nixScope["isCompatible"](nixScope["a"])(nixScope["armv7a"]))),(operators.and(operators.equal(nixScope["b"], nixScope["armv7l"]), nixScope["isCompatible"](nixScope["a"])(nixScope["armv7r"]))),(operators.and(operators.equal(nixScope["b"], nixScope["armv7l"]), nixScope["isCompatible"](nixScope["a"])(nixScope["armv7m"]))),(operators.and(operators.equal(nixScope["b"], nixScope["aarch64"]), operators.equal(nixScope["a"], nixScope["armv8a"]))),(operators.and(operators.equal(nixScope["b"], nixScope["armv8a"]), nixScope["isCompatible"](nixScope["a"])(nixScope["aarch64"]))),(operators.and(operators.equal(nixScope["b"], nixScope["armv8r"]), nixScope["isCompatible"](nixScope["a"])(nixScope["armv8a"]))),(operators.and(operators.equal(nixScope["b"], nixScope["armv8m"]), nixScope["isCompatible"](nixScope["a"])(nixScope["armv8a"]))),(operators.and(operators.equal(nixScope["b"], nixScope["powerpc"]), nixScope["isCompatible"](nixScope["a"])(nixScope["powerpc64"]))),(operators.and(operators.equal(nixScope["b"], nixScope["powerpcle"]), nixScope["isCompatible"](nixScope["a"])(nixScope["powerpc64le"]))),(operators.and(operators.equal(nixScope["b"], nixScope["mips"]), nixScope["isCompatible"](nixScope["a"])(nixScope["mips64"]))),(operators.and(operators.equal(nixScope["b"], nixScope["mipsel"]), nixScope["isCompatible"](nixScope["a"])(nixScope["mips64el"]))),(operators.and(operators.equal(nixScope["b"], nixScope["riscv32"]), nixScope["isCompatible"](nixScope["a"])(nixScope["riscv64"]))),(operators.and(operators.equal(nixScope["b"], nixScope["sparc"]), nixScope["isCompatible"](nixScope["a"])(nixScope["sparc64"]))),(operators.and(operators.equal(nixScope["b"], nixScope["wasm32"]), nixScope["isCompatible"](nixScope["a"])(nixScope["wasm64"]))),(operators.equal(nixScope["b"], nixScope["a"]))]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
    } finally {
        runtime.scopeStack.pop();
    }
})(nixScope["cpuTypes"]);}});
        Object.defineProperty(nixScope, "vendors", {enumerable: true, get(){return nixScope["setTypes"](nixScope["types"]["openVendor"])(({"apple": {}, "pc": {}, "knuth": {}, "w64": {}, "none": {}, "unknown": {}}));}});
        Object.defineProperty(nixScope, "execFormats", {enumerable: true, get(){return nixScope["setTypes"](nixScope["types"]["openExecFormat"])(({"aout": {}, "elf": {}, "macho": {}, "pe": {}, "wasm": {}, "unknown": {}}));}});
        Object.defineProperty(nixScope, "kernelFamilies", {enumerable: true, get(){return nixScope["setTypes"](nixScope["types"]["openKernelFamily"])(({"bsd": {}, "darwin": {}}));}});
        Object.defineProperty(nixScope, "kernels", {enumerable: true, get(){return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        nixScope["elf"] = nixScope["execFormats"]["elf"];
        nixScope["pe"] = nixScope["execFormats"]["pe"];
        nixScope["wasm"] = nixScope["execFormats"]["wasm"];
        nixScope["unknown"] = nixScope["execFormats"]["unknown"];
        nixScope["macho"] = nixScope["execFormats"]["macho"];
        nixScope["bsd"] = nixScope["kernelFamilies"]["bsd"];
        nixScope["darwin"] = nixScope["kernelFamilies"]["darwin"];
        return operators.merge(nixScope["setTypes"](nixScope["types"]["openKernel"])(({"macos": ({"execFormat": nixScope["macho"], "families": ({"darwin": nixScope["darwin"]}), "name": "darwin"}), "ios": ({"execFormat": nixScope["macho"], "families": ({"darwin": nixScope["darwin"]})}), "freebsd": ({"execFormat": nixScope["elf"], "families": ({"bsd": nixScope["bsd"]}), "name": "freebsd"}), "linux": ({"execFormat": nixScope["elf"], "families": {}}), "netbsd": ({"execFormat": nixScope["elf"], "families": ({"bsd": nixScope["bsd"]})}), "none": ({"execFormat": nixScope["unknown"], "families": {}}), "openbsd": ({"execFormat": nixScope["elf"], "families": ({"bsd": nixScope["bsd"]})}), "solaris": ({"execFormat": nixScope["elf"], "families": {}}), "wasi": ({"execFormat": nixScope["wasm"], "families": {}}), "redox": ({"execFormat": nixScope["elf"], "families": {}}), "windows": ({"execFormat": nixScope["pe"], "families": {}}), "ghcjs": ({"execFormat": nixScope["unknown"], "families": {}}), "genode": ({"execFormat": nixScope["elf"], "families": {}}), "mmixware": ({"execFormat": nixScope["unknown"], "families": {}})})), ({"darwin": nixScope["kernels"]["macos"], "watchos": nixScope["kernels"]["ios"], "tvos": nixScope["kernels"]["ios"], "win32": nixScope["kernels"]["windows"]}));
    } finally {
        runtime.scopeStack.pop();
    }
})();}});
        Object.defineProperty(nixScope, "abis", {enumerable: true, get(){return nixScope["setTypes"](nixScope["types"]["openAbi"])(({"cygnus": {}, "msvc": {}, "eabi": ({"float": "soft"}), "eabihf": ({"float": "hard"}), "elf": {}, "androideabi": {}, "android": ({"assertions": [({"assertion": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["platform"] = arg; runtime.scopeStack.push(nixScope); try { return operators.negate(nixScope["platform"]["isAarch32"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "message": `
            The "android" ABI is not for 32-bit ARM. Use "androideabi" instead.
          `})]}), "gnueabi": ({"float": "soft"}), "gnueabihf": ({"float": "hard"}), "gnu": ({"assertions": [({"assertion": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["platform"] = arg; runtime.scopeStack.push(nixScope); try { return operators.negate(nixScope["platform"]["isAarch32"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "message": `
            The "gnu" ABI is ambiguous on 32-bit ARM. Use "gnueabi" or "gnueabihf" instead.
          `}),({"assertion": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["platform"] = arg; runtime.scopeStack.push(nixScope); try { return operators.negate((operators.and(nixScope["platform"]["isPower64"], nixScope["platform"]["isBigEndian"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "message": `
            The "gnu" ABI is ambiguous on big-endian 64-bit PowerPC. Use "gnuabielfv2" or "gnuabielfv1" instead.
          `})]}), "gnuabi64": ({"abi": "64"}), "muslabi64": ({"abi": "64"}), "gnuabin32": ({"abi": "n32"}), "muslabin32": ({"abi": "n32"}), "gnuabielfv2": ({"abi": "elfv2"}), "gnuabielfv1": ({"abi": "elfv1"}), "musleabi": ({"float": "soft"}), "musleabihf": ({"float": "hard"}), "musl": {}, "uclibceabi": ({"float": "soft"}), "uclibceabihf": ({"float": "hard"}), "uclibc": {}, "unknown": {}}));}});
        Object.defineProperty(nixScope, "isSystem", {enumerable: true, get(){return nixScope["isType"]("system");}});
        Object.defineProperty(nixScope, "mkSystem", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["components"] = arg; runtime.scopeStack.push(nixScope); try { return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "types.parsedPlatform.check components");
    }
    return nixScope["setType"]("system")(nixScope["components"]);
})(nixScope["types"]["parsedPlatform"]["check"](nixScope["components"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "mkSkeletonFromList", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["l"] = arg; runtime.scopeStack.push(nixScope); try { return operators.selectOrDefault(({"1": (operators.ifThenElse(operators.equal(nixScope["elemAt"](nixScope["l"])(0n), "avr"), ()=>(({"cpu": nixScope["elemAt"](nixScope["l"])(0n), "kernel": "none", "abi": "unknown"})), ()=>(nixScope["throw"]((new InterpolatedString(["system string '", "' with 1 component is ambiguous"], [()=>(nixScope["lib"]["concatStringsSep"]("-")(nixScope["l"]))])))))), "2": (operators.ifThenElse(operators.equal(nixScope["elemAt"](nixScope["l"])(1n), "cygwin"), ()=>(({"cpu": nixScope["elemAt"](nixScope["l"])(0n), "kernel": "windows", "abi": "cygnus"})), ()=>((operators.ifThenElse(operators.equal(nixScope["elemAt"](nixScope["l"])(1n), "windows"), ()=>(({"cpu": nixScope["elemAt"](nixScope["l"])(0n), "kernel": "windows", "abi": "msvc"})), ()=>((operators.ifThenElse(operators.equal((nixScope["elemAt"](nixScope["l"])(1n)), "elf"), ()=>(({"cpu": nixScope["elemAt"](nixScope["l"])(0n), "vendor": "unknown", "kernel": "none", "abi": nixScope["elemAt"](nixScope["l"])(1n)})), ()=>(({"cpu": nixScope["elemAt"](nixScope["l"])(0n), "kernel": nixScope["elemAt"](nixScope["l"])(1n)})))))))))), "3": (operators.ifThenElse(operators.or(operators.equal(nixScope["elemAt"](nixScope["l"])(1n), "linux"), nixScope["elem"]((nixScope["elemAt"](nixScope["l"])(2n)))(["eabi","eabihf","elf","gnu"])), ()=>(({"cpu": nixScope["elemAt"](nixScope["l"])(0n), "kernel": nixScope["elemAt"](nixScope["l"])(1n), "abi": nixScope["elemAt"](nixScope["l"])(2n), "vendor": "unknown"})), ()=>((operators.ifThenElse(operators.or(operators.or(operators.or(operators.or(operators.or(operators.or(operators.equal(nixScope["elemAt"](nixScope["l"])(1n), "apple"), nixScope["elem"]((nixScope["elemAt"](nixScope["l"])(2n)))(["redox","mmixware","ghcjs","mingw32"])), nixScope["hasPrefix"]("freebsd")((nixScope["elemAt"](nixScope["l"])(2n)))), nixScope["hasPrefix"]("netbsd")((nixScope["elemAt"](nixScope["l"])(2n)))), nixScope["hasPrefix"]("openbsd")((nixScope["elemAt"](nixScope["l"])(2n)))), nixScope["hasPrefix"]("genode")((nixScope["elemAt"](nixScope["l"])(2n)))), nixScope["hasPrefix"]("wasm32")((nixScope["elemAt"](nixScope["l"])(0n)))), ()=>(({"cpu": nixScope["elemAt"](nixScope["l"])(0n), "vendor": nixScope["elemAt"](nixScope["l"])(1n), "kernel": (operators.ifThenElse(operators.equal(nixScope["elemAt"](nixScope["l"])(2n), "mingw32"), ()=>("windows"), ()=>(nixScope["elemAt"](nixScope["l"])(2n))))})), ()=>(nixScope["throw"]((new InterpolatedString(["system string '", "' with 3 components is ambiguous"], [()=>(nixScope["lib"]["concatStringsSep"]("-")(nixScope["l"]))]))))))))), "4": ({"cpu": nixScope["elemAt"](nixScope["l"])(0n), "vendor": nixScope["elemAt"](nixScope["l"])(1n), "kernel": nixScope["elemAt"](nixScope["l"])(2n), "abi": nixScope["elemAt"](nixScope["l"])(3n)})}), [nixScope["toString"]((nixScope["length"](nixScope["l"])))], (nixScope["throw"]((new InterpolatedString(["system string '", "' has invalid number of hyphen-separated components"], [()=>(nixScope["lib"]["concatStringsSep"]("-")(nixScope["l"]))]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "mkSystemFromSkeleton", {enumerable: true, get(){return (function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        "vendor": (()=>{ const nixScope = runtime.scopeStack.slice(-1)[0]; return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "false");
    }
    return null;
})(false); })(),"abi": (()=>{ const nixScope = runtime.scopeStack.slice(-1)[0]; return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "false");
    }
    return null;
})(false); })(),
                        // inherit arguments
                        ...arg,
                        // all-args arg (if @ syntax is used)
                        "args": arg,
                    }
                    runtime.scopeStack.push(nixScope)
                    try {
                        return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "getCpu", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return operators.selectOrDefault(nixScope["cpuTypes"], [nixScope["name"]], (nixScope["throw"]((new InterpolatedString(["Unknown CPU type: ", ""], [()=>(nixScope["name"])]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "getVendor", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return operators.selectOrDefault(nixScope["vendors"], [nixScope["name"]], (nixScope["throw"]((new InterpolatedString(["Unknown vendor: ", ""], [()=>(nixScope["name"])]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "getKernel", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return operators.selectOrDefault(nixScope["kernels"], [nixScope["name"]], (nixScope["throw"]((new InterpolatedString(["Unknown kernel: ", ""], [()=>(nixScope["name"])]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "getAbi", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return operators.selectOrDefault(nixScope["abis"], [nixScope["name"]], (nixScope["throw"]((new InterpolatedString(["Unknown ABI: ", ""], [()=>(nixScope["name"])]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "parsed", {enumerable: true, get(){return ({"cpu": nixScope["getCpu"](nixScope["args"]["cpu"]), "vendor": (operators.ifThenElse(operators.hasAttr(nixScope["args"], "vendor"), ()=>(nixScope["getVendor"](nixScope["args"]["vendor"])), ()=>((operators.ifThenElse(nixScope["isDarwin"](nixScope["parsed"]), ()=>(nixScope["vendors"]["apple"]), ()=>((operators.ifThenElse(nixScope["isWindows"](nixScope["parsed"]), ()=>(nixScope["vendors"]["pc"]), ()=>(nixScope["vendors"]["unknown"]))))))))), "kernel": (operators.ifThenElse(nixScope["hasPrefix"]("darwin")(nixScope["args"]["kernel"]), ()=>(nixScope["getKernel"]("darwin")), ()=>((operators.ifThenElse(nixScope["hasPrefix"]("netbsd")(nixScope["args"]["kernel"]), ()=>(nixScope["getKernel"]("netbsd")), ()=>(nixScope["getKernel"]((nixScope["removeAbiSuffix"](nixScope["args"]["kernel"]))))))))), "abi": (operators.ifThenElse(operators.hasAttr(nixScope["args"], "abi"), ()=>(nixScope["getAbi"](nixScope["args"]["abi"])), ()=>((operators.ifThenElse(operators.or(nixScope["isLinux"](nixScope["parsed"]), nixScope["isWindows"](nixScope["parsed"])), ()=>((operators.ifThenElse(nixScope["isAarch32"](nixScope["parsed"]), ()=>((operators.ifThenElse(nixScope["versionAtLeast"]((operators.selectOrDefault(nixScope["parsed"], ["cpu", "version"], "0")))("6"), ()=>(nixScope["abis"]["gnueabihf"]), ()=>(nixScope["abis"]["gnueabi"])))), ()=>((operators.ifThenElse(operators.and(nixScope["isPower64"](nixScope["parsed"]), nixScope["isBigEndian"](nixScope["parsed"])), ()=>(nixScope["abis"]["gnuabielfv2"]), ()=>(nixScope["abis"]["gnu"]))))))), ()=>(nixScope["abis"]["unknown"]))))))});}});
        return nixScope["mkSystem"](nixScope["parsed"]);
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                });}});
        Object.defineProperty(nixScope, "mkSystemFromString", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["s"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkSystemFromSkeleton"]((nixScope["mkSkeletonFromList"]((nixScope["splitString"]("-")(nixScope["s"]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "kernelName", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["kernel"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["kernel"]["name"], nixScope["toString"]((operators.selectOrDefault(nixScope["kernel"], ["version"], "")))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "darwinArch", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["cpu"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["cpu"]["name"], "aarch64"), ()=>("arm64"), ()=>(nixScope["cpu"]["name"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "doubleFromSystem", {enumerable: true, get(){return (function(arg){
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
                        return (operators.ifThenElse(operators.equal(nixScope["abi"], nixScope["abis"]["cygnus"]), ()=>((new InterpolatedString(["", "-cygwin"], [()=>(nixScope["cpu"]["name"])]))), ()=>((operators.ifThenElse(operators.hasAttr(nixScope["kernel"]["families"], "darwin"), ()=>((new InterpolatedString(["", "-darwin"], [()=>(nixScope["cpu"]["name"])]))), ()=>((new InterpolatedString(["", "-", ""], [()=>(nixScope["cpu"]["name"]), ()=>(nixScope["kernelName"](nixScope["kernel"]))]))))))))
                    } finally {
                        runtime.scopeStack.pop()
                    }
                });}});
        Object.defineProperty(nixScope, "tripleFromSystem", {enumerable: true, get(){return (function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        
                        // inherit arguments
                        ...arg,
                        // all-args arg (if @ syntax is used)
                        "sys": arg,
                    }
                    runtime.scopeStack.push(nixScope)
                    try {
                        return ((_cond)=>{
    if (!_cond) {
        throw new Error("assertion failed: " + "isSystem sys");
    }
    return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "optExecFormat", {enumerable: true, get(){return nixScope["optionalString"]((operators.and(operators.equal(nixScope["kernel"]["name"], "netbsd"), operators.notEqual(nixScope["gnuNetBSDDefaultExecFormat"](nixScope["cpu"]), nixScope["kernel"]["execFormat"]))))(nixScope["kernel"]["execFormat"]["name"]);}});
        Object.defineProperty(nixScope, "optAbi", {enumerable: true, get(){return nixScope["optionalString"]((operators.notEqual(nixScope["abi"], nixScope["abis"]["unknown"])))((new InterpolatedString(["-", ""], [()=>(nixScope["abi"]["name"])])));}});
        Object.defineProperty(nixScope, "cpuName", {enumerable: true, get(){return (operators.ifThenElse(operators.hasAttr(nixScope["kernel"]["families"], "darwin"), ()=>(nixScope["darwinArch"](nixScope["cpu"])), ()=>(nixScope["cpu"]["name"])));}});
        return (new InterpolatedString(["", "-", "-", "", "", ""], [()=>(nixScope["cpuName"]), ()=>(nixScope["vendor"]["name"]), ()=>(nixScope["kernelName"](nixScope["kernel"])), ()=>(nixScope["optExecFormat"]), ()=>(nixScope["optAbi"])]));
    } finally {
        runtime.scopeStack.pop();
    }
})();
})(nixScope["isSystem"](nixScope["sys"]))
                    } finally {
                        runtime.scopeStack.pop()
                    }
                });}});
        return nixScope;
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
                })