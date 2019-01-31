import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ChatRouteGuardService } from './chat-route-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/chats', pathMatch: 'full' },
  { path: 'chats', component: ChatComponent, canActivate: [ChatRouteGuardService]},
  { path: 'chats/:id', component: ChatComponent, canActivate: [ChatRouteGuardService]} // need to change route guard to chat id verification
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
