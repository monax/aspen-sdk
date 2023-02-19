#!/usr/bin/env bash
set -eo pipefail
IFS=$'\n\t'

# This is script creates a new commit in the provided repo, repeatedly amending the previous commit if it is a
# machine commit identified by the containing the prefix below in the commit message

MAGIC_COMMIT_PREFIX="__machine_sync_commit__"
REPO_DIR="$1"

pushd "$REPO_DIR"
last_commit_msg=$(git show-branch --no-name HEAD)
if [[ $last_commit_msg = ${MAGIC_COMMIT_PREFIX}* ]]; then
  git commit --amend -asm "$last_commit_msg."
else
  git commit -asm "$MAGIC_COMMIT_PREFIX"
fi
popd




