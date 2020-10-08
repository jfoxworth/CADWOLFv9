

/*

	This is the service for branches. It handles all of the CRUD functions
	for the branches database. The service will also handle any additional
	functions for the branches view. This is because there is little to
	no additional functionality from the branches view component.


*/

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';
import { LogEntry } from 'app/main/models/log';
import { Permission } from 'app/main/models/permission';
import { Branch } from 'app/main/models/branch';




// Services
import { AuthService } from 'app/main/services/auth.service';
import { LogService } from 'app/main/services/log.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class BranchService {

	branchFileStatus 	: BehaviorSubject<any>;
	branchesStatus 		: BehaviorSubject<any>;


	constructor(
		public afs 			: AngularFirestore,
		private logService 	: LogService,
	) 
	{ 
		this.branchFileStatus 		= new BehaviorSubject([]);
		this.branchesStatus 		= new BehaviorSubject([]);
	}





	
	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS FOR BRANCHES
	//
	// -----------------------------------------------------------------------------------------------------



  	
  	//	Create a branch
	createBranch( branchData )
	{
		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));

		let branchEntry : Branch ={
			creatorId 		: userData.uid,
			creatorName 	: userData.userName,
			dateCreated 	: Date.now(),
			parentBranch 	: branchData.parentBranch,
			name 			: branchData.name,
			isMaster 		: branchData.isMaster,
			status 			: branchData.status,
			description 	: 'Description of Branch',
			fileId 			: branchData.fileId
		};

		var docRef = this.afs.collection('branches').add( branchEntry )
    	.then((docRef) => {

			this.afs.collection('files').doc(branchData.fileId).update({ 'branchId':docRef.id });
		});

	}



	
	// Get the branches for a file
	getBranches( fileId )
	{
 
 		this.afs.collection('branches', ref => ref.where('fileId', '==', fileId ))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {
			this.branchesStatus.next(result);
		});

	}



	
	// Get all of the files associated with this branch. This is based on the OID for a file
	getFilesForBranch( fileId )
	{
 
 		this.afs.collection('files', ref => ref
 			.where('oid', '==', fileId )
 			.where('deleted', '==', false)
 			.orderBy("dateCreated", "desc"))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {

			this.branchFileStatus.next(result);

		});

	}





	// delete a branch
	deleteBranch( branchId, relatedFileId )
	{
		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));

		this.afs.collection('branches').doc( branchId ).update({'deleted':true});

		this.logService.createLogEntry({ entryTitle 	: 'Branch Deleted',
										 messageType 	: 'Branch Deleted',
										 relatedFileId	: relatedFileId,
										 relatedUserId 	: userData.uid,
										 parentId		: "NA",
										 entryText		: 'This branch was deleted' });

	}







}
