#!/bin/bash

# Copies the theme to /usr/share/lightdm-webkit/themes directory.
# Run this script as super user!

# Recreate the theme directory.
sudo rm -rf /usr/share/lightdm-webkit/themes/girizgah
sudo mkdir -p /usr/share/lightdm-webkit/themes/girizgah

# Copy only necessary files/folders to the theme directory.
sudo cp -r index.html index.theme dist LICENSE /usr/share/lightdm-webkit/themes/girizgah
sudo mkdir /usr/share/lightdm-webkit/themes/girizgah/src
sudo cp -r src/font src/img /usr/share/lightdm-webkit/themes/girizgah/src

# Launch webkit-greeter.
lightdm-webkit2-greeter