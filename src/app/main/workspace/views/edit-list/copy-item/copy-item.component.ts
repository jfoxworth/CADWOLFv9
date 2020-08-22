
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
  selector: 'copy-item',
  templateUrl: './copy-item.component.html',
  styleUrls: ['./copy-item.component.scss']
})
export class CopyItemComponent implements OnInit {

	tempName : string = '';

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
	*/
	makeCopy( file )
	{
		
	}


}
