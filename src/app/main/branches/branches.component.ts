
// Angular Stuff
import { Component, OnInit } from '@angular/core';
import { Title }	 from '@angular/platform-browser';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';



// RXJS itemss
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';
import { Permission } from 'app/main/models/permission';
import { Branch } from 'app/main/models/branch';



// Services
import { WorkspaceService } from 'app/main/services/workspace.service';
import { PermissionsService } from 'app/main/services/permissions.service';
import { BranchService } from 'app/main/services/branch.service';



@Component({
	selector: 'app-branches',
	templateUrl: './branches.component.html',
	styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {

	fileId 						: string;
	branches 					: Branch[];
	fileData					: CadwolfFile[];
	fileDataFlag 				: boolean = false;
	branchesDataFlag 			: boolean = false;
	private _unsubscribeAll 	: Subject<any>;
	userData 					: any;


	constructor(
		private branchService 	: BranchService,
		private route 			: ActivatedRoute,
        private titleService 	: Title,
	) 
	{
		this._unsubscribeAll = new Subject();
	}



	ngOnInit(): void {
	

		// Get the user data
		this.userData = JSON.parse(localStorage.getItem('cadwolfUserData'));


		// Get file id from URL
		this.fileId = this.route.snapshot.paramMap.get('fileId');


		// Get the file and builds from the database
		this.branchService.getFiles( this.fileId );
		this.branchService.getBranches( this.fileId );


		// This is an observable for the file data
		this.branchService.fileStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((file)=>
		{ 

			console.log('The files returned are ');
			console.log(file);


			if ( file[0] !== undefined )
			{

				// Set the initial title
				this.titleService.setTitle( 'Branches and versions for '+file[0].name );


				this.fileData = file;
				this.fileDataFlag = true;
			}
		});



		// This is an observable for the branches
		this.branchService.branchesStatus
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((branches)=>
		{ 
			console.log('The branches returned are ');
			console.log(branches);

			if ( branches[0] !== undefined )
			{
				this.branches = branches;
				this.branchesDataFlag = true;
			}
		});


	}



}
