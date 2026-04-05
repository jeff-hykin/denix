// index.js — re-exports of the shared_tooling surface used by
// individual tests under eval_tasks_complex/<category>/*.js.

export { runNix, nixAvailable } from "./run_nix.js"
export { runDenix } from "./run_denix.js"
export {
    AssertionError,
    assertBothMatch,
    formatResult,
    printFailure,
    stderrMatches,
    stdoutMatches,
} from "./compare.js"
export {
    checkConfigOutput,
    checkConfigError,
    evalConfig,
    globalErrorLogCheck,
} from "./check_config.js"
export {
    expectEqual,
    expectFailure,
    expectStorePath,
    expectSuccess,
} from "./expectations.js"
export {
    SOURCE_CODE_ROOT,
    fixtureRootOf,
    resolveFixture,
} from "./fixtures.js"
export { withTempStore, withTempTree } from "./temp_store.js"
