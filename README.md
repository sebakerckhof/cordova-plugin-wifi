cordova-plugin-wifi
===================

Cordova plugin to access mobile device WiFi

# API #

getWifiInfo(okcallback, failcallback);

enableWifi(istrue, okcallback, failcallback)

connectWifi(istrue, params, okcallback, failcallback);

enableWifiAP(istrue, params, okcallback, failcallback);

enableWifiLock(istrue, okcallback, failcallback);

### Credits ###

The plugin is created and maintained by Raymond Xie.


## Installing

```
cordova create find com.hcp.find Find
cd find
cordova platform add android
git clone https://github.com/schollz/cordova-plugin-wifi.git
cordova plugin add ./cordova-plugin-wifi
cordova plugin add cordova-plugin-whitelist
rsync -avrP ../hello/plugins/cordova-plugin-wifi/test/* platforms/android/assets/www/
./platforms/android/cordova/build
cp /home/phi/Downloads/cord/find/platforms/android/build/outputs/apk/android-debug.apk ~/Dropbox/android-debug.apk
```
