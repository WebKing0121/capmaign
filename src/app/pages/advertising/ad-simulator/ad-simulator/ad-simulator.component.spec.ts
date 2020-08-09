import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSimulatorComponent } from './ad-simulator.component';

describe('AdSimulatorComponent', () => {
  let component: AdSimulatorComponent;
  let fixture: ComponentFixture<AdSimulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdSimulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
