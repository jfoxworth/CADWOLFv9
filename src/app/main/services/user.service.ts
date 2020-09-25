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
				var path = '/profile/default.jpeg';
			}else{
				var path = '/profile/'+userData.uid+'.'+userData.imageType;			
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










	/*
	 *
	 * 	see if item is a favorite
	 *
	 * 
	 */
	isFavorite( fileId )
	{
		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));

		if ( !userData.favorites ){ userData.favorites = []; }

		let flag=false;
		for ( let a=0; a<userData.favorites.length; a++ )
		{
			if ( userData.favorites[a] == fileId )
			{
				flag = true;
			}
		}

		return flag
	}
	







	/*
	 *
	 * 	add a favorite
	 *
	 * 
	 */
	addFavorite( fileId )
	{

		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));

		let flag=0;
		for ( let a=0; a<userData.favorites.length; a++ )
		{
			if ( userData.favorites[a] == fileId )
			{
				flag = 1;
			}
		}

		if ( flag ==0 )
		{
			userData.favorites.push( fileId );
			this.afs.collection('users').doc( userData.uid ).update( { 'favorites' : userData.favorites });
			localStorage.setItem('cadwolfUserData', JSON.stringify(userData));
		}
	}
	





	/*
	 *
	 * 	remove a favorite
	 *
	 * 
	 */
	removeFavorite( fileId )
	{

		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));

		for ( let a=0; a<userData.favorites.length; a++ )
		{
			if ( userData.favorites[a] == fileId )
			{
				userData.favorites.splice(a,1);
			}
		}

		this.afs.collection('users').doc( userData.uid ).update( { 'favorites' : userData.favorites });
		localStorage.setItem('cadwolfUserData', JSON.stringify(userData));
	}
}
