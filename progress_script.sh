#!/bin/sh

REPLACEMENT=$(awk -F'\"' '/ts_[0-9][0-9][0-9]",/{ print $0 }' .progress)
FIND='\"version\": \".*\",'

find .progress -exec sed -i.BAK "s/unanswered/12321/" {} +
find .progress -exec sed -i.BAK "s/${FIND}/${REPLACEMENT}/" {} +
find . -path ./node_modules -prune -false -o -type f -name '.progress.BAK' -exec rm -f {} +

firstUnansweredTask=12

read -p "What is your answer to task ${firstUnansweredTask}? " answer

echo You answered "$answer"
