
// Standard Angular Items
import { Title }	 from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Testing items
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


// Services
import { FuseConfigService } from '@fuse/services/config.service';

// Components
import { LoginComponent } from './login.component';
import { AuthService } from 'app/main/services/auth.service';



describe('LoginComponent', () => {



	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	const formBuilder: FormBuilder = new FormBuilder();


	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ LoginComponent ]
		})
		.compileComponents();
	}));



	beforeEach(() => {

		TestBed.configureTestingModule({
			imports: [ BrowserAnimationsModule ],
			declarations: [ LoginComponent ],
			providers: [ { provide : FuseConfigService, 	useValue : {} },
						 { provide : FormBuilder, 			useValue: formBuilder},
						 { provide : AuthService, 			useValue: AuthService } ]

		});

	   
		fixture = TestBed.createComponent(LoginComponent);
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




});
