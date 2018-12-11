#!/usr/bin/env bash
export PATH=${PATH}:${LG_WEBOS_TV_SDK_HOME}/CLI/bin/
TV="[LG]_webOS_TV_UK6300MLB"
FILE=`find build -name '*.ipk'`
FILE_NAME=${FILE##*/}
ares-install -r ${FILE_NAME%_*_*} -d $TV
ares-install $FILE -d $TV
