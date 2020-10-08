import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHideComponent } from './show-hide.component';

describe('ShowHideComponent', () => {
  let component: ShowHideComponent;
  let fixture: ComponentFixture<ShowHideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
