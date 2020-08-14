/*
*
*
*		This service is to place a log entry in the database and to pull
*		those entries when needed. The log is called from a number of functions
*		to show when an item is created, edited, etc.
*
*
*/


// Core angular stuff
import { Injectable } from '@angular/core';



// Services
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';




// Model for a log entry
import { LogEntry } from 'app/main/models/log';



@Injectable({
  providedIn: 'root'
})
export class LogService {



	constructor( 	public afs 			: AngularFirestore,
  					private afStorage 	: AngularFireStorage ) { }




  	/*
  	*
  	*	Add a log entry
  	*
  	*/
	addLogEntry( logData )
	{
		let userData = JSON.parse(localStorage.getItem('cadwolfUserData'));

		let logEntry : LogEntry ={
			userId 			: userData.uid,
			userName 		: userData.userName,
			entryDate 		: Date.now(),
			entryText 		: logData.text,
			relatedFileId 	: logData.fileId,
			messageType 	: logData.messageType,
			entryTitle 		: logData.entryTitle
		};

		var docRef = this.afs.collection('logs').add( logEntry );

	}




}
