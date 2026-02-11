export default /* Helper function to implement a fallback for the bit operators
   `bitAnd`, `bitOr` and `bitXor` on older nix version.
   See ./trivial.nix
*/ createFunc(/*arg:*/ "f", null, {}, (nixScope) => (
  createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
    createFunc(/*arg:*/ "y", null, {}, (nixScope) => (
      /*let*/ createScope((nixScope) => {
        defGetter(
          nixScope,
          "intToBits",
          (nixScope) =>
            createFunc(/*arg:*/ "x", null, {}, (nixScope) => (
              operators.ifThenElse(
                operators.or(
                  operators.equal(nixScope.x, 0n),
                  operators.equal(nixScope.x, -1n),
                ),
                () => [],
                () => (/*let*/ createScope((nixScope) => {
                  defGetter(
                    nixScope,
                    "headbit",
                    (
                      nixScope,
                    ) => (operators.ifThenElse(
                      operators.notEqual(
                        operators.multiply(
                          operators.divide(nixScope.x, 2n),
                          2n,
                        ),
                        nixScope.x,
                      ),
                      () => (1n),
                      () => (0n),
                    )),
                  );
                  defGetter(
                    nixScope,
                    "tailbits",
                    (
                      nixScope,
                    ) => (operators.ifThenElse(
                      operators.lessThan(nixScope.x, 0n),
                      () => (operators.subtract(
                        operators.divide(operators.add(nixScope.x, 1n), 2n),
                        1n,
                      )),
                      () => (operators.divide(nixScope.x, 2n)),
                    )),
                  );
                  return operators.listConcat(
                    [nixScope.headbit],
                    nixScope.intToBits(nixScope.tailbits),
                  );
                })),
              )
            )),
        );
        defGetter(
          nixScope,
          "bitsToInt",
          (nixScope) =>
            createFunc(/*arg:*/ "l", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "signum", null, {}, (nixScope) => (
                operators.ifThenElse(
                  operators.equal(nixScope.l, []),
                  () => (operators.ifThenElse(
                    operators.equal(nixScope.signum, 0n),
                    () => (0n),
                    () => (-1n),
                  )),
                  () => (operators.add(
                    nixScope.builtins["head"](nixScope.l),
                    operators.multiply(
                      2n,
                      nixScope.bitsToInt(nixScope.builtins["tail"](nixScope.l))(
                        nixScope.signum,
                      ),
                    ),
                  )),
                )
              ))
            )),
        );
        defGetter(
          nixScope,
          "xsignum",
          (
            nixScope,
          ) => (operators.ifThenElse(
            operators.lessThan(nixScope.x, 0n),
            () => (1n),
            () => (0n),
          )),
        );
        defGetter(
          nixScope,
          "ysignum",
          (
            nixScope,
          ) => (operators.ifThenElse(
            operators.lessThan(nixScope.y, 0n),
            () => (1n),
            () => (0n),
          )),
        );
        defGetter(
          nixScope,
          "zipListsWith'",
          (nixScope) =>
            createFunc(/*arg:*/ "fst", null, {}, (nixScope) => (
              createFunc(/*arg:*/ "snd", null, {}, (nixScope) => (
                operators.ifThenElse(
                  operators.and(
                    operators.equal(nixScope.fst, []),
                    operators.equal(nixScope.snd, []),
                  ),
                  () => [],
                  () => (operators.ifThenElse(
                    operators.equal(nixScope.fst, []),
                    () => (operators.listConcat(
                      [
                        nixScope.f(nixScope.xsignum)(
                          nixScope.builtins["head"](nixScope.snd),
                        ),
                      ],
                      nixScope["zipListsWith'"]([])(
                        nixScope.builtins["tail"](nixScope.snd),
                      ),
                    )),
                    () => (operators.ifThenElse(
                      operators.equal(nixScope.snd, []),
                      () => (operators.listConcat(
                        [
                          nixScope.f(nixScope.builtins["head"](nixScope.fst))(
                            nixScope.ysignum,
                          ),
                        ],
                        nixScope["zipListsWith'"](
                          nixScope.builtins["tail"](nixScope.fst),
                        )([]),
                      )),
                      () => (operators.listConcat(
                        [
                          nixScope.f(nixScope.builtins["head"](nixScope.fst))(
                            nixScope.builtins["head"](nixScope.snd),
                          ),
                        ],
                        nixScope["zipListsWith'"](
                          nixScope.builtins["tail"](nixScope.fst),
                        )(nixScope.builtins["tail"](nixScope.snd)),
                      )),
                    )),
                  )),
                )
              ))
            )),
        );
        return ((_cond) => {
          if (!_cond) {
            throw new Error(
              "assertion failed: " + "(builtins.isInt x) && (builtins.isInt y)",
            );
          }
          return nixScope.bitsToInt(
            nixScope["zipListsWith'"](nixScope.intToBits(nixScope.x))(
              nixScope.intToBits(nixScope.y),
            ),
          )(nixScope.f(nixScope.xsignum)(nixScope.ysignum));
        })(
          operators.and(
            nixScope.builtins["isInt"](nixScope.x),
            nixScope.builtins["isInt"](nixScope.y),
          ),
        );
      })
    ))
  ))
));
