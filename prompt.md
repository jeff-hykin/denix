# Denix Development Priorities
**Last Updated:** 2026-02-10

---

## 🚨 CRITICAL RULES - READ FIRST

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.**

**Before executing what is below, please filter out any achievements. Only keep remaining/unsolved tasks in this document. Add detail to each task if its needed.**

### WORK ORDER (MUST FOLLOW THIS SEQUENCE):
1. **Runtime first** - Finish ALL network fetchers and store functions in runtime.js
2. **Translator second** - Only after runtime is 100% complete
3. **nix-lib tests last** - Only after translator is fully implemented

**Do not skip ahead. Do not work out of order.**

- Start using `convertToJs` from `translate.js` to convert Nix to JavaScript. Start with simple nix code from the nix library (available in tests)