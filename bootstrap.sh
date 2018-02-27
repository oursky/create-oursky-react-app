#!/bin/sh
set -eu

program_name="$0"
project_directory="$1"

error_missing_executable() {
  2>&1 printf 'It seems that you do not have %s installed. Try install it with\n\n\tbrew install %s\n' "$1" "$1"
  exit 1
}

if [ "$#" -ne 1 ]; then
  2>&1 printf 'usage: %s <project-directory>\nexmaple: %s foobar\n' "$program_name" "$program_name"
  exit 1
fi

# Check whether yarn is available
if ! [ -x "$(command -v yarn)" ]; then
  error_missing_executable 'yarn'
fi

# Check whether git is available
if ! [ -x "$(command -v git)" ]; then
  error_missing_executable 'git'
fi

# Check project_directory does not exist
if [ -e "$project_directory" ]; then
  2>&1 printf '%s already exists. Try another directory name\n' "$project_directory"
  exit 1
fi

1>/dev/null 2>&1 git clone \
  --depth=1 \
  https://github.com/oursky/create-oursky-react-app \
  "$project_directory" \
&& rm -rf "$project_directory/.git" \
&& rm -f "$project_directory/bootstrap.sh" \
&& cd "$project_directory" \
&& 1>/dev/null 2>&1 yarn \
&& printf 'Now you can run the following command to start dev server\n\n\tcd %s && yarn start\n\nRemember to read README.md\n' "$project_directory"
