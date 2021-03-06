
// Standard Angular Items
import { Title }   from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Testing items
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


// Services
import { FuseConfigService } from '@fuse/services/config.service';

// Components
import { MailConfirmComponent } from './mailconf.component';



describe('MailConfirmComponent', () => {



  let component: MailConfirmComponent;
  let fixture: ComponentFixture<MailConfirmComponent>;

  const formBuilder: FormBuilder = new FormBuilder();


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailConfirmComponent ]
    })
    .compileComponents();
  }));



  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule ],
      declarations: [ MailConfirmComponent ],
      providers: [ { provide : FuseConfigService,   useValue : {} } ]

    });

     
    fixture = TestBed.createComponent(MailConfirmComponent);
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
