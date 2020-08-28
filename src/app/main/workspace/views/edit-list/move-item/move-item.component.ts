

// Standard Angular Item
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'



// RXJS itemss
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';
import { Permission } from 'app/main/models/permission';


// Services
import { WorkspaceService } from 'app/main/services/workspace.service';
import { PermissionsService } from 'app/main/services/permissions.service';




@Component({
  selector: 'move-item',
  templateUrl: './move-item.component.html',
  styleUrls: ['./move-item.component.scss']
})
export class MoveItemComponent implements OnInit {


	tempLocation 	: string = '';
	tempParentId 	: string = '';
	validLocation 	: boolean = false;
	dataFilesFlag	: boolean = false;
	tempFolders 	: CadwolfFile[];
	private _unsubscribeAll 	: Subject<any>;



	constructor(
		private workspaceService 	: WorkspaceService,
		private permissionsService 	: PermissionsService,
	) 
	{ 
		this._unsubscribeAll = new Subject();	
	}




	@Input() file : CadwolfFile;
	@Input() workspaceFiles : CadwolfFile[];
	@Input() permissions : Permission[];





	ngOnInit(): void {


		// This is an observable for the file contents
		this.workspaceService.workspaceFileStatus
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((workspaceFiles)=>
			{ 
				console.log('The files are');
				console.log(workspaceFiles);
				this.tempFolders = this.workspaceService.sortWorkspaces(workspaceFiles);
				if ( this.tempFolders.length > 0 )
				{
					this.dataFilesFlag = true;
				}

			});


		// This is an observable for the permissions
		this.permissionsService.permStatus
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((result)=>
			{ 
				if (result)
				{
					for (let a=0; a<result.length; a++)
					{
						this.permissions.push(result[a]);
					}
				}
				this.permissions.sort((a, b) => (a.userId > b.userId) ? 1 : -1)

			});	

	}



	/*
	*
	*
	*	PUBLIC FUNCTIONS
	*
	*
	*/






	/*
	*
	*	Check to see if a location is valid
	*
	*/
	getBaseIdFromString( urlString )
	{
		this.workspaceService.getFileIdFromString( urlString )
	    	.then(res => {

	    		console.log('The res is ');
	    		console.log(res);
	    		console.log(res.docs[0].data());

		}).catch(err => {
	        console.log('something went wrong '+ err)
	    });

	}




	moveItem( file )
	{
		this.workspaceService.moveItem( file.uid, this.tempParentId );
	}



}
