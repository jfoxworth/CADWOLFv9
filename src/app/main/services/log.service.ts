/*

		This service is to place a log entry in the database and to pull
		those entries when needed. The log is called from a number of functions
		to show when an item is created, edited, etc.

		Log entries are not updated nor deleted, so no functions exist
		to do those things
*/


// Core angular stuff
import { Injectable } from '@angular/core';



// RXJS Stuff
import { BehaviorSubject, Observable, Subject } from 'rxjs';



// Services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';




// Model for a log entry
import { LogEntry } from 'app/main/models/log';



@Injectable({
  providedIn: 'root'
})
export class LogService {


	logStatus 	: BehaviorSubject<any>;				



	constructor( 	public afs 			: AngularFirestore,
  					private afStorage 	: AngularFireStorage ) 
	{ 
		this.logStatus 			= new BehaviorSubject([]);
	}





	// -----------------------------------------------------------------------------------------------------
	//
	// @ CRUD FUNCTIONS
	//
	// -----------------------------------------------------------------------------------------------------

  	//  Create a log entry
	createLogEntry( logData )
	{
		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));

		let logEntry : LogEntry ={
			userId 			: userData.uid,
			userName 		: userData.userName,
			entryDate 		: Date.now(),
			entryText 		: logData.entryText,
			relatedFileId 	: logData.relatedFileId,
			relatedUserId 	: logData.relatedUserId,
			messageType 	: logData.messageType,
			entryTitle 		: logData.entryTitle,
			parentId 		: logData.parentId
		};

		var docRef = this.afs.collection('logs').add( logEntry );

	}



	//  Read log entries for a an item
	getLogData( itemId )
	{
		this.afs.collection('logs', ref => ref.where('relatedFileId', '==', itemId))
		.valueChanges({idField: 'uid'})
		.subscribe(result=> {
			console.log('log data is');
			console.log(result);
			this.logStatus.next(result);
		});

	}




}
