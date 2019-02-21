

var http = require('http');
var Chat = require("./modules/Chat");
var rndReply = require("./modules/wait-random");



var chatSession = new Chat();


//create a server object:
http.createServer(function (req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("Processing user on IP : ", ip)
    if (req.url.indexOf("/GetMessages") != -1) {

        chatSession.GetMessages(res);
        res.end();

    } else if (req.url.indexOf("/SendMessage") != -1) {

        chatSession.appendMessage(req, res);
        res.end();

    } else {
        rndReply()
            .then(function (data) {
                ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                console.log("Done with user on IP : ", ip)
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({
                    rand: data,
                    code: 200
                }));
                res.end();

            });
    }


}).listen(8080); //the server object listens on port 8080

