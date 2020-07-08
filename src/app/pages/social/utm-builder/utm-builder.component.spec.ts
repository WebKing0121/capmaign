import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialUtmBuilderComponent } from './utm-builder.component';

describe('SocialUtmBuilderComponent', () => {
  let component: SocialUtmBuilderComponent;
  let fixture: ComponentFixture<SocialUtmBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialUtmBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialUtmBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
