/*
*
*
*
*		Test theory
*
*
*
*		Tests with no user
*
*		1. Page is created
*
*		2. List of members is given
*
*		3. Name and other items are created
*
*		4. Delete user button is not present for members
*
*		5. Back to teams button is present
*
*		6. Invite user is not created
*
*		7. Change logo is not created
*
*
*
*
*	
*		Tests with user
*
*		1. Page is created
*
*		2. List of members is given
*
*		3. Name and other items are created
*
*		4. Delete user button is not present for members
*
*		5. Back to teams button is present
*
*		6. Invite user is not created
*
*		7. Change logo is not created
*
*
*
*
*
*
*
*		Tests with user that is admin for team
*
*		1. Page is created
*
*		2. List of members is given
*
*		3. Editable name and other items are created
*
*		4. Delete user button is present for members
*
*		5. Back to teams button is present
*
*		6. Invite user is created
*
*		7. Change logo is created
*
*		8. Invite user function is called when enter is pressed on input
*
*		9. Delete user button calls function
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
import { RouterTestingModule } from "@angular/router/testing";


// Services
import { FuseConfigService } from '@fuse/services/config.service';

// Components
import { TeamComponent } from './team.component';
import { TeamsService } from 'app/main/services/teams.service';
import { UserService } from 'app/main/services/user.service';


// Firebase
import { AngularFireStorage } from '@angular/fire/storage';



// Mock Items
import { mockRouteService } from 'app/main/services/mocks/mockRouteService';
import { mockTeamsService } from 'app/main/services/mocks/mockTeamsService';







/*
*
*	Tests with no user
*
*
*/

