
import { Observable } from "rxjs/Observable"
import { of } from 'rxjs';


export class mockFireAuth {


	constructor() {}


	// Stub for the Angular Fire
	public mockFireAuthStub() {

		return { 
					authState : { subscribe : () => new Observable((observer) => {'Me'}) }

		}
	}


	public mockCollectionData(db) {
		if ( db == 'units' )
		{
			return {}
		}
	}


}