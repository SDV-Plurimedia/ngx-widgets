#!/bin/bash

# if anything in the site/ subdirectory changed in the prior commit,
# push that directory to gh-pages for auto generation.
git diff-tree -r --name-only --no-commit-id develop | grep '^documentation/dist/' &> /dev/null
if [ $? == 0 ]; then
  git push origin `git subtree split --prefix documentation/dist develop 2> /dev/null`:gh-pages --force
  echo "La documentation a ete mis à jour"
else
  echo "Pas de changement dans la doc"
fi
