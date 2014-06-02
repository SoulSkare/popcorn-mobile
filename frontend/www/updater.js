var initOptions = {
    updateSite : 'http://get-popcorn.com/updates/',
};

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
    return networkState;
}

var version = {
    v_online: '',
    v_local: '',
    v_description: '',
    v_apk: ''
};

function getUpdatable(url,key) {
    var dtd = $.Deferred();
        console.log(url);
        console.log("Checking for update...");
        $.get(url)
            .done( function(xml) {               
                if (xml.xmlVersion == '1.0' ) {
                    version.v_online = $(xml).find(key).text();
                    alert('online: '+ version.v_online );
                    version.v_apk = $(xml).find("apk").text();
                    version.v_description = $(xml).find("description").text();
                    
                    // get current version
                    version.v_local = window.localStorage.getItem(key);
                    if ( version.v_local == null ) {
                        version.v_local = '0.0.1';
                    }
                    
                    // new version?
                    if ( version.v_local != version.v_online ) {
                        console.log("new version available");
                        dtd.resolve();
                    }else {
                        console.log("no version available");                        
                        dtd.reject();
                    }
                } else {
                    console.log('error file info!');
                    dtd.reject();
                }
            })
            .fail( function() {
                console.log("something is wrong with the udpater");
                dtd.reject();
            });
    
    return dtd.promise();
}

function checkUpdate() {
    // http://get-popcorn.com/updates/android.xml 
    // EX: http://get-popcorn.com/updates/android.xml 
    console.log("Update url: " + initOptions.updateSite +'.xml?'+(new Date()).valueOf());
    $.when(getUpdatable(initOptions.updateSite +'.xml?'+(new Date()).valueOf(),'version'))
        .done( function () { updateVersion(); } )
        .fail( function () { console.log("no new version available") } )
}

function reqRoot() {
    var dtd = $.Deferred();
    window.requestFileSystem( LocalFileSystem.PERSISTENT, 0, 
        function(fileSystem) {
            //alert('fs over!');
            dtd.resolve(fileSystem.root);
        },
        function(evt) {
            console.log('reqRoot:' +evt.target.error.code);
            dtd.reject();
        }
    );
    return dtd.promise();
}

function mkDir( entrydir, dir ) {
    var dtd = $.Deferred();
    entrydir.getDirectory( dir, {create:true,exclusive:false},
        function(currentdir) {
            //alert('mkDir('+ dir+ ') over');
            dtd.resolve(currentdir);
        },
        function(evt) {
            console.log( 'mkDir('+ dir+ '):' + evt.target.error.code);
            dtd.reject();
        }
    );
    return dtd.promise();
}

function createFile( entrydir, fname ) {
    var dtd = $.Deferred();
    entrydir.getFile( fname, {create:true,exclusive:false},
        function(parent) {
            //alert('createFile('+ fname+ ') over');
            dtd.resolve(parent, fname);
        },
        function(evt) {
            console.log( 'createFile('+ fname+ '):' + evt.target.error.code);
            dtd.reject();
        }
    );
    return dtd.promise();
}

function updateVersion() {
    console.log("Update app")
    $.when(reqRoot())
        .done( function (entrydir) {
            $.when(mkDir(entrydir, "dir1")) 
                .done( function (entrydir2) {
                    $.when(mkDir(entrydir2, "update")) 
                        .done( function (entrydir3) {
                            $.when(createFile(entrydir3, version.v_apk ))
                                .done( downloadApp ); 
                        });
                });
        });
}

function downloadApp(parent, fname) {
    console.log("Start download");
    var fileTransfer = new FileTransfer();
    var uri = encodeURI(initOptions.updateSite +'/'+ fname);

    fileTransfer.onprogress = function(progressEvent) {
        if (progressEvent.lengthComputable) {
            var percentLoaded = Math.round(100 * (progressEvent.loaded / progressEvent.total));  
            console.log("downloading");

            if( progressEvent.loaded == progressEvent.total ) {
                console.log("extracting");
            }
        } else {  
            console.log("downloading");
        }
    };

    fileTransfer.download( uri, parent.fullPath,
        function(entry){ 
            window.plugins.update.openFile(entry.fullPath,null,null); //use the plugin
            window.localStorage.setItem('version',version.v_online);
        },
        function(error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("upload error code" + error.code);
            alert("Please visit http://get-popcorn.com to grab latest version");
        }
    );
}