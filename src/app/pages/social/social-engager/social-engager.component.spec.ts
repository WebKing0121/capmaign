import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialEngagerComponent } from './social-engager.component';

describe('SocialEngagerComponent', () => {
  let component: SocialEngagerComponent;
  let fixture: ComponentFixture<SocialEngagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialEngagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialEngagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
