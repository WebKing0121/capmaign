import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringConfirmDefaultModalComponent } from './scoring-confirm-default-modal.component';

describe('ScoringConfirmDefaultModalComponent', () => {
  let component: ScoringConfirmDefaultModalComponent;
  let fixture: ComponentFixture<ScoringConfirmDefaultModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoringConfirmDefaultModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoringConfirmDefaultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
