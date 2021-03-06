

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
  selector: 'document-settings-toc',
  templateUrl: './toc.component.html',
  styleUrls: ['./toc.component.scss']
})
export class TocComponent implements OnInit {


	@Input() fileData : CadwolfFile;
	@Output() onFileChanged: EventEmitter<any> = new EventEmitter<any>();

	changeEditDisplay( val ){
		console.log('I should be emitting '+val);
		this.onFileChanged.emit( val );
	}


	constructor() { }

	

	ngOnInit(): void {
	}



}
