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

	constructor(	public afs: AngularFirestore )   					// Inject Firestore service
 	{

		this.constantsStatus = new BehaviorSubject([]);


		this.getConstants();

 	
	}




	/*
	 *
	 * 	Get all of the constants for use in CADWOLF equations
	 *
	 * 
	 */
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