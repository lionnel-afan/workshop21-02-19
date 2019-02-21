module.exports = class Chat {

    constructor (username) {
        this.username = username && username.length > 0 ? username : "User";
    }

    sayHello() {
        return "Hello " + this.username;
    }


}