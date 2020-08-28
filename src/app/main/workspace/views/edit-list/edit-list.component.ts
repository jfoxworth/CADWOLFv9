
// Standard Angular Stuff
import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Router, Routes, ActivatedRoute } from '@angular/router';


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

	selectedId 		: string;
	fileTypes		: string[];


	constructor(
		private workspaceService 	: WorkspaceService,
		private permissionsService 	: PermissionsService,
		private Router 				: Router,
		private route 				: ActivatedRoute,
	) 
	{ 

	}



	@Input() workspaceData : CadwolfFile;
	@Input() workspaceFiles : CadwolfFile[];
	@Input() permissions : Permission[];


	ngOnInit(): void {

		this.selectedId = this.workspaceFiles[0]['uid'];

		this.fileTypes = this.workspaceService.getFileTypes();
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


	goToUrl( file )
	{

		let url = this.Router.url;
		console.log('Going to '+this.fileTypes[file.fileType]+'Id/'+file.uid);
		this.Router.navigateByUrl( this.fileTypes[file.fileType]+'Id/'+file.uid );
	}





	goToFile( file )
	{

		console.log('I should be going to ');
		console.log(file);

		// If this is another workspace, reload it
		if ( file.fileType == 0 )
		{
			this.Router.navigateByUrl( '/'+this.fileTypes[file.fileType]+'Id/'+file.uid );
			this.workspaceService.getWorkspaceAndContents( file.uid, 0 )

		}else
		{
			this.Router.navigateByUrl( '/'+this.fileTypes[file.fileType]+'Id/'+file.uid );
		}


	}




}
