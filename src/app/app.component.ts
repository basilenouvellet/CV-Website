import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './providers/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private isLoggedIn: Boolean;
  private user_displayName: String;
  private user_email: String;

  items: FirebaseListObservable<any[]>;

  constructor(public authService: AuthService,
              private router: Router,
              db: AngularFireDatabase) {
    this.items = db.list('/items');
    this.authService.afAuth.suscribe (
      (auth: firebase.auth.Auth) => {
        if (auth == null) {
            console.log('Logged out');
            this.isLoggedIn = false;
            this.user_displayName = '';
            this.user_email = '';
            this.router.navigate(['login']);
          } else {
            this.isLoggedIn = true;
            this.user_displayName = auth.google.displayName;
            this.user_email = auth.google.email;
            console.log('Logged in');
            console.log(auth);
            this.router.navigate(['']);
          }
      }
    );
  }

  logout() {
    this.authService.logout().then((data) => {
      this.router.navigate(['login']);
    });
  }

}
