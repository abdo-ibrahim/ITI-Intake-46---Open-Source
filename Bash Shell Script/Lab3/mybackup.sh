#!/bin/bash

mkdir -p "$HOME/backup"

for file in "$HOME"/*
do
  if [ -f "$file" ]; then
    cp "$file" "$HOME/backup"
  fi
done

echo "backup done"

