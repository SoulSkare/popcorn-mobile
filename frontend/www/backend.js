var Backend = {

    initialize : function(callback) {
        
        document.getElementById("init-status").innerHTML = "Status: Connecting to backend";
        document.getElementById("initbar-contents").style.width="20%";

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
    }

};
