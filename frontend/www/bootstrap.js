(function(App) {
    'use strict';
    
    var emulated = window.tinyHippos !== undefined;
    // detect if we are in emulation or not
    if (emulated) {
        onDeviceReady();
    } else {
        document.addEventListener("deviceready", onDeviceReady, false);
    }
    
    function onDeviceReady() {

        if (!emulated) {
            if (checkConnection() != Connection.NONE ) {
                initOptions.updateSite = initOptions.updateSite + device.platform.toLowerCase();
                checkUpdate();
            }
        }

        // start app
        App.start();
        
    }
    
})(window.App);
