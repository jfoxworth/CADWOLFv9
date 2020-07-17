import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


// Services
import { AuthService } from 'app/main/services/auth.service';
import { FirebaseService } from 'app/main/services/firebase.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

// Models
import { Constant } from 'app/main/models/constants';






@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor(	private FirebaseService : FirebaseService,		// My firebase service
  				public afs: AngularFirestore   					// Inject Firestore service
 ) {}


  	constants : any;


	/*
	 *
	 * 	Get all of the constants for use in CADWOLF equations
	 *
	 * 
	 */
	getConstants( ):Observable<any>
	{
		console.log('In the get constants function ' );


		// Get projects collection, create an id, and then set a new project 
		// with the data for this design
		return this.afs.collection('constants').get();



	}

}