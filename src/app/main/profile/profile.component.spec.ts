/*
*
*			Testing theory
*
*			1. Test with no user logged in, and no user in URL
*				a. Component should be created
*				b. Component should display error message when status is set
*
*			2. Test with no user logged in, but with invalid user id in URL
*				a. Component should be created
*				b. Component should display error message when no profile data is returned
*				
*			3. Test with no user logged in, and with valid user id in the URL
*				a. Component should be created
*				b. Component should display user info properly when status is set
* 					1. Name, userId, bio, etc
* 				c. No button displayed to add as contact
*
* 			4. Test with user logged in and invalid ID in URL
*				a. Component should be created
*				b. Component should display error when status is set
*
*			5. Test with user logged in, and nothing in the URL
*				a. Component should be created
*				b. Component should display user info properly
* 					1. Name, userId, bio, etc
* 				c. No button displayed to add as contact
*
*			6. Test with user logged in, and with valid ID in the URL
*				a. Component should be created
*				b. Component should display user info properly
* 					1. Name, userId, bio, etc
* 				c. Button displayed to add as contact
* 				c. No button displayed to add as contact if users match
*
*
*
*/



// Standard Angular Items
import { Title }	 from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { By } from "@angular/platform-browser";


// Testing items
import { async, ComponentFixture, fakeAsync, tick, TestBed } from '@angular/core/testing';


// Services
import { FuseConfigService } from '@fuse/services/config.service';
import { UserService } from 'app/main/services/user.service';
import { ProfileService } from 'app/main/services/profile.service';
import { AuthService } from 'app/main/services/auth.service';


// Components
import { ProfileComponent } from './profile.component';


// Firebase Stuff
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


// Mock Items
import { mockProfileService } from 'app/main/services/mocks/mockProfileService';
import { mockRouteService } from 'app/main/services/mocks/mockRouteService';
import { mockFirestore } from 'app/main/services/mocks/mockFirestore';



