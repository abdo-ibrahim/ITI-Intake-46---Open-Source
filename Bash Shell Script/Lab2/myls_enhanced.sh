#!/bin/bash

opt="$1"
arg="$2"

if [ "$opt" = "-l" ]; then
  ls -l
  exit 0
fi

if [ "$opt" = "-a" ]; then
  ls -a
  exit 0
fi

if [ "$opt" = "-d" ]; then
  if [ -d "$arg" ]; then
    ls -d "$arg"
    exit 0
fi

if [ "$opt" = "-i" ]; then
  ls -i
  exit 0
fi

if [ "$opt" = "-R" ]; then
  ls -R
  exit 0
fi

ls "$opt"

