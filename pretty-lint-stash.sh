#!/usr/bin/env sh

# Get list of unstaged files
unstaged_files=$(git diff --name-only)

# Stash only unstaged files
if [ -n "$unstaged_files" ]; then
    git stash push -u -m "Temporary stash by Husky" $unstaged_files
fi

# Run the original pretty-lint script
npm run pretty-lint

# Pop the stash to restore changes
if [ -n "$unstaged_files" ]; then
    git stash pop
fi

# Check if there were conflicts
if [ $? -ne 0 ]; then
    echo "There were conflicts when popping the stash. Resolve conflicts manually."
    exit 1
fi
