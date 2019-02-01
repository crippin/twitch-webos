#!/usr/bin/env bash
export PATH=${PATH}:${LG_WEBOS_TV_SDK_HOME}/CLI/bin/
echo "Clean"
rm -rf build
mkdir build
cp index.html build/
cp bundle.js build/
cp appinfo.json build/
cp -r resource build/
ares-package -o build build
