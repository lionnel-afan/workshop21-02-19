

var url = require('url');


class Chat {
    constructor () {
        this.messages = [];
    }

    appendMessage(request, response) {

        var q = url.parse(request.url, true).query;
        var message = q.message;

        if (message != null) {
            this.messages.push(message);
        }

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({
            error: "Done.",
            code: 200,
            data: this.messages
        }));
    }





    getMessages(response) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({
            data: messages,
            code: 200
        }));
        return this.messages;
    }


}


module.exports = Chat;