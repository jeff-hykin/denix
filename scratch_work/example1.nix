# blah start comment
/* other kinda comment */
{
    a ? 10,
}:
let 
    thingy = { x=50;};
    permittedInsecurePackages = [
        "linux-4.13.16"
        "openssl-1.0.2u"
    ];
in
    {
        __id_static="0.9965333620239523";__id_dynamic=builtins.hashFile "sha256" /Users/jeffhykin/repos/snowball/random.ignore;
        a.b = (200 + 100 / 100) - 55;
        inherit thingy;
        inherit (thingy) x;
        c = {}@thing: 
          if a.a then b else c
        ;
        "${''something''}" = 777;
        thing88 = with thingy; [ x ];
        allowUnfree = true;
        thing2 = 99.2;
        thing3 = null;
        nixpkgs.config.permittedInsecurePackages = permittedInsecurePackages;
        permittedInsecurePackages = permittedInsecurePackages;
        function = a : 10;
        function2 = {a, b, c}@thing: 10;
    }

# blah