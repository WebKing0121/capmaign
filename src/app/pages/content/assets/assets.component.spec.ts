import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAssetsComponent } from './assets.component';

describe('ContentAssetsComponent', () => {
  let component: ContentAssetsComponent;
  let fixture: ComponentFixture<ContentAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
