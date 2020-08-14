
// Standard angular items
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';

import { MatTooltipModule } from '@angular/material/tooltip';


// RXJS itemss
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';
import { LogEntry } from 'app/main/models/log';
import { Permission } from 'app/main/models/permission';



// Services
import { WorkspaceService } from 'app/main/services/workspace.service';
import { LogService } from 'app/main/services/log.service';


@Component({
    selector: 'workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit, OnDestroy
{

	workspaceFiles 				: CadwolfFile[];
	errorFlag 					: boolean = false;
	workspaceData 				: CadwolfFile;
	dataFlag 					: boolean = false;
	dataFilesFlag 				: boolean = false;
    permissions           		: Permission[];
    private _unsubscribeAll 	: Subject<any>;

    addOptionDisplay 			: boolean = false;


	constructor(
        private workspaceService 	: WorkspaceService,
        private titleService 		: Title,
		private route 				: ActivatedRoute,
  	) 
	{        
        this._unsubscribeAll = new Subject();     
    }



	ngOnInit(): void {

		// Set the title
		this.titleService.setTitle( 'Workspace in Cadwolf' );

		// Get id from URL
		let url = this.route.snapshot.paramMap.get('workspacePath');

		// Get the workspace contents
		this.workspaceService.getWorkspaceAndContents( url )

        // This is an observable for the file data
        this.workspaceService.workspaceStatus
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((workspace)=>
            { 
            	this.workspaceData = workspace;
            	if ( this.workspaceData.uid )
            	{
            		this.dataFlag = true;
            	}
            });

        // This is an observable for the file contents
        this.workspaceService.workspaceFileStatus
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((workspaceFiles)=>
            { 
            	this.workspaceFiles = workspaceFiles;
            	if ( this.workspaceFiles.length > 0 )
            	{
	            	this.dataFilesFlag = true;
	            }

            });


        // This is an observable for the permissions
        this.workspaceService.permStatus
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((result)=>
            { 
                console.log('The permissions are ...');
                console.log(result);
                if (result)
                {
                	this.permissions.push(result);
            	}
            });


	}


	ngOnDestroy():void {

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

  	}	

}
