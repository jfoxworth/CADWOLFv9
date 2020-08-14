/*
*
*
*      Testing theory
*
*
*    1. Test to ensure that the table is created
*
*    2. Ensure that the table is created
* 
*
*
*
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
import { Title }     from '@angular/platform-browser';
import { By } from "@angular/platform-browser";


// Testing items
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


// Components
import { ConstantsComponent } from './constants.component';


// Services
import { ConstantsService } from 'app/main/services/constants.service';
import { mockConstantsService } from 'app/main/services/mocks/mockConstantsService';





describe('ConstantsComponent', () => {
	
	let component: ConstantsComponent;
	let fixture: ComponentFixture<ConstantsComponent>;


	// Mock Items pulled from external mock file
	let MockGroup = new mockConstantsService();
	const mockConstantService = MockGroup.mockConstantsService();


	beforeEach(async(() => {
		TestBed.configureTestingModule({
    		declarations: [ ConstantsComponent ]
    	})
    	.compileComponents();
	}));

	

	beforeEach(() => {

    
		TestBed.configureTestingModule({
    		imports: [  ],
    		declarations: [ ConstantsComponent ],
    		providers: [ { provide : Title },
      				 { provide : ConstantsService, 	useValue : mockConstantService }]

    	});

	    fixture = TestBed.createComponent(ConstantsComponent);
    	component = fixture.componentInstance;
    	fixture.detectChanges();

	});







	/*
	*
	*  UNIT TESTS
	*
	*/

	it('should create', () => {
		expect(component).toBeTruthy();
	});







	it('Ensure that table is displayed', () => {
    	const constantsTableDiv = fixture.debugElement.query(By.css('#constantsTable')).nativeElement;
      	expect(constantsTableDiv).toBeTruthy();    
	});





});
