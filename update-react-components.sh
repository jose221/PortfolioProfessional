#!/bin/bash

# This script updates all React components to use the new createRoot API instead of ReactDOM.render

# Find all JavaScript files in the resources/js/components directory
find resources/js/components -type f -name "*.js" | while read -r file; do
  # Skip files that have already been updated
  if grep -q "renderComponent" "$file"; then
    echo "Skipping $file (already updated)"
    continue
  fi

  # Determine the correct import path based on the file's depth
  if [[ "$file" == *"/"*"/"*"/"* ]]; then
    # For files in subdirectories (e.g., resources/js/components/vitae/ListVitaeComponent.js)
    sed -i '' 's/import ReactDOM from '\''react-dom'\'';/import renderComponent from '\''..\/..\/utils\/renderComponent'\'';/g' "$file"
  else
    # For files directly in the components directory (e.g., resources/js/components/Example.js)
    sed -i '' 's/import ReactDOM from '\''react-dom'\'';/import renderComponent from '\''..\/..\/utils\/renderComponent'\'';/g' "$file"
  fi

  # Update ReactDOM.render calls with the pattern: ReactDOM.render(<Component {...props} />, container);
  sed -i '' 's/ReactDOM\.render(<\([A-Za-z]*\) {\.\.\.props} \/>, \([A-Za-z_]*\));/renderComponent(\1, \2, props);/g' "$file"
  sed -i '' 's/ReactDOM\.render(<\([A-Za-z]*\) {\.\.\.propsContainer\.dataset} \/>, \([A-Za-z_]*\));/renderComponent(\1, \2, propsContainer.dataset);/g' "$file"
  sed -i '' 's/ReactDOM\.render(<\([A-Za-z]*\) \/>, \([A-Za-z_]*\));/renderComponent(\1, \2);/g' "$file"

  echo "Updated $file"
done

echo "All components have been updated to use the createRoot API"
