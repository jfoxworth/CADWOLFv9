

// Standard angular stuff
import { TestBed } from '@angular/core/testing';


// RXJS
import { BehaviorSubject, Observable, Subject } from 'rxjs';


// Services
import { UserService } from './user.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';


// Mocks
import { mockFirestore } from 'app/main/services/mocks/mockFirestore';
import { mockFirestorage } from 'app/main/services/mocks/mockFirestorage';


describe('UserService', () => {



	let service: UserService;

	let MockGroup = new mockFirestore();
	const mockFirestoreService = MockGroup.mockFirestoreStub();

	let MockGroupFirestorage = new mockFirestorage();
	const mockFirestorageService = MockGroupFirestorage.mockFirestorageStub();


	beforeEach(() => {

    	TestBed.configureTestingModule({
    		imports: [ ],
    		providers: [ { provide : AngularFirestore,   useValue : mockFirestoreService },
    					 { provide : AngularFireStorage,   useValue : mockFirestorageService } ]
    	});

    	service = TestBed.inject(UserService);

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
