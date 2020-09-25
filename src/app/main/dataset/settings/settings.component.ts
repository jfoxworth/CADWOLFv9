

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
	selector: 'dataset-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {




	@Input() fileData : CadwolfFile;




	constructor(
		private datasetService 		: DatasetService,
  	) { }



	// -----------------------------------------------------------------------------------------------------
	//
	// @ LIFE CYCLE HOOKS
	//
	// -----------------------------------------------------------------------------------------------------


	ngOnInit(): void {


	}





	// -----------------------------------------------------------------------------------------------------
	// @ Functions
	// -----------------------------------------------------------------------------------------------------



	// -----------------------------------------------------------------------------------------------------
	//
	// @ FUNCTIONS TO UPDATE PARSERS
	//
	// -----------------------------------------------------------------------------------------------------

	deleteParser( index:number )
	{
		this.fileData.itemData.parsers.splice( index, 1 );
	}


	addParser( index:number )
	{
		this.fileData.itemData.parsers.splice( index, 0, '*' );
	}



}
