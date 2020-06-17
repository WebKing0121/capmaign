import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookAdsCreateComponent } from './facebook-ads-create.component';

describe('FacebookAdsCreateComponent', () => {
  let component: FacebookAdsCreateComponent;
  let fixture: ComponentFixture<FacebookAdsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookAdsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookAdsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
