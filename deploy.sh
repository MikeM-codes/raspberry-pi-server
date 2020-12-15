#!/bin/zsh

rsync -ave ssh --delete --no-perms --omit-dir-times public/ pi@67.177.189.251:/var/www/html