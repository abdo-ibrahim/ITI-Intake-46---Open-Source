#!/bin/bash

last=${!#}
if [ -d "$last" ]; then
  for f in "$@";
  do
    if [ "$f" != "$last" ]; then
      cp "$f" "$last"
    fi
  done
else
  cp "$1" "$2"
fi
