/*
*
*
*		Testing theory
*
*
*	1. Test to ensure that the component is created
*
*	2. Test to ensure that data is shown
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
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from "@angular/platform-browser";


// Testing items
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


// Services
import { FuseConfigService } from '@fuse/services/config.service';
import { UnitsService } from 'app/main/services/units.service';
import { mockUnitsService } from 'app/main/services/mocks/mockUnitsService';


// Components
import { UnitsComponent } from './units.component';



describe('UnitsComponent', () => {



	let component: UnitsComponent;
	let fixture: ComponentFixture<UnitsComponent>;

	// Mock Items pulled from external mock file
	let MockGroup = new mockUnitsService();
	const mockUnitsServ = MockGroup.mockUnitsService();



	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ UnitsComponent ]
		})
		.compileComponents();
	}));



	beforeEach(() => {

		TestBed.configureTestingModule({
			imports: [ BrowserAnimationsModule ],
			declarations: [ UnitsComponent ],
			providers: [ { provide : Title },
						 { provide : UnitsService,	useValue: mockUnitsServ } ]

		});

		 
		fixture = TestBed.createComponent(UnitsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

	});






	/*
	*
	*	UNIT TESTS
	*
	*/

	it('should create', () => {
		expect(component).toBeTruthy();
	});




	it('Ensure that table is displayed', () => {
		const unitTableDiv = fixture.debugElement.query(By.css('#unitTable')).nativeElement;
    	expect(unitTableDiv).toBeTruthy();		
    });




});
