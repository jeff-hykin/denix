let
  finite = {
    a0 = {
      a1 = {
        a2 = {
          a3 = {
            a4 = {
              a5 = {
                a6 = {
                  a7 = {
                    a8 = {
                      a9 = "deep";
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
  };
  finiteVal = builtins.deepSeq finite finite;
in
builtins.seq finiteVal (
  builtins.genericClosure {
    startSet = [
      {
        infinite = import ../source_code/nix_lang/infinite-nesting.nix;
        finite = finiteVal;
      }
    ];
    operator = x: [ (import ../source_code/nix_lang/infinite-nesting.nix) ];
  }
)
