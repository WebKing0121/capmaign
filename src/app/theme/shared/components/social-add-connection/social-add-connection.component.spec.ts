import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialAddConnectionComponent } from './social-add-connection.component';

describe('SocialAddConnectionComponent', () => {
  let component: SocialAddConnectionComponent;
  let fixture: ComponentFixture<SocialAddConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialAddConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialAddConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
