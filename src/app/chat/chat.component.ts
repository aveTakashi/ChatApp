import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface Message {
  Messages: Array<string>;
  UserIDs: Array<string>;
  TimeStamps: Array<string>;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chats$: Observable<Message>;
  user;
  chatRooms;
  newMessage: Message;
  message_con = '';
  chatID: string;

  constructor(private authService: AuthService, private chatService: ChatService, private router: Router) {
    this.authService.getUser().then( (user) => {
      this.user = user;
    }).catch((error) => {
      console.log(error);
    });
   }

  ngOnInit() {
    this.chatID = this.router.url.replace(/chats/g, '').replace(/\//g, '');
    this.chats$ = this.chatService.get(this.chatID);
    console.log(this.chats$);
  }

  sendMessage() {
    if (this.message_con !== '') {
    this.chatService.sendMessage(this.chatID, this.message_con);
    this.message_con = '';
    }
  }

}
