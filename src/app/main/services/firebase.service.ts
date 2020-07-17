import { Injectable, NgZone } from '@angular/core';

import { User } from "app/main/models/users";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
		public afs: AngularFirestore,   // Inject Firestore service
		public afAuth: AngularFireAuth, // Inject Firebase auth service
		public router: Router,
		public ngZone: NgZone // NgZone service to remove outside scope warning
  	) { }






  	/*
  	* 
  	* Function used any time we need to get a document from a collection 
  	* using its ID
	*
	*/
	getDocById( collection, docId ) {
		console.log('Retreiving the document with id : '+docId+' from collection : '+collection);
		var docRef = this.afs.collection(collection).doc(docId);
		return docRef.ref.get();
	}




	/*
	* 
	* Function used to pull documents from a collection where is given  
	* parameter is equal to a given value
	*
	*/
	getDocsByParam( collection:string, getParam:string, paramValue ) {

		console.log('Retreiving the documents with with the parameter : '+getParam+' equal to : '+paramValue+' from collection : '+collection);
		return this.afs.collection(collection, ref => ref.where(getParam, '==', paramValue)).get();
	}




	/*
	* 
	* Function to pull data with a parameter and an order
	*
	*/
	getDocsByParamWithOrder( collection:string, getParam:string, paramValue, orderBy:string ){

		console.log('Retreiving the documents with with the parameter : '+getParam+' equal to : '+paramValue+' from collection : '+collection);
		return this.afs.collection(collection, ref => ref.where(getParam, '==', paramValue).orderBy(orderBy)).get();

	}








	/*
	* 
	* Function used to pull documents from a collection where is given  
	* parameter is equal to a given value
	*
	*/
	getCollection( collection, paramName, paramValue ) {
		console.log('Retreiving the documents from collection : '+collection);
		return this.afs.collection( collection, ref => ref.where( paramName, '==', paramValue )).valueChanges();
	}






	/*
	* 
	* Function used to pull documents from a collection where is given  
	* parameter is equal to a given value
	*
	*/
	getCollectionTwoParams( collection, paramName, paramValue, paramName2, paramValue2 ) {
		console.log('Retreiving the documents from collection : '+collection);
		console.log(paramName+'=='+paramValue);
		console.log(paramName2+'=='+paramValue2);
		return this.afs.collection( collection, ref => ref.where( paramName, '==', paramValue ).where(paramName2, '==', paramValue2)).valueChanges();
	}







	/*
	* 
	* Function used to pull document from a collection by Id
	*
	*
	*/
	getCollectionById( collection, Id ) {
		console.log('Retreiving the documents from collection : '+collection);
		return this.afs.collection( collection, ref => ref.where( 'uid', '==', Id )).valueChanges();
	}







	/*
	* 
	* Function used to pull documents from a collection where a given  
	* parameter is equal to the user ID
	*
	*/
	getDocsByUserId( collection, getParam ) {
		const user = JSON.parse(localStorage.getItem('user'));
		console.log('Retreiving the documents with with the parameter : '+getParam+' equal to the user id of '+user.uid+' from collection : '+collection);
		var docRef = this.afs.collection(collection, ref => ref.where(getParam, '==', user.uid));
		return docRef.ref.get()

		//return this.afs.collection(collection, ref => ref.where(getParam, '==', user.uid)).valueChanges();
	}






	/*
	* 
	* Update a document from a given collection with the given data
	*
	*/
	updateDocDataUsingId( collection, docId, itemData ) {
		console.log('Updating the document with id : '+docId+' from collection : '+collection);
		console.log(itemData);
		var docRef = this.afs.collection(collection).doc(docId);
		return docRef.update(itemData);
	}






	/*
	* 
	* Update a document from a given collection with the given data
	*
	*/
	createDocInCollection( collection, itemData ) {
		console.log('Creating a document in collection : '+collection);
		console.log(itemData);
		var docRef = this.afs.collection(collection).add(itemData)
		.then(function(docRef) {
    		return docRef.id
		});
	}




}
