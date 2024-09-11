#!/usr/bin/env sh

# Stash unselected changes
git stash push -k -u -m "Temporary stash by Husky"

# Run the original pretty-lint script
npm run pretty-lint

# Pop the stash to restore changes
git stash pop

# Check if there were conflicts
if [ $? -ne 0 ]; then
    echo "There were conflicts when popping the stash. Resolve conflicts manually."
    exit 1
fi
