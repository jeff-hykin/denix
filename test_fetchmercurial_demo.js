#!/usr/bin/env -S deno run --allow-all
/**
 * Demo script showing fetchMercurial working in the Denix runtime
 * Run: deno run --allow-all test_fetchmercurial_demo.js
 */

import { builtins } from "./main/runtime.js";

console.log("🚀 Testing builtins.fetchMercurial implementation\n");

try {
    console.log("1️⃣ Fetching Mercurial hello world repository...");
    const result = await builtins.fetchMercurial({
        url: "https://www.mercurial-scm.org/repo/hello",
        name: "hello-demo",
    });

    console.log("✅ Success! Repository fetched to:", result.toString());
    console.log("\n📊 Metadata:");
    console.log("   - Full revision:", result.rev);
    console.log("   - Short revision:", result.shortRev);
    console.log("   - Revision count:", result.revCount.toString());
    console.log("   - Last modified:", new Date(Number(result.lastModified) * 1000).toISOString());
    console.log("   - NAR hash:", result.narHash);
    console.log("   - Branch:", result.branch);

    console.log("\n2️⃣ Testing fetchTree integration...");
    const treeResult = await builtins.fetchTree({
        type: "mercurial",
        url: "https://www.mercurial-scm.org/repo/hello",
        name: "hello-fetchtree",
    });

    console.log("✅ fetchTree works! Path:", treeResult.outPath);

    console.log("\n3️⃣ Testing specific revision fetch...");
    const revResult = await builtins.fetchMercurial({
        url: "https://www.mercurial-scm.org/repo/hello",
        rev: "82e55d328c8ca4ee16520036c0aaace03a5beb65",
    });

    console.log("✅ Specific revision fetched:", revResult.shortRev);

    console.log("\n🎉 All tests passed! fetchMercurial is fully functional.\n");

} catch (error) {
    console.error("❌ Error:", error.message);
    console.error(error.stack);
    Deno.exit(1);
}
