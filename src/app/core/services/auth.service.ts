import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import  auth  from "firebase/app";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthOptions, AuthProvider, User } from './auth.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState$: Observable<auth.User>

  constructor(private afAuth: AngularFireAuth) {
    this.authState$ = this.afAuth.authState;
    //this.logout();
  }

  get isAuthenticated(): Observable<boolean>{
    return this.authState$.pipe(map(user => user !== null));
  }

  private signUserWithEmail( { email, password }: User ): Promise<auth.auth.UserCredential>{
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  private signInWithEmail( { email, password, name } : User ): Promise<auth.auth.UserCredential>{
    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(credentials => credentials.user.updateProfile({ displayName: name, photoURL: null })
    .then(() => credentials)
    );
  }  

  private signInWithPopup( provider: AuthProvider): Promise<auth.auth.UserCredential>{
    let signInProvider = null;

    switch (provider){
      case AuthProvider.Facebook:
        signInProvider = new auth.auth.FacebookAuthProvider();
        break;
    }
    return this.afAuth.signInWithPopup(signInProvider);
  }

  authenticate({ isSignIn, provider, user }: AuthOptions) : Promise<auth.auth.UserCredential>{
    let operation: Promise<auth.auth.UserCredential>;

    if(provider !== AuthProvider.Email){
      operation = this.signInWithPopup(provider);
    }else{
      operation = isSignIn ? this.signUserWithEmail(user) : this.signInWithEmail(user)
    }

    return operation;
  }

  logout(): Promise<void>{
    return this.afAuth.signOut();
  }
}
