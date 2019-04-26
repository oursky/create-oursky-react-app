#!/usr/bin/env python3
import contextlib
import json
import os
import subprocess
import sys
from collections import OrderedDict
from distutils.version import StrictVersion
from os.path import join

browserslist = [
    "last 2 chrome versions",
    "last 2 firefox versions",
    "Android >= 4.4",
    "iOS >= 9",
    "Safari >= 9",
    "IE >= 11",
]


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


@contextlib.contextmanager
def cd(dir):
    wd = os.getcwd()
    try:
        os.chdir(dir)
        yield
    finally:
        os.chdir(wd)


def ensure_react_scripts_version(pkg_json):
    # Verify react-scripts >= 3
    try:
        react_scripts = pkg_json["dependencies"]["react-scripts"]
    except KeyError:
        react_scripts = pkg_json["devDependencies"]["react-scripts"]
    except KeyError:
        print(
            "It seems that the project is not created with create-react-app",
            file=sys.stderr
        )
        sys.exit(1)
    try:
        major = StrictVersion(react_scripts).version[0]
    except ValueError:
        print(
            "Expected react-scripts to be an exact version, but it is {}".format(react_scripts),
            file=sys.stderr
        )
        sys.exit(1)
    if major < 3:
        print(
            "Expected react-scripts to be at least >=3, but it is {}".format(react_scripts),
            file=sys.stderr
        )
        sys.exit(1)


def add_scripts(pkg_json):
    scripts = pkg_json["scripts"]
    scripts["stylelint"] = \
        "stylelint --max-warnings 0 'src/**/*.{css,scss}'"
    scripts["format"] = \
        "prettier --write --list-different 'src/**/*.{js,jsx,ts,tsx,css,scss}'"
    scripts["lint"] = "eslint 'src/**/*.{js,jsx,ts,tsx}'"


def set_eslint_config(pkg_json):
    pkg_json["eslintConfig"] = {
        "extends": ["@oursky"],
    }


def set_conventional_browserlist(pkg_json):
    pkg_json["browserslist"]["production"] = browserslist


def write_bytes(path, b):
    with open(path, "wb") as f:
        f.write(b)


def write_json(path, j):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(j, f, ensure_ascii=False, indent=2)


def write_tsconfig(target_dir):
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


def install_deps(target_dir):
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


def main():
    target_dir = sys.argv[1]
    pkg = join(target_dir, "package.json")
    with open(pkg, "rb") as f:
        pkg_json = json.load(f, object_pairs_hook=OrderedDict)
    ensure_react_scripts_version(pkg_json)
    set_eslint_config(pkg_json)
    set_conventional_browserlist(pkg_json)
    add_scripts(pkg_json)
    write_json(pkg, pkg_json)
    write_bytes(join(target_dir, ".prettierrc"), prettierrc)
    write_bytes(join(target_dir, ".stylelintrc"), stylelintrc)
    write_tsconfig(target_dir)
    install_deps(target_dir)


if __name__ == "__main__":
    main()
