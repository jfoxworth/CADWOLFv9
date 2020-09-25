


// Standard angular items
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';


// Angular Material Items
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';



// RXJS itemss
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';



// Services
import { DatasetService } from 'app/main/services/dataset.service';




@Component({
	selector: 'dataset-input-text',
	templateUrl: './input-text.component.html',
	styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {



	@Input() fileData : CadwolfFile;


	constructor() { }




	ngOnInit(): void {

	}



}
