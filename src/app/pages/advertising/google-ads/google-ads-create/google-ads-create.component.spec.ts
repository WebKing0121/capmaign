import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAdsCreateComponent } from './google-ads-create.component';

describe('GoogleAdsCreateComponent', () => {
  let component: GoogleAdsCreateComponent;
  let fixture: ComponentFixture<GoogleAdsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleAdsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAdsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