describe('ProfileComponent', () => {



	let component: ProfileComponent;
	let fixture: ComponentFixture<ProfileComponent>;

	let MockGroupFire = new mockFirestore();
	const mockFirestoreServ = MockGroupFire.mockFirestoreStub();

	let MockGroup = new mockRouteService();
	const mockRouteServ = MockGroup.mockRouteService();

	let MockGroupProfile = new mockProfileService();
	const mockProfileServ = MockGroupProfile.mockProfileService();


	const formBuilder: FormBuilder = new FormBuilder();


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
		'uid' : 'tiIQZnXunuTHdDAEC1uN3BTuAt03',
		'imageType' : 'jpeg',
		'email' : 'tony@starkenterprise.com',
		'name' : 'Tony Stark',
		'bio' : 'This is my bio'
	}


	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ProfileComponent ]
		})
		.compileComponents();
	}));


	beforeEach(() => {


		TestBed.configureTestingModule({
			imports: [ BrowserAnimationsModule ],
			declarations: [ ProfileComponent ],
			providers: [ { provide : ProfileService, 		useValue : mockProfileServ },
						 { provide : UserService,	 		useValue : {} },
						 { provide : ActivatedRoute, 		useValue : mockRouteServ },
						 { provide : Title },
						 { provide : AngularFireStorage, 	useValue : {} },
						 { provide : AngularFirestore, 		useValue : mockFirestoreServ } ]

		});

		 
		fixture = TestBed.createComponent(ProfileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

	});






	/*
	*
	*	UNIT TESTS
	*
	*/


	/*
	*
	*	Tests with no user logged in, and no user in URL
	*
	*/


	it('Should create component with no user logged in and none in URL', () => {

		// unset the user properties
		localStorage.removeItem('user');
		localStorage.removeItem('cadwolfUser');
		localStorage.removeItem('cadwolfUserData');

		// Set the URL to no user id
		const router = TestBed.get(ActivatedRoute);
		router.url = '/profile';

		expect(component).toBeTruthy();
	});





	it('No user logged in, status set to noUser, display should show noUser', () => {

		localStorage.removeItem('user');
		localStorage.removeItem('cadwolfUser');
		localStorage.removeItem('cadwolfUserData');

		// Set the URL to no user id
		const router = TestBed.get(ActivatedRoute);
		router.url = '/profile';

		component.displayStatus = 'noUser';
		fixture.detectChanges();
		
		const noUserDiv = fixture.debugElement.query(By.css('#noUserText')).nativeElement;
    	expect(noUserDiv).toBeTruthy();		

	});






	/*
	*
	*	Tests with no user logged in, and id given in the URL being invalid
	*
	*/


	it('Should create component with invalid user ID in URL', () => {

		// unset the user properties
		localStorage.removeItem('user');
		localStorage.removeItem('cadwolfUser');
		localStorage.removeItem('cadwolfUserData');

		// Set the URL to no user id
		const router = TestBed.get(ActivatedRoute);
		router.url = '/profile/12345';

		expect(component).toBeTruthy();
	});





	it('With invalid URL user, error message should be displayed', () => {

		localStorage.removeItem('user');
		localStorage.removeItem('cadwolfUser');
		localStorage.removeItem('cadwolfUserData');

		// Set the URL to no user id
		const router = TestBed.get(ActivatedRoute);
		router.url = '/profile/12345';

		component.displayStatus = 'display';
		fixture.detectChanges();
		
		const noUserDiv = fixture.debugElement.query(By.css('#invalidUser')).nativeElement;
    	expect(noUserDiv).toBeTruthy();		

	});












	/*
	*
	*	Tests with no user logged in, and valid id given in the URL
	*
	*/


	it('Should create component with valid user ID in URL', () => {

		// unset the user properties
		localStorage.removeItem('user');
		localStorage.removeItem('cadwolfUser');
		localStorage.removeItem('cadwolfUserData');

		// Set the URL to no user id
		const router = TestBed.get(ActivatedRoute);
		router.url = '/profile/thewolf';

		expect(component).toBeTruthy();
	});





	it('With valid user in URL, name should be shown', () => {

		localStorage.removeItem('user');
		localStorage.removeItem('cadwolfUser');
		localStorage.removeItem('cadwolfUserData');

		// Set the URL to no user id
		const router = TestBed.get(ActivatedRoute);
		router.url = '/profile/thewolf';

		component.displayStatus = 'display';
		
		component.profileData = {'userName' : 'thewolf'}
		fixture.detectChanges();
		const userDiv = fixture.debugElement.query(By.css('#validUserName')).nativeElement;
    	expect(userDiv).toBeTruthy();		

	});

















	/*
	*
	*	Tests with user logged in, no id given in the URL
	*
	*/


	it('Should create component with user logged in and no ID in URL', () => {

		// set the user properties
		localStorage.setItem('user', JSON.stringify(fakeUserData));
		localStorage.setItem('cadwolfUser', JSON.stringify(fakeUserData));
		localStorage.setItem('cadwolfUserData', JSON.stringify(fakeUserData));

		// Set the URL to no user id
		const router = TestBed.get(ActivatedRoute);
		router.url = '/profile';

		expect(component).toBeTruthy();
	});





	it('User logged in with no valid user in URL, name should be shown', () => {

		// set the user properties
		localStorage.setItem('user', JSON.stringify(fakeUserData));
		localStorage.setItem('cadwolfUser', JSON.stringify(fakeUserData));
		localStorage.setItem('cadwolfUserData', JSON.stringify(fakeUserData));


		// Set the URL to no user id
		const router = TestBed.get(ActivatedRoute);
		router.url = '/profile';

		component.displayStatus = 'display';
		
		component.profileData = fakeUserData;
		fixture.detectChanges();
		const userDiv = fixture.debugElement.query(By.css('#validUserName')).nativeElement;
    	expect(userDiv).toBeTruthy();		

	});




	it('User logged in with no valid user in URL, add contact should not be shown', () => {

		// set the user properties
		localStorage.setItem('user', JSON.stringify(fakeUserData));
		localStorage.setItem('cadwolfUser', JSON.stringify(fakeUserData));
		localStorage.setItem('cadwolfUserData', JSON.stringify(fakeUserData));


		// Set the URL to no user id
		const router = TestBed.get(ActivatedRoute);
		router.url = '/profile';

		component.displayStatus = 'display';
		
		component.profileData = fakeUserData;
		fixture.detectChanges();
		const userDiv = fixture.debugElement.query(By.css('#addContact'));
    	expect(userDiv).toBeFalsy();		

	});











	/*
	*
	*	Tests with user logged in, valid id given in the URL
	*
	*/


	it('Should create component with user logged in and ID in URL', () => {

		// set the user properties
		localStorage.setItem('user', JSON.stringify(fakeUserData));
		localStorage.setItem('cadwolfUser', JSON.stringify(fakeUserData));
		localStorage.setItem('cadwolfUserData', JSON.stringify(fakeUserData));

		// Set the URL to no user id
		const router = TestBed.get(ActivatedRoute);
		router.url = '/profile/ironman';

		expect(component).toBeTruthy();
	});





	it('User logged in with valid user in URL, name should be shown', () => {

		// set the user properties
		localStorage.setItem('user', JSON.stringify(fakeUserData));
		localStorage.setItem('cadwolfUser', JSON.stringify(fakeUserData));
		localStorage.setItem('cadwolfUserData', JSON.stringify(fakeUserData));


		// Set the URL to no user id
		const router = TestBed.get(ActivatedRoute);
		router.url = '/profile';

		component.displayStatus = 'display';
		
		component.profileData = fakeUserData;
		fixture.detectChanges();
		const userDiv = fixture.debugElement.query(By.css('#validUserName')).nativeElement;
    	expect(userDiv).toBeTruthy();		

	});




	it('User logged in with valid user in URL, add contact should not be shown', () => {

		// set the user properties
		localStorage.setItem('user', JSON.stringify(fakeUserData));
		localStorage.setItem('cadwolfUser', JSON.stringify(fakeUserData));
		localStorage.setItem('cadwolfUserData', JSON.stringify(fakeUserData));


		// Set the URL to no user id
		const router = TestBed.get(ActivatedRoute);
		router.url = '/profile/ironman';

		component.displayStatus = 'display';
		
		component.profileData = fakeUserData2;
		component.user = fakeUserData;
		fixture.detectChanges();
		const userDiv = fixture.debugElement.query(By.css('#addContact'));
    	expect(userDiv).toBeTruthy();		

	});



});
