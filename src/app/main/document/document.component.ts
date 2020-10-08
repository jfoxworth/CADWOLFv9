
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
import { CadwolfFileService } from 'app/main/services/cadwolf-file.service';


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

	userData 					: any;
	fileId 						: string;
	addOptionDisplay 			: boolean =  false;
	addButtons1 				: any[];
	addButtons2 				: any[];
	addButtons3 				: any[];
	currentItem 				: CadwolfComponent;
	editItem 					: string = 'properties';
	showEditPanel 				: boolean = false;
	showEditItem 				: boolean = false;
	editPerm 					: boolean = true;

	editorConfig 				: AngularEditorConfig = this.documentService.kolkovSettings();
	private _unsubscribeAll 	: Subject<any>;

	constructor(
		private documentService 	: DocumentService,
		private componentService 	: ComponentService,
		private cadwolfFileService 	: CadwolfFileService,
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
		this.cadwolfFileService.getFileById( this.fileId );


		// Get the components for this file
		this.componentService.getComponentsForFile( this.fileId );


		// Get the add Item buttons
		this.addButtons1 = this.documentService.getButton1Items();
		this.addButtons2 = this.documentService.getButton2Items();
		this.addButtons3 = this.documentService.getButton3Items();


		// Subscribe to data
		this.subscribeToData();

	}




	// -----------------------------------------------------------------------------------------------------
	// @ Functions
	// -----------------------------------------------------------------------------------------------------



	// -----------------------------------------------------------------------------------------------------
	//
	// @ FUNCTIONS TO SUBSCRIBE TO DATA
	//
	// -----------------------------------------------------------------------------------------------------


	subscribeToData()
	{


		// This is an observable for the file data
		this.cadwolfFileService.fileStatus
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
						this.fileData.itemData = JSON.parse( this.fileData.itemData );
					}
					this.titleService.setTitle( this.fileData.name );
					this.fileDataFlag = true;

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

			this.componentData = components;
			this.componentDataFlag = true;	
		});



	}





	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS
	//
	// -----------------------------------------------------------------------------------------------------


	//  Add a component to this document
	addComponent( componentType:string, order:number )
	{
		this.componentService.createComponent( { 'componentType' 	: componentType, 
												 'order' 			: order,
												 'fileId'			: this.fileData.id} );
	}


	//  Update a component
	updateComponent( component:CadwolfComponent )
	{
		this.componentService.updateComponent( component );
	}


	//  Delete a component
	deleteComponent( component:CadwolfComponent )
	{
		this.componentService.deleteComponent( component );
	}







	// -----------------------------------------------------------------------------------------------------
	//
	// @ DRAG AND DROP FUNCTIONS
	//
	// -----------------------------------------------------------------------------------------------------

	dropItem( event : CdkDragDrop<string[]> )
	{
		console.log(event);


		// If this is a drag/drop from the add item list to the document
		if ( event.previousContainer.id == 'cdk-drop-list-1' )
		{

			// Create the component
			this.componentService.createComponent( { 'componentType' 	: event.item.data.addItem,
													 'order' 			: event.currentIndex,
													 'fileId' 			: this.fileData.id } );

			// Move down all of the other components
			this.componentData.forEach(component => {
				if (component.order >= event.currentIndex)
				{
					this.componentService.updateOrder(component.id, component.order+1);
				}
			});

		}


		// If this is a drag/drop within the document list
		if ( event.previousContainer.id == 'cdk-drop-list-0' )
		{

			// Update the component with the new order
			this.componentService.updateOrder( event.item.element.nativeElement.id, event.currentIndex );


			// Move down all of the other components
			this.componentData.forEach(component => {
				if ( ( component.order >= event.currentIndex ) && ( component.order < event.previousIndex ) )
				{
					this.componentService.updateOrder(component.id, component.order+1);
				}
			});

		}




	}











	// -----------------------------------------------------------------------------------------------------
	//
	// @ FUNCTIONS RELATED TO EVENT EMITTORS IN CHILDREN
	//
	// -----------------------------------------------------------------------------------------------------

	onFileChanged( val: any ) {
	    this.fileData = val;
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


	onShowEditChanged( val : boolean ) {
		console.log('In the emitter');
		this.showEditItem = val;
	}





}
