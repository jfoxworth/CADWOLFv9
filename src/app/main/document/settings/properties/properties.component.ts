


// Angular Core Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';


// Text Editor
import { AngularEditorConfig } from '@kolkov/angular-editor';



// Services
import { DocumentService } from 'app/main/services/document.service';
import { ComponentService } from 'app/main/services/component.service';




@Component({
	selector: 'document-settings-properties',
	templateUrl: './properties.component.html',
	styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

	editorConfig	: AngularEditorConfig = this.documentService.kolkovSettings();

	
	constructor(
		private documentService 	: DocumentService,
	) { }


	@Input() fileData : CadwolfFile;
	@Output() onFileChanged: EventEmitter<any> = new EventEmitter<any>();

	changeEditDisplay( val ){
		console.log('I should be emitting '+val);
		this.onFileChanged.emit( val );
	}


	ngOnInit(): void {
	}

}

