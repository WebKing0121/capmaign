import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialEngagerModalComponent } from './engager-modal.component';

describe('SocialEngagerModalComponent', () => {
  let component: SocialEngagerModalComponent;
  let fixture: ComponentFixture<SocialEngagerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialEngagerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialEngagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
