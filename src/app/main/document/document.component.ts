
// Angular Stuff
import { Component, OnInit } from '@angular/core';
import { Title }	 from '@angular/platform-browser';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';


// Drag and drop items
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';



// RXJS itemss
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


// Fuse Specific Items
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';



// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';
import { Permission } from 'app/main/models/permission';
import { CadwolfComponent } from 'app/main/models/cadwolfComponent';



// Services
import { DocumentService } from 'app/main/services/document.service';
import { ComponentService } from 'app/main/services/component.service';


// Text Editor
import { AngularEditorConfig } from '@kolkov/angular-editor';




@Component({
	selector: 'app-document',
	templateUrl: './document.component.html',
	styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

	
	fileData					: CadwolfFile;
	fileDataFlag 				: boolean = false;

	componentData				: CadwolfComponent[];
	componentDataFlag 			: boolean = false;

	private _unsubscribeAll 	: Subject<any>;
	userData 					: any;
	fileId 						: string;
	addOptionDisplay 			: boolean =  false;
	addButtons 					: any[];
	currentItem 				: CadwolfComponent;
	editItem 					: string = 'this is it';

	editorConfig 				: AngularEditorConfig = this.documentService.kolkovSettings();

	constructor(
		private documentService 	: DocumentService,
		private componentService 	: ComponentService,
		private route 				: ActivatedRoute,
		private titleService 		: Title,
	) 
	{ 
		this._unsubscribeAll = new Subject();
	}





	ngOnInit(): void {
	

		// Get the user data
		this.userData = JSON.parse(localStorage.getItem('cadwolfUserData'));


		// Get file id from URL
		this.fileId = this.route.snapshot.paramMap.get('documentId');


		// Get the file and builds from the database
		this.documentService.getFileById( this.fileId );


		// Get the components for this file
		this.componentService.getComponentsForFile( this.fileId );


		// Get the add Item buttons
		this.addButtons = this.documentService.getAddComponentItems();


		// This is an observable for the file data
		this.documentService.fileStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((file)=>
		{ 

			if ( file !== undefined )
			{
				if ( file.itemData )
				{
					this.fileData = file;
					if ( typeof(this.fileData.itemData) == 'string' )
					{
					console.log('The file data is ');
					console.log(this.fileData);
						this.fileData.itemData = JSON.parse( this.fileData.itemData );
					}
					this.titleService.setTitle( this.fileData.name );
					this.fileDataFlag = true;

					console.log('The file data is ');
					console.log(this.fileData);

				}


			}
		
		});




		// This is an observable for the file data
		this.componentService.componentStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((components)=>
		{ 
			for (let a=0; a<components.length; a++)
			{
				if ( typeof(components[a].content) == "string" )
				{
					components[a].content = JSON.parse(components[a].content);
				}
			}
			console.log('The components are ');
			console.log(components);
			this.componentData = components;
			this.componentDataFlag = true;	
		});



	}






	/*
	*
	*
	*	PUBLIC FUNCTIONS
	*
	*
	*/


	/*******************************************************************************
	*
	*
	*	CRUD FUNCTIONS FOR COMPONENTS
	*
	*
	*******************************************************************************/


	/* 
	*
	*
	*	Add a component to this document
	*
	*/
	addComponent( componentType:string, order:number )
	{
		this.componentService.createComponent( { 'componentType' 	: componentType, 
												 'order' 			: order,
												 'fileId'			: this.fileData.id} );
	}




	/* 
	*
	*
	*	Update a component
	*
	*/
	updateComponent( component:CadwolfComponent )
	{
		console.log('The component is ...');
		console.log(component);

		this.componentService.updateComponent( component );
	}



	/* 
	*
	*
	*	Delete a component
	*
	*/
	deleteComponent( component:CadwolfComponent )
	{
		this.componentService.deleteComponent( component );
	}





	/*******************************************************************************
	*
	*
	*	DRAG AND DROP FUNCTIONS
	*
	*
	*******************************************************************************/

	dropItem( event : CdkDragDrop<string[]> )
	{
		console.log(event);
		this.componentService.createComponent( { 'componentType' 	: event.item.data.addItem,
												 'order' 			: event.currentIndex,
												 'fileId' 			: this.fileData.id } );

	}












	/*******************************************************************************
	*
	*
	*	FUNCTIONS RELATED TO EVENT EMITTORS IN CHILDREN
	*
	*
	*******************************************************************************/

	onEditDisplayChanged( val: string ) {
		console.log('new val is '+val);
	    this.editItem = val;
	}




	onComponentChanged( component : CadwolfComponent ) {
		console.log('new component is ');
		console.log(component);
		for (var a=0; a<this.componentData.length; a++)
		{
			if ( this.componentData[a]['id'] ==  component.id )
			{
				this.componentData[a] = component;
				this.componentService.updateComponent( component );
			}
		}

	}




}