describe('TeamComponent', () => {



	let component: TeamComponent;
	let fixture: ComponentFixture<TeamComponent>;

	// Mock Items pulled from external mock file
	let MockGroup = new mockRouteService();
	const mockRouteServ = MockGroup.mockRouteService();

	let MockGroupTeams = new mockTeamsService();
	const mockTeamsServ = MockGroupTeams.mockTeamsService();


	// Fake team data
	const fakeTeamData = { 	admins 		: ["tiIQZnXunuTHdDAEC1uN3BTuAt03"],
					   	creatorId 	: "tiIQZnXunuTHdDAEC1uN3BTuAt03",
						creatorName : "thewolf",
						dateCreated : 1596250604098,
						description : "The purpose of the team",
						imageType	: "jpeg",
						members 	: ["tiIQZnXunuTHdDAEC1uN3BTuAt03"],
						name 		: "New Team",
						private		: false,
						uid 		: "L4SuC2lv8BZXpH1o1eHc" };


	// Fake members list 
	const fakeMemberData = [
		{
			adderId 		: "tiIQZnXunuTHdDAEC1uN3BTuAt03",
			adderUserName	: "thewolf",
			admin 			: 1,
			dateCreated 	: 1596250604348,
			imageType 		: undefined,
			invitationStatus: 1,
			teamId 			: "L4SuC2lv8BZXpH1o1eHc",
			uid 			: "M4vV5mLiMQlTEd0c5UHH",
			userId 			: "tiIQZnXunuTHdDAEC1uN3BTuAt03",
			userName 		: "thewolf"
		}
	];

	// Fake invitee list
	const fakeInviteeData = [
		{
			adderId 		: "ymDzeF5Mp8gReRBayo2420Mgp2x1",
			adderUserName 	: "ironman",
			dateCreated		: 1596411933908,
			imageType 		: undefined,
			invitationStatus: 0,
			teamId 			: "L4SuC2lv8BZXpH1o1eHc",
			uid 			: "Hi1guzi7x6dycHR8V84M",
			userId 			: "ymDzeF5Mp8gReRBayo2420Mgp2x1",
			userName 		: "ironman"			
		}
	];





	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ TeamComponent ]
		})
		.compileComponents();
	}));


	beforeEach(() => {


		localStorage.removeItem('user', );
		localStorage.removeItem('cadwolfUser');
		localStorage.removeItem('cadwolfUserData');


		TestBed.configureTestingModule({
			imports: [ BrowserAnimationsModule,
						 RouterTestingModule ],
			declarations: [ TeamComponent ],
			providers: [ { provide : Title },
								 { provide : TeamsService,			useValue: mockTeamsServ },
								 { provide : UserService,			useValue: {} },
								 { provide : ActivatedRoute,		useValue: mockRouteServ },
								 { provide : AngularFireStorage,	useValue: {} } ]

		});

		 
		fixture = TestBed.createComponent(TeamComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

	});






	/*
	*
	*	UNIT TESTS
	*
	*/

	it('should create with no user', () => {
		expect(component).toBeTruthy();
	});


	it('should create back to teams with no user', () => {
		component.dataFlag = true;
		component.displayStatus = 'display';
		component.memberDataFlag =  true;
		component.teamData = [];
		component.teamMemberData = [];
		component.invitedTeamMemberData = [];
		fixture.detectChanges();
		const linkDiv = fixture.debugElement.query(By.css('#teamLink'));
    	expect(linkDiv).toBeTruthy();		
	});


	it('should create team name with no user', () => {
		component.userData = {};
		component.dataFlag = true;
		component.displayStatus = 'display';
		component.memberDataFlag =  true;
		component.teamData = fakeTeamData;
		component.teamMemberData = fakeMemberData;
		component.invitedTeamMemberData = fakeInviteeData;
		fixture.detectChanges();
		const nameDiv = fixture.debugElement.query(By.css('#displayName'));
    	expect(nameDiv).toBeTruthy();		
	});


	it('No delete member button with no user', () => {
		component.userData = {};
		component.dataFlag = true;
		component.displayStatus = 'display';
		component.memberDataFlag =  true;
		component.teamData = fakeTeamData;
		component.teamMemberData = fakeMemberData;
		component.invitedTeamMemberData = fakeInviteeData;
		fixture.detectChanges();
		const nameDiv = fixture.debugElement.query(By.css('.deleteMember'));
    	expect(nameDiv).toBeFalsy();		
	});


	it('No delete invitee button with no user', () => {
		component.userData = {};
		component.dataFlag = true;
		component.displayStatus = 'display';
		component.memberDataFlag =  true;
		component.invitedMemberDataFlag = true;
		component.teamData = fakeTeamData;
		component.teamMemberData = fakeMemberData;
		component.invitedTeamMemberData = fakeInviteeData;
		fixture.detectChanges();
		const nameDiv = fixture.debugElement.query(By.css('.deleteInvitee'));
    	expect(nameDiv).toBeFalsy();		
	});


	it('No change logo button with no user', () => {
		component.userData = {};
		component.dataFlag = true;
		component.displayStatus = 'display';
		component.memberDataFlag =  true;
		component.teamData = fakeTeamData;
		component.teamMemberData = fakeMemberData;
		component.invitedTeamMemberData = fakeInviteeData;
		fixture.detectChanges();
		const nameDiv = fixture.debugElement.query(By.css('#input-file-id'));
    	expect(nameDiv).toBeFalsy();		
	});



	it('No invitee box with no user', () => {
		component.userData = {};
		component.dataFlag = true;
		component.displayStatus = 'display';
		component.memberDataFlag =  true;
		component.teamData = fakeTeamData;
		component.teamMemberData = fakeMemberData;
		component.invitedTeamMemberData = fakeInviteeData;
		fixture.detectChanges();
		const nameDiv = fixture.debugElement.query(By.css('#inviteeBox'));
    	expect(nameDiv).toBeFalsy();		
	});


});


















/*
*
*	Tests with a logged in user
*
*
*/

