

// Standard Angular Item
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'



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


	tempLocation : string = '';
	tempParentId : string = '';

	constructor(
		private workspaceService 	: WorkspaceService,
		private permissionsService 	: PermissionsService,
	) 
	{ 

	}




	@Input() file : CadwolfFile;
	@Input() workspaceFiles : CadwolfFile[];
	@Input() permissions : Permission[];



	ngOnInit(): void {
	}



	/*
	*
	*
	*	PUBLIC FUNCTIONS
	*
	*
	*/

	moveItem( file )
	{
		this.workspaceService.moveItem( file.uid, this.tempParentId );
	}



}
