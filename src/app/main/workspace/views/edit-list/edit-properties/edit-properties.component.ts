
// Core Angular things
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'


// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';
import { Permission } from 'app/main/models/permission';


// Services
import { WorkspaceService } from 'app/main/services/workspace.service';




@Component({
	selector: 'edit-properties',
	templateUrl: './edit-properties.component.html',
	styleUrls: ['./edit-properties.component.scss']
})
export class EditPropertiesComponent implements OnInit {

	constructor(
        private workspaceService 	: WorkspaceService,
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
	updateFile( file )
	{
		console.log('I should be updating ');
		console.log(file);
		this.workspaceService.updateFile( file );
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

}
