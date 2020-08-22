
// Standard Angular Items
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'



// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';
import { Permission } from 'app/main/models/permission';


// Services
import { WorkspaceService } from 'app/main/services/workspace.service';
import { UserService } from 'app/main/services/user.service';
import { PermissionsService } from 'app/main/services/permissions.service';





@Component({
	selector: 'edit-permissions',
	templateUrl: './edit-permissions.component.html',
	styleUrls: ['./edit-permissions.component.scss']
})
export class EditPermissionsComponent implements OnInit {


	viewPerm 			: string = '';
	permListOptions 	: string[] = [];
	tempName 			: string = '';
	potentialUserPerm 	: any = {}


	constructor(
		private workspaceService 	: WorkspaceService,
		private userService 		: UserService,
		private permissionsService 	: PermissionsService,
	) 
	{ 

	}


	@Input() file : CadwolfFile;
	@Input() workspaceFiles : CadwolfFile[];
	@Input() permissions : Permission[];



	ngOnInit(): void {

		// Set a list of permission options with a list
		this.permListOptions = this.setPermListOptions();

	}




	/*
	*
	*
	*	Public Functions
	*
	*
	*/



	// Change the permissions type for a file view, edit, or admin
	changePermissions( type, setting )
	{
		this.workspaceService.changePermissions( this.file.uid, type, setting );
		this.setPermListOptions();
	}




	// Set the perm list options
	setPermListOptions( )
	{
		let permList = [];
		this['file']['viewPermType'] == 1 ? permList.push('view') : '';
		this['file']['editPermType'] == 1 ? permList.push('edit') : '';
		this['file']['adminPermType'] == 1 ? permList.push('admin') : '';
		return permList
	}




	// Check if a user or team name is valid
	checkUserName( name )
	{

		this.userService.checkUserName( name )
		.subscribe(result=> {

			if ( result.docs.length>0 )
			{ 
				this.potentialUserPerm = result.docs[0].data();

			}else
			{
				this.potentialUserPerm = {};
			}
		});

	}








	// add a user perm
	addUserPerm( potentialUser )
	{
		let permType = 'user';

		if ( this.file.viewPermType == 1 )
		{
			this.permissionsService.addPermission( this.file, potentialUser, 'view', permType );

		}else if ( this.file.editPermType == 1 )
		{
			this.permissionsService.addPermission( this.file, potentialUser, 'edit', permType );

		}else if ( this.file.adminPermType == 1 )
		{
			this.permissionsService.addPermission( this.file, potentialUser, 'admin', permType );
		}

		this.potentialUserPerm = {};
		this.tempName = '';

	}






	// delete a user perm
	deletePermission( perm, i )
	{
		this.permissionsService.deletePermission( perm );

		this.permissions.splice(i, 1);
	}


}
