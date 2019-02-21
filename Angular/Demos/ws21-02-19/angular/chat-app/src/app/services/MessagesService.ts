




import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MessagesService {


    private url: string = "http://127.0.0.1:8888/message?token="
    // private http: HttpClient

    constructor(private http: HttpClient) {

    }


    getMessages(token: string, message: string) {
        return this.http.get(this.url + token)
            .toPromise()
    }
}