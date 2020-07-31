import { Injectable } from '@angular/core';


// Services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';






@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( 	public afs 			: AngularFirestore,
  				private afStorage 	: AngularFireStorage ) { }




 
	/*
	*
	*
	* Fetch the profile image if there is one
	*
	**/
	getProfileImage( userData ) {

		console.log('In the getProfileImage, I am using the id of '+userData.uid);
		console.log(userData);

		if ( userData.imageType  === undefined )
		{
			console.log('The image type is undefined');
			var path = '/profile/default.jpeg';
		}else{
			var path = '/profile/'+userData.uid+'.'+userData.imageType;			
			console.log('The path is '+path);
		}


		// Get URL
		const ref = this.afStorage.ref(path);
		return ref.getDownloadURL();

  	}


}
