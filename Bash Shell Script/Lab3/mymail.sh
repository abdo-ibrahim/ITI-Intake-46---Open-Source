#!/bin/bash

letter="letter"

for user in $(cut -d: -f1 /etc/passwd)
do
  mail -s "system message" "$user" < "$letter"
done

echo "mail sent"

