import contextlib
import json
import os
import subprocess
import sys
from collections import OrderedDict
from os.path import join

browserslistrc = b"""\
last 3 versions
Android >= 4.4
iOS >= 8
Safari >= 8
IE >= 9
not OperaMini all
"""

prettierrc = b"""\
{
  "trailingComma": "es5"
}
"""

stylelintrc = b"""\
{
  "extends": "stylelint-config-recommended",
  "plugins": [
    "stylelint-no-unsupported-browser-features"
  ],
  "defaultSeverity": "warning",
  "rules": {
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": ["mixin", "include", "content", "if", "else"]
    }],
    "plugin/no-unsupported-browser-features": [true, {
      "ignore": ["viewport-units", "flexbox", "css3-cursors", "outline"]
    }]
  }
}
"""

eslintrc = b"""\
{
  "extends": ["@oursky"]
}
"""


@contextlib.contextmanager
def cd(dir):
    wd = os.getcwd()
    try:
        os.chdir(dir)
        yield
    finally:
        os.chdir(wd)


def main():
    target_dir = sys.argv[1]

    pkg = join(target_dir, "package.json")
    with open(pkg, "rb") as f:
        pkg_json = json.load(f, object_pairs_hook=OrderedDict)
        # Remove "eslintConfig" and "browserslist" from package.json
        try:
            del pkg_json["eslintConfig"]
        except KeyError:
            pass
        try:
            del pkg_json["browserslist"]
        except KeyError:
            pass
        # Add stylelint format
        scripts = pkg_json["scripts"]
        scripts["stylelint"] = \
            "stylelint --max-warnings 0 'src/**/*.{css,scss}'"
        scripts["format"] = \
            "prettier --write --list-different 'src/**/*.{js,jsx,ts,tsx,css,scss}'"
        scripts["lint"] = "eslint 'src/**/*.{js,jsx,ts,tsx}'"

    # Write changes to package.json
    with open(pkg, "w", encoding="utf-8") as f:
        json.dump(pkg_json, f, ensure_ascii=False, indent=2)

    # Write .browserslistrc
    with open(join(target_dir, ".browserslistrc"), "wb") as f:
        f.write(browserslistrc)

    # Write .prettierrc
    with open(join(target_dir, ".prettierrc"), "wb") as f:
        f.write(prettierrc)

    # Write .stylelintrc
    with open(join(target_dir, ".stylelintrc"), "wb") as f:
        f.write(stylelintrc)

    # Write .eslintrc
    with open(join(target_dir, ".eslintrc"), "wb") as f:
        f.write(eslintrc)

    # Write tsconfig.json
    try:
        with open(join(target_dir, "tsconfig.json"), "rb") as f:
            tsconfig_json = json.load(f, object_pairs_hook=OrderedDict)
            options = tsconfig_json["compilerOptions"]
            options["lib"] = ["DOM", "ES5", "ES2015.Promise"]
            options["noFallthroughCasesInSwitch"] = True
            options["noImplicitReturns"] = True
            options["noUnusedLocals"] = True
            options["noUnusedParameters"] = True
    except IOError:
        print(
            "You probably did not initialize your react app with --typescript",
            file=sys.stderr
        )
        sys.exit(1)
    with open(join(target_dir, "tsconfig.json"), "w", encoding="utf-8") as f:
        json.dump(tsconfig_json, f, ensure_ascii=False, indent=2)

    # Install node-sass prettier stylelint eslint
    with cd(target_dir):
        subprocess.run([
            "yarn",
            "add",
            "--dev",
            "--exact",
            "node-sass",
            "prettier",
            "stylelint",
            "stylelint-config-recommended",
            "stylelint-no-unsupported-browser-features",
            "eslint",
            "eslint-config-prettier",
            "eslint-plugin-react",
            "eslint-plugin-react-hooks",
            "eslint-plugin-react-native",
            "@typescript-eslint/eslint-plugin",
            "@typescript-eslint/parser",
            "@oursky/eslint-config",
        ])


if __name__ == "__main__":
    main()
