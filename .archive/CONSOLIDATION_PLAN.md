# Codebase Consolidation Plan - Coach Agent Session

## Current State Assessment (2026-02-11)

**Overall Health**: 9/10 ✅
- Translator working (41/41 tests passing)
- Clean dependency graph (no circular deps)
- Good separation of concerns
- Previous cleanup sessions did excellent work

---

## Critical Finding: Documentation Bloat

### Problem
**4 markdown files** contain overlapping/redundant information:

1. **SIMPLIFICATIONS.md** (227 lines) - Historical cleanup reports from 4 sessions
2. **CLEANUP_AUDIT.md** (299 lines) - Detailed audit report
3. **ARCHITECTURE.md** (172 lines) - Architecture overview with some cleanup recommendations
4. **prompt.md** (645 lines) - Implementation roadmap + status

### Redundancy Analysis

**SIMPLIFICATIONS.md** vs **CLEANUP_AUDIT.md**:
- Both document cleanup history
- Both list removed files (5 files)
- Both describe dead code removal
- CLEANUP_AUDIT.md has more recent analysis
- SIMPLIFICATIONS.md has session-by-session history

**ARCHITECTURE.md** overlap:
- Contains simplification recommendations that duplicate SIMPLIFICATIONS.md
- Has architecture info that should be in README.md
- Mixes "what is" with "what should be changed"

**prompt.md** overlap:
- Contains current status that duplicates CLEANUP_AUDIT.md
- Has architecture notes that duplicate ARCHITECTURE.md
- Mixes implementation tasks with historical context

### Recommendation: Consolidate to 2 Files

**Keep**:
1. **README.md** - User-facing project overview + quick start + architecture
2. **DEVELOPMENT.md** (NEW) - Developer guide with:
   - What remains to be done (from prompt.md)
   - Known issues and simplification opportunities (from ARCHITECTURE.md)
   - How to run tests and contribute

**Archive** (move to `.claude/history/` or delete):
1. SIMPLIFICATIONS.md - Historical, not actionable
2. CLEANUP_AUDIT.md - Historical, not actionable
3. ARCHITECTURE.md - Content merged into README.md
4. prompt.md - Content split between README.md and DEVELOPMENT.md

---

## Proposed File Structure

```
denix/
├── README.md                  # User-facing: what it is, how to use
├── DEVELOPMENT.md             # Developer-facing: what's left, how to contribute
├── translator.js              # Main translator (keep as-is)
├── main/
│   ├── runtime.js             # 102 builtins (known issue: too large)
│   ├── import_*.js            # Import system (3 files, clean)
│   ├── fetcher.js, tar.js, nar_hash.js, store_manager.js, registry.js
│   └── tests/                 # 39 test files (well-organized)
├── tools/
│   ├── hashing.js, sha1.js, sha_helpers.js, md5.js  # Hash implementations
│   ├── import_resolver.js     # Path resolution
│   └── store_path.js          # Store path computation
└── test.sh                    # Smart test runner
```

---

## Action Items

### Priority 1: Consolidate Documentation (1 hour)

1. **Create DEVELOPMENT.md** from prompt.md:
   - Section 1: What's NOT Done (from prompt.md + CLEANUP_AUDIT.md)
   - Section 2: Known Issues (from ARCHITECTURE.md)
   - Section 3: How to Test (from prompt.md)
   - Section 4: How to Contribute

2. **Enhance README.md**:
   - Add architecture section (from ARCHITECTURE.md)
   - Keep it user-focused (how to use, not how to develop)

3. **Archive historical docs**:
   ```bash
   mkdir -p .claude/history
   mv SIMPLIFICATIONS.md .claude/history/
   mv CLEANUP_AUDIT.md .claude/history/
   mv ARCHITECTURE.md .claude/history/
   mv prompt.md .claude/history/
   ```

### Priority 2: NO CODE CHANGES NEEDED ✅

The codebase is functionally excellent. Previous cleanup sessions removed:
- 5 dead files
- ~510 lines of dead code
- 6 unused exports

Current state:
- ✅ No circular dependencies
- ✅ Clean imports
- ✅ Good test coverage (538+ tests)
- ✅ No duplicate code
- ✅ Proper separation of concerns

### Priority 3: Future Simplifications (OPTIONAL, documented for next bot)

These are **already documented** in current files and should be preserved in DEVELOPMENT.md:

1. **Split runtime.js** (4-6 hours) - Known issue, low priority
2. **Use Deno crypto** (2-3 hours) - Would remove ~1,600 lines of hash code
3. **Merge store files** (1 hour) - Low value

---

## Validation Checklist

Before making changes:
- ✅ Scanned all 54 source files
- ✅ Analyzed dependency graph
- ✅ Verified test status (41/41 translator tests passing)
- ✅ Confirmed no dead code beyond what's documented
- ✅ Identified only documentation redundancy

After making changes:
- [ ] All tests still passing
- [ ] README.md has complete architecture section
- [ ] DEVELOPMENT.md has all actionable information
- [ ] Historical files archived or removed
- [ ] No functional changes to code

---

## Summary

**What to change**: Documentation structure (4 files → 2 files)
**What NOT to change**: Code (already excellent after previous cleanup)
**Estimated time**: 1 hour
**Risk**: VERY LOW (documentation only)
**Benefit**: Clearer information architecture, easier onboarding
