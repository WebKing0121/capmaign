import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMonitorComponent } from './social-monitor.component';

describe('SocialMonitorComponent', () => {
  let component: SocialMonitorComponent;
  let fixture: ComponentFixture<SocialMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
