
// Core Angular things
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule, Router, Routes, ActivatedRoute } from '@angular/router';


// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';
import { Permission } from 'app/main/models/permission';


// Services
import { WorkspaceService } from 'app/main/services/workspace.service';
import { LogService } from 'app/main/services/log.service';
import { CadwolfFileService } from 'app/main/services/cadwolf-file.service';




@Component({
	selector: 'edit-properties',
	templateUrl: './edit-properties.component.html',
	styleUrls: ['./edit-properties.component.scss']
})
export class EditPropertiesComponent implements OnInit {

	constructor(
		private workspaceService 	: WorkspaceService,
		private logService 			: LogService,
		private cadwolfFileService 	: CadwolfFileService,
		private route 				: ActivatedRoute,
		private router 				: Router,
	) { }


	@Input() file : CadwolfFile;
	@Input() workspaceFiles : CadwolfFile[];
	@Input() permissions : Permission[];



	ngOnInit(): void {
	}


	/*
	*
	*
	*	PUBLIC FILES
	*
	*
	*/
	updateFile( file, item )
	{
		this.cadwolfFileService.updateCadwolfFile( file, item );

	}



	makeArray( num )
	{
		let newArray = [];
		for(var a=0; a<num; a++)
		{
			newArray.push(a);
		}
		return newArray
	}


	goToURL( url )
	{
		this.router.navigateByUrl( url );
	}

}
