

// Standard angular stuff
import { TestBed } from '@angular/core/testing';


// RXJS
import { BehaviorSubject, Observable, Subject } from 'rxjs';


// Services
import { ConstantsService } from './constants.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


// Mocks
import { mockFirestore } from 'app/main/services/mocks/mockFirestore';
import { mockConstantsService } from 'app/main/services/mocks/mockConstantsService';


describe('ConstantsService', () => {



	let service: ConstantsService;
	let MockGroup = new mockFirestore();
	const mockFirestoreService = MockGroup.mockFirestoreStub();

	let MockGroupConstants = new mockConstantsService();
	const mockConstantsServ = MockGroupConstants.mockConstantsService();


	beforeEach(() => {

    	TestBed.configureTestingModule({
    		imports: [ ],
    		providers: [ { provide : AngularFirestore,   useValue : mockFirestoreService } ]
    	});

    	service = TestBed.inject(ConstantsService);

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
