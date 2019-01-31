import { Component, OnInit } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { AuthService } from '../auth.service';
import { ChatService } from '../chat.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  name;
  imgSrc;
  constructor( private chatCom: ChatComponent, private authService: AuthService, private chatService: ChatService) { }

  ngOnInit() {
    this.authService.getUser().then( (user) => {
      this.name = user.displayName;
      this.imgSrc = user.photoURL;
    }).catch((error) => {
      console.log(error);
    });
  }

  addChat() {
    this.chatService.create();
  }

}
