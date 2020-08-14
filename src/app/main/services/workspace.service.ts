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

	urlIndex 			: number = 0;							// Where we are in getting URL files
	urlArray 			: any[];								// Array housing the broken URL



	constructor(	public afs: AngularFirestore )   
 	{

		this.workspaceStatus 		= new BehaviorSubject([]);
		this.workspaceFileStatus 	= new BehaviorSubject([]);
		this.urlStatus 				= new BehaviorSubject([]);
		this.urlArray 				= [];
 	
		
		// Watch the urlStatus. If it is triggered, and we are at the end of the url array,
		// call the function to get all children. If not, recall function to get id of the
		// next child in the array
		this.urlStatus
			.subscribe((parentDoc)=>
			{

				console.log('urlStatus has been triggered');
				console.log(parentDoc);

				console.log('The array is ');
				console.log(this.urlArray);

				if ( parentDoc[0] )
				{
					console.log(' I made it here');

					// Increment the URL Index
					this.urlIndex = this.urlIndex + 1;

					console.log('The url index is '+this.urlIndex);
					console.log('THe array length is '+this.urlArray.length);
					
					// Get next ID in url array or get contents
					if ( this.urlIndex >= this.urlArray.length )
					{
						console.log('calling getWorkspaceContents');
						console.log(parentDoc);
						this.getWorkspaceContents( parentDoc[0] )
					}else
					{
						console.log('calling getIdFromParentAndName');
						console.log(parentDoc[0]+' - '+this.urlIndex);
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
		console.log('In getWorkspaceAndContents with '+url);

		// Set the url array and the url index
		this.urlArray = this.urlToArray( url );
		this.urlIndex = 0;

		console.log('Sending this array to getIdFromParentAndName');
		console.log(this.urlArray);

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
		console.log('In getIdFromParenAndName with '+parentId+' and '+name);
		this.afs.collection('files', ref => ref.where('name', '==', name).where('parentId', '==', parentId))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {
			console.log('1. The workspace that I am returning is ...');
			console.log(result);
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
		console.log('In getWorkspaceContents with '+doc.uid);
		this.afs.collection('files', ref => ref.where('parentId', '==', doc.uid))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {
			console.log('2. The workspace files that I am returning are ...');
			console.log(result);
			this.workspaceFileStatus.next(result);
		});


		this.workspaceStatus.next(doc);


	}


// {idField: 'uid'}



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