import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageTemplatesComponent } from './landing-page-templates.component';

describe('LandingPageTemplatesComponent', () => {
  let component: LandingPageTemplatesComponent;
  let fixture: ComponentFixture<LandingPageTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
