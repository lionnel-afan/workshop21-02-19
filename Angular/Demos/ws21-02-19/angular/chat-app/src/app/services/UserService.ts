

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {


    private loginUrl: string = "http://127.0.0.1:7777/api/login"
    // private http: HttpClient

    constructor(private http: HttpClient) {

    }


    logMeIn(username: string, name: string) {
        return this.http.post(this.loginUrl, { username: username, name: name })
            .toPromise()
    }
}