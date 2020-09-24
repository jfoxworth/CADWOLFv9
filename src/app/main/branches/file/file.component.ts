

// Standard Angular Items
import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Router, Routes, ActivatedRoute } from '@angular/router';


// Models
import { Branch } from 'app/main/models/branch';
import { CadwolfFile } from 'app/main/models/cadwolfFile';


// Services
import { BranchService } from 'app/main/services/branch.service';




@Component({
  selector: 'cadwolf-branchfile',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {


	constructor(
		private branchService 		: BranchService,
		private Router 				: Router,
	) 
	{ }


	@Input() file 		: CadwolfFile;


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
		console.log('I am going to /DocumentId/'+fileId);
		this.Router.navigateByUrl( '/DocumentId/'+fileId );		
	}


	newVersion( fileId )
	{
	}


	newRevision( fileId )
	{
	}


}
