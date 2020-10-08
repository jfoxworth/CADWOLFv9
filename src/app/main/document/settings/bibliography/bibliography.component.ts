



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
	selector: 'document-settings-bibliography',
	templateUrl: './bibliography.component.html',
	styleUrls: ['./bibliography.component.scss']
})
export class BibliographyComponent implements OnInit {

  constructor() { }


	@Input() fileData : CadwolfFile;
	@Output() onFileChanged: EventEmitter<any> = new EventEmitter<any>();

	changeEditDisplay( val ){
		console.log('I should be emitting '+val);
		this.onFileChanged.emit( val );
	}



	ngOnInit(): void {
	}



}
