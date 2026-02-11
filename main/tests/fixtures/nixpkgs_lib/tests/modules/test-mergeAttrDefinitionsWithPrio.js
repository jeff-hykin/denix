export default createFunc({}, null, {}, (nixScope) => (
  /*let*/ createScope((nixScope) => {
    Object.defineProperty(nixScope, "defs", {
      enumerable: true,
      get() {
        return nixScope.lib["modules"]["mergeAttrDefinitionsWithPrio"](
          nixScope.options["_module"]["args"],
        );
      },
    });
    Object.defineProperty(nixScope, "assertLazy", {
      enumerable: true,
      get() {
        return createFunc(/*arg:*/ "pos", null, {}, (nixScope) => (
          nixScope.throw(
            new InterpolatedString([
              "",
              ":",
              ":",
              ": The test must not evaluate this the assertLazy thunk, but it did. Unexpected strictness leads to unexpected errors and performance problems.",
            ], [
              () => (nixScope.pos["file"]),
              () => (nixScope.toString(nixScope.pos["line"])),
              () => (nixScope.toString(nixScope.pos["column"])),
            ]),
          )
        ));
      },
    });
    return createScope((nixScope) => {
      const obj = {};
      if (obj["options"] === undefined) obj["options"] = {};
      obj["options"]["result"] = nixScope.lib["mkOption"]({});
      if (obj["config"] === undefined) obj["config"] = {};
      if (obj["config"]["_module"] === undefined) obj["config"]["_module"] = {};
      obj["config"]["_module"]["args"] = {
        "default": nixScope.lib["mkDefault"](
          nixScope.assertLazy(nixScope.__curPos),
        ),
        "regular": null,
        "force": nixScope.lib["mkForce"](
          nixScope.assertLazy(nixScope.__curPos),
        ),
        "unused": nixScope.assertLazy(nixScope.__curPos),
      };
      if (obj["config"] === undefined) obj["config"] = {};
      obj["config"]["result"] = ((_cond) => {
        if (!_cond) {
          throw new Error(
            "assertion failed: " +
              "defs.default.highestPrio == (lib.mkDefault (assertLazy __curPos)).priority",
          );
        }
        return ((_cond) => {
          if (!_cond) {
            throw new Error(
              "assertion failed: " +
                "defs.regular.highestPrio == lib.modules.defaultOverridePriority",
            );
          }
          return ((_cond) => {
            if (!_cond) {
              throw new Error(
                "assertion failed: " +
                  "defs.force.highestPrio == (lib.mkForce (assertLazy __curPos)).priority",
              );
            }
            return true;
          })(
            operators.equal(
              nixScope.defs["force"]["highestPrio"],
              (nixScope.lib["mkForce"](nixScope.assertLazy(nixScope.__curPos)))[
                "priority"
              ],
            ),
          );
        })(
          operators.equal(
            nixScope.defs["regular"]["highestPrio"],
            nixScope.lib["modules"]["defaultOverridePriority"],
          ),
        );
      })(
        operators.equal(
          nixScope.defs["default"]["highestPrio"],
          (nixScope.lib["mkDefault"](nixScope.assertLazy(nixScope.__curPos)))[
            "priority"
          ],
        ),
      );
      return obj;
    });
  })
));
