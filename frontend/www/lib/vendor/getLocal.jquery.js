LOCAL_API_BASE = "http://192.168.0.102:8080/api/json";

$.getLocal = function() {
    var url = URI(LOCAL_API_BASE);

    url.query({target: arguments[0]});
    arguments[0] = url.toString();

    $.get(arguments[0], arguments[1]);
}