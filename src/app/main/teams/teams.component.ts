
// Standard Angular items
import { Component, OnInit } from '@angular/core';
import { Title }	 from '@angular/platform-browser';

// Services
import { TeamsService } from 'app/main/services/teams.service';


// Models
import { Team } from 'app/main/models/team';
import { TeamMember } from 'app/main/models/teamMember';



// RXJS items
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

	userData 	: any;
	teamsData 	: any;
	dataFlag 	: boolean = false;
	errorFlag 	: boolean = false;

	private _unsubscribeAll: Subject<any>;

	constructor(
			private titleService	: Title,
			public TeamsService 	: TeamsService
		) 
	{ 
		this._unsubscribeAll = new Subject();
	}




	ngOnInit(): void {

		// Get the user data
		this.userData = JSON.parse(localStorage.getItem('cadwolfUserData'));

		if ( ( this.userData === undefined ) || 
			 ( this.userData === null ) ||
			 ( this.userData == null ) )
		{
			// Set the title for no user
			this.titleService.setTitle( 'No user for teams' );
			this.errorFlag = true;

		}else
		{
			// Set the title
			this.titleService.setTitle( 'Teams for user '+this.userData.userName );


			// Subscribe to the teams observable
			this.TeamsService.teamsStatus
				.pipe(takeUntil(this._unsubscribeAll))
				.subscribe((teamsData)=>{
					this.teamsData = teamsData;
					this.dataFlag = true;
				});

		}


	}




	ngOnDestroy():void {

		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();

  	}	



}
