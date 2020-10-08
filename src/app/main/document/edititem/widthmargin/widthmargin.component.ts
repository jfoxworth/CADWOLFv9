

// Angular Core Items
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


// Models
import { CadwolfComponent } from 'app/main/models/cadwolfComponent';



@Component({
  selector: 'cadwolf-width-margin',
  templateUrl: './widthmargin.component.html',
  styleUrls: ['./widthmargin.component.scss']
})
export class WidthmarginComponent implements OnInit {

	constructor() { }

	@Input() component : CadwolfComponent;


	@Output() onComponentChanged: EventEmitter<any> = new EventEmitter<any>();

	changeComponent( component ){
		console.log('I should be emitting ')
		console.log(component);
		this.onComponentChanged.emit( component );
	}






	ngOnInit(): void {
		console.log('The components in margins are ');
		console.log(this.component);
	}

}
