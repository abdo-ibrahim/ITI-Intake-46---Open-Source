#!/bin/bash

read -p "enter a char: " ch

case "$ch" in
[A-Z])
  echo "upper Case"
  ;;
[a-z])
  echo "lower Case"
  ;;
[0-9])
  echo "number"
  ;;
"")
  echo "nothing enter"
  ;;
*)
  echo "other char"
  ;;
esac

