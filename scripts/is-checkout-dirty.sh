#!/usr/bin/env bash
# Gives us a non-zero exit code if there are tracked or untracked changes in the working
# directory
stat=$(git status --porcelain)
export stat
[[ -z "$stat" ]] || (echo "Dirty checkout:" && git --no-pager diff)
