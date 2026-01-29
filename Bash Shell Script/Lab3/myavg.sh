#!/bin/bash

read -p "how many numbers? " n

sum=0

for ((i=0; i<n; i++))
do
  read -p "enter number $i: " arr[i]
  sum=$((sum + arr[i]))
done

avg=$(echo "$sum / $n" | bc -l)

echo "avg = $avg"

