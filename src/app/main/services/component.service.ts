
/*


	This is the service that handles all CRUD related items for 
	the components. Components are the items that make up a 
	document. A component can be text, an equation, a plot,
	or any other item.

	Any time a component is created, read, updated, or deleted,
	it is done from this service.


*/



import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';
import { LogEntry } from 'app/main/models/log';
import { Permission } from 'app/main/models/permission';
import { CadwolfComponent } from 'app/main/models/cadwolfComponent';




// Services
import { AuthService } from 'app/main/services/auth.service';
import { LogService } from 'app/main/services/log.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';



@Injectable({
	providedIn: 'root'
})
export class ComponentService {


	componentStatus 	: BehaviorSubject<any>;


	constructor(
		public afs 			: AngularFirestore,
		public logService 	: LogService,
	) 
	{ 
		this.componentStatus 	= new BehaviorSubject([]);
	}






	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS FOR COMPONENTS
	//
	// -----------------------------------------------------------------------------------------------------


  	//  Create a component
	createComponent( objData )
	{
		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));

		let componentData = this.setInitialComponentData( objData );
		console.log(componentData);
		var docRef = this.afs.collection('components').add( componentData )
    	.then((docRef) => {

			this.afs.collection('components').doc(docRef.id).update({'id':docRef.id, 'ocId':docRef.id });
			//this.afs.collection('components').doc(docRef.id).update({'ocId':docRef.id });

			this.logService.createLogEntry({ entryTitle 	: 'Component Created',
											 messageType 	: 'Component Creation',
											 relatedFileId	: objData.fileId,
											 relatedUserId 	: userData.uid,
											 parentId 		: docRef.id,
											 entryText		: 'Component Created - '+docRef.id });

		});

	}


  	//  Set the initial component data
	setInitialComponentData( objData )
	{

		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));


		// Set the properties for all items
		let templateObj={};
		templateObj['fileId'] = objData.fileId; 
		templateObj['order']=objData.order;
		templateObj['dateCreated'] = Date.now();
		templateObj['dateModified'] = Date.now();
		templateObj['creatorId'] = userData.uid;
		templateObj['creatorName'] = userData.userName;
		templateObj['deleted']=false;
		templateObj['componentType']=objData.componentType;
		templateObj['content']={};
		templateObj['content']['name']='';
		templateObj['content']['inputFile']=0;
		templateObj['content']['inputID']='';
		templateObj['content']['pageLastPosition']=objData.order;
		templateObj['content']['width']='800';
		templateObj['content']['height']='50';
		templateObj['content']['marginbottom']='0';
		templateObj['content']['marginleft']='0';
		templateObj['content']['marginright']='0';
		templateObj['content']['margintop']='0';
		templateObj['content']['alignment']='left';
		templateObj['content']['parentId']='none';
		templateObj['content']['topParentId']='none';
		templateObj['content']['Values']={};
		templateObj['content']['active']=1;
		templateObj['content']['references']=[];
		templateObj['content']['renderTo']='standard';
		templateObj['content']['isConnectedEquation']=0;
		if (objData['parentid']!==undefined)
		{
			templateObj['content']['parentid']=objData['parentid'];
		}
		for (var prop in objData)
		{ 
			if (templateObj[prop]!==undefined) 
			{ 
				templateObj[prop]=objData[prop]; 
			} 
		}

		//templateObj['content']['topparentid']=this.getTopParent(templateObj, newID, worksheetObj);
		
		
		// Set the text specific properties
		if (objData.componentType=="text")
		{   
			templateObj['content']['text']='<p>Enter text here.</p>';
			templateObj['content']['showEdit']=false;
			templateObj['content']['showIcons']=false;
			templateObj['componentTypeId']=1;
		}



		// Set the header specific properties
		if (objData.componentType=="header")
		{   
			templateObj['content']['text']='Header Text';
			templateObj['content']['showEdit']=false;
			templateObj['content']['showIcons']=false;
			templateObj['componentTypeId']=2;
			templateObj['content']['hClass']='h1';
		}




		// Set the equation specific items
		if (objData.componentType=="equation")
		{   
			templateObj['name'] = 'newEquation';
			templateObj['content']['text']='Header Text';
			templateObj['componentTypeId']=3;
			templateObj['content']['eqType']='center';
			templateObj['content']['showEdit']=false;
		}


		return templateObj

	}





	//  Get the components for a document ID
	getComponentsForFile( fileId )
	{

 		this.afs.collection('components', ref => ref
 			.where('fileId', '==', fileId )
 			.where('deleted', '==', false)
 			.orderBy("order", "asc"))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {

			console.log('The components in the service are ');
			console.log(result);
			this.componentStatus.next(result);

		});

	}








  	//  Update a component
	updateComponent( objData )
	{
		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));

		console.log('Updating');
		console.log(objData);

		objData.dateModified = Date.now();

		this.afs.collection('components').doc( objData.id ).update( objData );

	}






  	//  Update one field of a component
	updateOrder( componentId, newValue )
	{
		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));
		this.afs.collection('components').doc( componentId ).update( {'dateModified': Date.now(),
																	  'order' : newValue } );

	}








  	//  Delete a component
	deleteComponent( component )
	{
		this.afs.collection('components').doc(component.id).update({ 'deleted':true });
	}







}
