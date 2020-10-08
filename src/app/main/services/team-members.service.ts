
/*

	This service handles the items for both the team members.

*/



// Standard Angular Components
import { Injectable } from '@angular/core';


// Services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from 'app/main/services/user.service';


// RXJS
import { BehaviorSubject, Observable, Subject } from 'rxjs';


// Models
import { Team } from 'app/main/models/team';
import { TeamMember } from 'app/main/models/teamMember';


@Injectable({
	providedIn: 'root'
})
export class TeamMembersService {

	teamInvitedMembersStatus	: BehaviorSubject<any>;		// Observer for members of current team
	teamMembersStatus 			: BehaviorSubject<any>;		// Observer for members of current team



	constructor( public afs 		: AngularFirestore,
				 private afStorage 	: AngularFireStorage,
				 public UserService : UserService,
				  ) 
	{
		this.teamMembersStatus 			= new BehaviorSubject([]);
		this.teamInvitedMembersStatus 	= new BehaviorSubject([]);
		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));
	}



	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS
	//
	// -----------------------------------------------------------------------------------------------------




	// Invite a user to a team
	inviteUserToTeam( userData, userObj, teamData )
	{

		let teamUserData = {
			adderId 			: userData.uid,
			adderUserName 		: userData.userName,
			dateCreated 		: Date.now(),
			invitationStatus 	: 0,
			teamId 				: teamData.uid,
			userId 				: userObj.uid,
			userName 			: userObj.userName
		};
		this.afs.collection('teamMembers').add(teamUserData)
		.then(function() {
			console.log('Done');
		});

	}




	//  Get the members for a team
	getMembers( teamId )
	{

		this.afs.collection('teamMembers', ref => ref.where('teamId', '==', teamId).where('invitationStatus', '==', 1))
			.valueChanges({idField: 'uid'})
			.subscribe(result=> {

				result.forEach(obj => {
					this.afs.collection('users').doc(obj['userId'])
					.get()
					.subscribe(userResult=> {
						obj['imageType'] = userResult['imageType'];
						obj['profileImage'] = this.UserService.getProfileImage(userResult.data());
					});

				});

				this.teamMembersStatus.next(result);
		});

	}


	//  Get the members for a team
	getInvitedMembers( teamId )
	{

		this.afs.collection('teamMembers', ref => ref.where('teamId', '==', teamId).where('invitationStatus', '==', 0))
			.valueChanges({idField: 'uid'})
			.subscribe(result=> {

				result.forEach(obj => {
					this.afs.collection('users').doc(obj['userId'])
					.get()
					.subscribe(userResult=> {
						obj['imageType'] = userResult['imageType'];
						obj['profileImage'] = this.UserService.getProfileImage(userResult.data());
					});

				});

				this.teamInvitedMembersStatus.next(result);
		});

	}



	// Delete a team member
	deleteTeamMember( teamObj, userId )
	{
		for (let a=0; a<teamObj['admins'].length; a++)
		{
			if ( teamObj.admins[a] == userId )
			{
				this.afs.collection('teamMembers').doc(teamObj.uid).delete().then(function() {
					console.log("Document successfully deleted!");
				}).catch(function(error) {
					console.error("Error removing document: ", error);
				});
			}
		}
	}


}
