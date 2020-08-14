
// Standard Angular Items
import { Title }   from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Testing items
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


// Services
import { FuseConfigService } from '@fuse/services/config.service';

// Components
import { RegisterComponent } from './register.component';
import { AuthService } from 'app/main/services/auth.service';



describe('RegisterComponent', () => {



  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  const formBuilder: FormBuilder = new FormBuilder();


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));



  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule ],
      declarations: [ RegisterComponent ],
      providers: [ { provide : FuseConfigService,   useValue : {} },
            	   { provide : FormBuilder,       useValue: formBuilder},
            	   { provide : AuthService,       useValue: AuthService } ]

    });

     
    fixture = TestBed.createComponent(RegisterComponent);
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
