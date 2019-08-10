#!/bin/bash

pip3 install selenium
curl -L https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-linux64.tar.gz | tar zx

export PATH=$PATH:`pwd`
python3 tools/get.py
find CLI/bin -type f -exec chmod +x {} \;
