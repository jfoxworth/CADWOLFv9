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
export class TeamsService {

	teamsStatus 				: BehaviorSubject<any>;		// Observer for teams
	teamStatus 					: BehaviorSubject<any>;		// Observer for the current team
	teamInvitedMembersStatus	: BehaviorSubject<any>;		// Observer for members of current team
	teamMembersStatus 			: BehaviorSubject<any>;		// Observer for members of current team

	

	constructor( public afs 		: AngularFirestore,
				 private afStorage 	: AngularFireStorage,
				 public UserService : UserService,
				  ) 
	{
		this.teamsStatus = new BehaviorSubject([]);
		this.teamStatus = new BehaviorSubject([]);
		this.teamMembersStatus = new BehaviorSubject([]);
		this.teamInvitedMembersStatus = new BehaviorSubject([]);
		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));
		if ( userData )
		{
			this.getTeams( userData.uid );
		}
	}






  	/*
  	*
  	*	Get a team from an ID
  	*
  	*/
	getTeam( teamId )
	{
		console.log('In the get team function');

		this.afs.collection('teams').doc(teamId)
		.valueChanges()
		.subscribe(result=> {
			result['uid'] = teamId;
			console.log('In the get team function with ');
			console.log(result);

			this.teamStatus.next(result);
		});


	}




  	/*
  	*
  	*	Get all teams for a user
  	*
  	*/
	getTeams( userId )
	{

		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));

		if ( userData.uid == userId )
		{
			this.afs.collection('teams', ref => ref.where('members', 'array-contains', userId))
			.valueChanges({idField: 'uid'})
			.subscribe(result=> {
				result.forEach(obj => {
					obj['teamImage'] = this.getTeamImage(obj);
				});
				console.log('The teams array for userId '+userId+' is ');
				console.log(result);
				this.teamsStatus.next(result);
			});

		}

	}




  	/*
  	*
  	*	Add a new team
  	*
  	*/
	addTeam( userData )
	{
		let teamObj : Team ={
			name : 'New Team',
			creatorId : userData.uid,
			creatorName : userData.userName,
			dateCreated : Date.now(),
			private : false,
			description : 'The purpose of the team',
			members : [ userData.uid ],
			admins : [ userData.uid ]
		};
		var docRef = this.afs.collection('teams').add(teamObj)
		.then((docRef) => {

			let teamMemberObj : TeamMember ={
				teamId : docRef.id,
				userId : userData.uid,
				userName : userData.userName,
				dateCreated : Date.now(),
				adderId : userData.uid,
				adderUserName : userData.userName,
				admin : 1,
				invitationStatus:1,
			};
			var docRef2 = this.afs.collection('teamMembers').add(teamMemberObj)
			.then(function(docRef2) {
			});

		});


	}





  	/*
  	*
  	*	Get the members for a team
  	*
  	*/
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










  	/*
  	*
  	*	Get the members for a team
  	*
  	*/
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








  	/*
  	*
  	*	Get the image for the team
  	*
  	*/
	getTeamImage( teamObj )
	{

		if ( ( teamObj === undefined ) || ( teamObj === null ) )
		{
			var path = '/teams/default.png';
		}else
		{

			if ( teamObj.imageType  === undefined )
			{
				var path = '/teams/default.png';

			}else{

				var path = '/teams/'+teamObj.uid+'.'+teamObj.imageType;			
			}
		}

		// Get URL
		const ref = this.afStorage.ref(path);
		return ref.getDownloadURL();

	}







  	/*
  	*
  	*	Set the team display status
  	*
  	*/
	setTeamStatus( teamObj, userObj )
	{
		console.log('In set team status with ...');
		console.log(teamObj);
		console.log(userObj);

		if ( userObj.uid )
		{
			const userId = userObj.uid;
		}else
		{
			return 'display'
		}

		for (let a=0; a<teamObj['admins'].length; a++)
		{
			if ( teamObj.admins[a] == userObj.uid )
			{
				return 'canEdit'
			}
		}

		return 'display'

	}




	saveChanges( teamData )
	{
		var docRef = this.afs.collection('teams').doc(teamData.uid);
		docRef.update(teamData);

	}






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



}
