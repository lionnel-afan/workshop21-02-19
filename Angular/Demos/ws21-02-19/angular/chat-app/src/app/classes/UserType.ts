


export class User {

    public Token: string
    public Username: string
    public Name: string;
    public IP: string;


    constructor(token: string, username: string) {
        this.Token = token;
        this.Username = username;
    }
}