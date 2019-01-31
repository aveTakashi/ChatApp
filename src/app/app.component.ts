import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'groupchat';
  chats;

  constructor(private authService: AuthService, private chatService: ChatService, private router: Router) {
    this.chatService.getChat()
      .subscribe(data => {
        data.map(e => {
          this.chats = {id: e.payload.doc.id, ...e.payload.doc.data()};
          this.router.navigate(['chats', this.chats.id]);
        });
      });
   }
}
