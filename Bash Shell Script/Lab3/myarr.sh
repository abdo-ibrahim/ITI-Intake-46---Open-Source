#!/bin/bash

read -p "how many elements? " n

for ((i=0; i<n; i++))
do
  read -p "enter element $i: " arr[i]
done

echo "your array:"
for ((i=0; i<n; i++))
do
  echo "${arr[i]}"
done