describe('TeamComponent', () => {



	let component: TeamComponent;
	let fixture: ComponentFixture<TeamComponent>;

	// Mock Items pulled from external mock file
	let MockGroup = new mockRouteService();
	const mockRouteServ = MockGroup.mockRouteService();

	let MockGroupTeams = new mockTeamsService();
	const mockTeamsServ = MockGroupTeams.mockTeamsService();


	// Fake team data
	const fakeTeamData = 
		{ 	admins 		: ["tiIQZnXunuTHdDAEC1uN3BTuAt03"],
		   	creatorId 	: "tiIQZnXunuTHdDAEC1uN3BTuAt03",
			creatorName : "thewolf",
			dateCreated : 1596250604098,
			description : "The purpose of the team",
			imageType	: "jpeg",
			members 	: ["tiIQZnXunuTHdDAEC1uN3BTuAt03"],
			name 		: "New Team",
			private		: false,
			uid 		: "L4SuC2lv8BZXpH1o1eHc" 
		};


	// Fake members list 
	const fakeMemberData = [
		{
			adderId 		: "tiIQZnXunuTHdDAEC1uN3BTuAt03",
			adderUserName	: "thewolf",
			admin 			: 1,
			dateCreated 	: 1596250604348,
			imageType 		: undefined,
			invitationStatus: 1,
			teamId 			: "L4SuC2lv8BZXpH1o1eHc",
			uid 			: "M4vV5mLiMQlTEd0c5UHH",
			userId 			: "tiIQZnXunuTHdDAEC1uN3BTuAt03",
			userName 		: "thewolf"
		}
	];

	// Fake invitee list
	const fakeInviteeData = [
		{
			adderId 		: "ymDzeF5Mp8gReRBayo2420Mgp2x1",
			adderUserName 	: "ironman",
			dateCreated		: 1596411933908,
			imageType 		: undefined,
			invitationStatus: 0,
			teamId 			: "L4SuC2lv8BZXpH1o1eHc",
			uid 			: "Hi1guzi7x6dycHR8V84M",
			userId 			: "ymDzeF5Mp8gReRBayo2420Mgp2x1",
			userName 		: "ironman"			
		}
	];



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
			declarations: [ TeamComponent ]
		})
		.compileComponents();
	}));


	beforeEach(() => {


		localStorage.setItem('user', JSON.stringify(fakeUserData));
		localStorage.setItem('cadwolfUser', JSON.stringify(fakeUserData));
		localStorage.setItem('cadwolfUserData', JSON.stringify(fakeUserData));


		TestBed.configureTestingModule({
			imports: [ BrowserAnimationsModule,
						 RouterTestingModule ],
			declarations: [ TeamComponent ],
			providers: [ { provide : Title },
								 { provide : TeamsService,			useValue: mockTeamsServ },
								 { provide : UserService,			useValue: {} },
								 { provide : ActivatedRoute,		useValue: mockRouteServ },
								 { provide : AngularFireStorage,	useValue: {} } ]

		});

		 
		fixture = TestBed.createComponent(TeamComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

	});






	/*
	*
	*	UNIT TESTS
	*
	*/

	it('should create with user', () => {
		expect(component).toBeTruthy();
	});


	it('should create back to teams with user', () => {
		component.dataFlag = true;
		component.displayStatus = 'display';
		component.memberDataFlag =  true;
		component.teamData = [];
		component.teamMemberData = [];
		component.invitedTeamMemberData = [];
		fixture.detectChanges();
		const linkDiv = fixture.debugElement.query(By.css('#teamLink'));
    	expect(linkDiv).toBeTruthy();		
	});


	it('should create team name with user', () => {
		component.userData = {};
		component.dataFlag = true;
		component.displayStatus = 'display';
		component.memberDataFlag =  true;
		component.teamData = fakeTeamData;
		component.teamMemberData = fakeMemberData;
		component.invitedTeamMemberData = fakeInviteeData;
		fixture.detectChanges();
		const nameDiv = fixture.debugElement.query(By.css('#displayName'));
    	expect(nameDiv).toBeTruthy();		
	});


	it('No delete member button with user', () => {
		component.userData = {};
		component.dataFlag = true;
		component.displayStatus = 'display';
		component.memberDataFlag =  true;
		component.teamData = fakeTeamData;
		component.teamMemberData = fakeMemberData;
		component.invitedTeamMemberData = fakeInviteeData;
		fixture.detectChanges();
		const nameDiv = fixture.debugElement.query(By.css('.deleteMember'));
    	expect(nameDiv).toBeFalsy();		
	});


	it('No delete invitee button with user', () => {
		component.userData = {};
		component.dataFlag = true;
		component.displayStatus = 'display';
		component.memberDataFlag =  true;
		component.invitedMemberDataFlag = true;
		component.teamData = fakeTeamData;
		component.teamMemberData = fakeMemberData;
		component.invitedTeamMemberData = fakeInviteeData;
		fixture.detectChanges();
		const nameDiv = fixture.debugElement.query(By.css('.deleteInvitee'));
    	expect(nameDiv).toBeFalsy();		
	});


	it('No change logo button with user', () => {
		component.userData = {};
		component.dataFlag = true;
		component.displayStatus = 'display';
		component.memberDataFlag =  true;
		component.teamData = fakeTeamData;
		component.teamMemberData = fakeMemberData;
		component.invitedTeamMemberData = fakeInviteeData;
		fixture.detectChanges();
		const nameDiv = fixture.debugElement.query(By.css('#input-file-id'));
    	expect(nameDiv).toBeFalsy();		
	});



	it('No invitee box with user', () => {
		component.userData = {};
		component.dataFlag = true;
		component.displayStatus = 'display';
		component.memberDataFlag =  true;
		component.teamData = fakeTeamData;
		component.teamMemberData = fakeMemberData;
		component.invitedTeamMemberData = fakeInviteeData;
		fixture.detectChanges();
		const nameDiv = fixture.debugElement.query(By.css('#inviteeBox'));
    	expect(nameDiv).toBeFalsy();		
	});


});
















