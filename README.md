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
