
import { Observable } from "rxjs/Observable"
import { of } from 'rxjs';


export class mockTeamsService {


	constructor() {}


	// Stub for the Angular Fire
	public mockTeamsService() {

		return { 
					getTeam:()=>{},
					getMembers:()=>{},
					getInvitedMembers:()=>{},
					setTeamStatus:(teamObj, userObj)=>{return 'display'},
					teamStatus: { pipe:() => new Observable((observer) => {'Me'}) },
					teamsStatus: { pipe:() => new Observable((observer) => {'Me'}) },
					teamMembersStatus: { pipe:() => new Observable((observer) => {'Me'}) },
					teamInvitedMembersStatus: { pipe:() => new Observable((observer) => {'Me'}) }

		}
	}


}