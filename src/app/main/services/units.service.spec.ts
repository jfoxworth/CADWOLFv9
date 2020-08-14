
// Standard angular stuff
import { TestBed } from '@angular/core/testing';


// RXJS
import { BehaviorSubject, Observable, Subject } from 'rxjs';


// Services
import { UnitsService } from './units.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


// Models
import { Unit } from 'app/main/models/units';



// Mocks
import { mockFirestore } from 'app/main/services/mocks/mockFirestore';


describe('UnitsService', () => {



	let service: UnitsService;
	let MockGroup = new mockFirestore();
	const mockFirestoreService = MockGroup.mockFirestoreStub();


	console.log('The mock firestore is ');
	console.log(mockFirestoreService);




	beforeEach(() => {

    	TestBed.configureTestingModule({
    		imports: [ ],
    		providers: [ { provide : AngularFirestore,   useValue : mockFirestoreService } ]
    	});

    	service = TestBed.inject(UnitsService);

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
