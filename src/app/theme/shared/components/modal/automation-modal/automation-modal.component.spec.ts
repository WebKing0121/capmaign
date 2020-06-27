import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationModalComponent } from './automation-modal.component';

describe('AutomationModalComponent', () => {
  let component: AutomationModalComponent;
  let fixture: ComponentFixture<AutomationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
