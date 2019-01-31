import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';
import { map, switchMap, timestamp } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';


export interface Message {
  Messages: Array<string>;
  UserIDs: Array<string>;
  TimeStamps: Array<string>;
}


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatCollectionRef: AngularFirestoreCollection<Message>;
  chatDocRef: AngularFirestoreDocument<Message>; // Document reference
  chats$: Observable<Message>; // document or chat observable
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router
  ) { }


  getChat() {
    return this.afs.collection<any>(`chats`).snapshotChanges();
  }

  get(chatId) {
    console.log(chatId);
    this.chatDocRef = this.afs.doc<Message>('chats/' + chatId);
    this.chats$ = this.chatDocRef.valueChanges();
    return this.chats$;
  }

  async create() {
    const { uid } = await this.auth.getUser();

    const data = {
      uid,
      createAt: Date.now(),
      chatname: 'Code',
      count: 0,
      messages: [{}]
    };
    const docRef = await this.afs.collection(`chats`).add(data);

    return this.router.navigate(['chats', docRef.id]);
  }

  async sendMessage(chatId, content) {
    const { uid, photoURL, displayName } = await this.auth.getUser();

    const data = {
      DisplayName: displayName,
      Message: content,
      photoURL: photoURL,
      Time: 'time is now'
    };
    if (uid) {
      const ref = this.afs.collection('chats').doc(chatId);
      return ref.update({
        MessagesArr: firestore.FieldValue.arrayUnion(data)
      });
    }
  }

  joinUsers(chat$: Observable<any>) {
    let chat;
    const joinKeys = {};

    return chat$.pipe(
      switchMap(c => {
        chat = c;
        console.log(c.messages);
        const uids = Array.from(new Set(c.messages.map(v => v.uid)));
        const userDocs = uids.map(u =>
          this.afs.doc(`users/${u}`).valueChanges());

        return userDocs.length ? combineLatest(userDocs) : of ([]);
      }),
      map(arr => {
        arr.forEach(v => (joinKeys[(<any>v).uid] = v));
        chat.messages = chat.messages.map(v => {
          return { ...v, user: joinKeys[v.uid] };
        });
        return chat;
      })
    );
  }
}
