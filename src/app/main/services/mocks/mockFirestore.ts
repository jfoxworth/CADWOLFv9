
import { Observable } from "rxjs/Observable"
import { of } from 'rxjs';


export class mockFirestore {


	constructor() {}


	// Stub for the Angular Fire
	public mockFirestoreStub() {

		return { 
					collection:(db)=> { 	valuesChanges : (imp1: any) => of(this.mockCollectionData(db));
											get : (db: any) =>of(this.mockCollectionData(db));
											doc : (db: any) =>of(this.mockCollectionData(db))
					 }
        		 //collection:()=> { valuesChanges : (imp1: any, imp2:any, imp3:any, imp4:any) => of(this.mockCollectionData(imp1, imp2, imp3, imp4, '')) },

		}
	}


	public mockCollectionData(db) {
		if ( db == 'units' )
		{
			return {}
		}


		if ( db == 'users' )
		{
			console.log('I am returning user data 1');
			return {}
		}


	}


}