#!/bin/bash

mailfile="/var/mail/$USER"

echo "wait 10 seconds to chkmail"

while true
do
  if [ -s "$mailfile" ]; then
    echo "you recevied a new mail"
  else
    echo "no mail"
  fi

  sleep 10
done

