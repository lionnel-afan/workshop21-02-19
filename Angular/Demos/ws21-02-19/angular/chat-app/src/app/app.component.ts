import { Component, OnInit } from '@angular/core';


import { UserService } from './services/UserService';
import { MessagesService } from "./services/MessagesService";

import { User } from './classes/UserType';
import { Message } from "./classes/MessageType";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chat-app';
  username = "lionnel";
  name = "Lionnel Afangbedjee";
  UserService: UserService;
  MessagesService: MessagesService;
  currentUser: User;
  Messages: any;

  constructor(UserService: UserService, MessagesService: MessagesService) {
    this.UserService = UserService;
    this.MessagesService = MessagesService;
  }

  ngOnInit() {
    this.Messages = [
      {
        user: {
          Username: "Lionnel",
          Name: "Lionnel Afangbedjee",
          Token: "",
          IP: ""

        },
        message: "Hello"
      }]
  }

  onSubmit() {
    this.UserService.logMeIn("lionnel", "Lionnel afangbedjee")
      .then((response) => {
        this.currentUser = {
          Username: response["username"],
          Name: "Lionnel Afangbedjee",
          Token: response["token"],
          IP: ""
        };

        console.log("Form Submitted!", this.currentUser);
        this.startMessagesTimer();
      });
  }


  startMessagesTimer() {
    setInterval(() => { this.refreshMessages(); }, 1000 * 10);
  }


  refreshMessages() {
    this.MessagesService.getMessages(this.currentUser.Token, "...")
      .then((response) => {
        console.log("Form Submitted!", response);
        this.Messages = response["messages"] || response;
      });
  }




}
