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
export { expectTrace } from "./expect_trace.js"
export { tryHash, tryHashPath, tryHashConvert } from "./hash_helpers.js"
export { simpleTest } from "./simple_test.js"
export { checkExpression } from "./check_expression.js"
export { bashAssert } from "./bash_assert.js"
export {
    varTest,
    checkFilter,
    diffAndAccept,
    reportFailure,
} from "./minor_helpers.js"
export { withGitRepo, withHttpServer, withTarball } from "./fetchers.js"
export { assertBuilt, assertCacheHit, assertBuildFails, readOutput } from "./build_asserts.js"
export { runDenixBuild, runNixBuild, compareBuild } from "./run_denix_build.js"
export { withSession } from "./repl_session.js"
