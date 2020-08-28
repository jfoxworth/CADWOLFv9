
// Standard angular items
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { RouterModule, Router, Routes, ActivatedRoute } from '@angular/router';

import { MatTooltipModule } from '@angular/material/tooltip';


// RXJS itemss
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



// Models
import { CadwolfFile } from 'app/main/models/cadwolfFile';
import { Permission } from 'app/main/models/permission';



// Services
import { WorkspaceService } from 'app/main/services/workspace.service';
import { PermissionsService } from 'app/main/services/permissions.service';
import { UserService } from 'app/main/services/user.service';




@Component({
    selector: 'workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit, OnDestroy
{

	workspaceFiles 				: CadwolfFile[];
	errorFlag 					: boolean = false;
	workspaceData 				: CadwolfFile;
	dataFlag 					: boolean = false;
	dataFilesFlag 				: boolean = false;
    permissions           		: Permission[] = [];
    private _unsubscribeAll 	: Subject<any>;
    displayType 				: string = 'view';
    isFavorite 					: boolean = false;
    filePath 					: string;
    workspaceId 				: string;
    heirarchy 					: any =[];
    fileTypes 					: string[];

    addOptionDisplay 			: boolean = false;
    userData 					: any;


	constructor(
        private workspaceService 	: WorkspaceService,
        private userService 		: UserService,
        private permissionsService 	: PermissionsService,
        private titleService 		: Title,
		private route 				: ActivatedRoute,
		private Router 				: Router,
  	) 
	{        
        this._unsubscribeAll = new Subject();    
    }



	ngOnInit(): void {

		// Set the file types
		this.fileTypes = this.workspaceService.getFileTypes();

		// Get the user data
        this.userData = JSON.parse(localStorage.getItem('cadwolfUserData'));


		// Get URL
		let url = this.Router.url;


		// If the URL is a blank /Workspace, then go to this user
		if ( ( ( url == '/workspace' ) || ( url == '/Workspace' ) ) && ( this.userData ) )
		{
			this.Router.navigateByUrl('/Workspace/'+this.userData.userName);
			url = '/Workspace/'+this.userData.userName;
		}



		// Set the initial title
		this.titleService.setTitle( 'Workspace in Cadwolf' );


		// If the URL has an ID, we only need to fetch that ID
		if ( ( url.match('/workspaceId/') ) || ( url.match('/WorkspaceId/') ) )
		{
			// Get the ID from the path
			this.workspaceId = this.route.snapshot.paramMap.get('workspaceId');

			// Get the workspace contents
			this.workspaceService.getWorkspaceAndContents( this.workspaceId, 0 )
		

		// If the URL is a string for the file path
		}else
		{
			// Get the workspace contents
			this.workspaceService.getWorkspaceAndContents( url, 1 )
		}






        // This is an observable for the file data
        this.workspaceService.workspaceStatus
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((workspace)=>
        { 
        	console.log('The workspace status is ...');
        	console.log(workspace);

        	this.workspaceData = workspace;
        	if ( this.workspaceData.uid )
        	{
        		this.dataFlag = true;
				this.titleService.setTitle( 'Workspace - '+this.workspaceData.name );

				// If the user has edit permissions, display edit list. If not, view only
				this.displayType = this.workspaceService.setWorkspaceDisplay( this.userData.uid, this.workspaceData.uid, this.permissions );

				// See if this workspace is a favorite
				this.isFavorite =  this.userService.isFavorite( this.workspaceData.uid );

				// Build the heirarchy data
				this.workspaceService.buildHeirarchy( this.workspaceData.uid, [] );

        	}
        });



        // This is an observable for the file contents
        this.workspaceService.workspaceFileStatus
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((workspaceFiles)=>
        { 
        	console.log('The workspace files status is ...');
        	console.log(workspaceFiles);

        	this.workspaceFiles = this.workspaceService.sortWorkspaces(workspaceFiles);
        	if ( this.workspaceFiles.length > 0 )
        	{
            	this.dataFilesFlag = true;
            }

        });


        // This is an observable for the permissions
        this.permissionsService.permStatus
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((result)=>
        { 
        	console.log('The permissions is ...');
        	console.log(result);

            if (result)
            {
            	for (let a=0; a<result.length; a++)
            	{
            		this.permissions.push(result[a]);
        		}
        		if ( this.workspaceData.uid )
        		{
					this.displayType = this.workspaceService.setWorkspaceDisplay( this.userData.uid, this.workspaceData.uid, this.permissions );
				}
        	}
        	this.permissions.sort((a, b) => (a.userId > b.userId) ? 1 : -1)

        });




        // This is an observable for the heirarchy
        this.workspaceService.heirarchyStatus
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((result)=>
        { 
        	this.heirarchy = result;
        });


	}









	ngOnDestroy():void {

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

  	}	





  	/*
  	*
  	*
  	*		PUBLIC FUNCTIONS
  	*
  	*
  	*/

  	newFile( typeNum ):void {

  		this.workspaceService.createNewFile( typeNum, this.workspaceData.uid );
  	}


	goToUrl( url )
	{
		console.log('I should be going to '+url);
		this.Router.navigateByUrl( url );

	}


  	upOne( file ):void {
  		if ( ( file.parentId != 0) &&  ( file.parentId != '0') )
  		{
  			this.goToFile( { uid:file.parentId, fileType:0} )
  		}
  	}


	goToFile( file )
	{

		// If this is another workspace, reload it
		if ( file.fileType == 0 )
		{
			this.workspaceId = file.uid;
			this.Router.navigateByUrl( '/'+this.fileTypes[file.fileType]+'Id/'+file.uid );
			this.workspaceService.getWorkspaceAndContents( file.uid, 0 )

		}else
		{
			this.Router.navigateByUrl( '/'+this.fileTypes[file.fileType]+'Id/'+file.uid );
		}


	}


  	addFavorite( fileId ):void {

  		this.userService.addFavorite( fileId );
  		this.isFavorite = true;
  	}



  	removeFavorite( fileId ):void {

  		this.userService.removeFavorite( fileId );
  		this.isFavorite = false;
  	}





}
