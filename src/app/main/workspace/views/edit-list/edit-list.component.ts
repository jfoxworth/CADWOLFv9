import { Component, OnInit, Input } from '@angular/core';


// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';
import { Permission } from 'app/main/models/permission';


// Services
import { WorkspaceService } from 'app/main/services/workspace.service';
import { PermissionsService } from 'app/main/services/permissions.service';
 


@Component({
	selector: 'workspace-edit-list',
	templateUrl: './edit-list.component.html',
	styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

	selectedItem : CadwolfFile;


	constructor(
		private workspaceService 	: WorkspaceService,
		private permissionsService 	: PermissionsService,
	) 
	{ 

	}



	@Input() workspaceData : CadwolfFile;
	@Input() workspaceFiles : CadwolfFile[];
	@Input() permissions : Permission[];


	ngOnInit(): void {

		this.selectedItem = this.workspaceFiles[0];
	}



	/*
	*
	*
	*	PUBLIC FUNCTIONS
	*
	*/
	deleteFileItem( fileId )
	{
		this.workspaceService.deleteFileItem( fileId );
	}

}
