#!/usr/bin/env bash
export PATH=${PATH}:`pwd`/CLI/bin/
FILE=`find build -name '*.ipk'`
FILE_NAME=${FILE##*/}
ares-install -r ${FILE_NAME%_*_*} -d $WEBOS_TV_NAME
ares-install $FILE -d $WEBOS_TV_NAME
if [[ $? != 0 ]]; then exit $?; fi
ares-inspect twitch.tv.app -d $WEBOS_TV_NAME
