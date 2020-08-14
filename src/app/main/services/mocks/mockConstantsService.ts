
import { Observable } from "rxjs/Observable"
import { of } from 'rxjs';


export class mockConstantsService {


	constructor() {}


	// Stub for the Angular Fire
	public mockConstantsService() {

		return { 
					constantsStatus: { pipe:() => new Observable((observer) => {'Me'}) }

		}
	}


}