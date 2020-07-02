import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageTemplateModalComponent } from './template.component';

describe('LandingPageTemplateModalComponent', () => {
  let component: LandingPageTemplateModalComponent;
  let fixture: ComponentFixture<LandingPageTemplateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageTemplateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageTemplateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
