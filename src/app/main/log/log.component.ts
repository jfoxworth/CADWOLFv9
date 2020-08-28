
// Standard Angular Stuff
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title }	 from '@angular/platform-browser';
import { RouterModule, Router, Routes, ActivatedRoute } from '@angular/router';


// RXJS itemss
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



// Models
import { LogEntry } from 'app/main/models/log';
import { CadwolfFile } from 'app/main/models/cadwolfFile';



// Services
import { LogService } from 'app/main/services/log.service';
import { WorkspaceService } from 'app/main/services/workspace.service';




@Component({
	selector: 'app-log',
	templateUrl: './log.component.html',
	styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

	private _unsubscribeAll 	: Subject<any>;
	private logEntries 			: LogEntry[];
	private userData 			: any;
	public fileData 			: CadwolfFile;
	public heirarchy 			: CadwolfFile[] = [];
	public dataFlag				: boolean = false;
	public itemId				: string;
	public filePath 			: string = '';
	public linkPath 			: string = '';
	public fileTypes 			: string[];



	constructor(
		private logService 			: LogService,
		private workspaceService 	: WorkspaceService,
		private titleService 		: Title,
		private route 				: ActivatedRoute,
	)
	{ 
		this._unsubscribeAll 	= new Subject();	
	}

	ngOnInit(): void {


		this.fileTypes = ['Workspace', 'Document', 'Dataset', 'Part Tree', 'Forum'];
		this.filePath = '';
		this.heirarchy = [];
		this.dataFlag = false;

		// Get the user data
		this.userData = JSON.parse(localStorage.getItem('cadwolfUserData'));

		// Set the title
		this.titleService.setTitle( 'Log' );

		// Get id from URL
		this.itemId = this.route.snapshot.paramMap.get('itemId');



		// Call function to get log data
		this.logService.getLogData( this.itemId );

		// This is an observable for the log data
		this.logService.logStatus
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((logEntries)=>
			{ 
				console.log(logEntries);
				this.logEntries = logEntries;
			});






		// Call function to get file data
		this.workspaceService.getFile( this.itemId );

		// This is an observable for the file data
		this.workspaceService.fileStatus
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((fileData)=>
			{ 
				if ( fileData.uid == this.itemId )
				{
					this.fileData = fileData;
					this.dataFlag = true;
					this.titleService.setTitle( 'Log Data - '+this.fileData.name );
				}

				this.heirarchy.push( fileData );
				console.log('heirarchy');
				console.log(this.heirarchy);

				if ( ( fileData.parentId != '0' ) && ( fileData.parentId !== undefined ) )
				{
					console.log('the parent ID is '+fileData.parentId);
					this.workspaceService.getFile( fileData.parentId );
				
				}else if (this.fileData)
				{
					this.filePath = this.fileTypes[this.fileData.fileType] +'/'+ this.workspaceService.createPathFromHeirarchy( this.heirarchy );
				}
			});



	}


	ngOnDestroy()
	{
		this.filePath = '';
		this.heirarchy = [];
		this.dataFlag = false;

	}


	/*
	*
	*
	*	PUBLIC FUNCTIONS
	*
	*/



}
