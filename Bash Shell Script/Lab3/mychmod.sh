#!/bin/bash

for item in ~/*
do
  chmod +x "$item"
done

echo "execute done"