/*
*
*	Tests with a logged in user who has edit permissions
*
*
*/
describe('TeamComponent', () => {



	let component: TeamComponent;
	let fixture: ComponentFixture<TeamComponent>;

	// Mock Items pulled from external mock file
	let MockGroup = new mockRouteService();
	const mockRouteServ = MockGroup.mockRouteService();

	let MockGroupTeams = new mockTeamsService();
	const mockTeamsServ = MockGroupTeams.mockTeamsService();


	// Fake team data
	const fakeTeamData = 
		{ 	admins 		: ["tiIQZnXunuTHdDAEC1uN3BTuAt03"],
		   	creatorId 	: "tiIQZnXunuTHdDAEC1uN3BTuAt03",
			creatorName : "thewolf",
			dateCreated : 1596250604098,
			description : "The purpose of the team",
			imageType	: "jpeg",
			members 	: ["tiIQZnXunuTHdDAEC1uN3BTuAt03"],
			name 		: "New Team",
			private		: false,
			uid 		: "L4SuC2lv8BZXpH1o1eHc" 
		};


	// Fake members list 
	const fakeMemberData = [
		{
			adderId 		: "tiIQZnXunuTHdDAEC1uN3BTuAt03",
			adderUserName	: "thewolf",
			admin 			: 1,
			dateCreated 	: 1596250604348,
			imageType 		: undefined,
			invitationStatus: 1,
			teamId 			: "L4SuC2lv8BZXpH1o1eHc",
			uid 			: "M4vV5mLiMQlTEd0c5UHH",
			userId 			: "tiIQZnXunuTHdDAEC1uN3BTuAt03",
			userName 		: "thewolf"
		}
	];

	// Fake invitee list
	const fakeInviteeData = [
		{
			adderId 		: "ymDzeF5Mp8gReRBayo2420Mgp2x1",
			adderUserName 	: "ironman",
			dateCreated		: 1596411933908,
			imageType 		: undefined,
			invitationStatus: 0,
			teamId 			: "L4SuC2lv8BZXpH1o1eHc",
			uid 			: "Hi1guzi7x6dycHR8V84M",
			userId 			: "ymDzeF5Mp8gReRBayo2420Mgp2x1",
			userName 		: "ironman"			
		}
	];



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
			declarations: [ TeamComponent ]
		})
		.compileComponents();
	}));


	beforeEach(() => {


		localStorage.setItem('user', JSON.stringify(fakeUserData));
		localStorage.setItem('cadwolfUser', JSON.stringify(fakeUserData));
		localStorage.setItem('cadwolfUserData', JSON.stringify(fakeUserData));


		TestBed.configureTestingModule({
			imports: [ BrowserAnimationsModule,
						 RouterTestingModule ],
			declarations: [ TeamComponent ],
			providers: [ { provide : Title },
								 { provide : TeamsService,			useValue: mockTeamsServ },
								 { provide : UserService,			useValue: {} },
								 { provide : ActivatedRoute,		useValue: mockRouteServ },
								 { provide : AngularFireStorage,	useValue: {} } ]

		});

		 
		fixture = TestBed.createComponent(TeamComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

	});






	/*
	*
	*	UNIT TESTS
	*
	*/

	it('should create with user who has admin', () => {
		expect(component).toBeTruthy();
	});


	it('should create back to teams with user who has admin', () => {
		component.dataFlag = true;
		component.displayStatus = 'canEdit';
		component.memberDataFlag =  true;
		component.teamData = [];
		component.teamMemberData = [];
		component.invitedTeamMemberData = [];
		fixture.detectChanges();
		const linkDiv = fixture.debugElement.query(By.css('#teamLink'));
    	expect(linkDiv).toBeTruthy();		
	});


	it('should create team edit name with user who has admin', () => {
		component.userData = {};
		component.dataFlag = true;
		component.displayStatus = 'canEdit';
		component.memberDataFlag =  true;
		component.teamData = fakeTeamData;
		component.teamMemberData = fakeMemberData;
		component.invitedTeamMemberData = fakeInviteeData;
		fixture.detectChanges();
		const nameDiv = fixture.debugElement.query(By.css('#editName'));
    	expect(nameDiv).toBeTruthy();		
	});


	it('Delete member button with user who has admin', () => {
		component.userData = {};
		component.dataFlag = true;
		component.displayStatus = 'canEdit';
		component.memberDataFlag =  true;
		component.invitedMemberDataFlag = true;
		component.teamData = fakeTeamData;
		component.teamMemberData = fakeMemberData;
		component.invitedTeamMemberData = fakeInviteeData;
		fixture.detectChanges();
		const nameDiv = fixture.debugElement.query(By.css('.deleteMember'));
    	expect(nameDiv).toBeTruthy();		
	});


	it('Delete invitee button with user who has admin', () => {
		component.userData = {};
		component.dataFlag = true;
		component.displayStatus = 'canEdit';
		component.memberDataFlag =  true;
		component.invitedMemberDataFlag = true;
		component.teamData = fakeTeamData;
		component.teamMemberData = fakeMemberData;
		component.invitedTeamMemberData = fakeInviteeData;
		fixture.detectChanges();
		const nameDiv = fixture.debugElement.query(By.css('.deleteInvitee'));
    	expect(nameDiv).toBeTruthy();		
	});


	it('Change logo button with user who has admin', () => {
		component.userData = {};
		component.dataFlag = true;
		component.displayStatus = 'canEdit';
		component.memberDataFlag =  true;
		component.teamData = fakeTeamData;
		component.teamMemberData = fakeMemberData;
		component.invitedTeamMemberData = fakeInviteeData;
		fixture.detectChanges();
		const nameDiv = fixture.debugElement.query(By.css('#input-file-id'));
    	expect(nameDiv).toBeTruthy();		
	});



	it('Invitee box with user who has admin', () => {
		component.userData = {};
		component.dataFlag = true;
		component.displayStatus = 'canEdit';
		component.memberDataFlag =  true;
		component.invitedMemberDataFlag = true;
		component.teamData = fakeTeamData;
		component.teamMemberData = fakeMemberData;
		component.invitedTeamMemberData = fakeInviteeData;
		fixture.detectChanges();
		const nameDiv = fixture.debugElement.query(By.css('#inviteeBox'));
    	expect(nameDiv).toBeTruthy();		
	});



	it('Function is called when button to delete is clicked', () => {
		spyOn(component, 'deleteTeamMember');
		component.userData = {};
		component.dataFlag = true;
		component.displayStatus = 'canEdit';
		component.memberDataFlag =  true;
		component.invitedMemberDataFlag = true;
		component.teamData = fakeTeamData;
		component.teamMemberData = fakeMemberData;
		component.invitedTeamMemberData = fakeInviteeData;
		fixture.detectChanges();
		const nameDiv = fixture.debugElement.nativeElement.querySelector('.deleteMember');
		nameDiv.click();
    	expect(component.deleteTeamMember).toHaveBeenCalled();		
	});


});