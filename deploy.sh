#!/bin/zsh

HOST=raspi

rsync -azP --delete public/ $HOST:/var/www/petersson