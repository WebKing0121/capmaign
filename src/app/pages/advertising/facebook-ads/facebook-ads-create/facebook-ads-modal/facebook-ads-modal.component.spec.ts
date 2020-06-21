import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookAdsModalComponent } from './facebook-ads-modal.component';

describe('FacebookAdsModalComponent', () => {
  let component: FacebookAdsModalComponent;
  let fixture: ComponentFixture<FacebookAdsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookAdsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookAdsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
