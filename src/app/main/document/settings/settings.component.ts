
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
  selector: 'document-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

	constructor() { }


	@Input() editItem : string;
	@Input() fileData : CadwolfFile;

	@Output() onEditDisplayChanged: EventEmitter<string> = new EventEmitter<string>();

	changeEditDisplay( val ){
		console.log('I should be emitting '+val);
		this.onEditDisplayChanged.emit( val );
	}




	ngOnInit(): void {
	
	}



}
