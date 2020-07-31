import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


// Services
import { AuthService } from 'app/main/services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

// Models
import { Unit } from 'app/main/models/units';






@Injectable({
  providedIn: 'root'
})
export class UnitsService {

	units : Unit[];
	unitsStatus : BehaviorSubject<any>;

	constructor(	public afs: AngularFirestore )   					// Inject Firestore service
 	{

		this.unitsStatus = new BehaviorSubject([]);


		this.getUnits();

 	
	}




	/*
	 * 	Get all of the units for use in CADWOLF equations
	 * 
	 */
	getUnits( )
	{
		this.afs.collection('units').get()
			.subscribe(result => {
	            var tempArray = [];
	            var docData;
	            result.forEach((doc) => {
	                docData=doc.data();
	                docData.uid=doc.id;
	                tempArray.push(docData);
	            });
	            this.units = tempArray;
				this.unitsStatus.next(tempArray);
        });


	}


	/*
	 * 	Get all of the units for use in CADWOLF equations
	 *
	 */
	updateUnits( )
	{
		this.unitsStatus.next(this.units);
	}
}