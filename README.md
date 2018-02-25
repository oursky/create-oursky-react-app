# How to use

Assume our new project, with both frontend and backend, is called "foobar"

```sh
mkdir foobar
cd foobar
git init
# the directory name "web" is just an arbitrary choice
git clone --depth=1 https://github.com/oursky/create-oursky-react-app web
rm -rf web/.git/
# setup travis for BOTH our backend and frontend
```

This repository is essentially create-react-app, so read their documentation.

Specifically, the additions to vanilla CRA can be viewed [here](https://github.com/oursky/create-react-app/commits/v1.1.1-custom)

Note that some of the additions we made (CSS Modules and SASS) are going to be included in [CRA 2.0](https://github.com/facebook/create-react-app/issues/3815), so we may not need to fork react-scripts in the future.

# What should be customized

1. Edit `.browserslistrc` to change target browsers

# What should NOT be customized

1. `.prettierrc` because we all like the philosophy of `gofmt`
2. `tsconfig.json` because the strictest settings are there already

# What may be customized

1. Edit `.stylelintrc` to allow more at-rules of SASS
2. Edit `.stylelintrc` to allow some CSS features that are not supported by target browsers

# Caveats

TSLint does not support warning-as-error in command line interface. It means that we have to make all rules error, resulting in a minor lint error prevents webpack from emitting bundle in development mode.
