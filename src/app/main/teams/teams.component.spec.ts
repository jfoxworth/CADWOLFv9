/*
*
*		Test Theory
*
*
*		1. Component gets created
*
*		2. No user logged in produces error message
*
*		3. User logged in produces add team button
*
*		4. User logged in shows team table
*
*
*
*
*
*
*
*
*/


// Standard Angular Items
import { Title }	 from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from "@angular/platform-browser";



// Testing items
import { async, ComponentFixture, fakeAsync, tick, TestBed } from '@angular/core/testing';


// Services
import { FuseConfigService } from '@fuse/services/config.service';
import { TeamsService } from 'app/main/services/teams.service';


// Components
import { TeamsComponent } from './teams.component';


// Mock Items
import { mockTeamsService } from 'app/main/services/mocks/mockTeamsService';




/*
*
*	Tests with no user logged in
*
*/



describe('TeamsComponent', () => {



	let component: TeamsComponent;
	let fixture: ComponentFixture<TeamsComponent>;

	const formBuilder: FormBuilder = new FormBuilder();

	let MockGroupTeams = new mockTeamsService();
	const mockTeamsServ = MockGroupTeams.mockTeamsService();


	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ TeamsComponent ]
		})
		.compileComponents();
	}));



	beforeEach(() => {


		localStorage.removeItem('user', );
		localStorage.removeItem('cadwolfUser');
		localStorage.removeItem('cadwolfUserData');


		TestBed.configureTestingModule({
			imports: [ BrowserAnimationsModule ],
			declarations: [ TeamsComponent ],
			providers: [ { provide : Title },
						 { provide : TeamsService,	useValue: mockTeamsServ } ]

		});

		 
		fixture = TestBed.createComponent(TeamsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

	});






	/*
	*
	*	UNIT TESTS
	*
	*/

	it('should create', () => {
		localStorage.removeItem('cadwolfUserData');
		expect(component).toBeTruthy();
	});




	it('No logged in user should produce error', () => {
		console.log('Running test for no user');
		
		component.ngOnInit();
		fixture.detectChanges();
		const errorDiv = fixture.debugElement.query(By.css('#errorBox'));
    	expect(errorDiv).toBeTruthy();		

	});


});













/*
*
*	Tests with user logged in
*
*/


describe('TeamsComponent', () => {



	let component: TeamsComponent;
	let fixture: ComponentFixture<TeamsComponent>;

	const formBuilder: FormBuilder = new FormBuilder();

	let MockGroupTeams = new mockTeamsService();
	const mockTeamsServ = MockGroupTeams.mockTeamsService();


	const fakeUserData = {
		'userName' : 'thewolf',
		'uid' : 'tiIQZnXunuTHdDAEC1uN3BTuAt03',
		'imageType' : 'jpeg',
		'email' : 'jfoxworth@cadwolf.com',
		'name' : 'Joshua Foxworth',
		'bio' : 'This is my bio'
	}


	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ TeamsComponent ]
		})
		.compileComponents();
	}));



	beforeEach(() => {

		// set the user properties
		localStorage.setItem('user', JSON.stringify(fakeUserData));
		localStorage.setItem('cadwolfUser', JSON.stringify(fakeUserData));
		localStorage.setItem('cadwolfUserData', JSON.stringify(fakeUserData));

		TestBed.configureTestingModule({
			imports: [ BrowserAnimationsModule ],
			declarations: [ TeamsComponent ],
			providers: [ { provide : Title },
						 { provide : TeamsService,	useValue: mockTeamsServ } ]

		});

		 
		fixture = TestBed.createComponent(TeamsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

	});






	/*
	*
	*	UNIT TESTS
	*
	*/

	it('Logged in user should produce add team button', fakeAsync(() => {
		console.log('Running test for team button');

		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const addTeamDiv = fixture.debugElement.query(By.css('#createTeamButton'));
    	expect(addTeamDiv).toBeTruthy();		

	}));





	it('Logged in user should produce teams table', fakeAsync(() => {
		console.log('Running test for team table');


		component.dataFlag = true;
		component.ngOnInit();
		tick();
		fixture.detectChanges();
		const dataTableDiv = fixture.debugElement.query(By.css('#dataTable'));
    	expect(dataTableDiv).toBeTruthy();		

	}));



});
