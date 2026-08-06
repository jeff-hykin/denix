import {
  createRuntime,
  InterpolatedString,
} from "file:///Users/jeffhykin/repos/denix/main/runtime.js";
const {
  runtime,
  createFunc,
  createScope,
  defGetter,
  apply,
  set,
  force,
  mkThunk,
} = createRuntime();
const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1];
runtime.currentFile =
  "/Users/jeffhykin/repos/denix/tests/translation/eval_tasks_pure_setup/eval-okay-ind-string.nix";
const operators = runtime.operators;

export default /*let*/ createScope(nixScope, (nixScope) => {
  defGetter(
    nixScope,
    "s1",
    (
      nixScope,
    ) => ("This is an indented multi-line string\nliteral.  An amount of whitespace at\nthe start of each line matching the minimum\nindentation of all lines in the string\nliteral together will be removed.  Thus,\nin this case four spaces will be\nstripped from each line, even though\n  THIS LINE is indented six spaces.\n\nAlso, empty lines don't count in the\ndetermination of the indentation level (the\nprevious empty line has indentation 0, but\nit doesn't matter).\n"),
  );
  defGetter(
    nixScope,
    "s2",
    (
      nixScope,
    ) => ("If the string starts with whitespace\n  followed by a newline, it's stripped, but\n  that's not the case here. Two spaces are\n  stripped because of the \"  \" at the start. \n"),
  );
  defGetter(
    nixScope,
    "s3",
    (nixScope) => ("This line is indented\na bit further.\n  "),
  );
  defGetter(
    nixScope,
    "s4",
    (
      nixScope,
    ) => (new InterpolatedString([
      "Anti-quotations, like ",
      ", are\nalso allowed.\n",
    ], [() => (operators.ifThenElse(true, () => ("so"), () => ("not so")))])),
  );
  defGetter(
    nixScope,
    "s5",
    (
      nixScope,
    ) => (new InterpolatedString([
      "  The \\ is not special here.\n' can be followed by any character except another ', e.g. 'x'.\nLikewise for $, e.g. $$ or $varName.\nBut ' followed by ' is special, as is $ followed by {.\nIf you want them, use anti-quotations: ",
      ", ",
      ".\n",
    ], [() => ("''"), () => ("${")])),
  );
  defGetter(
    nixScope,
    "s6",
    (
      nixScope,
    ) => ("  Tabs are not interpreted as whitespace (since we can't guess\n  what tab settings are intended), so don't use them.\nThis line starts with a space and a tab, so only one\n  space will be stripped from each line.\n"),
  );
  defGetter(
    nixScope,
    "s7",
    (
      nixScope,
    ) => ("Also note that if the last line (just before the closing ' ')\nconsists only of whitespace, it's ignored.  But here there is\nsome non-whitespace stuff, so the line isn't removed. "),
  );
  defGetter(
    nixScope,
    "s8",
    (
      nixScope,
    ) => (new InterpolatedString([
      "",
      "\nThis shows a hacky way to preserve an empty line after the start.\nBut there's no reason to do so: you could just repeat the empty\nline.\n",
    ], [() => ("")])),
  );
  defGetter(
    nixScope,
    "s9",
    (
      nixScope,
    ) => (new InterpolatedString([
      "",
      "  Similarly you can force an indentation level,\n  in this case to 2 spaces.  This works because the anti-quote\n  is significant (not whitespace).\n",
    ], [() => ("")])),
  );
  defGetter(nixScope, "s10", (nixScope) => ("  "));
  defGetter(nixScope, "s11", (nixScope) => (""));
  defGetter(nixScope, "s12", (nixScope) => ("   "));
  defGetter(
    nixScope,
    "s13",
    (
      nixScope,
    ) => (new InterpolatedString([
      "start on network-interfaces\n\nstart script\n\n  rm -f /var/run/opengl-driver\n  ",
      "\n\n  rm -f /var/log/slim.log\n   \nend script\n\nenv SLIM_CFGFILE=",
      "\nenv SLIM_THEMESDIR=",
      "\nenv FONTCONFIG_FILE=/etc/fonts/fonts.conf  \t\t\t\t# !!! cleanup\nenv XKB_BINDIR=",
      "/bin         \t\t\t\t# Needed for the Xkb extension.\nenv LD_LIBRARY_PATH=",
      "/lib:",
      "/lib:/usr/lib/          # related to xorg-sys-opengl - needed to load libglx for (AI)GLX support (for compiz)\n\n",
      " \n\nexec ",
      "/bin/slim\n",
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
  defGetter(
    nixScope,
    "s14",
    (
      nixScope,
    ) => ("Escaping of ' followed by ': ''\nEscaping of $ followed by {: ${\nAnd finally to interpret \\n etc. as in a string: \n, \r, \t.\n"),
  );
  defGetter(
    nixScope,
    "s15",
    (nixScope) => (/*let*/ createScope(nixScope, (nixScope) => {
      defGetter(nixScope, "x", (nixScope) => ("bla"));
      return (new InterpolatedString(["foo\n'", "'\nbar\n"], [
        () => (nixScope.x),
      ]));
    })),
  );
  defGetter(nixScope, "s16", (nixScope) => ("cut -d $'\\t' -f 1\n"));
  defGetter(
    nixScope,
    "s17",
    (nixScope) => (operators.add(operators.add("ending dollar $", "$"), "\n")),
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
