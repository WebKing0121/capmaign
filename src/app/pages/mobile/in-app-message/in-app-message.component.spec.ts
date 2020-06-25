import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InAppMessageComponent } from './in-app-message.component';

describe('InAppMessageComponent', () => {
  let component: InAppMessageComponent;
  let fixture: ComponentFixture<InAppMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InAppMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InAppMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
