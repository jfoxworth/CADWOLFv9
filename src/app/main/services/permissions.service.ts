

/*

	This is the service for the Permissions model. Permissions 
	are entries that give users and teams access to files and
	folders.

	There is no update function for permissions. There is one
	additional function not a direct CRUD function. There is 
	one function to fund and remove duplicate permissions.

*/


// Standard Angular Items
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


// Services
import { AuthService } from 'app/main/services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';



// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';
import { Permission } from 'app/main/models/permission';





@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

	permStatus 	: BehaviorSubject<any>;					// Handles the data within the workspace


	constructor(	public afs: AngularFirestore )   
 	{

		this.permStatus = new BehaviorSubject([]);
 	
	}





	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS
	//
	// -----------------------------------------------------------------------------------------------------


	//  Create a user permission for a given file and type
	addPermission( file, user, type, userType )
	{

		const tempObj = {
			dateCreated 	: Date.now(),
			itemId 			: file.uid,
			permType 		: type,
			userId 			: user.uid,
			userName 		: user.userName,
			userType 		: userType }

		var docRef = this.afs.collection('permissions').add( tempObj )
    	.then((docRef) => {

    	}).catch((error) => {
    		window.alert(error.message)
    	});
	}






	//  Get all permissions for a file/folder/etc
	getPermsForItem( fileId )
	{
		this.afs.collection('permissions', ref => ref.where('itemId', '==', fileId))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {
			this.permStatus.next(result);
		});

	}






	/*
	 *
	 * 	delete a user permission for a given file and type
	 * 
	 */
	deletePermission( perm )
	{
		var docRef = this.afs.collection('permissions').doc( perm.uid ).delete();
	}




	/*
	 *
	 * 	remove duplicate permissions from the array
	 * 
	 */
	removeDuplicatePerms( permissions )
	{
		let a = [];
		permissions.map(x => {
			if(!a.includes(x)) {
				a.push(x)
	    	}
		})
		console.log('The permissions are ...');
		console.log(a);
	  	return a
	}





}