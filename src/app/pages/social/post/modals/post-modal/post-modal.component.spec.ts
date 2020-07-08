import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialPostModalComponent } from './post-modal.component';

describe('SocialPostModalComponent', () => {
  let component: SocialPostModalComponent;
  let fixture: ComponentFixture<SocialPostModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialPostModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialPostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
