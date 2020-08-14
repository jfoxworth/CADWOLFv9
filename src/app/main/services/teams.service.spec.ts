

// Standard angular stuff
import { TestBed } from '@angular/core/testing';


// RXJS
import { BehaviorSubject, Observable, Subject } from 'rxjs';


// Services
import { TeamsService } from './teams.service';
import { UserService } from 'app/main/services/user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


// Mocks
import { mockFirestore } from 'app/main/services/mocks/mockFirestore';
import { mockUserService } from 'app/main/services/mocks/mockUserService';
import { mockFirestorage } from 'app/main/services/mocks/mockFirestorage';


describe('ProfileService', () => {



	let service: TeamsService;
	let MockGroup = new mockFirestore();
	const mockFirestoreService = MockGroup.mockFirestoreStub();

	let MockGroupFirestorage = new mockFirestorage();
	const mockFirestorageService = MockGroupFirestorage.mockFirestorageStub();

	let MockGroupUser = new mockUserService();
	const mockUserServ = MockGroupUser.mockUserService();


	beforeEach(() => {

    	TestBed.configureTestingModule({
    		imports: [ ],
    		providers: [ { provide : AngularFirestore,   useValue : mockFirestoreService },
    					 { provide : AngularFireStorage,   useValue : mockFirestorageService },
    					 { provide : UserService, 		useValue : mockUserServ } ]
    	});

    	service = TestBed.inject(TeamsService);

	});
     



	/*
	*
	*  UNIT TESTS
	*
	*/



	it('should be created', () => {
		expect(service).toBeTruthy();
	});






});
