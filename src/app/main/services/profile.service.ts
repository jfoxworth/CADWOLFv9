import { Injectable } from '@angular/core';

// Services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from 'app/main/services/user.service';


// RXJS
import { BehaviorSubject, Observable, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProfileService {


	profileData : any;
	profileStatus : BehaviorSubject<any>;
	profileImageStatus : BehaviorSubject<any>;



	constructor( 	public afs 			: AngularFirestore,
  					public UserService 	: UserService ) 
	{ 

		this.profileStatus = new BehaviorSubject([]);
		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));
		this.profileImageStatus = new BehaviorSubject(this.UserService.getProfileImage( userData ));
	}



  	/*
  	*
  	*	Compare the viewer to the profile being looked at
  	*
  	*/
	checkUserViewerStatus( userId ):string
	{
		// Pull the data from the local storage
		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));


		// No user defined by URL or by login
		if ( ( (userId == '') || ( userId === null ) || ( userId === undefined ) || ( userId == 'null' ) ) &&
		   ( ( userData === null ) || ( userData === undefined ) || ( userData == 'undefined' ) ) )
		{
			return "noUser"

		// A user is defined by URL
		}else if ( (userId != '') && ( userId !== null ) && ( userId !== undefined ) && ( userId !== 'null' ) )
		{
			// If the user defined by the URL is the same as the one logged in
			if ( userData )
			{
				if ( ( userData.uid == userId ) ||
					 ( userData.userName == userId ) )
				{
					return 'canEdit'
				}
			}
			return 'display'

		// Looking at user defined by the URL, but the user is logged in
		}else if ( ( userData !== null ) && ( userData !== undefined ) && ( userData !== {} ) )
		{
			return 'canEdit'
		}


	}






  	/*
  	*
  	*	Set user data as defined by the URL or defined by the logged in user
  	*
  	*/
	setProfileData( userId )
	{

		// Pull the data from the local storage
		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));
		let userInfo = {};


		// No user defined by URL or by login
		if ( ( (userId == '') || ( userId === null ) || ( userId === undefined ) ) &&
		   ( ( userData === null ) || ( userData === undefined ) || ( userData == 'undefined' ) ) )
		{
			this.profileStatus.next({}); 


		// A user is defined by URL
		}else if ( (userId != '') && ( userId !== null ) && ( userId !== undefined ) )
		{


			var docRef = this.afs.collection("users").doc(userId);

			docRef.ref.get().then((doc) => {

			    if (doc.exists) {
					this.profileStatus.next(doc.data()); 

			    } else {

			    	console.log('I am here.');

					this.afs.collection('users', ref => ref.where('userName', '==', userId))
					.get()
					.subscribe(result=> {
						result.forEach((doc) => {
							this.profileStatus.next(doc.data()); 
	                	});	
					});

			    }
			}).catch(function(error) {
			    console.log("Error getting document:", error);
			});
		

		// Looking at user defined by the URL, but the user is logged in
		}else if ( ( userData !== null ) && ( userData !== undefined ) && ( userData !== {} ) )
		{
			this.profileStatus.next(userData); 
		
		}else
		{

			console.log('I got nothing');

		}


	}







  	/*
  	*
  	*	Set user data as defined by the URL or defined by the logged in user
  	*
  	*/
	setProfileImage( userId )
	{
		

		// Pull the data from the local storage
		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));
		let userInfo = {};


		// No user defined by URL or by login
		if ( ( (userId == '') || ( userId === null ) || ( userId === undefined ) ) &&
		   ( ( userData === null ) || ( userData === undefined ) || ( userData == 'undefined' ) ) )
		{
			return ''


		// A user is defined by URL
		}else if ( (userId != '') && ( userId !== null ) && ( userId !== undefined ) )
		{
			this.afs.collection( 'users', userId )
				.doc(userId)
				.get()
				.subscribe(response=> {
					userInfo=response.data();
		        	return this.UserService.getProfileImage( userInfo );
				});

		// Looking at user defined by the URL, but the user is logged in
		}else if ( ( userData !== null ) && ( userData !== undefined ) && ( userData !== {} ) )
		{
			return this.UserService.getProfileImage( userData );
		
		}else
		{
			return ''
		}


	}





	updateProfileImages( userData )
	{
		this.profileImageStatus.next( this.UserService.getProfileImage(userData) ); 		
	}



}
