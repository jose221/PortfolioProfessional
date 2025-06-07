#!/bin/bash

# This script fixes the import paths for renderComponent in all React components

# Find all JavaScript files in the resources/js/components directory
find resources/js/components -type f -name "*.js" | while read -r file; do
  # Skip files that don't import renderComponent
  if ! grep -q "import renderComponent from '../../../utils/renderComponent'" "$file"; then
    continue
  fi

  # Fix the import path
  sed -i '' 's/import renderComponent from '\''..\/..\/..\/utils\/renderComponent'\'';/import renderComponent from '\''..\/..\/utils\/renderComponent'\'';/g' "$file"

  echo "Fixed import path in $file"
done

echo "All import paths have been fixed"
