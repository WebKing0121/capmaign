import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendSubscriberModalComponent } from './send-subscriber-modal.component';

describe('SendSubscriberModalComponent', () => {
  let component: SendSubscriberModalComponent;
  let fixture: ComponentFixture<SendSubscriberModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendSubscriberModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendSubscriberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
