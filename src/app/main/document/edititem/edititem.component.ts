


// Angular Core Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';




// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';
import { Permission } from 'app/main/models/permission';
import { CadwolfComponent } from 'app/main/models/cadwolfComponent';




@Component({
	selector: 'cadwolf-edititem',
	templateUrl: './edititem.component.html',
	styleUrls: ['./edititem.component.scss']
})
export class EdititemComponent implements OnInit {

  constructor() { }



	@Input() component : CadwolfComponent;
	@Input() showEditItem : boolean;


	@Output() onComponentChanged: EventEmitter<any> = new EventEmitter<any>();
	@Output() onShowEditChanged: EventEmitter<any> = new EventEmitter<any>();

	changeComponent( component ){
		console.log('I should be emitting ')
		console.log(component);
		this.onComponentChanged.emit( component );
	}

	closeEditItem( ){
		this.onShowEditChanged.emit( false );
	}


	ngOnInit(): void {
	}



}
