
import { Observable } from "rxjs/Observable"
import { of } from 'rxjs';


export class mockUnitsService {


	constructor() {}


	// Stub for the Angular Fire
	public mockUnitsService() {

		return { 
					unitsStatus: { pipe:() => new Observable((observer) => {'Me'}) }

		}
	}


}
