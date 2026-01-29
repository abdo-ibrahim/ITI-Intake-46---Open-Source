#!/bin/bash
shopt -s extglob

read -p "enter string: " str

case "$str" in
"")
  echo "nothing entered"
  ;;
+([A-Z]))
  echo "upper cases"
  ;;
+([a-z]))
  echo "lower cases"
  ;;
+([0-9]))
  echo "numbers"
  ;;
*)
  echo "mix"
  ;;
esac

