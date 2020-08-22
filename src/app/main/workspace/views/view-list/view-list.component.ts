import { Component, OnInit, Input } from '@angular/core';


// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';


// Services
import { WorkspaceService } from 'app/main/services/workspace.service';


@Component({
	selector: 'workspace-view-list',
	templateUrl: './view-list.component.html',
	styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent implements OnInit {

	constructor() { }



	@Input() workspaceData : CadwolfFile;
	@Input() workspaceFiles : CadwolfFile[];
	selectedItem : CadwolfFile;



	ngOnInit(): void {
	}

}
