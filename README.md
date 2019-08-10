# twitch-webos
[![Build Status](https://travis-ci.org/crippin/twitch-webos.svg?branch=master)](https://travis-ci.org/crippin/twitch-webos)
[![dependencies Status](https://david-dm.org/crippin/twitch-webos/status.svg)](https://david-dm.org/crippin/twitch-webos)
[![gh-pages](https://d2.alternativeto.net/dist/icons/github-pages_100202.png?width=22&height=22&mode=crop&upscale=false)](https://crippin.github.io/twitch-webos/)

## Links

[LG webOS TV SDK](https://webostv.developer.lge.com/sdk/installation/)

[react-tv/react-tv-cli](https://github.com/raphamorim/react-tv)

[yarn](https://yarnpkg.com/lang/en/)

## Install

```bash
$ git clone https://github.com/crippin/twitch-webos.git
$ cd twitch-webos
$ yarn
```
## Run in browser

```bash
$ yarn start
```

## Build bundle.js

```bash
$ yarn build
```
## Build ipk

Get webos cli from  

[https://webostv.developer.lge.com/sdk/installation/](https://webostv.developer.lge.com/sdk/installation/)  

or  

```bash
# Depends on python3
$ ./tools/set_webos_cli
```

then

```bash
# Make sure that cli's binaries are executable
# chmod +x CLI/bin/ares-package
$ yarn build-ipk
```

## Install to tv
To intall the app you need to enable Developer Mode on the TV.  
Follow the instructions:

[https://webostv.developer.lge.com/develop/app-test/](https://webostv.developer.lge.com/develop/app-test/)


```bash
# Export TV name
$ export WEBOS_TV_NAME=tvname

# Make sure that cli's binaries are executable
# chmod +x CLI/bin/ares-install

$ ./tools/install.sh
```