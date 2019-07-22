# prereqs:
#
# npm i -g cordova phonegap

cordova platform add android
cordova platform add browser
cordova prepare

npm install

cd www

npm install

# first run:
# npm i && cd www && ./js/lib/btc-ln-keychain/build.sh && rm -rf platforms/browser && cd ~/apps/3itcoin-wallet && rm -rf ./www/node_modules && npm run browser
