#!/bin/bash

options=""
paths=""

for arg in "$@"; do
  if [[ "$arg" == -* ]]; then
    options="$options$arg"
  else
    paths="$paths $arg"
  fi
done

if [ -z "$paths" ]; then
  paths="."
fi

ls $options $paths

