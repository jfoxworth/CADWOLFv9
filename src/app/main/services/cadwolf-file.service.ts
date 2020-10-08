
/*

	This is the service for the cadwolfFile object. It handles all of the CRUD 
	operations for that database table and corresponding model. There are multiple
	read items as there are different kinds of reads - single file, all files for
	a user, etc.

	Anywhere a file or group of files is called, it is done from this service.
	Any time a file is updated or deleted, it is done here.

*/


// Standard Angular Items
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';
import { LogEntry } from 'app/main/models/log';



// Services
import { AuthService } from 'app/main/services/auth.service';
import { LogService } from 'app/main/services/log.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { PermissionsService } from 'app/main/services/permissions.service';
import { BranchService } from 'app/main/services/branch.service';
import { WorkspaceService } from 'app/main/services/workspace.service';



@Injectable({
	providedIn: 'root'
})
export class CadwolfFileService {


	fileStatus 		: BehaviorSubject<any>;	
	userFileStatus 	: BehaviorSubject<any>;	
	fileTypeNames 	: string[];



	constructor(	public afs 					: AngularFirestore,
					public permissionsService 	: PermissionsService,
			        private logService 			: LogService,
			        private branchService 		: BranchService,
			        private workspaceService 	: WorkspaceService )
	{
		this.fileStatus 		= new BehaviorSubject([]);
		this.userFileStatus 	= new BehaviorSubject([]);
		this.fileTypeNames 		= this.workspaceService.getFileTypes();
	}






	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS
	//
	// -----------------------------------------------------------------------------------------------------




	/*
	 *
	 * 	Create a new file
	 *
	 * 
	 */
	createCadwolfFile( typeNum, parentId )
	{
		console.log('Creating a new file with '+typeNum+' and '+parentId);


		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));

		let itemData : CadwolfFile = {
			creatorId 		: userData.uid,
			dateCreated 	: Date.now(),
			dateModified 	: Date.now(),
			fileType 		: typeNum,
			itemData 		: {
								'showTitle' 		: 'Document Title',
								'showSubtitle' 		: 'Sub Title',
								'docWidth' 			: 825,
								'docMargin' 		: 25,
								'description' 		: 'This is the description',
								'showHeaders'		: true,
								'showText'			: true,
								'showEquations'		: true,
								'showSymbolics'		: true,
								'showTables'		: true,
								'showForLoops'		: true,
								'showWhileLoops'	: true,
								'showIfElses'		: true,
								'showPlots'			: true,
								'showCharts'		: true,
								'showImages'		: true,
								'showVideos'		: true,
								'showLineBreaks'	: true,
								'tableOfContents' 	: {
									'show' : false,
									'showType' : 'headers',
									'showLevel' : 'H5',
									'types' : {
										'text' : false,
										'headers' : true,
										'equations' : false,
										'symbolics' : false,
										'tables' : false,
										'forLoops' : false,
										'whileLoops' : false,
										'ifElseStatements' : false,
										'plots' : false,
										'surfaces' : false,
										'images' : false,
										'videos' : false
									}
								},
								},
			name 			: 'New '+this.fileTypeNames[typeNum],
			needsUpdate 	: false,
			oid 			: '0',
			order 			: 0,
			parentId		: parentId,
			version 		: 1,
			revision 		: 1,
			deleted			: false,
			uid 			: '',
			id 				: '',

			branchId 		: '',

			viewPermType 	: 0,				// Everyone can view
			editPermType 	: 2,				// Inherit edit perms
			adminPermType 	: 2,				// Inherit admin perms

		}

		var docRef = this.afs.collection('files').add( itemData )
    	.then((docRef) => {

			this.afs.collection('files').doc(docRef.id).update({'oid':docRef.id, 'id':docRef.id });

			this.permissionsService.addPermission( {uid:docRef.id}, userData, 'admin', 'user' );
			this.permissionsService.addPermission( {uid:docRef.id}, userData, 'edit', 'user' );
			this.permissionsService.addPermission( {uid:docRef.id}, userData, 'view', 'user' );


			this.logService.createLogEntry({ entryTitle 	: 'File Created',
											 messageType 	: 'File Creation',
											 relatedFileId	: docRef.id,
											 relatedUserId 	: userData.uid,
											 parentId		: parentId,
											 entryText		: 'Automatic File Creation' });


			if ( typeNum == 1 )
			{

				this.branchService.createBranch({ parentBranch 	: 0,
												  fileId 		: docRef.id,
												  name 			: 'Master',
												  isMaster		: true,
												  status 		: 0,
												  revision		: 1,
												  version		: 1 });

			}


    	}).catch((error) => {
    		window.alert(error.message)
    	});

	}






	//  Read a file using an ID
	getFileById( fileId )
	{

		this.afs.collection('files').doc(fileId)
		.valueChanges()
		.subscribe((result:CadwolfFile[]) => {

			result['uid'] = fileId;

			// Send to observable
			this.fileStatus.next(result);

		});

	}






	//  Read all files for a user
	getFilesForUser( userId )
	{

		this.afs.collection('files', ref => ref
			.where('creatorId', '==', userId)
			.where('deleted', '==', false))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {

			this.userFileStatus.next(result);

		});

	}





	// Update a file
	updateCadwolfFile( file, item )
	{
		this.afs.collection('files').doc(file.id).update( file );

		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));
		let logObject = {};

		if ( item == 'name' )
		{
			logObject = { entryTitle 	: 'File Name Changed',
						  messageType 	: 'File Name Changed',
						  relatedFileId	: file.id,
						  relatedUserId : userData.uid,
						  parentId		: file.parentId,
						  entryText		: 'File name changed to '+file.name };

		

		}else if ( item == 'description' )
		{
			logObject = { entryTitle 	: 'Description Changed',
						  messageType 	: 'Description Changed',
						  relatedFileId	: file.id,
						  relatedUserId : userData.uid,
						  parentId		: file.parentId,
						  entryText		: 'Description changed to '+file.description };

		


		}else if ( item == 'order' )
		{
			logObject = { entryTitle 	: 'Order Changed',
						  messageType 	: 'Order Changed',
						  relatedFileId	: file.id,
						  relatedUserId : userData.uid,
						  parentId		: file.parentId,
						  entryText		: 'Order changed to '+file.order };

		
		}else
		{
			logObject = { entryTitle 	: 'Data Altered',
						  messageType 	: 'Data Altered',
						  relatedFileId	: file.id,
						  relatedUserId : userData.uid,
						  parentId		: file.parentId,
						  entryText		: 'Data changed' };

		}


		this.logService.createLogEntry( logObject );

	}










	//delete a file
	deleteCadwolfFile( fileId )
	{
		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));

		this.afs.collection('files').doc( fileId ).update({'deleted':true});

		this.logService.createLogEntry({ entryTitle 	: 'File Deleted',
										 messageType 	: 'File Deleted',
										 relatedFileId	: fileId,
										 relatedUserId 	: userData.uid,
										 parentId		: "NA",
										 entryText		: 'This file was deleted' });

	}








}
