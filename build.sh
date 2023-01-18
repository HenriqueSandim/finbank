#!/usr/bin/env bash
# exit on error
set -o errexit
sudo apt install wget
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
sudo apt-get install -f
yarn 
yarn build
yarn typeorm migration:run -d dist/src/data-source