import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerAutomationsComponent } from './trigger-automations.component';

describe('TriggerAutomationsComponent', () => {
  let component: TriggerAutomationsComponent;
  let fixture: ComponentFixture<TriggerAutomationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriggerAutomationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggerAutomationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
