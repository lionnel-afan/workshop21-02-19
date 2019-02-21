


var http = require("http");
var https = require("https");

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
exports.getJSON = function (options, onResult) {
    console.log("rest::getJSON");

    var port = options.port == 443 ? https : http;
    var req = port.request(options, function (res) {
        var output = '';
        console.log("=>" + options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function () {
            console.log("Output : ", output)
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function (err) {
        //res.send('error: ' + err.message);
    });

    // write data to request body
    // req.write(JSON.stringify(options.data));

    req.end(options.data);
};