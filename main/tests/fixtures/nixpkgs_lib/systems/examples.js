export default //
//
//
createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    defGetter(
      nixScope,
      "platforms",
      (nixScope) =>
        nixScope.import(new Path(["./platforms.nix"], []))(
          { "lib": nixScope.lib },
        ),
    );
    defGetter(
      nixScope,
      "riscv",
      (nixScope) =>
        createFunc(/*arg:*/ "bits", null, {}, (nixScope) => (
          {
            "config":
              (new InterpolatedString(["riscv", "-unknown-linux-gnu"], [
                () => (nixScope.bits),
              ])),
          }
        )),
    );
    return /*rec*/ createScope((nixScope) => {
      nixScope.powernv = { "config": "powerpc64le-unknown-linux-gnu" };
      nixScope["musl-power"] = { "config": "powerpc64le-unknown-linux-musl" };
      nixScope["ppc64-elfv1"] = createScope((nixScope) => {
        const obj = {};
        obj.config = "powerpc64-unknown-linux-gnuabielfv1";
        if (obj["rust"] === undefined) obj["rust"] = {};
        obj["rust"]["rustcTarget"] = "powerpc64-unknown-linux-gnu";
        return obj;
      });
      nixScope["ppc64-elfv2"] = {
        "config": "powerpc64-unknown-linux-gnuabielfv2",
      };
      nixScope["ppc64-musl"] = {
        "config": "powerpc64-unknown-linux-musl",
        "gcc": ({ "abi": "elfv2" }),
      };
      nixScope["armv7l-hf-multiplatform"] = {
        "config": "armv7l-unknown-linux-gnueabihf",
      };
      nixScope["aarch64-multiplatform"] = {
        "config": "aarch64-unknown-linux-gnu",
      };
      nixScope["aarch64-multiplatform-musl"] = {
        "config": "aarch64-unknown-linux-musl",
      };
      nixScope.gnu64 = { "config": "x86_64-unknown-linux-gnu" };
      nixScope.gnu32 = { "config": "i686-unknown-linux-gnu" };
      nixScope.musl64 = { "config": "x86_64-unknown-linux-musl" };
      nixScope.musl32 = { "config": "i686-unknown-linux-musl" };
      nixScope["riscv64-musl"] = { "config": "riscv64-unknown-linux-musl" };
      nixScope["riscv64-embedded"] = {
        "config": "riscv64-none-elf",
        "libc": "newlib",
      };
      nixScope["riscv32-embedded"] = {
        "config": "riscv32-none-elf",
        "libc": "newlib",
      };
      nixScope["mips64-embedded"] = {
        "config": "mips64-none-elf",
        "libc": "newlib",
      };
      nixScope["mips-embedded"] = {
        "config": "mips-none-elf",
        "libc": "newlib",
      };
      nixScope.mmix = { "config": "mmix-unknown-mmixware", "libc": "newlib" };
      nixScope["rx-embedded"] = { "config": "rx-none-elf", "libc": "newlib" };
      nixScope.msp430 = { "config": "msp430-elf", "libc": "newlib" };
      nixScope.avr = { "config": "avr" };
      nixScope.vc4 = { "config": "vc4-elf", "libc": "newlib" };
      nixScope.or1k = { "config": "or1k-elf", "libc": "newlib" };
      nixScope.m68k = { "config": "m68k-unknown-linux-gnu" };
      nixScope.s390 = { "config": "s390-unknown-linux-gnu" };
      nixScope.s390x = { "config": "s390x-unknown-linux-gnu" };
      nixScope["arm-embedded"] = {
        "config": "arm-none-eabi",
        "libc": "newlib",
      };
      nixScope["arm-embedded-nano"] = {
        "config": "arm-none-eabi",
        "libc": "newlib-nano",
      };
      nixScope["armhf-embedded"] = {
        "config": "arm-none-eabihf",
        "libc": "newlib",
        "gcc": ({ "arch": "armv5t", "fpu": "vfp" }),
      };
      nixScope["aarch64-embedded"] = createScope((nixScope) => {
        const obj = {};
        obj.config = "aarch64-none-elf";
        obj.libc = "newlib";
        if (obj["rust"] === undefined) obj["rust"] = {};
        obj["rust"]["rustcTarget"] = "aarch64-unknown-none";
        return obj;
      });
      nixScope["aarch64be-embedded"] = {
        "config": "aarch64_be-none-elf",
        "libc": "newlib",
      };
      nixScope["ppc-embedded"] = {
        "config": "powerpc-none-eabi",
        "libc": "newlib",
      };
      nixScope["ppcle-embedded"] = {
        "config": "powerpcle-none-eabi",
        "libc": "newlib",
      };
      nixScope["i686-embedded"] = { "config": "i686-elf", "libc": "newlib" };
      nixScope["x86_64-embedded"] = {
        "config": "x86_64-elf",
        "libc": "newlib",
      };
      nixScope["microblaze-embedded"] = {
        "config": "microblazeel-none-elf",
        "libc": "newlib",
      };
      nixScope["x86_64-unknown-redox"] = {
        "config": "x86_64-unknown-redox",
        "libc": "relibc",
      };
      nixScope["aarch64-darwin"] = {
        "config": "arm64-apple-darwin",
        "xcodePlatform": "MacOSX",
        "platform": {},
      };
      nixScope["x86_64-darwin"] = {
        "config": "x86_64-apple-darwin",
        "xcodePlatform": "MacOSX",
        "platform": {},
      };
      nixScope.mingw32 = { "config": "i686-w64-mingw32", "libc": "msvcrt" };
      nixScope.mingwW64 = { "config": "x86_64-w64-mingw32", "libc": "msvcrt" };
      nixScope.ucrt64 = { "config": "x86_64-w64-mingw32", "libc": "ucrt" };
      nixScope["x86_64-netbsd"] = { "config": "x86_64-unknown-netbsd" };
      nixScope.ghcjs = { "config": "javascript-unknown-ghcjs" };
      defGetter(nixScope, "ppc64", (nixScope) => nixScope["ppc64-elfv2"]);
      defGetter(
        nixScope,
        "sheevaplug",
        (nixScope) =>
          operators.merge(
            { "config": "armv5tel-unknown-linux-gnueabi" },
            nixScope.platforms["sheevaplug"],
          ),
      );
      defGetter(
        nixScope,
        "raspberryPi",
        (nixScope) =>
          operators.merge(
            { "config": "armv6l-unknown-linux-gnueabihf" },
            nixScope.platforms["raspberrypi"],
          ),
      );
      defGetter(
        nixScope,
        "bluefield2",
        (nixScope) =>
          operators.merge(
            { "config": "aarch64-unknown-linux-gnu" },
            nixScope.platforms["bluefield2"],
          ),
      );
      defGetter(
        nixScope,
        "remarkable1",
        (nixScope) =>
          operators.merge(
            { "config": "armv7l-unknown-linux-gnueabihf" },
            nixScope.platforms["zero-gravitas"],
          ),
      );
      defGetter(
        nixScope,
        "remarkable2",
        (nixScope) =>
          operators.merge(
            { "config": "armv7l-unknown-linux-gnueabihf" },
            nixScope.platforms["zero-sugar"],
          ),
      );
      defGetter(
        nixScope,
        "armv7a-android-prebuilt",
        (nixScope) =>
          operators.merge(
            createScope((nixScope) => {
              const obj = {};
              obj.config = "armv7a-unknown-linux-androideabi";
              obj.androidSdkVersion = "33";
              obj.androidNdkVersion = "26";
              obj.useAndroidPrebuilt = true;
              if (obj["rust"] === undefined) obj["rust"] = {};
              obj["rust"]["rustcTarget"] = "armv7-linux-androideabi";
              return obj;
            }),
            nixScope.platforms["armv7a-android"],
          ),
      );
      defGetter(
        nixScope,
        "aarch64-android-prebuilt",
        (nixScope) =>
          createScope((nixScope) => {
            const obj = {};
            obj.config = "aarch64-unknown-linux-android";
            obj.androidSdkVersion = "33";
            obj.androidNdkVersion = "26";
            obj.useAndroidPrebuilt = true;
            if (obj["rust"] === undefined) obj["rust"] = {};
            obj["rust"]["rustcTarget"] = "aarch64-linux-android";
            return obj;
          }),
      );
      defGetter(
        nixScope,
        "aarch64-android",
        (nixScope) => ({
          "config": "aarch64-unknown-linux-android",
          "androidSdkVersion": "33",
          "androidNdkVersion": "26",
          "libc": "bionic",
          "useAndroidPrebuilt": false,
          "useLLVM": true,
        }),
      );
      defGetter(
        nixScope,
        "pogoplug4",
        (nixScope) =>
          operators.merge(
            { "config": "armv5tel-unknown-linux-gnueabi" },
            nixScope.platforms["pogoplug4"],
          ),
      );
      defGetter(
        nixScope,
        "ben-nanonote",
        (nixScope) =>
          operators.merge(
            { "config": "mipsel-unknown-linux-uclibc" },
            nixScope.platforms["ben_nanonote"],
          ),
      );
      defGetter(
        nixScope,
        "fuloongminipc",
        (nixScope) =>
          operators.merge(
            { "config": "mipsel-unknown-linux-gnu" },
            nixScope.platforms["fuloong2f_n32"],
          ),
      );
      defGetter(
        nixScope,
        "mips-linux-gnu",
        (nixScope) =>
          operators.merge(
            { "config": "mips-unknown-linux-gnu" },
            nixScope.platforms["gcc_mips32r2_o32"],
          ),
      );
      defGetter(
        nixScope,
        "mipsel-linux-gnu",
        (nixScope) =>
          operators.merge(
            { "config": "mipsel-unknown-linux-gnu" },
            nixScope.platforms["gcc_mips32r2_o32"],
          ),
      );
      defGetter(
        nixScope,
        "mips64-linux-gnuabin32",
        (nixScope) =>
          operators.merge(
            { "config": "mips64-unknown-linux-gnuabin32" },
            nixScope.platforms["gcc_mips64r2_n32"],
          ),
      );
      defGetter(
        nixScope,
        "mips64el-linux-gnuabin32",
        (nixScope) =>
          operators.merge(
            { "config": "mips64el-unknown-linux-gnuabin32" },
            nixScope.platforms["gcc_mips64r2_n32"],
          ),
      );
      defGetter(
        nixScope,
        "mips64-linux-gnuabi64",
        (nixScope) =>
          operators.merge(
            { "config": "mips64-unknown-linux-gnuabi64" },
            nixScope.platforms["gcc_mips64r2_64"],
          ),
      );
      defGetter(
        nixScope,
        "mips64el-linux-gnuabi64",
        (nixScope) =>
          operators.merge(
            { "config": "mips64el-unknown-linux-gnuabi64" },
            nixScope.platforms["gcc_mips64r2_64"],
          ),
      );
      defGetter(
        nixScope,
        "muslpi",
        (nixScope) =>
          operators.merge(
            nixScope.raspberryPi,
            { "config": "armv6l-unknown-linux-musleabihf" },
          ),
      );
      defGetter(
        nixScope,
        "gnu64_simplekernel",
        (nixScope) =>
          operators.merge(
            nixScope.gnu64,
            nixScope.platforms["pc_simplekernel"],
          ),
      );
      defGetter(nixScope, "riscv64", (nixScope) => nixScope.riscv("64"));
      defGetter(nixScope, "riscv32", (nixScope) => nixScope.riscv("32"));
      defGetter(
        nixScope,
        "loongarch64-linux",
        (nixScope) =>
          nixScope.lib["recursiveUpdate"](
            nixScope.platforms["loongarch64-multiplatform"],
          )({ "config": "loongarch64-unknown-linux-gnu" }),
      );
      defGetter(
        nixScope,
        "loongarch64-linux-embedded",
        (nixScope) =>
          nixScope.lib["recursiveUpdate"](
            nixScope.platforms["loongarch64-multiplatform"],
          )({
            "config": "loongarch64-unknown-linux-gnu",
            "gcc": ({ "arch": "loongarch64", "strict-align": true }),
          }),
      );
      defGetter(
        nixScope,
        "iphone64",
        (nixScope) => ({
          "config": "arm64-apple-ios",
          "darwinSdkVersion": "14.3",
          "xcodeVer": "12.3",
          "xcodePlatform": "iPhoneOS",
          "useiOSPrebuilt": true,
        }),
      );
      defGetter(nixScope, "iphone64-simulator", (nixScope) => ({
        "config": "x86_64-apple-ios",
        "darwinSdkVersion": "14.3",
        "xcodeVer": "12.3",
        "xcodePlatform": "iPhoneSimulator",
        "darwinPlatform": "ios-simulator",
        "useiOSPrebuilt": true,
      }));
      defGetter(
        nixScope,
        "ucrtAarch64",
        (nixScope) =>
          createScope((nixScope) => {
            const obj = {};
            obj.config = "aarch64-w64-mingw32";
            obj.libc = "ucrt";
            obj.useLLVM = true;
            if (obj["rust"] === undefined) obj["rust"] = {};
            obj["rust"]["rustcTarget"] = "aarch64-pc-windows-gnullvm";
            return obj;
          }),
      );
      defGetter(
        nixScope,
        "x86_64-windows",
        (nixScope) => ({ "config": "x86_64-pc-windows-msvc", "useLLVM": true }),
      );
      defGetter(
        nixScope,
        "aarch64-windows",
        (nixScope) => ({
          "config": "aarch64-pc-windows-msvc",
          "useLLVM": true,
        }),
      );
      defGetter(
        nixScope,
        "aarch64-freebsd",
        (nixScope) => ({
          "config": "aarch64-unknown-freebsd",
          "useLLVM": true,
        }),
      );
      defGetter(
        nixScope,
        "x86_64-freebsd",
        (nixScope) => ({ "config": "x86_64-unknown-freebsd", "useLLVM": true }),
      );
      defGetter(
        nixScope,
        "x86_64-netbsd-llvm",
        (nixScope) => ({ "config": "x86_64-unknown-netbsd", "useLLVM": true }),
      );
      defGetter(
        nixScope,
        "x86_64-openbsd",
        (nixScope) => ({ "config": "x86_64-unknown-openbsd", "useLLVM": true }),
      );
      defGetter(
        nixScope,
        "wasi32",
        (nixScope) => ({ "config": "wasm32-unknown-wasi", "useLLVM": true }),
      );
      defGetter(
        nixScope,
        "wasm32-unknown-none",
        (nixScope) =>
          createScope((nixScope) => {
            const obj = {};
            obj.config = "wasm32-unknown-none";
            obj.useLLVM = true;
            if (obj["rust"] === undefined) obj["rust"] = {};
            obj["rust"]["rustcTarget"] = "wasm32-unknown-unknown";
            return obj;
          }),
      );
      return nixScope;
    });
  })
));
