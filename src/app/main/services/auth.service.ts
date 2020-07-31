
// Core angular items
import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";


// Firebase items
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';



// Models
import { User } from "app/main/models/users";


// Services
import { ProfileService } from 'app/main/services/profile.service';




@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public ProfileService: ProfileService, 
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('cadwolfUser', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('cadwolfUser'));
      } else {
        localStorage.setItem('cadwolfUser', null);
        localStorage.setItem('cadwolfUserData', null);
        JSON.parse(localStorage.getItem('cadwolfUser'));
      }
    })
  }

  // Sign in with email/password
  SignIn(email, password) {
    
    
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {

      
			var docRef = this.afs.collection('users').doc(result.user.uid);
			var userInfo = docRef.ref.get().then(response=> {
				localStorage.setItem('cadwolfUserData', JSON.stringify(response.data()));
				console.log('Setting user data to '+JSON.stringify(response.data()));
        this.ProfileService.updateProfileImages( response.data() );
	        	this.router.navigate(['profile']);
			});


        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
      
  }

  // Sign up with email/password
  SignUp(displayName, email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
		this.afs.collection('users').doc(result.user.uid).update({'userName':displayName});
        localStorage.setItem('cadwolfUser', JSON.stringify(result.user));
        localStorage.setItem('cadwolfUserData', JSON.stringify(result.user));

      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
SendVerificationMail() {
    return this.afAuth.currentUser.then(u => u.sendEmailVerification())
    .then(() => {
      this.router.navigate(['/confirmEmail']);
    })
  }


  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('userData');
      this.router.navigate(['login']);
    })
  }

  // Update Profile Data
  UpdateProfile() {
    return this.afAuth.currentUser
      .then((result) => { result.updateProfile({      
        displayName : "My Name",
        photoURL: "https://example.com/jane-q-user/profile.jpg"
    })
    }); 
  }

}