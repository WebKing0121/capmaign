import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageTemplateDemoModalComponent } from './demo.component';

describe('LandingPageTemplateDemoModalComponent', () => {
  let component: LandingPageTemplateDemoModalComponent;
  let fixture: ComponentFixture<LandingPageTemplateDemoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageTemplateDemoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageTemplateDemoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
