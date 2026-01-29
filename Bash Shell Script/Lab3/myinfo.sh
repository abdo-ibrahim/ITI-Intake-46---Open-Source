#!/bin/bash


echo -n "Enter your login name: "
read user


home_dir=$(eval echo ~$user)
echo "Files in $home_dir:"
ls -l "$home_dir"


cp -r "$home_dir"/* /tmp 2>/dev/null


echo "processes for user $user:"
ps -u "$user"

