import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoPalleteComponent } from './go-pallete.component';

describe('GoPalleteComponent', () => {
  let component: GoPalleteComponent;
  let fixture: ComponentFixture<GoPalleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoPalleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoPalleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
