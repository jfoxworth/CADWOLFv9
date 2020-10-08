


// Angular Core Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';
import { Permission } from 'app/main/models/permission';
import { CadwolfComponent } from 'app/main/models/cadwolfComponent';


// Text Editor
import { AngularEditorConfig } from '@kolkov/angular-editor';


// Services
import { ComponentService } from 'app/main/services/component.service';





@Component({
	selector: 'cadwolf-equation',
	templateUrl: './equations.component.html',
	styleUrls: ['./equations.component.scss']
})


export class EquationsComponent implements OnInit {



	constructor(
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



}
