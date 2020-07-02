import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAppModalComponent } from './mobile-app.component';

describe('MobileAppModalComponent', () => {
  let component: MobileAppModalComponent;
  let fixture: ComponentFixture<MobileAppModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAppModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAppModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
