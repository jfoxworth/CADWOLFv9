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

		if ( ( userData === undefined ) || ( userData === null ) )
		{
			console.log('The image type is undefined');
			var path = '/profile/default.jpeg';
		}else
		{

			if ( userData.imageType  === undefined )
			{
				console.log('The image type is undefined');
				var path = '/profile/default.jpeg';
			}else{
				var path = '/profile/'+userData.uid+'.'+userData.imageType;			
				console.log('The path is '+path);
			}
		}


		// Get URL
		const ref = this.afStorage.ref(path);
		return ref.getDownloadURL();

  	}







 
	/*
	*
	*
	* check a potential user name against the database
	*
	**/
	checkUserName( potentialUserName ) 
	{
		console.log('Checking for name '+potentialUserName);
		return this.afs.collection('users', ref => ref.where('userName', '==', potentialUserName))
		.get();

	}




}
