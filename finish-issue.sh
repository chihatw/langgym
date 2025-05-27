#!/bin/zsh
# 使い方: ./finish-issue.sh ブランチ名

branch=$1

if [ -z "$branch" ]; then
  echo "Usage: $0 branch-name"
  exit 1
fi

git checkout main &&
git pull origin main &&
git merge $branch &&
git push origin main &&
git branch -d $branch &&
git push origin --delete $branch