

// Angular Core Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';
import { Permission } from 'app/main/models/permission';
import { CadwolfComponent } from 'app/main/models/cadwolfComponent';


// Text Editor
import { AngularEditorConfig } from '@kolkov/angular-editor';


// Services
import { DocumentService } from 'app/main/services/document.service';
import { ComponentService } from 'app/main/services/component.service';



@Component({
  selector: 'cadwolf-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {


	editorConfig	: AngularEditorConfig = this.documentService.kolkovSettings();


	constructor(
		private documentService 	: DocumentService,
		private componentService 	: ComponentService,
	) 
	{ 

	}


	@Input() component 		: CadwolfFile;
	@Input() currentItem 	: string;
	@Input() showEditItem 	: boolean;
	@Input() editperm 		: boolean;


	@Output() onComponentChanged: EventEmitter<any> = new EventEmitter<any>();

	changeComponent( component ){
		console.log('I should be emitting '+component);
		this.onComponentChanged.emit( component );
	}





	
	ngOnInit(): void {
	}




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
	*	Update a component
	*
	*/
	updateComponent( component:CadwolfComponent )
	{
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





}
