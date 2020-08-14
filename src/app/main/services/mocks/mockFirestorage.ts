
import { Observable } from "rxjs/Observable"
import { of } from 'rxjs';


export class mockFirestorage {


	constructor() {}


	// Stub for the Angular Fire
	public mockFirestorageStub() {

		return { 
			
					collection:()=> { 	valuesChanges : (imp1: any) => of(this.mockCollectionData(imp1));
										get : (imp1: any) =>of(this.mockCollectionData(imp1));
										doc : (imp1: any) =>of(this.mockCollectionData(imp1));
					 }

			
		}
	}


	public mockCollectionData(db) {
		if ( db == 'units' )
		{
			return {}
		}
	}


}