
/*

	This is the service for constants in CADWOLF. A constant is a 
	mathematical item that can be used in CADWOLF calculations. Users
	cannot add, alter, or delete constants. These are items like pi,
	Avagadros number, etc.

	There is a view component that simply displays the constants so
	that users can see what constants exist and how to use them. 
	This service handles that view and the pulling of the data.

*/


// Standard Angular Items
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


// Services
import { AuthService } from 'app/main/services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

// Models
import { Constant } from 'app/main/models/constants';






@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

	constants : Constant[];
	constantsStatus : BehaviorSubject<any>;

	constructor(	public afs: AngularFirestore )  
 	{

 		// The observable for the data that is subscribed to in the components
		this.constantsStatus = new BehaviorSubject([]);


		// The call to get the data in the constructor
		this.getConstants();

 	
	}



	// -----------------------------------------------------------------------------------------------------
	//
	// @ READ FUNCTION FOR CONSTANTS
	//
	// -----------------------------------------------------------------------------------------------------


	//  Get all of the constants for use in CADWOLF equations
	getConstants( )
	{
		this.afs.collection('constants').get()
			.subscribe(result => {
	            var tempArray = [];
	            var docData;
	            result.forEach((doc) => {
	                docData=doc.data();
	                docData.uid=doc.id;
	                if ( typeof(docData.base) ==  'string' )
	                {
	                	docData.base = JSON.parse(docData.base);
	                }
	                tempArray.push(docData);
	            });
				this.constantsStatus.next(tempArray);
        });


	}


	

}