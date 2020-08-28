import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';
import { LogEntry } from 'app/main/models/log';
import { Permission } from 'app/main/models/permission';




// Services
import { AuthService } from 'app/main/services/auth.service';
import { PermissionsService } from 'app/main/services/permissions.service';
import { LogService } from 'app/main/services/log.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';







@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

	workspaceStatus 		: BehaviorSubject<any>;					// Handles the data within the workspace
	workspaceFileStatus 	: BehaviorSubject<any>;					// Handles the data within the workspace
	workspaceTempStatus 	: BehaviorSubject<any>;					// Handles the data within the workspace
	workspaceTempFileStatus : BehaviorSubject<any>;					// Handles the data within the workspace
	fileStatus 				: BehaviorSubject<any>;					// Handles the data within the workspace
	fileTempStatus 			: BehaviorSubject<any>;					// Handles the data within the workspace
	urlStatus 				: BehaviorSubject<any>;					// Handles the data within the workspace
	urlTempStatus 			: BehaviorSubject<any>;					// Handles the data within the workspace
	permStatus 				: BehaviorSubject<any>;					// Handles the data within the workspace
	folderStatus 			: BehaviorSubject<any>;					// For folders only requests
	heirarchyStatus 		: BehaviorSubject<any>;					// Handles the data within the workspace

	urlIndex 				: number = 0;							// Where we are in getting URL files
	urlArray 				: any[];								// Array housing the broken URL
	urlTempIndex 			: number = 0;							// Where we are in getting URL files
	urlTempArray 			: any[];								// Array housing the broken URL
	pathArray 				: string[];								// Array holding the ids of the path
	viewArrayType 			: string[];
	editArrayType 			: string[];
	adminArrayType 			: string[];
	fileTypeNames 			: string[];



	constructor(	public afs 					: AngularFirestore,
					public permissionsService 	: PermissionsService,
			        private logService 			: LogService)
 	{

		this.workspaceStatus 			= new BehaviorSubject([]);
		this.workspaceFileStatus 		= new BehaviorSubject([]);
		this.workspaceTempStatus 		= new BehaviorSubject([]);
		this.workspaceTempFileStatus 	= new BehaviorSubject([]);
		this.fileStatus 				= new BehaviorSubject([]);
		this.fileTempStatus 			= new BehaviorSubject([]);
		this.urlStatus 					= new BehaviorSubject([]);
		this.urlTempStatus 				= new BehaviorSubject([]);
		this.permStatus 				= new BehaviorSubject([]);
		this.folderStatus 				= new BehaviorSubject([]);
		this.heirarchyStatus 			= new BehaviorSubject([]);
		this.urlArray 					= [];
		this.urlTempArray 				= [];
		this.pathArray 					= [];
		this.viewArrayType 				= [];
		this.editArrayType 				= [];
		this.adminArrayType 			= [];


		this.fileTypeNames = ['Workspace', 'Document', 'Dataset', 'PartTree', 'Image', 'Forum']
 	
		
		// Watch the urlStatus. If it is triggered, and we are at the end of the url array,
		// call the function to get all children. If not, recall function to get id of the
		// next child in the array
		this.urlStatus
		.subscribe((parentDoc)=>
		{

			if ( parentDoc[0] )
			{

				// Increment the URL Index
				this.urlIndex = this.urlIndex + 1;
				
				// Get next ID in url array or get contents
				if ( this.urlIndex >= this.urlArray.length )
				{
					this.getWorkspaceContents( parentDoc[0] )
				}else
				{
					this.getIdFromParentAndName( parentDoc[0].uid, this.urlArray[this.urlIndex] )
				}
			}

		});





		// Watch the backup urlStatus. 
		this.urlTempStatus
		.subscribe((parentDoc)=>
		{

			if ( parentDoc[0] )
			{

				// Increment the URL Index
				this.urlTempIndex = this.urlTempIndex + 1;
				
				// Get next ID in url array or get contents
				if ( this.urlTempIndex >= this.urlTempArray.length )
				{
					this.getTempWorkspaceContents( parentDoc[0] )
				}else
				{
					this.getIdFromParentAndName( parentDoc[0].uid, this.urlTempArray[this.urlTempIndex] )
				}
			}

		});


	}






	/*---------------------------------------------------------------------------------
	*
	*
	*		FILES WHERE THE USER GIVES A URL STRING AND THE FILES ARE 
	*		RETURNED THROUGH AN OBSERVER.
	*
	*
	*
	*---------------------------------------------------------------------------------*/



	/*
	 *
	 * 	Get the folder and all of its contents. There are two ways
	 * 	to do this. One is using a folder ID. The second is by 
	 *	using the string path and walking down to get the folder.
	 * 
	 */
	getWorkspaceAndContents( url, method )
	{

		// If we are given the folder ID
		if ( method == 0 )
		{
			// Get the folder file
			this.getWorkspaceById( url );

		}

		// If we are given a string representing the path.
		if ( method == 1 )
		{
			// Set the url array and the url index
			this.urlArray = this.urlToArray( url );
			this.urlIndex = 0;

			console.log('The array is ');
			console.log(this.urlArray);

			// Call initial function to get top folder
			this.getIdFromParentAndName( '0', this.urlArray[this.urlIndex] )
		}
	}




	/*
	 *
	 * 	Get the folder from the parent ID and name
	 *
	 * 
	 */
	getIdFromParentAndName( parentId, name )
	{

		console.log('In getIdFromParentAndName with '+parentId, name);
		this.afs.collection('files', ref => ref.where('name', '==', name).where('parentId', '==', parentId))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {
			if ( result[0] )
			{
				this.pathArray.push(result[0].uid);
				this.viewArrayType.push(result[0]['viewPermType']);
				this.editArrayType.push(result[0]['editPermType']);
				this.adminArrayType.push(result[0]['adminPermType']);
				this.permissionsService.getPermsForItem(result[0].uid);
				this.urlStatus.next(result);
			}
		});

	}







	/*
	 *
	 * 	Get the folder and all of its contents
	 *
	 * 
	 */
	getWorkspaceContents( doc )
	{
		console.log('The file in getWorkspaceContents is ');
		console.log(doc);
 
 		this.afs.collection('files', ref => ref.where('parentId', '==', doc.uid).where('deleted', '==', false))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {
			this.workspaceFileStatus.next(result);
			for (let a=0; a<result.length; a++)
			{
				this.permissionsService.getPermsForItem(result[a].uid);
			}
		});


		this.workspaceStatus.next(doc);


	}









	/*
	 *
	 * 	Get a file using an ID
	 *
	 * 
	 */
	getWorkspaceById( fileId )
	{

		console.log('The file id in get workspace is '+fileId);

		this.afs.collection('files').doc(fileId)
		.valueChanges()
		.subscribe((result:CadwolfFile[]) => {

			result['uid'] = fileId;

			console.log('Results in getWorkspaceByID');
			console.log(result);

			// Send to observable
			this.workspaceFileStatus.next(result);
			

			// Get and send all permissions for this folder
			this.permissionsService.getPermsForItem(result['uid']);


			// Get and send contents
			this.getWorkspaceContents( result );


		});

	}








	/*
	 *
	 * 	Get a file using an ID
	 *
	 * 
	 */
	getFile( docId )
	{
		this.afs.collection('files').doc(docId)
		.valueChanges()
		.subscribe(result=> {
			console.log('setting');
			console.log(result);
			this.fileStatus.next(result);
		});

	}







	/*
	 *
	 * 	Get afile ID on the base with a string
	 *
	 * 
	 */
	getFileIdFromString( fileName )
	{
		return this.afs.collection('files')
			.ref
			.where('name', '==', fileName)
			.where('parentId', '==', '0')
			.where('deleted', '==', false)
	    	.get( )


	}



	/*
	 *
	 * 	Get a file using an ID and a promise
	 *
	 * 
	 */
	getFileContentsWithPromise( docId )
	{
		return this.afs.collection('files')
			.ref
			.where('parentId', '==', docId)
			.where('deleted', '==', false)
	    	.get()
	}




	/*---------------------------------------------------------------------------------
	*
	*
	*		FILES RELATING TO THE SECONDARY METHOD OF GETTING A LIST OF FILES
	*		FOR A FOLDER BASED UPON A GIVEN URL STRING. 
	*
	*
	*
	*---------------------------------------------------------------------------------*/







	/*
	 *
	 *
	 * 	This is a secondary method of getting a list of files within
	 *	a parent folder. A separate one is needed to keep from interfering
	 *	with the normal list of files.
	 *
	 * 
	 */
	getTempFilesFromUrl( url )
	{

		// Set the url array and the url index
		this.urlArray = this.urlToArray( url );
		this.urlIndex = 0;

		// Call initial function to get top folder
		this.getTempIdFromParentAndName( '0', this.urlArray[this.urlIndex] )

	}



	/*
	 *
	 * 	Get the folder from the parent ID and name
	 *
	 * 
	 */
	getTempIdFromParentAndName( parentId, name )
	{
		this.afs.collection('files', ref => ref.where('name', '==', name).where('parentId', '==', parentId))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {
			this.permissionsService.getPermsForItem(result[0].uid);
			this.urlTempStatus.next(result);
		});

	}




	/*
	 *
	 * 	Get the folder and all of its contents
	 *
	 * 
	 */
	getTempWorkspaceContents( doc )
	{
		this.afs.collection('files', ref => ref.where('parentId', '==', doc.uid).where('deleted', '==', false))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {
			this.workspaceTempFileStatus.next(result);
			for (let a=0; a<result.length; a++)
			{
				this.permissionsService.getPermsForItem(result[a].uid);
			}
		});


		this.workspaceTempStatus.next(doc);


	}









	/*---------------------------------------------------------------------------------
	*
	*
	*		HEIRARCHY STUFF
	*
	*
	*
	*---------------------------------------------------------------------------------*/

	/*
	 *
	 * 	Given a file ID, build the heirarchy
	 *
	 * 
	 */
	buildHeirarchy( fileId, heirarchy )
	{

		this.afs.collection('files').ref.doc(fileId)
	    	.get()
	    	.then(res => {
	    		let fileData = res.data();
	    		fileData['uid'] = fileId;
	    		heirarchy.push(fileData);
	    		if ( fileData.parentId == '0' )
	    		{
	    			console.log('The heirarchy is ');
	    			console.log(heirarchy);
					this.heirarchyStatus.next( heirarchy );
	    		}else
	    		{
	    			this.buildHeirarchy( fileData.parentId, heirarchy );
	    		}
		}).catch(err => {
	        console.log('something went wrong '+ err)
	    });
	}





	/*
	 *
	 * 	Given an array that represents a heirarchy, create the string path
	 *
	 * 
	 */
	createPathFromHeirarchy( heirarchy ):string
	{

		let path='';
		for (let a=heirarchy.length-1; a>=0; a-- )
		{
			if ( heirarchy[a]['name'] )
			{
				path=path+'/'+heirarchy[a]['name'];
			}
		}
		return path
	}






	/*
	 *
	 * 	Populate permissions for a heirarchy
	 *
	 * 
	 */
	setHeirarchyUserPermissions( heirarchy:CadwolfFile[], 
								 permissions:Permission[],
								 userId:string ):CadwolfFile[]
	{

		return heirarchy
	}















	/*
	 *
	 * 	Create a new file of any type
	 *
	 * 
	 */
	createNewFile( typeNum, parentId )
	{
		console.log('Creating a new file with '+typeNum+' and '+parentId);


		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));

		let itemData : CadwolfFile = {
			creatorId 		: userData.uid,
			dateCreated 	: Date.now(),
			dateModified 	: Date.now(),
			fileType 		: typeNum,
			itemData 		: '{}',
			name 			: 'New '+this.fileTypeNames[typeNum],
			needsUpdate 	: false,
			oid 			: '0',
			order 			: 0,
			parentId		: parentId,
			version 		: 1,
			description 	: 'Description',
			deleted			: false,
			uid 			: '',
			id 				: '',

			viewPermType 	: 0,
			editPermType 	: 1,
			adminPermType 	: 1,

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


    	}).catch((error) => {
    		window.alert(error.message)
    	});

	}










	/*
	 *
	 * 	Update a file
	 *
	 * 
	 */
	updateFile( file, item )
	{
		this.afs.collection('files').doc(file.uid).update( file );

		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));
		let logObject = {};

		if ( item == 'name' )
		{
			logObject = { entryTitle 	: 'File Name Changed',
						  messageType 	: 'File Name Changed',
						  relatedFileId	: file.uid,
						  relatedUserId : userData.uid,
						  parentId		: file.parentId,
						  entryText		: 'File name changed to '+file.name };

		}

		if ( item == 'description' )
		{
			logObject = { entryTitle 	: 'Description Changed',
						  messageType 	: 'Description Changed',
						  relatedFileId	: file.uid,
						  relatedUserId : userData.uid,
						  parentId		: file.parentId,
						  entryText		: 'Description changed to '+file.description };

		}


		if ( item == 'order' )
		{
			logObject = { entryTitle 	: 'Order Changed',
						  messageType 	: 'Order Changed',
						  relatedFileId	: file.uid,
						  relatedUserId : userData.uid,
						  parentId		: file.parentId,
						  entryText		: 'Order changed to '+file.order };

		}


		this.logService.createLogEntry( logObject );

	}










	/*
	 *
	 * 	Change a permission setting
	 *
	 * 
	 */
	changePermissions( fileId, type, setting )
	{
		console.log('Updating the permission for '+fileId+' '+type+' to '+setting);

		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));

		if ( type == 'view' )
		{
			this.afs.collection('files').doc( fileId ).update( { 'viewPermType': setting} );
		}

		if ( type == 'edit' )
		{
			this.afs.collection('files').doc( fileId ).update( { 'editPermType': setting} );
		}

		if ( type == 'admin' )
		{
			this.afs.collection('files').doc( fileId ).update( { 'adminPermType': setting} );
		}


		let text = 'The '+type+' permissions were changed to '+setting;
		this.logService.createLogEntry({ entryTitle 	: 'Permission Setting Changed',
										 messageType 	: 'Permission Setting Changed',
										 relatedFileId	: fileId,
										 relatedUserId 	: userData.uid,
										 parentId		: 'NA',
										 entryText		: text });



	}




















	/*
	 *
	 * 	delete a file of any type
	 *
	 * 
	 */
	deleteFileItem( fileId )
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











	/*
	 *
	 * 	delete a file of any type
	 *
	 * 
	 */
	setWorkspaceDisplay( userId, fileId, permissions )
	{

		console.log('In set workspace display with '+userId+' - '+fileId);
		console.log(permissions);

		if (permissions.length == 0) { return 'view' }


		for ( let a=0; a<permissions.length; a++ )
		{
			if ( ( permissions[a]['itemId'] == fileId ) &&
				 ( permissions[a]['userId'] == userId ) && 
				 ( ( permissions[a]['permType'] == 'edit' ) || 
				   ( permissions[a]['permType'] == 'admin' ) ) )
			{
				return 'edit'
			}
		}

		return 'view'
	}










	/*
	 *
	 * 	Get the folders in a parent folder as well as their permissions
	 *
	 * 
	 */
	getFoldersAndPerms( parentId )
	{
		this.afs.collection('files', ref => ref.where('parentId', '==', parentId).where('fileType', '==', '0').where('deleted', '==', false))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {

			this.folderStatus.next(result);
			for (let a=0; a<result.length; a++)
			{
				this.permissionsService.getPermsForItem(result[a].uid);
			}
		});

	}






	/*
	 *
	 * 	move an item by changing its parent ID
	 *
	 * 
	 */
	moveItem( fileId, newParentId )
	{
		console.log('Moving '+fileId+' to '+newParentId);

		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));
		this.afs.collection('files').doc( fileId ).update({'parentId':newParentId});

		this.logService.createLogEntry({ entryTitle 	: 'File Moved',
										 messageType 	: 'File Moved',
										 relatedFileId	: fileId,
										 relatedUserId 	: userData.uid,
										 parentId		: newParentId,
										 entryText		: 'This file was moved to the folder with the parentId of '+newParentId });

	}













	/*---------------------------------------------------------------------------------
	*
	*
	*		UTILITY FUNCTIONS
	*
	*
	*
	*---------------------------------------------------------------------------------*/




	/*
	 *
	 * 	Take a string URL and change it into an array for
	 *	the purposes of getting the file
	 *
	 * 
	 */
	urlToArray( url )
	{
		let cleanUrl = url.replace('https://cadwolf-staging.herokuapp.com/', '');
		cleanUrl = cleanUrl.replace('https://www.cadwolf.com/', '');
		cleanUrl = cleanUrl.replace('https://cadwolf.com/', '');
		cleanUrl = cleanUrl.replace('https://www.cadwolf.com/', '');
		cleanUrl = cleanUrl.replace('http://localhost:4200/', '');
		cleanUrl = cleanUrl.replace('/Profile/','');
		cleanUrl = cleanUrl.replace('/Workspace/','');
		cleanUrl = cleanUrl.replace('/workspace/','');
		cleanUrl = cleanUrl.replace('Workspace/','');
		cleanUrl = cleanUrl.replace('workspace/','');
		cleanUrl = cleanUrl.replace('/Document/','');
		cleanUrl = cleanUrl.replace('/document/','');
		cleanUrl = cleanUrl.replace('Document/','');
		cleanUrl = cleanUrl.replace('document/','');
		cleanUrl = cleanUrl.replace('/PartTree/','');
		cleanUrl = cleanUrl.replace('/Workflow/','');
		cleanUrl = cleanUrl.replace(/\/$/,'');
		return cleanUrl.split('/');
	}






	/*
	 *
	 * 	Sort the workspaces by order
	 *
	 * 
	 */
	sortWorkspaces( workspaces )
	{
		return workspaces
		console.log(workspaces);
		if ( workspaces.length>0 )
		{
			return workspaces.sort((a, b) => (a.order > b.order) ? 1 : -1);
		}else
		{
			return workspaces
		}
	}



	/*
	 *
	 * 	Return the array of file types
	 *
	 * 
	 */
	getFileTypes( ):string[]
	{
		return this.fileTypeNames
	}	


	


}