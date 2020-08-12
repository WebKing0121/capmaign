import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileInAppMessageModalComponent } from './in-app-message.component';

describe('MobileInAppMessageModalComponent', () => {
  let component: MobileInAppMessageModalComponent;
  let fixture: ComponentFixture<MobileInAppMessageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileInAppMessageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileInAppMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
