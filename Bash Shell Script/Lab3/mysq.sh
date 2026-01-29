#!/bin/bash

mysq() {
  echo $(( $1 * $1 ))
}

read -p "enter number: " num
mysq "$num"

