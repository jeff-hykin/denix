export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    nixScope.storeDir = nixScope.builtins["storeDir"];
    nixScope.types = nixScope.lib["types"];
    nixScope.mkOption = nixScope.lib["mkOption"];
    return createScope((nixScope) => {
      const obj = {};
      obj["imports"] = [{
        "options": ({
          "pathInStore": nixScope.mkOption(
            {
              "type": nixScope.types["lazyAttrsOf"](
                nixScope.types["pathWith"]({ "inStore": true }),
              ),
            },
          ),
          "pathNotInStore": nixScope.mkOption(
            {
              "type": nixScope.types["lazyAttrsOf"](
                nixScope.types["pathWith"]({ "inStore": false }),
              ),
            },
          ),
          "anyPath": nixScope.mkOption(
            {
              "type": nixScope.types["lazyAttrsOf"](
                nixScope.types["pathWith"]({}),
              ),
            },
          ),
          "absolutePathNotInStore": nixScope.mkOption(
            {
              "type": nixScope.types["lazyAttrsOf"](
                nixScope.types["pathWith"](
                  { "inStore": false, "absolute": true },
                ),
              ),
            },
          ),
          "conflictingPathOptionType": nixScope.mkOption(
            { "type": nixScope.types["pathWith"]({ "absolute": true }) },
          ),
          "impossiblePathOptionType": nixScope.mkOption(
            {
              "type": nixScope.types["pathWith"](
                { "inStore": true, "absolute": false },
              ),
            },
          ),
        }),
      }, {
        "options": ({
          "pathNotInStore": nixScope.mkOption(
            {
              "type": nixScope.types["lazyAttrsOf"](
                nixScope.types["pathWith"](
                  { "inStore": false, "absolute": null },
                ),
              ),
            },
          ),
          "conflictingPathOptionType": nixScope.mkOption(
            { "type": nixScope.types["pathWith"]({ "absolute": false }) },
          ),
        }),
      }];
      obj["conflictingPathOptionType"] = "/foo/bar";
      obj["impossiblePathOptionType"] = "/foo/bar";
      if (obj["pathInStore"] === undefined) obj["pathInStore"] = {};
      obj["pathInStore"]["ok1"] = new InterpolatedString([
        "",
        "/0lz9p8xhf89kb1c1kk6jxrzskaiygnlh-bash-5.2-p15.drv",
      ], [() => (nixScope.storeDir)]);
      if (obj["pathInStore"] === undefined) obj["pathInStore"] = {};
      obj["pathInStore"]["ok2"] = new InterpolatedString([
        "",
        "/0fb3ykw9r5hpayd05sr0cizwadzq1d8q-bash-5.2-p15",
      ], [() => (nixScope.storeDir)]);
      if (obj["pathInStore"] === undefined) obj["pathInStore"] = {};
      obj["pathInStore"]["ok3"] = new InterpolatedString([
        "",
        "/0fb3ykw9r5hpayd05sr0cizwadzq1d8q-bash-5.2-p15/bin/bash",
      ], [() => (nixScope.storeDir)]);
      if (obj["pathInStore"] === undefined) obj["pathInStore"] = {};
      obj["pathInStore"]["ok4"] =
        "/1121rp0gvr1qya7hvy925g5kjwg66acz6sn1ra1hca09f1z5dsab";
      if (obj["pathInStore"] === undefined) obj["pathInStore"] = {};
      obj["pathInStore"]["ok5"] =
        "/1121rp0gvr1qya7hvy925g5kjwg66acz6sn1ra1hca09f1z5dsab/bin/bash";
      if (obj["pathInStore"] === undefined) obj["pathInStore"] = {};
      obj["pathInStore"]["ok6"] = new Path([
        "/1121rp0gvr1qya7hvy925g5kjwg66acz6sn1ra1hca09f1z5dsab",
      ], []);
      if (obj["pathInStore"] === undefined) obj["pathInStore"] = {};
      obj["pathInStore"]["bad1"] = "";
      if (obj["pathInStore"] === undefined) obj["pathInStore"] = {};
      obj["pathInStore"]["bad2"] = new InterpolatedString(["", ""], [
        () => (nixScope.storeDir),
      ]);
      if (obj["pathInStore"] === undefined) obj["pathInStore"] = {};
      obj["pathInStore"]["bad3"] = new InterpolatedString(["", "/"], [
        () => (nixScope.storeDir),
      ]);
      if (obj["pathInStore"] === undefined) obj["pathInStore"] = {};
      obj["pathInStore"]["bad4"] = new InterpolatedString(["", "/.links"], [
        () => (nixScope.storeDir),
      ]);
      if (obj["pathInStore"] === undefined) obj["pathInStore"] = {};
      obj["pathInStore"]["bad5"] = "/foo/bar";
      if (obj["pathNotInStore"] === undefined) obj["pathNotInStore"] = {};
      obj["pathNotInStore"]["ok1"] = "/foo/bar";
      if (obj["pathNotInStore"] === undefined) obj["pathNotInStore"] = {};
      obj["pathNotInStore"]["ok2"] = new InterpolatedString(["", ""], [
        () => (nixScope.storeDir),
      ]);
      if (obj["pathNotInStore"] === undefined) obj["pathNotInStore"] = {};
      obj["pathNotInStore"]["ok3"] = new InterpolatedString(["", "/"], [
        () => (nixScope.storeDir),
      ]);
      if (obj["pathNotInStore"] === undefined) obj["pathNotInStore"] = {};
      obj["pathNotInStore"]["ok4"] = "";
      if (obj["pathNotInStore"] === undefined) obj["pathNotInStore"] = {};
      obj["pathNotInStore"]["ok5"] = new InterpolatedString(["", "/.links"], [
        () => (nixScope.storeDir),
      ]);
      if (obj["pathNotInStore"] === undefined) obj["pathNotInStore"] = {};
      obj["pathNotInStore"]["bad1"] = new InterpolatedString([
        "",
        "/0lz9p8xhf89kb1c1kk6jxrzskaiygnlh-bash-5.2-p15.drv",
      ], [() => (nixScope.storeDir)]);
      if (obj["pathNotInStore"] === undefined) obj["pathNotInStore"] = {};
      obj["pathNotInStore"]["bad2"] = new InterpolatedString([
        "",
        "/0fb3ykw9r5hpayd05sr0cizwadzq1d8q-bash-5.2-p15",
      ], [() => (nixScope.storeDir)]);
      if (obj["pathNotInStore"] === undefined) obj["pathNotInStore"] = {};
      obj["pathNotInStore"]["bad3"] = new InterpolatedString([
        "",
        "/0fb3ykw9r5hpayd05sr0cizwadzq1d8q-bash-5.2-p15/bin/bash",
      ], [() => (nixScope.storeDir)]);
      if (obj["pathNotInStore"] === undefined) obj["pathNotInStore"] = {};
      obj["pathNotInStore"]["bad4"] = new Path(["./pathWith.nix"], []);
      if (obj["anyPath"] === undefined) obj["anyPath"] = {};
      obj["anyPath"]["ok1"] = "/this/is/absolute";
      if (obj["anyPath"] === undefined) obj["anyPath"] = {};
      obj["anyPath"]["ok2"] = "./this/is/relative";
      if (obj["anyPath"] === undefined) obj["anyPath"] = {};
      obj["anyPath"]["bad1"] = 42n;
      if (obj["absolutePathNotInStore"] === undefined) {
        obj["absolutePathNotInStore"] = {};
      }
      obj["absolutePathNotInStore"]["ok1"] = "/this/is/absolute";
      if (obj["absolutePathNotInStore"] === undefined) {
        obj["absolutePathNotInStore"] = {};
      }
      obj["absolutePathNotInStore"]["bad1"] = "./this/is/relative";
      if (obj["absolutePathNotInStore"] === undefined) {
        obj["absolutePathNotInStore"] = {};
      }
      obj["absolutePathNotInStore"]["bad2"] = new InterpolatedString([
        "",
        "/0fb3ykw9r5hpayd05sr0cizwadzq1d8q-bash-5.2-p15",
      ], [() => (nixScope.storeDir)]);
      return obj;
    });
  })
));
