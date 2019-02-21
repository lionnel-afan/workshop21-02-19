




"use strict";
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-chat';
// Port where we'll run the websocket server
var webSocketsServerPort = 1337;



// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');



