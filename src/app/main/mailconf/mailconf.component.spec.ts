import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailconfComponent } from './mailconf.component';

describe('MailconfComponent', () => {
  let component: MailconfComponent;
  let fixture: ComponentFixture<MailconfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailconfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailconfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
