


// Standard Angular Items
import { Title }	 from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Testing items
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


// Components
import { ForgotPasswordComponent } from './forgotpassword.component';


// Services
import { FuseConfigService } from '@fuse/services/config.service';




describe('ForgotPasswordComponent', () => {

	let component: ForgotPasswordComponent;
	let fixture: ComponentFixture<ForgotPasswordComponent>;

	const formBuilder: FormBuilder = new FormBuilder();


	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ForgotPasswordComponent ]
 		})
		.compileComponents();
  	}));

	


	beforeEach(() => {

		TestBed.configureTestingModule({
			imports: [ BrowserAnimationsModule ],
			declarations: [ ForgotPasswordComponent ],
			providers: [ { provide : FuseConfigService, 	useValue : {} },
						 { provide : FormBuilder, 			useValue: formBuilder} ]

		});

	   
		fixture = TestBed.createComponent(ForgotPasswordComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

	});




  /*
  *
  *  UNIT TESTS
  *
  */

  it('should create forgot password', () => {
	expect(component).toBeTruthy();
  });



});






