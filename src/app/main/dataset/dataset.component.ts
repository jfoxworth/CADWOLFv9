

// Standard angular items
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title }	 from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { RouterModule, Router, Routes, ActivatedRoute } from '@angular/router';
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
import { WorkspaceService } from 'app/main/services/workspace.service';




@Component({
	selector: 'app-dataset',
	templateUrl: './dataset.component.html',
	styleUrls: ['./dataset.component.scss'],
	animations   : fuseAnimations
})
export class DatasetComponent implements OnInit {

	private _unsubscribeAll 	: Subject<any>;
	userData 					: any;
	fileData 					: CadwolfFile;
	datasetId 					: string;
	dataFlag 					: boolean = false;

	constructor(
		private datasetService 		: DatasetService,
		private workspaceService 	: WorkspaceService,
		private Router 				: Router,
		private route 				: ActivatedRoute,
        private titleService 		: Title
		)
	{		
		this._unsubscribeAll = new Subject();	
	}



	
	// -----------------------------------------------------------------------------------------------------
	//
	// @ Life cycle hooks
	//
	// -----------------------------------------------------------------------------------------------------

	ngOnInit(): void {


		// Get the user data
		this.userData = JSON.parse(localStorage.getItem('cadwolfUserData'));

		// Set the initial title
		this.titleService.setTitle( 'Dataset in Cadwolf' );


		// Get URL
		let url = this.Router.url;

		// If the URL has an ID, we only need to fetch that ID
		if ( ( url.match('/datasetId/') ) || ( url.match('/DatasetId/') ) )
		{
			// Get the ID from the path
			this.datasetId = this.route.snapshot.paramMap.get('datasetId');

			// Get the workspace contents
			this.workspaceService.getFile( this.datasetId )
		
		}

		// Subscribe to the data for this dataset
		this.subscribeToData();
	}




	ngOnDestroy():void {

		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();

  	}	




	// -----------------------------------------------------------------------------------------------------
	// @ Functions
	// -----------------------------------------------------------------------------------------------------



	// -----------------------------------------------------------------------------------------------------
	//
	// @ FUNCTIONS TO SUBSCRIBE TO DATA
	//
	// -----------------------------------------------------------------------------------------------------

	subscribeToData()
	{


		// This is an observable for the file data
		this.workspaceService.fileStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((file)=>
		{ 
			console.log('The file is ...');
			console.log(file);

			this.fileData = file;
			if ( this.fileData )
			{
				this.dataFlag = true;
				this.titleService.setTitle( 'Dataset - '+this.fileData.name );


				// See if this workspace is a favorite
//				this.isFavorite =  this.userService.isFavorite( this.fileData.uid );

				// Build the heirarchy data
//				this.workspaceService.buildHeirarchy( this.workspaceData.uid, [] );

			}
		});

	}



}
