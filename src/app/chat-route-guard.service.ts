




import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFireAuth} from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatRouteGuardService implements CanActivate {

  constructor(private authService: AuthService, private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(): Promise<boolean> {
    return this.authService.getUser().then
    (user => {
        if (user) {
          return (true);
        } else {
          this.afAuth.auth.setPersistence(auth.Auth.Persistence.LOCAL)
          .then(() => {
            this.authService.googleSignIn().then((userRef) => {
              this.authService.getUser().then(user$ => {
                  if (user$.uid) {
                    this.router.navigate(['']);
                    return (true);
                  } else {
                    return (false);
                  }
                }
              );
            });
          }).catch(function(error) {
            return (false);
          });
        }
      }
    );
  }
}
