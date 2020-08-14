import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


// Services
import { AuthService } from 'app/main/services/auth.service';
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



	constructor(	public afs: AngularFirestore )   
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
			this.getPermsForItem(result[0].uid);
			this.urlStatus.next(result);
		});

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
	 * 	Get the folder and all of its contents
	 *
	 * 
	 */
	getWorkspaceContents( doc )
	{
		this.afs.collection('files', ref => ref.where('parentId', '==', doc.uid))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {
			this.workspaceFileStatus.next(result);
		});


		this.workspaceStatus.next(doc);


	}


// {idField: 'uid'}



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





}