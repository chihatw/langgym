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
# リモートブランチを削除する前に、存在を確認する
if git show-ref --verify --quiet refs/remotes/origin/$branch; then
  echo "Deleting remote branch $branch..."
  git push origin --delete $branch
else
  echo "Remote branch $branch does not exist, skipping deletion."
fi