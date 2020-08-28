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






	/*
	 *
	 * 	Get all permissions for a file/folder/etc
	 *
	 * 
	 */
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
	 * 	Take a user and a doc id and return the permissions for that 
	 *  file or folder
	 * 
	 */
	getPermission( userObj )
	{
	}








	/*
	 *
	 * 	Add a user permission for a given file and type
	 * 
	 */
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





	/*
	 *
	 * 	delete a user permission for a given file and type
	 * 
	 */
	deletePermission( perm )
	{
		var docRef = this.afs.collection('permissions').doc( perm.uid ).delete();
	}


}