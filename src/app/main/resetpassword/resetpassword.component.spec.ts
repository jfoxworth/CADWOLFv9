
// Standard Angular Items
import { Title }   from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Testing items
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


// Services
import { FuseConfigService } from '@fuse/services/config.service';

// Components
import { ResetPasswordComponent } from './resetpassword.component';


describe('ResetPasswordComponent', () => {



  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  const formBuilder: FormBuilder = new FormBuilder();


  beforeEach(async(() => {
	TestBed.configureTestingModule({
	  declarations: [ ResetPasswordComponent ]
	})
	.compileComponents();
  }));



  beforeEach(() => {

	TestBed.configureTestingModule({
	  imports: [ BrowserAnimationsModule ],
	  declarations: [ ResetPasswordComponent ],
	  providers: [ { provide : FuseConfigService,   useValue : {} },
				   { provide : FormBuilder,	   		useValue: formBuilder} ]

	});

	 
	fixture = TestBed.createComponent(ResetPasswordComponent);
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
