
// Standard Angular items
import { Component, OnInit } from '@angular/core';
import { Title }	 from '@angular/platform-browser';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';


// Services
import { TeamsService } from 'app/main/services/teams.service';
import { UserService } from 'app/main/services/user.service';
import { TeamMembersService } from 'app/main/services/team-members.service';


// Models
import { Team } from 'app/main/models/team';
import { TeamMember } from 'app/main/models/teamMember';


// RXJS items
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';


// Firebase
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

	teamMemberData 			: any;
	invitedTeamMemberData 	: any;
	teamData 				: any;
	dataFlag 				: boolean = false;
	memberDataFlag 			: boolean = false;
	invitedMemberDataFlag 	: boolean = false;
	displayStatus 			: string;
	teamId					: string;
	teamImage 				: any;
	userData 				: any;
	hintText 				: string = 'Enter user name';
	hintColor 				: string = '#aaaaaa';
	inviteeText 			: string = "Enter user name";
	inviteeFound 			: boolean = false;
	inviteeObj				: any;

	private _unsubscribeAll: Subject<any>;

	constructor(
			private titleService		: Title,
			public TeamsService 		: TeamsService,
			public TeamMembersService 	: TeamMembersService,
			public UserService 			: UserService,
			private route 				: ActivatedRoute,
	        private afStorage 			: AngularFireStorage,
		) 
	{ 
		this._unsubscribeAll = new Subject();
	}




	ngOnInit(): void {


		// Get the user data
		this.userData = JSON.parse(localStorage.getItem('cadwolfUserData'));

		// Get id from URL
		this.teamId = this.route.snapshot.paramMap.get('teamId');

		// Pull the team data
		this.TeamsService.getTeam( this.teamId );

		// Pull the team members
		this.TeamMembersService.getMembers( this.teamId );

		// Pull the people invited to the team
		this.TeamMembersService.getInvitedMembers( this.teamId );

		// Subscribe to the team observable
		this.TeamsService.teamStatus
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((teamData)=>{

				// Set the title
				this.titleService.setTitle( 'CADWOLF Team '+teamData.name );
			
				// Set the display status
				if ( teamData.admins )
				{
					this.displayStatus = this.TeamsService.setTeamStatus( teamData, this.userData );

					this.teamData = teamData;
					this.teamImage = this.TeamsService.getTeamImage(teamData);
					this.dataFlag = true;
				}

			});


		// Subscribe to the team members observable
		this.TeamMembersService.teamMembersStatus
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((teamMemberData)=>{
			
				this.teamMemberData = teamMemberData;
				this.memberDataFlag = true;
			});


		// Subscribe to the team members observable
		this.TeamMembersService.teamInvitedMembersStatus
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((teamInvitedMemberData)=>{
			
				this.invitedTeamMemberData = teamInvitedMemberData;
				this.invitedMemberDataFlag = true;
			});


	}




	ngOnDestroy():void {

		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();

  	}	




  	/**
  	*
  	*	When a profile icon is uploaded
  	*
  	**/
	onUpload(event) {


		// Grab the background image
		const file = event.target.files[0];
		console.log('The target is ...');
		console.log(event.target.files);

		var imageType = file.type.replace('image/','');
		var path = '/teams/'+this.teamData.uid+'.'+imageType;			


		// Get URL
		const ref = this.afStorage.ref(path);

		// Store image type
		this.teamData.imageType = imageType;
		this.saveChanges();

		// Upload file and subscribe to results
		const task = this.afStorage.upload(path, event.target.files[0]);
		task.snapshotChanges().pipe(
        	finalize(() => this.teamImage = ref.getDownloadURL()) 
    	 )
    	.subscribe()

    	setTimeout(()=>{ this.teamImage = this.TeamsService.getTeamImage(this.teamData); }, 1000);

  	}





	/**
	*
	* When the data needs to be saved
	*
	**/
	saveChanges():void{


		console.log('Saving team data '+this.teamData.uid);
		this.TeamsService.saveChanges( this.teamData );
//		this.SnackBar.open('Data Saved','', {duration: 4000});


	}







	/**
	*
	* When a member is deleted from a team
	*
	**/
	deleteTeamMember( teamObj, userId ):void{

		console.log('Going to delete '+teamObj.uid);

		this.TeamMembersService.deleteTeamMember( teamObj, userId );
	}






	/**
	*
	* Check if a user name is valid
	*
	**/
	checkUserName( ):void{

		console.log('Checking the user name of this.inviteeText');

		this.inviteeObj = '';

		this.UserService.checkUserName( this.inviteeText )
		.subscribe(result=> {

			console.log('the result is ...');
			console.log(result.docs[0].data());
	
			if ( result.docs.length>0 )
			{ 
				this.hintText = 'User Name "'+this.inviteeText+'" found';
				this.hintColor = '#006400';
				this.inviteeFound = true;
				this.inviteeObj = result.docs[0].data();
			}else
			{
				this.hintText = "No user with the name "+this.inviteeText;
				this.hintColor = '#FF0000';
				this.inviteeFound = false;
				this.inviteeObj = '';
			}

		});
	}








	/**
	*
	* When a member is deleted from a team
	*
	**/
	inviteUserToTeam( ):void{

		this.TeamMembersService.inviteUserToTeam( this.userData, this.inviteeObj, this.teamData );
		this.inviteeFound = false;
		this.inviteeObj = '';
		this.hintColor = '#CCCCCC';
		this.hintText = 'Enter User Name';
	}





}
