/*
*
*
*	Test theory for profile service.
*
*	Tests for this service are simple. For each function in the service, data
* 	will be preset and the result of the function will be analyzed to ensure that 
*	it produced the proper results
*
*
*	1. Test to ensure that the service is created
*	
*	2. checkUserViewerStatus
*		a. No user and no id from URL returns 'noUser'
*		b. ID from URL
* 			1. If logged in user that matches ID from URL - returns 'canEdit'
*	 		2. If logged in user that does not match ID from URL - returns 'display
*		c. Logged in user returns but no ID from URL - returns 'canEdit'
* 	
* 	3. setProfileData
*		a. With no user in ID and no logged in - return ''
*		b. User is defined by the URL - return user data
*		c. No user is defined in URL and user is logged in - return profile data
*
*
*
*	4. setProfileImage
*
*
*/



// Testing items
import { async, ComponentFixture, fakeAsync, tick, TestBed } from '@angular/core/testing';


// RXJS
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

// Services
import { ProfileService } from './profile.service';
import { UserService } from 'app/main/services/user.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


// Mocks
import { mockFirestore } from 'app/main/services/mocks/mockFirestore';
import { mockUserService } from 'app/main/services/mocks/mockUserService';


describe('ProfileService', () => {



	let service: ProfileService;
	let MockGroup = new mockFirestore();
	const mockFirestoreService = MockGroup.mockFirestoreStub();

	let MockGroupUser = new mockUserService();
	const mockUserServ = MockGroupUser.mockUserService();


	const fakeUserData = {
		'userName' : 'thewolf',
		'uid' : 'tiIQZnXunuTHdDAEC1uN3BTuAt03',
		'imageType' : 'jpeg',
		'email' : 'jfoxworth@cadwolf.com',
		'name' : 'Joshua Foxworth',
		'bio' : 'This is my bio'
	}



	const fakeUserData2 = {
		'userName' : 'ironman',
		'uid' : 'ymDzeF5Mp8gReRBayo2420Mgp2x1',
		'imageType' : 'jpeg',
		'email' : 'tony@starkenterprise.com',
		'name' : 'Tony Stark',
		'bio' : 'This is my bio'
	}


/*
			var docRef = this.afs.collection("users").doc(userId);

			docRef.ref.get().then((doc) => {
			    if (doc.exists) {
					this.profileStatus.next(doc.data()); 
*/



	beforeEach(() => {


	/*
		const fakeAFS = jasmine.createSpyObj( 'AngularFirestore', [ 'collection' ]);
	    
	    fakeAFS.collection.and.returnValue(jasmine.createSpyObj( 'collection', [ 'doc', 'snapshotChanges', 'valueChanges' ]));
	    fakeAFS.collection().doc.and.returnValue(jasmine.createSpyObj( 'doc', ['valueChanges', 'ref', 'get']));
	    fakeAFS.collection().doc().ref.and.returnValue(jasmine.createSpyObj( 'ref', ['get']));
	    fakeAFS.collection().doc().ref.get().and.returnValue( jasmine.createSpyObj( 'get', ['then']));
	    fakeAFS.collection().doc().ref.get().and.returnValue( of('FakeDocument'));
	    

	    fakeAFS.collection().doc().valueChanges.and.returnValue( of('FakeDocument'));

	    //fakeAFS.collection().doc().update.and.returnValue(Promise.resolve(null));

    */

    	TestBed.configureTestingModule({
		imports: [ ],
		providers: [ { provide : AngularFirestore, 	useValue : mockFirestoreService },
					 { provide : UserService, 		useValue : mockUserServ } ]
    	});

    	service = TestBed.inject(ProfileService);
    	console.log('The service is ...');
    	console.log(service);

	});
     





	/*
	*
	*  UNIT TESTS
	*
	*/



	/*
	*
	*  TEST TO SEE IF SERVICE WAS CREATED
	*
	*/
	it('profile service should be created', () => {
		expect(service).toBeTruthy();
	});




	/*
	*
	*  TEST checkUserViewerStatus
	*
	*/
	it('checkUserViewerStatus with no one logged in and no user in URL should return noUser', () => {

		localStorage.removeItem('user');
		localStorage.removeItem('cadwolfUser');
		localStorage.removeItem('cadwolfUserData');

		let checkStatus = service.checkUserViewerStatus('');
    	expect(checkStatus).toEqual('noUser');		
	});

	it('checkUserViewerStatus with no one logged in and valid user in URL should return display', () => {

		localStorage.removeItem('user');
		localStorage.removeItem('cadwolfUser');
		localStorage.removeItem('cadwolfUserData');

		let checkStatus = service.checkUserViewerStatus('tiIQZnXunuTHdDAEC1uN3BTuAt03');
    	expect(checkStatus).toEqual('display');		
	});

	it('checkUserViewerStatus with user logged in and valid user in URL should return display', () => {

		localStorage.setItem('cadwolfUserData', JSON.stringify(fakeUserData2));

		let checkStatus = service.checkUserViewerStatus('tiIQZnXunuTHdDAEC1uN3BTuAt03');
    	expect(checkStatus).toEqual('display');		
	});

	it('checkUserViewerStatus with user logged in and matching user in URL should return canEdit', () => {

		localStorage.setItem('cadwolfUserData', JSON.stringify(fakeUserData));

		let checkStatus = service.checkUserViewerStatus('tiIQZnXunuTHdDAEC1uN3BTuAt03');
    	expect(checkStatus).toEqual('canEdit');
	});

	it('checkUserViewerStatus with user logged in and no user in URL should return canEdit', () => {

		localStorage.setItem('cadwolfUserData', JSON.stringify(fakeUserData));

		let checkStatus = service.checkUserViewerStatus('');
    	expect(checkStatus).toEqual('canEdit');
	});






	/*
	*
	*  TEST setProfileData
	*
	*/
	it('setProfileData - no logged in user and no id', fakeAsync(() => {

		localStorage.removeItem('user');
		localStorage.removeItem('cadwolfUser');
		localStorage.removeItem('cadwolfUserData');

		let profileData = {};

		// Subscribe to the profile data
        service.profileStatus
            .subscribe((tempData)=>{
            	profileData = tempData;

		    });

		tick();
		service.setProfileData('');
    	expect(profileData).toEqual({});		
	}));


	it('setProfileData - no one logged in and user defined by URL', fakeAsync(() => {

		localStorage.removeItem('user');
		localStorage.removeItem('cadwolfUser');
		localStorage.removeItem('cadwolfUserData');

		let profileData = {};

		// Subscribe to the profile data
        service.profileStatus
            .subscribe((tempData)=>{
            	profileData = tempData;

		    });

		service.setProfileData( fakeUserData.uid );
		tick();

    	expect(profileData).toEqual('display');		
	}));



});
