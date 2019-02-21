


var date = require('./date');
var Chat = require('./Chat');

var getRandomNumber = () => {
    return Math.random() * 100;
};




module.exports = {
    date: date,
    Chat: Chat,
    rand: getRandomNumber
};