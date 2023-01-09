#!/usr/bin/env bash
set -eo pipefail
IFS=$'\n\t'

# Gives the tag if we are exactly on a tag otherwise gives the tag last reachable tag with short commit hash as suffix
tagish="$(git describe --tags --abbrev=8)"

# Drop the v prefix
echo "${tagish#v}"
