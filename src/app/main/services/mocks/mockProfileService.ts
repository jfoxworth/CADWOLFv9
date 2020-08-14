
import { Observable } from "rxjs/Observable"
import { of } from 'rxjs';


export class mockProfileService {


	constructor() {}


	// Stub for the Angular Fire
	public mockProfileService() {

		return { 
					profileStatus: { pipe:() => new Observable((observer) => {'Me'}) },
					checkUserViewerStatus:()=>{},
					setProfileData:()=>{}

		}
	}


}