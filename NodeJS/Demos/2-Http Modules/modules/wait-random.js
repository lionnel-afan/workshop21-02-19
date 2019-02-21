
var getRandomNumber = function (response) {

    //Asynchronous response
    return new Promise(function (resolve, reject) {
        //Do Async Job
        var rand = Math.random() * (5 - 1) + 1;
        setTimeout(() => {
            resolve(rand);
        }, rand * 1000);
    });
}


module.exports = getRandomNumber;