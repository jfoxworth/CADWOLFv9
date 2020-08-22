import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


// Services
import { AuthService } from 'app/main/services/auth.service';
import { PermissionsService } from 'app/main/services/permissions.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';



// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';





@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

	workspaceStatus 	: BehaviorSubject<any>;					// Handles the data within the workspace
	workspaceFileStatus : BehaviorSubject<any>;					// Handles the data within the workspace
	urlStatus 			: BehaviorSubject<any>;					// Handles the data within the workspace
	permStatus 			: BehaviorSubject<any>;					// Handles the data within the workspace

	urlIndex 			: number = 0;							// Where we are in getting URL files
	urlArray 			: any[];								// Array housing the broken URL
	pathArray 			: string[];								// Array holding the ids of the path
	viewArrayType 		: string[];
	editArrayType 		: string[];
	adminArrayType 		: string[];
	fileTypeNames 		: string[];



	constructor(	public afs 					: AngularFirestore,
					public permissionsService 	: PermissionsService )   
 	{

		this.workspaceStatus 		= new BehaviorSubject([]);
		this.workspaceFileStatus 	= new BehaviorSubject([]);
		this.urlStatus 				= new BehaviorSubject([]);
		this.permStatus 			= new BehaviorSubject([]);
		this.urlArray 				= [];
		this.pathArray 				= [];
		this.viewArrayType 			= [];
		this.editArrayType 			= [];
		this.adminArrayType 		= [];


		this.fileTypeNames = ['Folder', 'Document', 'Dataset', 'Part Tree', 'Image', 'Forum']
 	
		
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

	}




	/*
	 *
	 * 	Get the folder and all of its contents
	 *
	 * 
	 */
	getWorkspaceAndContents( url )
	{

		// Set the url array and the url index
		this.urlArray = this.urlToArray( url );
		this.urlIndex = 0;

		// Call initial function to get top folder
		this.getIdFromParentAndName( '0', this.urlArray[this.urlIndex] )

	}





	/*
	 *
	 * 	Get the folder from the parent ID and name
	 *
	 * 
	 */
	getIdFromParentAndName( parentId, name )
	{
		this.afs.collection('files', ref => ref.where('name', '==', name).where('parentId', '==', parentId))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {
			this.pathArray.push(result[0].uid);
			this.viewArrayType.push(result[0]['viewPermType']);
			this.editArrayType.push(result[0]['editPermType']);
			this.adminArrayType.push(result[0]['adminPermType']);
			this.permissionsService.getPermsForItem(result[0].uid);
			this.urlStatus.next(result);
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
		cleanUrl = cleanUrl.replace('/Document/','');
		cleanUrl = cleanUrl.replace('/PartTree/','');
		cleanUrl = cleanUrl.replace('/Workflow/','');
		cleanUrl = cleanUrl.replace(/\/$/,'');
		return cleanUrl.split('/');
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

			viewPermType 	: 0,
			editPermType 	: 1,
			adminPermType 	: 1,

		}

		var docRef = this.afs.collection('files').add( itemData )
    	.then((docRef) => {
    		console.log('the result is ...');
    		console.log(docRef.id);
			this.afs.collection('files').doc(docRef.id).update({'oid':docRef.id});
			this.permissionsService.addPermission( {uid:docRef.id}, userData, 'admin', 'user' );
			this.permissionsService.addPermission( {uid:docRef.id}, userData, 'edit', 'user' );
			this.permissionsService.addPermission( {uid:docRef.id}, userData, 'view', 'user' );
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
	updateFile( file )
	{
		console.log('Update file ');
		console.log(file);

		this.afs.collection('files').doc(file.uid).update( file );

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

	}














	/*
	 *
	 * 	Sort the workspaces by order
	 *
	 * 
	 */
	sortWorkspaces( workspaces )
	{
		console.log('Updating workspaces');

		return workspaces.sort((a, b) => (a.order > b.order) ? 1 : -1);
	}












	/*
	 *
	 * 	delete a file of any type
	 *
	 * 
	 */
	deleteFileItem( fileId )
	{
		console.log('Deleting file with id of '+fileId);
		this.afs.collection('files').doc( fileId ).update({'deleted':true});
	}











	/*
	 *
	 * 	delete a file of any type
	 *
	 * 
	 */
	setWorkspaceDisplay( userId, fileId, permissions )
	{
		console.log('Setting permissions for '+fileId);

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
	 * 	move an item by changing its parent ID
	 *
	 * 
	 */
	moveItem( fileId, parentId )
	{
		console.log('Moving '+fileId+' to '+parentId);
		this.afs.collection('files').doc( fileId ).update({'parentId':parentId});

	}





}