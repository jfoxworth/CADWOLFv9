import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidthmarginComponent } from './widthmargin.component';

describe('WidthmarginComponent', () => {
  let component: WidthmarginComponent;
  let fixture: ComponentFixture<WidthmarginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidthmarginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidthmarginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
