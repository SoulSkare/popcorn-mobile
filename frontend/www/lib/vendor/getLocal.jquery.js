LOCAL_API_BASE = "http://localhost:8080/api/json";

$.getLocal = function() {
    var url = URI(LOCAL_API_BASE);

    url.query({target: arguments[0]});
    arguments[0] = url.toString();

    $.get(arguments[0], arguments[1]);
}