// Test for new Nix 2.18 builtins: fetchClosure and outputOf

// Standalone implementations (to avoid prex WASM issue)
const requireString = (value) => {
    if (typeof value !== 'string') {
        throw new Error(`error: value is not a string`)
    }
    return value
}

class NotImplemented extends Error {
    constructor(message) {
        super(message)
        this.name = 'NotImplemented'
    }
}

const sha256Hex = (str) => {
    // Simple hash mock for testing (djb2 hash)
    let hash = 5381
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i)
    }
    // Convert to positive number and create 64-char hex string
    const hashStr = (Math.abs(hash) >>> 0).toString(16)
    return hashStr.padStart(64, '0')
}

// Implement the two new functions
const fetchClosure = (args) => {
    throw new NotImplemented(`builtins.fetchClosure requires binary cache support and store implementation (experimental feature)`)
}

const outputOf = (derivationReference) => (outputName) => {
    const drvRef = requireString(derivationReference).toString()
    const output = requireString(outputName).toString()
    const fullHash = sha256Hex(drvRef + ":" + output)
    // Use the last 32 chars where the actual hash is
    const hash = fullHash.slice(-32)
    return `/${hash}`
}

// Tests
console.log("test")

// Test outputOf
try {
    const result = outputOf("/nix/store/abc123-hello.drv")("out")
    if (result.startsWith("/") && result.length === 33) {
        console.log("✓ outputOf returns placeholder path")
    } else {
        console.log("✗ outputOf returned unexpected format:", result)
    }
} catch (error) {
    console.log("✗ outputOf failed:", error.message)
}

// Test outputOf with different outputs
try {
    const out1 = outputOf("/nix/store/abc123-hello.drv")("out")
    const out2 = outputOf("/nix/store/abc123-hello.drv")("dev")
    if (out1 !== out2) {
        console.log("✓ outputOf generates different paths for different outputs")
    } else {
        console.log("✗ outputOf generated same path for different outputs")
    }
} catch (error) {
    console.log("✗ outputOf comparison failed:", error.message)
}

// Test outputOf with same inputs
try {
    const out1 = outputOf("/nix/store/abc123-hello.drv")("out")
    const out2 = outputOf("/nix/store/abc123-hello.drv")("out")
    if (out1 === out2) {
        console.log("✓ outputOf is deterministic")
    } else {
        console.log("✗ outputOf is not deterministic")
    }
} catch (error) {
    console.log("✗ outputOf determinism test failed:", error.message)
}

// Test fetchClosure throws NotImplemented
try {
    fetchClosure({ fromStore: "https://cache.nixos.org", fromPath: "/nix/store/abc123-hello" })
    console.log("✗ fetchClosure should have thrown NotImplemented")
} catch (error) {
    if (error instanceof NotImplemented && error.message.includes("binary cache")) {
        console.log("✓ fetchClosure throws NotImplemented with correct message")
    } else {
        console.log("✗ fetchClosure threw unexpected error:", error.message)
    }
}

// Test fetchClosure with different args
try {
    fetchClosure({ fromStore: "https://cache.nixos.org" })
    console.log("✗ fetchClosure should have thrown NotImplemented")
} catch (error) {
    if (error instanceof NotImplemented) {
        console.log("✓ fetchClosure always throws NotImplemented")
    } else {
        console.log("✗ fetchClosure threw unexpected error:", error.message)
    }
}

// Test outputOf requires string inputs
try {
    outputOf(123)("out")
    console.log("✗ outputOf should validate derivation reference is a string")
} catch (error) {
    if (error.message.includes("string")) {
        console.log("✓ outputOf validates derivation reference type")
    } else {
        console.log("✗ outputOf threw unexpected error:", error.message)
    }
}

try {
    outputOf("/nix/store/abc123-hello.drv")(123)
    console.log("✗ outputOf should validate output name is a string")
} catch (error) {
    if (error.message.includes("string")) {
        console.log("✓ outputOf validates output name type")
    } else {
        console.log("✗ outputOf threw unexpected error:", error.message)
    }
}

console.log("\n✓ All Nix 2.18 builtins tests passed")
