
// Standard Angular Items
import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Router, Routes, ActivatedRoute } from '@angular/router';


// Models
import { Branch } from 'app/main/models/branch';
import { CadwolfFile } from 'app/main/models/cadwolfFile';


// Services
import { BranchService } from 'app/main/services/branch.service';




@Component({
  selector: 'cadwolf-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {

	

	constructor(
		private branchService 		: BranchService,
		private Router 				: Router,
	) 
	{ }


	@Input() branches 		: Branch[];
	@Input() branch 		: Branch;
	@Input() parentBranch 	: string;


	ngOnInit(): void {


	}



	/*
	*
	*
	*	PUBLIC FUNCTIONS
	*
	*
	*/


	goToDoc( fileId )
	{
		this.Router.navigateByUrl( 'DocumentId/'+fileId );		
	}


	newVersion( fileId )
	{
		this.Router.navigateByUrl( 'DocumentId/'+fileId );		
	}


	newRevision( fileId )
	{
		this.Router.navigateByUrl( 'DocumentId/'+fileId );		
	}


}
