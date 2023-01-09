#!/usr/bin/env bash
set -eo pipefail
IFS=$'\n\t'

remote="origin"

pretty_remote="remote '$remote' ($(git remote get-url "$remote"))"

protected_branches=$(cat <<-EOM
main
master
EOM
)

remote_branches=$(git ls-remote --heads "$remote" | cut -f2 | sed -e 's/refs\/heads\///' | sort)

pr_branches=$(gh pr list --json headRefName | jq -r '.[] | .headRefName')

# Exclude those branches that both exist and have a PR, exclude branches that don't actually exist
branches_to_delete=$(comm -23 <(echo "$remote_branches" | sort) <(echo -e "$pr_branches\n$protected_branches" | sort))

[[ -z "$branches_to_delete" ]] && echo "No branches to delete" && exit 0

echo -e "This script will delete the following branches from $pretty_remote' that have no associated pull request:"
echo
echo "$branches_to_delete"
echo
read -p "Do you want to delete the branches above from $pretty_remote? [Y\n]: " -r
# Just hitting return defaults to continuing
[[ $REPLY ]] && [[ ! $REPLY =~ ^[Yy]$ ]] && echo && exit 0

echo "$branches_to_delete" | xargs git push --delete "$remote"

