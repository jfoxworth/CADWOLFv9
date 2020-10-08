


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
	selector: 'cadwolf-header',
	templateUrl: './headers.component.html',
	styleUrls: ['./headers.component.scss']
})
export class HeadersComponent implements OnInit {



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
	@Output() onShowEditChanged: EventEmitter<any> = new EventEmitter<any>();

	changeComponent( component ){
		console.log('I should be emitting '+component);
		this.onComponentChanged.emit( component );
	}

	changeShowEditItem( val ){
		console.log('Here');
		this.onShowEditChanged.emit( val );		
	}



	
	ngOnInit(): void {
	}




}
