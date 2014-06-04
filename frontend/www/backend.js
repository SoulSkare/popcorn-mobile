var Backend = {

    initialize : function(callback) {
        
        document.getElementById("init-status").innerHTML = "Status: Connecting to backend";
        document.getElementById("initbar-contents").style.width="20%";

        // DEV MODE (SKIP CHECK)
        callback();

        AdvSettings.checkApiEndpoint(
            {
                original: 'yifyApiEndpoint',
                mirror: 'yifyApiEndpointMirror',
                fingerprint: 'D4 7B 8A 2A 7B E1 AA 40 C5 7E 53 DB 1B 0F 4F 6A 0B AA 2C 6C'
            
            }, function () {
                $.get('http://localhost:8080/api/status', function (data, status, jqXHR) {

                    if (data.status === 'ready') {
                        document.getElementById("init-status").innerHTML = "Status: Backend ready !";
                        callback();
                    }

                }).fail(function(){
                    // we'll try again in 10 seconds
                    document.getElementById("init-status").innerHTML = "Status: Backend not ready...";
                    setTimeout(function(){                    
                        Backend.initialize(callback);
                    },10000)
                });

        });

    }

};
