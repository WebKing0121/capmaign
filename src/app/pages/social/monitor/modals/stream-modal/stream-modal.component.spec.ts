import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMonitorStreamModalComponent } from './stream-modal.component';

describe('SocialMonitorStreamModalComponent', () => {
  let component: SocialMonitorStreamModalComponent;
  let fixture: ComponentFixture<SocialMonitorStreamModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMonitorStreamModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMonitorStreamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
