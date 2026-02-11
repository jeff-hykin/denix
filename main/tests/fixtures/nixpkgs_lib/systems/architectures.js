export default createFunc({}, null, {}, (nixScope) => (
  /*rec*/ createScope((nixScope) => {
    nixScope.features = {
      "default": [],
      "x86-64": [],
      "x86-64-v2": ["sse3", "ssse3", "sse4_1", "sse4_2"],
      "x86-64-v3": ["sse3", "ssse3", "sse4_1", "sse4_2", "avx", "avx2", "fma"],
      "x86-64-v4": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "avx",
        "avx2",
        "avx512",
        "fma",
      ],
      "nehalem": ["sse3", "ssse3", "sse4_1", "sse4_2"],
      "westmere": ["sse3", "ssse3", "sse4_1", "sse4_2"],
      "silvermont": ["sse3", "ssse3", "sse4_1", "sse4_2"],
      "sandybridge": ["sse3", "ssse3", "sse4_1", "sse4_2", "avx"],
      "ivybridge": ["sse3", "ssse3", "sse4_1", "sse4_2", "avx"],
      "haswell": ["sse3", "ssse3", "sse4_1", "sse4_2", "avx", "avx2", "fma"],
      "broadwell": ["sse3", "ssse3", "sse4_1", "sse4_2", "avx", "avx2", "fma"],
      "skylake": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "aes",
        "avx",
        "avx2",
        "fma",
      ],
      "skylake-avx512": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "aes",
        "avx",
        "avx2",
        "avx512",
        "fma",
      ],
      "cannonlake": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "aes",
        "avx",
        "avx2",
        "avx512",
        "fma",
      ],
      "icelake-client": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "aes",
        "avx",
        "avx2",
        "avx512",
        "fma",
      ],
      "icelake-server": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "aes",
        "avx",
        "avx2",
        "avx512",
        "fma",
      ],
      "cascadelake": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "aes",
        "avx",
        "avx2",
        "avx512",
        "fma",
      ],
      "cooperlake": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "aes",
        "avx",
        "avx2",
        "avx512",
        "fma",
      ],
      "tigerlake": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "aes",
        "avx",
        "avx2",
        "avx512",
        "fma",
      ],
      "alderlake": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "aes",
        "avx",
        "avx2",
        "fma",
      ],
      "sapphirerapids": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "aes",
        "avx",
        "avx2",
        "avx512",
        "fma",
      ],
      "emeraldrapids": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "aes",
        "avx",
        "avx2",
        "avx512",
        "fma",
      ],
      "sierraforest": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "aes",
        "avx",
        "avx2",
        "fma",
      ],
      "btver1": ["sse3", "ssse3", "sse4_1", "sse4_2"],
      "btver2": ["sse3", "ssse3", "sse4_1", "sse4_2", "aes", "avx"],
      "bdver1": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "sse4a",
        "aes",
        "avx",
        "fma",
        "fma4",
      ],
      "bdver2": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "sse4a",
        "aes",
        "avx",
        "fma",
        "fma4",
      ],
      "bdver3": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "sse4a",
        "aes",
        "avx",
        "fma",
        "fma4",
      ],
      "bdver4": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "sse4a",
        "aes",
        "avx",
        "avx2",
        "fma",
        "fma4",
      ],
      "znver1": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "sse4a",
        "aes",
        "avx",
        "avx2",
        "fma",
      ],
      "znver2": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "sse4a",
        "aes",
        "avx",
        "avx2",
        "fma",
      ],
      "znver3": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "sse4a",
        "aes",
        "avx",
        "avx2",
        "fma",
      ],
      "znver4": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "sse4a",
        "aes",
        "avx",
        "avx2",
        "avx512",
        "fma",
      ],
      "znver5": [
        "sse3",
        "ssse3",
        "sse4_1",
        "sse4_2",
        "sse4a",
        "aes",
        "avx",
        "avx2",
        "avx512",
        "fma",
      ],
      "loongarch64": ["fpu64"],
      "la464": ["fpu64", "lsx", "lasx"],
      "la664": [
        "fpu64",
        "lsx",
        "lasx",
        "div32",
        "frecipe",
        "lam-bh",
        "lamcas",
        "ld-seq-sa",
      ],
      "la64v1.0": ["fpu64", "lsx"],
      "la64v1.1": [
        "fpu64",
        "lsx",
        "div32",
        "frecipe",
        "lam-bh",
        "lamcas",
        "ld-seq-sa",
      ],
      "armv5te": [],
      "armv6": [],
      "armv7-a": [],
      "armv8-a": [],
      "mips32": [],
      "loongson2f": [],
    };
    Object.defineProperty(nixScope, "inferiors", {
      enumerable: true,
      get() {
        return /*let*/ createScope((nixScope) => {
          Object.defineProperty(nixScope, "withInferiors", {
            enumerable: true,
            get() {
              return createFunc(/*arg:*/ "archs", null, {}, (nixScope) => (
                nixScope.lib["unique"](
                  operators.listConcat(
                    nixScope.archs,
                    nixScope.lib["flatten"](
                      nixScope.lib["attrVals"](nixScope.archs)(
                        nixScope.inferiors,
                      ),
                    ),
                  ),
                )
              ));
            },
          });
          return ({
            "default": [],
            "x86-64": [],
            "x86-64-v2": ["x86-64"],
            "x86-64-v3": operators.listConcat(
              ["x86-64-v2"],
              nixScope.inferiors["x86-64-v2"],
            ),
            "x86-64-v4": operators.listConcat(
              ["x86-64-v3"],
              nixScope.inferiors["x86-64-v3"],
            ),
            "nehalem": operators.listConcat(
              ["x86-64-v2"],
              nixScope.inferiors["x86-64-v2"],
            ),
            "westmere": operators.listConcat(
              ["nehalem"],
              nixScope.inferiors["nehalem"],
            ),
            "sandybridge": operators.listConcat(
              ["westmere"],
              nixScope.inferiors["westmere"],
            ),
            "ivybridge": operators.listConcat(
              ["sandybridge"],
              nixScope.inferiors["sandybridge"],
            ),
            "haswell": nixScope.lib["unique"](
              operators.listConcat(
                ["ivybridge", "x86-64-v3"],
                operators.listConcat(
                  nixScope.inferiors["ivybridge"],
                  nixScope.inferiors["x86-64-v3"],
                ),
              ),
            ),
            "broadwell": operators.listConcat(
              ["haswell"],
              nixScope.inferiors["haswell"],
            ),
            "skylake": operators.listConcat(
              ["broadwell"],
              nixScope.inferiors["broadwell"],
            ),
            "skylake-avx512": nixScope.lib["unique"](
              operators.listConcat(
                ["skylake", "x86-64-v4"],
                operators.listConcat(
                  nixScope.inferiors["skylake"],
                  nixScope.inferiors["x86-64-v4"],
                ),
              ),
            ),
            "cannonlake": operators.listConcat(
              ["skylake-avx512"],
              nixScope.inferiors["skylake-avx512"],
            ),
            "icelake-client": operators.listConcat(
              ["cannonlake"],
              nixScope.inferiors["cannonlake"],
            ),
            "icelake-server": operators.listConcat(
              ["icelake-client"],
              nixScope.inferiors["icelake-client"],
            ),
            "cascadelake": operators.listConcat(
              ["cannonlake"],
              nixScope.inferiors["cannonlake"],
            ),
            "cooperlake": operators.listConcat(
              ["cascadelake"],
              nixScope.inferiors["cascadelake"],
            ),
            "tigerlake": operators.listConcat(
              ["icelake-server"],
              nixScope.inferiors["icelake-server"],
            ),
            "sapphirerapids": operators.listConcat(
              ["tigerlake"],
              nixScope.inferiors["tigerlake"],
            ),
            "emeraldrapids": operators.listConcat(
              ["sapphirerapids"],
              nixScope.inferiors["sapphirerapids"],
            ),
            "alderlake": operators.listConcat(
              ["skylake"],
              nixScope.inferiors["skylake"],
            ),
            "sierraforest": operators.listConcat(
              ["alderlake"],
              nixScope.inferiors["alderlake"],
            ),
            "btver1": ["x86-64"],
            "btver2": operators.listConcat(
              ["x86-64-v2"],
              nixScope.inferiors["x86-64-v2"],
            ),
            "bdver1": operators.listConcat(
              ["x86-64-v2"],
              nixScope.inferiors["x86-64-v2"],
            ),
            "bdver2": operators.listConcat(
              ["x86-64-v2"],
              nixScope.inferiors["x86-64-v2"],
            ),
            "bdver3": operators.listConcat(
              ["x86-64-v2"],
              nixScope.inferiors["x86-64-v2"],
            ),
            "bdver4": operators.listConcat(
              ["x86-64-v3"],
              nixScope.inferiors["x86-64-v3"],
            ),
            "znver1": operators.listConcat(
              ["skylake"],
              nixScope.inferiors["skylake"],
            ),
            "znver2": operators.listConcat(
              ["znver1"],
              nixScope.inferiors["znver1"],
            ),
            "znver3": operators.listConcat(
              ["znver2"],
              nixScope.inferiors["znver2"],
            ),
            "znver4": nixScope.lib["unique"](
              operators.listConcat(
                ["znver3", "x86-64-v4"],
                operators.listConcat(
                  nixScope.inferiors["znver3"],
                  nixScope.inferiors["x86-64-v4"],
                ),
              ),
            ),
            "znver5": operators.listConcat(
              ["znver4"],
              nixScope.inferiors["znver4"],
            ),
            "armv8-a": [],
            "armv8.1-a": ["armv8-a"],
            "armv8.2-a": operators.listConcat(
              ["armv8.1-a"],
              nixScope.inferiors["armv8.1-a"],
            ),
            "armv8.3-a": operators.listConcat(
              ["armv8.2-a"],
              nixScope.inferiors["armv8.2-a"],
            ),
            "armv8.4-a": operators.listConcat(
              ["armv8.3-a"],
              nixScope.inferiors["armv8.3-a"],
            ),
            "armv8.5-a": operators.listConcat(
              ["armv8.4-a"],
              nixScope.inferiors["armv8.4-a"],
            ),
            "armv8.6-a": operators.listConcat(
              ["armv8.5-a"],
              nixScope.inferiors["armv8.5-a"],
            ),
            "armv8.7-a": operators.listConcat(
              ["armv8.6-a"],
              nixScope.inferiors["armv8.6-a"],
            ),
            "armv8.8-a": operators.listConcat(
              ["armv8.7-a"],
              nixScope.inferiors["armv8.7-a"],
            ),
            "armv8.9-a": operators.listConcat(
              ["armv8.8-a"],
              nixScope.inferiors["armv8.8-a"],
            ),
            "armv9-a": operators.listConcat(
              ["armv8.5-a"],
              nixScope.inferiors["armv8.5-a"],
            ),
            "armv9.1-a": operators.listConcat(
              ["armv9-a", "armv8.6-a"],
              nixScope.inferiors["armv8.6-a"],
            ),
            "armv9.2-a": nixScope.lib["unique"](
              operators.listConcat(
                ["armv9.1-a", "armv8.7-a"],
                operators.listConcat(
                  nixScope.inferiors["armv9.1-a"],
                  nixScope.inferiors["armv8.7-a"],
                ),
              ),
            ),
            "armv9.3-a": nixScope.lib["unique"](
              operators.listConcat(
                ["armv9.2-a", "armv8.8-a"],
                operators.listConcat(
                  nixScope.inferiors["armv9.2-a"],
                  nixScope.inferiors["armv8.8-a"],
                ),
              ),
            ),
            "armv9.4-a": operators.listConcat(
              ["armv9.3-a"],
              nixScope.inferiors["armv9.3-a"],
            ),
            "cortex-a53": ["armv8-a"],
            "cortex-a72": ["armv8-a"],
            "cortex-a55": operators.listConcat([
              "armv8.2-a",
              "cortex-a53",
              "cortex-a72",
            ], nixScope.inferiors["armv8.2-a"]),
            "cortex-a76": operators.listConcat([
              "armv8.2-a",
              "cortex-a53",
              "cortex-a72",
            ], nixScope.inferiors["armv8.2-a"]),
            "ampere1": nixScope.withInferiors([
              "armv8.6-a",
              "cortex-a55",
              "cortex-a76",
            ]),
            "ampere1a": operators.listConcat(
              ["ampere1"],
              nixScope.inferiors["ampere1"],
            ),
            "ampere1b": operators.listConcat(
              ["ampere1a"],
              nixScope.inferiors["ampere1a"],
            ),
            "loongarch64": [],
            "la64v1.0": ["loongarch64"],
            "la464": operators.listConcat(
              ["la64v1.0"],
              nixScope.inferiors["la64v1.0"],
            ),
            "la64v1.1": operators.listConcat(
              ["la64v1.0"],
              nixScope.inferiors["la64v1.0"],
            ),
            "la664": nixScope.withInferiors(["la464", "la64v1.1"]),
            "armv5te": [],
            "armv6": [],
            "armv7-a": [],
            "mips32": [],
            "loongson2f": [],
          });
        });
      },
    });
    Object.defineProperty(nixScope, "hasInferior", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "arch1", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "arch2", null, {}, (nixScope) => (
            operators.and(
              operators.hasAttr(nixScope.inferiors, nixScope.arch1),
              nixScope.lib["elem"](nixScope.arch2)(
                nixScope.inferiors[nixScope.arch1],
              ),
            )
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "canExecute", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "arch1", null, {}, (nixScope) => (
          createFunc(/*arg:*/ "arch2", null, {}, (nixScope) => (
            operators.or(
              operators.equal(nixScope.arch1, nixScope.arch2),
              nixScope.hasInferior(nixScope.arch1)(nixScope.arch2),
            )
          ))
        ));
      },
    });
    Object.defineProperty(nixScope, "predicates", {
      enumerable: true,
      get() {
        return /*let*/ createScope((nixScope) => {
          Object.defineProperty(nixScope, "featureSupport", {
            enumerable: true,
            get() {
              return createFunc(/*arg:*/ "feature", null, {}, (nixScope) => (
                createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
                  nixScope.builtins["elem"](nixScope.feature)(
                    operators.selectOrDefault(
                      nixScope.features,
                      [nixScope.x],
                      [],
                    ),
                  )
                ))
              ));
            },
          });
          return ({
            "sse3Support": nixScope.featureSupport("sse3"),
            "ssse3Support": nixScope.featureSupport("ssse3"),
            "sse4_1Support": nixScope.featureSupport("sse4_1"),
            "sse4_2Support": nixScope.featureSupport("sse4_2"),
            "sse4_aSupport": nixScope.featureSupport("sse4a"),
            "avxSupport": nixScope.featureSupport("avx"),
            "avx2Support": nixScope.featureSupport("avx2"),
            "avx512Support": nixScope.featureSupport("avx512"),
            "aesSupport": nixScope.featureSupport("aes"),
            "fmaSupport": nixScope.featureSupport("fma"),
            "fma4Support": nixScope.featureSupport("fma4"),
            "lsxSupport": nixScope.featureSupport("lsx"),
            "lasxSupport": nixScope.featureSupport("lasx"),
          });
        });
      },
    });
    return nixScope;
  })
));
