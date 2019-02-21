



const express = require('express');
const router = express.Router({ mergeParams: true });


const rest = require('../modules/Rest');


const messages = [];


router.use('/', function (req, res, next) {
    var token = req.query.token || req.body.token;
    console.log('User Token :', token);

    var body = JSON.stringify({ "token": token });
    var options = {
        host: '127.0.0.1', //'192.168.1.28',
        port: 7777,
        path: '/api/user',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Content-Length": Buffer.byteLength(body)
        },
        data: body
    };

    rest.getJSON(options, function (statusCode, result) {
        // I could work with the result html/json here.  I could also just return it
        console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
        // res.statusCode = statusCode;
        // res.send(result);
        req.user = result.user || result;
        next()
    });

});

// handle incoming request to /users
router.get('/', (req, res, next) => {

    console.log("Handle : GET : ", req.user);
    if (req.user && req.user.Username) {

        res.status(200).json({
            messages: messages
        });

    } else {
        res.status(500).json({
            error: "No user found with that token. You do not have access to this endpoint."
        });
    }


});

router.post('/', (req, res, next) => {


    if (req.user && req.user.Username) {
        messages.push({
            user: req.user,
            message: req.body.message
        })

        res.status(200).json({
            messages: messages
        });
    } else {
        res.status(500).json({
            error: "No user found with that token. You do not have access to this endpoint."
        });
    }




});


module.exports = router;

