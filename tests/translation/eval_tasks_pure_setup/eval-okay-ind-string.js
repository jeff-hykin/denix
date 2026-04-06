import { createRuntime } from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const { runtime, createFunc, createScope, defGetter } = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile = import.meta.url.startsWith("file://")
  ? import.meta.url.slice(7)
  : new URL(import.meta.url).pathname;
const operators = runtime.operators;

export default /*let*/ createScope((nixScope) => {
  defGetter(nixScope, "s1", (nixScope) => `
    This is an indented multi-line string
    literal.  An amount of whitespace at
    the start of each line matching the minimum
    indentation of all lines in the string
    literal together will be removed.  Thus,
    in this case four spaces will be
    stripped from each line, even though
      THIS LINE is indented six spaces.

    Also, empty lines don't count in the
    determination of the indentation level (the
    previous empty line has indentation 0, but
    it doesn't matter).
  `);
  defGetter(
    nixScope,
    "s2",
    (nixScope) =>
      `  If the string starts with whitespace
    followed by a newline, it's stripped, but
    that's not the case here. Two spaces are
    stripped because of the "  " at the start. 
  `,
  );
  defGetter(nixScope, "s3", (nixScope) => `
      This line is indented
      a bit further.
        `);
  defGetter(
    nixScope,
    "s4",
    (
      nixScope,
    ) => (new InterpolatedString([
      "\n    Anti-quotations, like ",
      ", are\n    also allowed.\n  ",
    ], [() => (operators.ifThenElse(true, () => ("so"), () => ("not so")))])),
  );
  defGetter(
    nixScope,
    "s5",
    (
      nixScope,
    ) => (new InterpolatedString([
      "\n      The \\ is not special here.\n    ' can be followed by any character except another ', e.g. 'x'.\n    Likewise for $, e.g. $$ or $varName.\n    But ' followed by ' is special, as is $ followed by {.\n    If you want them, use anti-quotations: ",
      ", ",
      ".\n  ",
    ], [() => ("''"), () => ("$")])),
  );
  defGetter(nixScope, "s6", (nixScope) =>
    `  
    Tabs are not interpreted as whitespace (since we can't guess
    what tab settings are intended), so don't use them.
 	This line starts with a space and a tab, so only one
    space will be stripped from each line.
  `);
  defGetter(nixScope, "s7", (nixScope) => `
    Also note that if the last line (just before the closing ' ')
    consists only of whitespace, it's ignored.  But here there is
    some non-whitespace stuff, so the line isn't removed. `);
  defGetter(
    nixScope,
    "s8",
    (
      nixScope,
    ) => (new InterpolatedString([
      "    ",
      "\n    This shows a hacky way to preserve an empty line after the start.\n    But there's no reason to do so: you could just repeat the empty\n    line.\n  ",
    ], [() => ("")])),
  );
  defGetter(
    nixScope,
    "s9",
    (
      nixScope,
    ) => (new InterpolatedString([
      "\n  ",
      "  Similarly you can force an indentation level,\n    in this case to 2 spaces.  This works because the anti-quote\n    is significant (not whitespace).\n  ",
    ], [() => ("")])),
  );
  defGetter(nixScope, "s10", (nixScope) => `
  `);
  defGetter(nixScope, "s11", (nixScope) => `''`);
  defGetter(nixScope, "s12", (nixScope) => `   `);
  defGetter(
    nixScope,
    "s13",
    (
      nixScope,
    ) => (new InterpolatedString([
      "\n    start on network-interfaces\n\n    start script\n    \n      rm -f /var/run/opengl-driver\n      ",
      "\n\n      rm -f /var/log/slim.log\n       \n    end script\n\n    env SLIM_CFGFILE=",
      "\n    env SLIM_THEMESDIR=",
      "\n    env FONTCONFIG_FILE=/etc/fonts/fonts.conf  \t\t\t\t# !!! cleanup\n    env XKB_BINDIR=",
      "/bin         \t\t\t\t# Needed for the Xkb extension.\n    env LD_LIBRARY_PATH=",
      "/lib:",
      "/lib:/usr/lib/          # related to xorg-sys-opengl - needed to load libglx for (AI)GLX support (for compiz)\n\n    ",
      " \n\n    exec ",
      "/bin/slim\n  ",
    ], [
      () => (operators.ifThenElse(
        true,
        () => ("ln -sf 123 /var/run/opengl-driver"),
        () => (operators.ifThenElse(
          true,
          () => ("ln -sf 456 /var/run/opengl-driver"),
          () => (""),
        )),
      )),
      () => ("abc"),
      () => ("def"),
      () => ("foo"),
      () => ("libX11"),
      () => ("libXext"),
      () => (operators.ifThenElse(
        true,
        () => (new InterpolatedString([
          "env XORG_DRI_DRIVER_PATH=",
          "/X11R6/lib/modules/drivers/",
        ], [() => ("nvidiaDrivers")])),
        () => (operators.ifThenElse(
          true,
          () => (new InterpolatedString([
            "env XORG_DRI_DRIVER_PATH=",
            "/lib/modules/dri",
          ], [() => ("mesa")])),
          () => (""),
        )),
      )),
      () => ("slim"),
    ])),
  );
  defGetter(nixScope, "s14", (nixScope) => `
    Escaping of ' followed by ': `);
  defGetter(nixScope, "s15", (nixScope) =>
    /*let*/ createScope((nixScope) => {
      nixScope.x = "bla";
      return (new InterpolatedString(["\n    foo\n    '", "'\n    bar\n  "], [
        () => (nixScope.x),
      ]));
    }));
  defGetter(nixScope, "s16", (nixScope) => `
    cut -d $'\\t' -f 1
  `);
  defGetter(
    nixScope,
    "s17",
    (nixScope) => operators.add(operators.add(`ending dollar $`, `$`), ""),
  );
  return operators.add(
    operators.add(
      operators.add(
        operators.add(
          operators.add(
            operators.add(
              operators.add(
                operators.add(
                  operators.add(
                    operators.add(
                      operators.add(
                        operators.add(
                          operators.add(
                            operators.add(
                              operators.add(
                                operators.add(nixScope.s1, nixScope.s2),
                                nixScope.s3,
                              ),
                              nixScope.s4,
                            ),
                            nixScope.s5,
                          ),
                          nixScope.s6,
                        ),
                        nixScope.s7,
                      ),
                      nixScope.s8,
                    ),
                    nixScope.s9,
                  ),
                  nixScope.s10,
                ),
                nixScope.s11,
              ),
              nixScope.s12,
            ),
            nixScope.s13,
          ),
          nixScope.s14,
        ),
        nixScope.s15,
      ),
      nixScope.s16,
    ),
    nixScope.s17,
  );
});
