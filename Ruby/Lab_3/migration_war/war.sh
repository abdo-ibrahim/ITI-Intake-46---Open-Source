#!/bin/bash

TABLE="posts"
COL="Alaa_anwar"   # change this to whatever you want to test
NEW_COL="${COL}_robaa"

MIGRATION_NAME="rename_${COL}_to_${NEW_COL}"

echo "Creating migration: $MIGRATION_NAME"

# generate migration
rails generate migration "$MIGRATION_NAME"

# get the generated file
FILE=$(ls -t db/migrate/*_"$MIGRATION_NAME".rb | head -n 1)

# build class name (CamelCase)
CLASS_NAME=$(echo "$MIGRATION_NAME" | sed -r 's/(^|_)([a-z])/\U\2/g')

echo "Writing migration to $FILE"

# write migration محتوى
cat > "$FILE" <<EOF
class $CLASS_NAME < ActiveRecord::Migration[7.0]
  def change
    rename_column :$TABLE, :$COL, :$NEW_COL
  end
end
EOF

# run migration
echo "Running migration..."
rails db:migrate

# commit + push
echo "Committing..."
git add .
git commit -m "rename column $COL to $NEW_COL"

echo "Pulling latest..."
git pull --rebase

echo "Pushing..."
git push

echo "✅ Done"