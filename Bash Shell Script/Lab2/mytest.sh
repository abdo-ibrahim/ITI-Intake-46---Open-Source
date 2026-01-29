#!/bin/bash

path="$1"


if [ -f "$path" ]; then
  echo "$path is a file"
elif [ -d "$path" ]; then
  echo "$path is a directory"
else
  echo "$path does not exist"
fi


if [ -r "$path" ]; then
  echo "$path is Readable"
else
  echo "$path is not Readable"
fi


if [ -w "$path" ]; then
  echo "$path is Writable"
else
  echo "$path is not Writable"
fi


if [ -x "$path" ]; then
  echo "$path is Executable"
else
  echo "$path is not Executable"
fi

