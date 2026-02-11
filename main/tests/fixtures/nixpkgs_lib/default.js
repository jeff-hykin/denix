export default /*
  Library of low-level helper functions for nix expressions.

  Please implement (mostly) exhaustive unit tests
  for new functions in `./tests.nix`.
*/ /*let*/ createScope((nixScope) => {
  defGetter(
    nixScope,
    "makeExtensible'",
    (nixScope) =>
      createFunc(/*arg:*/ "rattrs", null, {}, (nixScope) => (
        /*let*/ createScope((nixScope) => {
          defGetter(nixScope, "self", (nixScope) =>
            operators.merge(
              nixScope.rattrs(nixScope.self),
              {
                "extend": createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
                  nixScope.lib["makeExtensible"](
                    nixScope.lib["extends"](nixScope.f)(nixScope.rattrs),
                  )
                )),
              },
            ));
          return nixScope.self;
        })
      )),
  );
  defGetter(
    nixScope,
    "lib",
    (nixScope) =>
      nixScope["makeExtensible'"](
        createFunc(/*arg:*/ "self", null, {}, (nixScope) => (
          /*let*/ createScope((nixScope) => {
            defGetter(nixScope, "callLibs", (nixScope) =>
              createFunc(/*arg:*/ "file", null, {}, (nixScope) => (
                nixScope.import(nixScope.file)({ "lib": nixScope.self })
              )));
            return createScope((nixScope) => {
              const obj = {};
              obj.trivial = nixScope.callLibs(new Path(["./trivial.nix"], []));
              obj.fixedPoints = nixScope.callLibs(
                new Path(["./fixed-points.nix"], []),
              );
              obj.attrsets = nixScope.callLibs(
                new Path(["./attrsets.nix"], []),
              );
              obj.lists = nixScope.callLibs(new Path(["./lists.nix"], []));
              obj.strings = nixScope.callLibs(new Path(["./strings.nix"], []));
              obj.stringsWithDeps = nixScope.callLibs(
                new Path(["./strings-with-deps.nix"], []),
              );
              obj.customisation = nixScope.callLibs(
                new Path(["./customisation.nix"], []),
              );
              obj.derivations = nixScope.callLibs(
                new Path(["./derivations.nix"], []),
              );
              obj.maintainers = nixScope.import(
                new Path(["../maintainers/maintainer-list.nix"], []),
              );
              obj.teams = nixScope.callLibs(
                new Path(["../maintainers/team-list.nix"], []),
              );
              obj.meta = nixScope.callLibs(new Path(["./meta.nix"], []));
              obj.versions = nixScope.callLibs(
                new Path(["./versions.nix"], []),
              );
              obj.modules = nixScope.callLibs(new Path(["./modules.nix"], []));
              obj.options = nixScope.callLibs(new Path(["./options.nix"], []));
              obj.types = nixScope.callLibs(new Path(["./types.nix"], []));
              obj.licenses = nixScope.callLibs(
                new Path(["./licenses.nix"], []),
              );
              obj.sourceTypes = nixScope.callLibs(
                new Path(["./source-types.nix"], []),
              );
              obj.systems = nixScope.callLibs(new Path(["./systems"], []));
              obj.cli = nixScope.callLibs(new Path(["./cli.nix"], []));
              obj.gvariant = nixScope.callLibs(
                new Path(["./gvariant.nix"], []),
              );
              obj.generators = nixScope.callLibs(
                new Path(["./generators.nix"], []),
              );
              obj.asserts = nixScope.callLibs(new Path(["./asserts.nix"], []));
              obj.debug = nixScope.callLibs(new Path(["./debug.nix"], []));
              obj.misc = nixScope.callLibs(
                new Path(["./deprecated/misc.nix"], []),
              );
              obj.fetchers = nixScope.callLibs(
                new Path(["./fetchers.nix"], []),
              );
              obj.path = nixScope.callLibs(new Path(["./path"], []));
              obj.filesystem = nixScope.callLibs(
                new Path(["./filesystem.nix"], []),
              );
              obj.fileset = nixScope.callLibs(new Path(["./fileset"], []));
              obj.sources = nixScope.callLibs(new Path(["./sources.nix"], []));
              obj.platforms = nixScope.self["systems"]["doubles"];
              obj.kernel = nixScope.callLibs(new Path(["./kernel.nix"], []));
              obj.network = nixScope.callLibs(new Path(["./network"], []));
              obj.addErrorContext = nixScope.builtins.addErrorContext;
              obj.isPath = nixScope.builtins.isPath;
              obj.trace = nixScope.builtins.trace;
              obj.typeOf = nixScope.builtins.typeOf;
              obj.unsafeGetAttrPos = nixScope.builtins.unsafeGetAttrPos;
              obj.id = nixScope.self["trivial"].id;
              obj.const = nixScope.self["trivial"].const;
              obj.pipe = nixScope.self["trivial"].pipe;
              obj.concat = nixScope.self["trivial"].concat;
              obj.or = nixScope.self["trivial"].or;
              obj.and = nixScope.self["trivial"].and;
              obj.xor = nixScope.self["trivial"].xor;
              obj.bitAnd = nixScope.self["trivial"].bitAnd;
              obj.bitOr = nixScope.self["trivial"].bitOr;
              obj.bitXor = nixScope.self["trivial"].bitXor;
              obj.bitNot = nixScope.self["trivial"].bitNot;
              obj.boolToString = nixScope.self["trivial"].boolToString;
              obj.mergeAttrs = nixScope.self["trivial"].mergeAttrs;
              obj.flip = nixScope.self["trivial"].flip;
              obj.defaultTo = nixScope.self["trivial"].defaultTo;
              obj.mapNullable = nixScope.self["trivial"].mapNullable;
              obj.inNixShell = nixScope.self["trivial"].inNixShell;
              obj.isFloat = nixScope.self["trivial"].isFloat;
              obj.min = nixScope.self["trivial"].min;
              obj.max = nixScope.self["trivial"].max;
              obj.importJSON = nixScope.self["trivial"].importJSON;
              obj.importTOML = nixScope.self["trivial"].importTOML;
              obj.warn = nixScope.self["trivial"].warn;
              obj.warnIf = nixScope.self["trivial"].warnIf;
              obj.warnIfNot = nixScope.self["trivial"].warnIfNot;
              obj.throwIf = nixScope.self["trivial"].throwIf;
              obj.throwIfNot = nixScope.self["trivial"].throwIfNot;
              obj.checkListOfEnum = nixScope.self["trivial"].checkListOfEnum;
              obj.info = nixScope.self["trivial"].info;
              obj.showWarnings = nixScope.self["trivial"].showWarnings;
              obj.nixpkgsVersion = nixScope.self["trivial"].nixpkgsVersion;
              obj.version = nixScope.self["trivial"].version;
              obj.isInOldestRelease =
                nixScope.self["trivial"].isInOldestRelease;
              obj.oldestSupportedReleaseIsAtLeast =
                nixScope.self["trivial"].oldestSupportedReleaseIsAtLeast;
              obj.mod = nixScope.self["trivial"].mod;
              obj.compare = nixScope.self["trivial"].compare;
              obj.splitByAndCompare =
                nixScope.self["trivial"].splitByAndCompare;
              obj.seq = nixScope.self["trivial"].seq;
              obj.deepSeq = nixScope.self["trivial"].deepSeq;
              obj.lessThan = nixScope.self["trivial"].lessThan;
              obj.add = nixScope.self["trivial"].add;
              obj.sub = nixScope.self["trivial"].sub;
              obj.functionArgs = nixScope.self["trivial"].functionArgs;
              obj.setFunctionArgs = nixScope.self["trivial"].setFunctionArgs;
              obj.isFunction = nixScope.self["trivial"].isFunction;
              obj.toFunction = nixScope.self["trivial"].toFunction;
              obj.mirrorFunctionArgs =
                nixScope.self["trivial"].mirrorFunctionArgs;
              obj.fromHexString = nixScope.self["trivial"].fromHexString;
              obj.toHexString = nixScope.self["trivial"].toHexString;
              obj.toBaseDigits = nixScope.self["trivial"].toBaseDigits;
              obj.inPureEvalMode = nixScope.self["trivial"].inPureEvalMode;
              obj.isBool = nixScope.self["trivial"].isBool;
              obj.isInt = nixScope.self["trivial"].isInt;
              obj.pathExists = nixScope.self["trivial"].pathExists;
              obj.genericClosure = nixScope.self["trivial"].genericClosure;
              obj.readFile = nixScope.self["trivial"].readFile;
              obj.fix = nixScope.self["fixedPoints"].fix;
              obj["fix'"] = nixScope.self["fixedPoints"]["fix'"];
              obj.converge = nixScope.self["fixedPoints"].converge;
              obj.extends = nixScope.self["fixedPoints"].extends;
              obj.composeExtensions =
                nixScope.self["fixedPoints"].composeExtensions;
              obj.composeManyExtensions =
                nixScope.self["fixedPoints"].composeManyExtensions;
              obj.makeExtensible = nixScope.self["fixedPoints"].makeExtensible;
              obj.makeExtensibleWithCustomName =
                nixScope.self["fixedPoints"].makeExtensibleWithCustomName;
              obj.toExtension = nixScope.self["fixedPoints"].toExtension;
              obj.attrByPath = nixScope.self["attrsets"].attrByPath;
              obj.hasAttrByPath = nixScope.self["attrsets"].hasAttrByPath;
              obj.setAttrByPath = nixScope.self["attrsets"].setAttrByPath;
              obj.getAttrFromPath = nixScope.self["attrsets"].getAttrFromPath;
              obj.attrVals = nixScope.self["attrsets"].attrVals;
              obj.attrNames = nixScope.self["attrsets"].attrNames;
              obj.attrValues = nixScope.self["attrsets"].attrValues;
              obj.getAttrs = nixScope.self["attrsets"].getAttrs;
              obj.catAttrs = nixScope.self["attrsets"].catAttrs;
              obj.filterAttrs = nixScope.self["attrsets"].filterAttrs;
              obj.filterAttrsRecursive =
                nixScope.self["attrsets"].filterAttrsRecursive;
              obj.foldlAttrs = nixScope.self["attrsets"].foldlAttrs;
              obj.foldAttrs = nixScope.self["attrsets"].foldAttrs;
              obj.collect = nixScope.self["attrsets"].collect;
              obj.nameValuePair = nixScope.self["attrsets"].nameValuePair;
              obj.mapAttrs = nixScope.self["attrsets"].mapAttrs;
              obj["mapAttrs'"] = nixScope.self["attrsets"]["mapAttrs'"];
              obj.mapAttrsToList = nixScope.self["attrsets"].mapAttrsToList;
              obj.attrsToList = nixScope.self["attrsets"].attrsToList;
              obj.concatMapAttrs = nixScope.self["attrsets"].concatMapAttrs;
              obj.mapAttrsRecursive =
                nixScope.self["attrsets"].mapAttrsRecursive;
              obj.mapAttrsRecursiveCond =
                nixScope.self["attrsets"].mapAttrsRecursiveCond;
              obj.genAttrs = nixScope.self["attrsets"].genAttrs;
              obj.isDerivation = nixScope.self["attrsets"].isDerivation;
              obj.toDerivation = nixScope.self["attrsets"].toDerivation;
              obj.optionalAttrs = nixScope.self["attrsets"].optionalAttrs;
              obj.zipAttrsWithNames =
                nixScope.self["attrsets"].zipAttrsWithNames;
              obj.zipAttrsWith = nixScope.self["attrsets"].zipAttrsWith;
              obj.zipAttrs = nixScope.self["attrsets"].zipAttrs;
              obj.recursiveUpdateUntil =
                nixScope.self["attrsets"].recursiveUpdateUntil;
              obj.recursiveUpdate = nixScope.self["attrsets"].recursiveUpdate;
              obj.matchAttrs = nixScope.self["attrsets"].matchAttrs;
              obj.mergeAttrsList = nixScope.self["attrsets"].mergeAttrsList;
              obj.overrideExisting = nixScope.self["attrsets"].overrideExisting;
              obj.showAttrPath = nixScope.self["attrsets"].showAttrPath;
              obj.getOutput = nixScope.self["attrsets"].getOutput;
              obj.getFirstOutput = nixScope.self["attrsets"].getFirstOutput;
              obj.getBin = nixScope.self["attrsets"].getBin;
              obj.getLib = nixScope.self["attrsets"].getLib;
              obj.getStatic = nixScope.self["attrsets"].getStatic;
              obj.getDev = nixScope.self["attrsets"].getDev;
              obj.getInclude = nixScope.self["attrsets"].getInclude;
              obj.getMan = nixScope.self["attrsets"].getMan;
              obj.chooseDevOutputs = nixScope.self["attrsets"].chooseDevOutputs;
              obj.zipWithNames = nixScope.self["attrsets"].zipWithNames;
              obj.zip = nixScope.self["attrsets"].zip;
              obj.recurseIntoAttrs = nixScope.self["attrsets"].recurseIntoAttrs;
              obj.dontRecurseIntoAttrs =
                nixScope.self["attrsets"].dontRecurseIntoAttrs;
              obj.cartesianProduct = nixScope.self["attrsets"].cartesianProduct;
              obj.cartesianProductOfSets =
                nixScope.self["attrsets"].cartesianProductOfSets;
              obj.mapCartesianProduct =
                nixScope.self["attrsets"].mapCartesianProduct;
              obj.updateManyAttrsByPath =
                nixScope.self["attrsets"].updateManyAttrsByPath;
              obj.listToAttrs = nixScope.self["attrsets"].listToAttrs;
              obj.hasAttr = nixScope.self["attrsets"].hasAttr;
              obj.getAttr = nixScope.self["attrsets"].getAttr;
              obj.isAttrs = nixScope.self["attrsets"].isAttrs;
              obj.intersectAttrs = nixScope.self["attrsets"].intersectAttrs;
              obj.removeAttrs = nixScope.self["attrsets"].removeAttrs;
              obj.singleton = nixScope.self["lists"].singleton;
              obj.forEach = nixScope.self["lists"].forEach;
              obj.map = nixScope.self["lists"].map;
              obj.foldr = nixScope.self["lists"].foldr;
              obj.fold = nixScope.self["lists"].fold;
              obj.foldl = nixScope.self["lists"].foldl;
              obj["foldl'"] = nixScope.self["lists"]["foldl'"];
              obj.imap0 = nixScope.self["lists"].imap0;
              obj.imap1 = nixScope.self["lists"].imap1;
              obj.filter = nixScope.self["lists"].filter;
              obj.ifilter0 = nixScope.self["lists"].ifilter0;
              obj.concatMap = nixScope.self["lists"].concatMap;
              obj.flatten = nixScope.self["lists"].flatten;
              obj.remove = nixScope.self["lists"].remove;
              obj.findSingle = nixScope.self["lists"].findSingle;
              obj.findFirst = nixScope.self["lists"].findFirst;
              obj.any = nixScope.self["lists"].any;
              obj.all = nixScope.self["lists"].all;
              obj.count = nixScope.self["lists"].count;
              obj.optional = nixScope.self["lists"].optional;
              obj.optionals = nixScope.self["lists"].optionals;
              obj.toList = nixScope.self["lists"].toList;
              obj.range = nixScope.self["lists"].range;
              obj.replicate = nixScope.self["lists"].replicate;
              obj.partition = nixScope.self["lists"].partition;
              obj.zipListsWith = nixScope.self["lists"].zipListsWith;
              obj.zipLists = nixScope.self["lists"].zipLists;
              obj.reverseList = nixScope.self["lists"].reverseList;
              obj.listDfs = nixScope.self["lists"].listDfs;
              obj.toposort = nixScope.self["lists"].toposort;
              obj.sort = nixScope.self["lists"].sort;
              obj.sortOn = nixScope.self["lists"].sortOn;
              obj.naturalSort = nixScope.self["lists"].naturalSort;
              obj.compareLists = nixScope.self["lists"].compareLists;
              obj.take = nixScope.self["lists"].take;
              obj.takeEnd = nixScope.self["lists"].takeEnd;
              obj.drop = nixScope.self["lists"].drop;
              obj.dropEnd = nixScope.self["lists"].dropEnd;
              obj.sublist = nixScope.self["lists"].sublist;
              obj.last = nixScope.self["lists"].last;
              obj.init = nixScope.self["lists"].init;
              obj.crossLists = nixScope.self["lists"].crossLists;
              obj.unique = nixScope.self["lists"].unique;
              obj.allUnique = nixScope.self["lists"].allUnique;
              obj.intersectLists = nixScope.self["lists"].intersectLists;
              obj.subtractLists = nixScope.self["lists"].subtractLists;
              obj.mutuallyExclusive = nixScope.self["lists"].mutuallyExclusive;
              obj.groupBy = nixScope.self["lists"].groupBy;
              obj["groupBy'"] = nixScope.self["lists"]["groupBy'"];
              obj.concatLists = nixScope.self["lists"].concatLists;
              obj.genList = nixScope.self["lists"].genList;
              obj.length = nixScope.self["lists"].length;
              obj.head = nixScope.self["lists"].head;
              obj.tail = nixScope.self["lists"].tail;
              obj.elem = nixScope.self["lists"].elem;
              obj.elemAt = nixScope.self["lists"].elemAt;
              obj.isList = nixScope.self["lists"].isList;
              obj.concatStrings = nixScope.self["strings"].concatStrings;
              obj.concatMapStrings = nixScope.self["strings"].concatMapStrings;
              obj.concatImapStrings =
                nixScope.self["strings"].concatImapStrings;
              obj.stringLength = nixScope.self["strings"].stringLength;
              obj.substring = nixScope.self["strings"].substring;
              obj.isString = nixScope.self["strings"].isString;
              obj.replaceString = nixScope.self["strings"].replaceString;
              obj.replaceStrings = nixScope.self["strings"].replaceStrings;
              obj.intersperse = nixScope.self["strings"].intersperse;
              obj.concatStringsSep = nixScope.self["strings"].concatStringsSep;
              obj.concatMapStringsSep =
                nixScope.self["strings"].concatMapStringsSep;
              obj.concatMapAttrsStringSep =
                nixScope.self["strings"].concatMapAttrsStringSep;
              obj.concatImapStringsSep =
                nixScope.self["strings"].concatImapStringsSep;
              obj.concatLines = nixScope.self["strings"].concatLines;
              obj.makeSearchPath = nixScope.self["strings"].makeSearchPath;
              obj.makeSearchPathOutput =
                nixScope.self["strings"].makeSearchPathOutput;
              obj.makeLibraryPath = nixScope.self["strings"].makeLibraryPath;
              obj.makeIncludePath = nixScope.self["strings"].makeIncludePath;
              obj.makeBinPath = nixScope.self["strings"].makeBinPath;
              obj.optionalString = nixScope.self["strings"].optionalString;
              obj.hasInfix = nixScope.self["strings"].hasInfix;
              obj.hasPrefix = nixScope.self["strings"].hasPrefix;
              obj.hasSuffix = nixScope.self["strings"].hasSuffix;
              obj.stringToCharacters =
                nixScope.self["strings"].stringToCharacters;
              obj.stringAsChars = nixScope.self["strings"].stringAsChars;
              obj.escape = nixScope.self["strings"].escape;
              obj.escapeShellArg = nixScope.self["strings"].escapeShellArg;
              obj.escapeShellArgs = nixScope.self["strings"].escapeShellArgs;
              obj.isStorePath = nixScope.self["strings"].isStorePath;
              obj.isStringLike = nixScope.self["strings"].isStringLike;
              obj.isValidPosixName = nixScope.self["strings"].isValidPosixName;
              obj.toShellVar = nixScope.self["strings"].toShellVar;
              obj.toShellVars = nixScope.self["strings"].toShellVars;
              obj.trim = nixScope.self["strings"].trim;
              obj.trimWith = nixScope.self["strings"].trimWith;
              obj.escapeRegex = nixScope.self["strings"].escapeRegex;
              obj.escapeURL = nixScope.self["strings"].escapeURL;
              obj.escapeXML = nixScope.self["strings"].escapeXML;
              obj.replaceChars = nixScope.self["strings"].replaceChars;
              obj.lowerChars = nixScope.self["strings"].lowerChars;
              obj.upperChars = nixScope.self["strings"].upperChars;
              obj.toLower = nixScope.self["strings"].toLower;
              obj.toUpper = nixScope.self["strings"].toUpper;
              obj.toCamelCase = nixScope.self["strings"].toCamelCase;
              obj.toSentenceCase = nixScope.self["strings"].toSentenceCase;
              obj.addContextFrom = nixScope.self["strings"].addContextFrom;
              obj.splitString = nixScope.self["strings"].splitString;
              obj.splitStringBy = nixScope.self["strings"].splitStringBy;
              obj.removePrefix = nixScope.self["strings"].removePrefix;
              obj.removeSuffix = nixScope.self["strings"].removeSuffix;
              obj.versionOlder = nixScope.self["strings"].versionOlder;
              obj.versionAtLeast = nixScope.self["strings"].versionAtLeast;
              obj.getName = nixScope.self["strings"].getName;
              obj.getVersion = nixScope.self["strings"].getVersion;
              obj.match = nixScope.self["strings"].match;
              obj.split = nixScope.self["strings"].split;
              obj.cmakeOptionType = nixScope.self["strings"].cmakeOptionType;
              obj.cmakeBool = nixScope.self["strings"].cmakeBool;
              obj.cmakeFeature = nixScope.self["strings"].cmakeFeature;
              obj.mesonOption = nixScope.self["strings"].mesonOption;
              obj.mesonBool = nixScope.self["strings"].mesonBool;
              obj.mesonEnable = nixScope.self["strings"].mesonEnable;
              obj.nameFromURL = nixScope.self["strings"].nameFromURL;
              obj.enableFeature = nixScope.self["strings"].enableFeature;
              obj.enableFeatureAs = nixScope.self["strings"].enableFeatureAs;
              obj.withFeature = nixScope.self["strings"].withFeature;
              obj.withFeatureAs = nixScope.self["strings"].withFeatureAs;
              obj.fixedWidthString = nixScope.self["strings"].fixedWidthString;
              obj.fixedWidthNumber = nixScope.self["strings"].fixedWidthNumber;
              obj.toInt = nixScope.self["strings"].toInt;
              obj.toIntBase10 = nixScope.self["strings"].toIntBase10;
              obj.readPathsFromFile =
                nixScope.self["strings"].readPathsFromFile;
              obj.fileContents = nixScope.self["strings"].fileContents;
              obj.textClosureList =
                nixScope.self["stringsWithDeps"].textClosureList;
              obj.textClosureMap =
                nixScope.self["stringsWithDeps"].textClosureMap;
              obj.noDepEntry = nixScope.self["stringsWithDeps"].noDepEntry;
              obj.fullDepEntry = nixScope.self["stringsWithDeps"].fullDepEntry;
              obj.packEntry = nixScope.self["stringsWithDeps"].packEntry;
              obj.stringAfter = nixScope.self["stringsWithDeps"].stringAfter;
              obj.overrideDerivation =
                nixScope.self["customisation"].overrideDerivation;
              obj.makeOverridable =
                nixScope.self["customisation"].makeOverridable;
              obj.callPackageWith =
                nixScope.self["customisation"].callPackageWith;
              obj.callPackagesWith =
                nixScope.self["customisation"].callPackagesWith;
              obj.extendDerivation =
                nixScope.self["customisation"].extendDerivation;
              obj.hydraJob = nixScope.self["customisation"].hydraJob;
              obj.makeScope = nixScope.self["customisation"].makeScope;
              obj.makeScopeWithSplicing =
                nixScope.self["customisation"].makeScopeWithSplicing;
              obj["makeScopeWithSplicing'"] =
                nixScope.self["customisation"]["makeScopeWithSplicing'"];
              obj.extendMkDerivation =
                nixScope.self["customisation"].extendMkDerivation;
              obj.lazyDerivation = nixScope.self["derivations"].lazyDerivation;
              obj.optionalDrvAttr =
                nixScope.self["derivations"].optionalDrvAttr;
              obj.warnOnInstantiate =
                nixScope.self["derivations"].warnOnInstantiate;
              obj.mkLuaInline = nixScope.self["generators"].mkLuaInline;
              obj.addMetaAttrs = nixScope.self["meta"].addMetaAttrs;
              obj.dontDistribute = nixScope.self["meta"].dontDistribute;
              obj.setName = nixScope.self["meta"].setName;
              obj.updateName = nixScope.self["meta"].updateName;
              obj.appendToName = nixScope.self["meta"].appendToName;
              obj.mapDerivationAttrset =
                nixScope.self["meta"].mapDerivationAttrset;
              obj.setPrio = nixScope.self["meta"].setPrio;
              obj.lowPrio = nixScope.self["meta"].lowPrio;
              obj.lowPrioSet = nixScope.self["meta"].lowPrioSet;
              obj.hiPrio = nixScope.self["meta"].hiPrio;
              obj.hiPrioSet = nixScope.self["meta"].hiPrioSet;
              obj.licensesSpdx = nixScope.self["meta"].licensesSpdx;
              obj.getLicenseFromSpdxId =
                nixScope.self["meta"].getLicenseFromSpdxId;
              obj.getLicenseFromSpdxIdOr =
                nixScope.self["meta"].getLicenseFromSpdxIdOr;
              obj.getExe = nixScope.self["meta"].getExe;
              obj["getExe'"] = nixScope.self["meta"]["getExe'"];
              obj.pathType = nixScope.self["filesystem"].pathType;
              obj.pathIsDirectory = nixScope.self["filesystem"].pathIsDirectory;
              obj.pathIsRegularFile =
                nixScope.self["filesystem"].pathIsRegularFile;
              obj.packagesFromDirectoryRecursive =
                nixScope.self["filesystem"].packagesFromDirectoryRecursive;
              obj.cleanSourceFilter =
                nixScope.self["sources"].cleanSourceFilter;
              obj.cleanSource = nixScope.self["sources"].cleanSource;
              obj.sourceByRegex = nixScope.self["sources"].sourceByRegex;
              obj.sourceFilesBySuffices =
                nixScope.self["sources"].sourceFilesBySuffices;
              obj.commitIdFromGitRepo =
                nixScope.self["sources"].commitIdFromGitRepo;
              obj.cleanSourceWith = nixScope.self["sources"].cleanSourceWith;
              obj.pathHasContext = nixScope.self["sources"].pathHasContext;
              obj.canCleanSource = nixScope.self["sources"].canCleanSource;
              obj.pathIsGitRepo = nixScope.self["sources"].pathIsGitRepo;
              obj.revOrTag = nixScope.self["sources"].revOrTag;
              obj.repoRevToName = nixScope.self["sources"].repoRevToName;
              obj.evalModules = nixScope.self["modules"].evalModules;
              obj.setDefaultModuleLocation =
                nixScope.self["modules"].setDefaultModuleLocation;
              obj.unifyModuleSyntax =
                nixScope.self["modules"].unifyModuleSyntax;
              obj.applyModuleArgsIfFunction =
                nixScope.self["modules"].applyModuleArgsIfFunction;
              obj.mergeModules = nixScope.self["modules"].mergeModules;
              obj["mergeModules'"] = nixScope.self["modules"]["mergeModules'"];
              obj.mergeOptionDecls = nixScope.self["modules"].mergeOptionDecls;
              obj.mergeDefinitions = nixScope.self["modules"].mergeDefinitions;
              obj.pushDownProperties =
                nixScope.self["modules"].pushDownProperties;
              obj.dischargeProperties =
                nixScope.self["modules"].dischargeProperties;
              obj.filterOverrides = nixScope.self["modules"].filterOverrides;
              obj.sortProperties = nixScope.self["modules"].sortProperties;
              obj.fixupOptionType = nixScope.self["modules"].fixupOptionType;
              obj.mkIf = nixScope.self["modules"].mkIf;
              obj.mkAssert = nixScope.self["modules"].mkAssert;
              obj.mkDefinition = nixScope.self["modules"].mkDefinition;
              obj.mkMerge = nixScope.self["modules"].mkMerge;
              obj.mkOverride = nixScope.self["modules"].mkOverride;
              obj.mkOptionDefault = nixScope.self["modules"].mkOptionDefault;
              obj.mkDefault = nixScope.self["modules"].mkDefault;
              obj.mkImageMediaOverride =
                nixScope.self["modules"].mkImageMediaOverride;
              obj.mkForce = nixScope.self["modules"].mkForce;
              obj.mkVMOverride = nixScope.self["modules"].mkVMOverride;
              obj.mkFixStrictness = nixScope.self["modules"].mkFixStrictness;
              obj.mkOrder = nixScope.self["modules"].mkOrder;
              obj.mkBefore = nixScope.self["modules"].mkBefore;
              obj.mkAfter = nixScope.self["modules"].mkAfter;
              obj.mkAliasDefinitions =
                nixScope.self["modules"].mkAliasDefinitions;
              obj.mkAliasAndWrapDefinitions =
                nixScope.self["modules"].mkAliasAndWrapDefinitions;
              obj.fixMergeModules = nixScope.self["modules"].fixMergeModules;
              obj.mkRemovedOptionModule =
                nixScope.self["modules"].mkRemovedOptionModule;
              obj.mkRenamedOptionModule =
                nixScope.self["modules"].mkRenamedOptionModule;
              obj.mkRenamedOptionModuleWith =
                nixScope.self["modules"].mkRenamedOptionModuleWith;
              obj.mkMergedOptionModule =
                nixScope.self["modules"].mkMergedOptionModule;
              obj.mkChangedOptionModule =
                nixScope.self["modules"].mkChangedOptionModule;
              obj.mkAliasOptionModule =
                nixScope.self["modules"].mkAliasOptionModule;
              obj.mkDerivedConfig = nixScope.self["modules"].mkDerivedConfig;
              obj.doRename = nixScope.self["modules"].doRename;
              obj.mkAliasOptionModuleMD =
                nixScope.self["modules"].mkAliasOptionModuleMD;
              obj.evalOptionValue = nixScope.lib["warn"](
                "External use of `lib.evalOptionValue` is deprecated. If your use case isn't covered by non-deprecated functions, we'd like to know more and perhaps support your use case well, instead of providing access to these low level functions. In this case please open an issue in https://github.com/nixos/nixpkgs/issues/.",
              )(nixScope.self["modules"]["evalOptionValue"]);
              obj.isOption = nixScope.self["options"].isOption;
              obj.mkEnableOption = nixScope.self["options"].mkEnableOption;
              obj.mkSinkUndeclaredOptions =
                nixScope.self["options"].mkSinkUndeclaredOptions;
              obj.mergeDefaultOption =
                nixScope.self["options"].mergeDefaultOption;
              obj.mergeOneOption = nixScope.self["options"].mergeOneOption;
              obj.mergeEqualOption = nixScope.self["options"].mergeEqualOption;
              obj.mergeUniqueOption =
                nixScope.self["options"].mergeUniqueOption;
              obj.getValues = nixScope.self["options"].getValues;
              obj.getFiles = nixScope.self["options"].getFiles;
              obj.optionAttrSetToDocList =
                nixScope.self["options"].optionAttrSetToDocList;
              obj["optionAttrSetToDocList'"] =
                nixScope.self["options"]["optionAttrSetToDocList'"];
              obj.scrubOptionValue = nixScope.self["options"].scrubOptionValue;
              obj.literalExpression =
                nixScope.self["options"].literalExpression;
              obj.literalExample = nixScope.self["options"].literalExample;
              obj.showOption = nixScope.self["options"].showOption;
              obj.showOptionWithDefLocs =
                nixScope.self["options"].showOptionWithDefLocs;
              obj.showFiles = nixScope.self["options"].showFiles;
              obj.unknownModule = nixScope.self["options"].unknownModule;
              obj.mkOption = nixScope.self["options"].mkOption;
              obj.mkPackageOption = nixScope.self["options"].mkPackageOption;
              obj.mkPackageOptionMD =
                nixScope.self["options"].mkPackageOptionMD;
              obj.literalMD = nixScope.self["options"].literalMD;
              obj.isType = nixScope.self["types"].isType;
              obj.setType = nixScope.self["types"].setType;
              obj.defaultTypeMerge = nixScope.self["types"].defaultTypeMerge;
              obj.defaultFunctor = nixScope.self["types"].defaultFunctor;
              obj.isOptionType = nixScope.self["types"].isOptionType;
              obj.mkOptionType = nixScope.self["types"].mkOptionType;
              obj.assertMsg = nixScope.self["asserts"].assertMsg;
              obj.assertOneOf = nixScope.self["asserts"].assertOneOf;
              obj.traceIf = nixScope.self["debug"].traceIf;
              obj.traceVal = nixScope.self["debug"].traceVal;
              obj.traceValFn = nixScope.self["debug"].traceValFn;
              obj.traceSeq = nixScope.self["debug"].traceSeq;
              obj.traceSeqN = nixScope.self["debug"].traceSeqN;
              obj.traceValSeq = nixScope.self["debug"].traceValSeq;
              obj.traceValSeqFn = nixScope.self["debug"].traceValSeqFn;
              obj.traceValSeqN = nixScope.self["debug"].traceValSeqN;
              obj.traceValSeqNFn = nixScope.self["debug"].traceValSeqNFn;
              obj.traceFnSeqN = nixScope.self["debug"].traceFnSeqN;
              obj.runTests = nixScope.self["debug"].runTests;
              obj.testAllTrue = nixScope.self["debug"].testAllTrue;
              obj.maybeEnv = nixScope.self["misc"].maybeEnv;
              obj.defaultMergeArg = nixScope.self["misc"].defaultMergeArg;
              obj.defaultMerge = nixScope.self["misc"].defaultMerge;
              obj.foldArgs = nixScope.self["misc"].foldArgs;
              obj.maybeAttrNullable = nixScope.self["misc"].maybeAttrNullable;
              obj.maybeAttr = nixScope.self["misc"].maybeAttr;
              obj.ifEnable = nixScope.self["misc"].ifEnable;
              obj.checkFlag = nixScope.self["misc"].checkFlag;
              obj.getValue = nixScope.self["misc"].getValue;
              obj.checkReqs = nixScope.self["misc"].checkReqs;
              obj.uniqList = nixScope.self["misc"].uniqList;
              obj.uniqListExt = nixScope.self["misc"].uniqListExt;
              obj.condConcat = nixScope.self["misc"].condConcat;
              obj.lazyGenericClosure = nixScope.self["misc"].lazyGenericClosure;
              obj.innerModifySumArgs = nixScope.self["misc"].innerModifySumArgs;
              obj.modifySumArgs = nixScope.self["misc"].modifySumArgs;
              obj.innerClosePropagation =
                nixScope.self["misc"].innerClosePropagation;
              obj.closePropagation = nixScope.self["misc"].closePropagation;
              obj.mapAttrsFlatten = nixScope.self["misc"].mapAttrsFlatten;
              obj.nvs = nixScope.self["misc"].nvs;
              obj.setAttr = nixScope.self["misc"].setAttr;
              obj.setAttrMerge = nixScope.self["misc"].setAttrMerge;
              obj.mergeAttrsWithFunc = nixScope.self["misc"].mergeAttrsWithFunc;
              obj.mergeAttrsConcatenateValues =
                nixScope.self["misc"].mergeAttrsConcatenateValues;
              obj.mergeAttrsNoOverride =
                nixScope.self["misc"].mergeAttrsNoOverride;
              obj.mergeAttrByFunc = nixScope.self["misc"].mergeAttrByFunc;
              obj.mergeAttrsByFuncDefaults =
                nixScope.self["misc"].mergeAttrsByFuncDefaults;
              obj.mergeAttrsByFuncDefaultsClean =
                nixScope.self["misc"].mergeAttrsByFuncDefaultsClean;
              obj.mergeAttrBy = nixScope.self["misc"].mergeAttrBy;
              obj.fakeHash = nixScope.self["misc"].fakeHash;
              obj.fakeSha256 = nixScope.self["misc"].fakeSha256;
              obj.fakeSha512 = nixScope.self["misc"].fakeSha512;
              obj.nixType = nixScope.self["misc"].nixType;
              obj.imap = nixScope.self["misc"].imap;
              obj.splitVersion = nixScope.self["versions"].splitVersion;
              return obj;
            });
          })
        )),
      ),
  );
  return nixScope.lib;
});
