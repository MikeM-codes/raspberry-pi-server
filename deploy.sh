#!/bin/zsh

HOST=pi@67.177.189.251

rsync -azP --delete public/ $HOST:/var/www/dev.embrycode.com