#!/usr/bin/env -S deno run --allow-all
// all four cases from eval-okay-eq-derivations.nix
import { expectSuccess } from "../shared_tooling/index.js"

await expectSuccess({
    expr: `let drvA1 = derivation { name = "a"; builder = "/foo"; system = "i686-linux"; }; drvA2 = derivation { name = "a"; builder = "/foo"; system = "i686-linux"; }; drvA3 = derivation { name = "a"; builder = "/foo"; system = "i686-linux"; } // { dummy = 1; }; drvC1 = derivation { name = "c"; builder = "/foo"; system = "i686-linux"; }; drvC2 = derivation { name = "c"; builder = "/bar"; system = "i686-linux"; }; in [ (drvA1 == drvA1) (drvA1 == drvA2) (drvA1 == drvA3) (drvC1 == drvC2) ]`,
    pattern: /^\[\s*true\s*,\s*true\s*,\s*true\s*,\s*false\s*\]$/,
    label: "eq-derivations all four cases",
})
