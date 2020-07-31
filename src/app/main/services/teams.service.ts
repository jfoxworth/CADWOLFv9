import { Injectable } from '@angular/core';


// Services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';



// Models
import { Team } from 'app/main/models/team';
import { TeamMember } from 'app/main/models/teamMember';



@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor( public afs: AngularFirestore ) { }



  	/*
  	*
  	*	Add a new team
  	*
  	*/
	addTeam( userId )
	{
		let teamObj : Team ={
			name : 'New Team',
			creatorId : userId,
			dateCreated : Date.now(),
			private : false,
			description : 'The purpose of the team'
		};
		var docRef = this.afs.collection('teams').add(teamObj)
		.then((docRef) => {
    		console.log('I got here');
    		console.log(docRef);

			let teamMemberObj : TeamMember ={
				teamId : docRef.id,
				userId : userId,
				dateCreated : Date.now(),
				adderId : userId,
				admin : 1
			};
			var docRef2 = this.afs.collection('teamMembers').add(teamMemberObj)
			.then(function(docRef2) {
	    		console.log('I got here');
			});

		});


	}


}
