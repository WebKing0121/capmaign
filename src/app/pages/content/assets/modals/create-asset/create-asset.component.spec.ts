import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCreateAssetModalComponent } from './create-asset.component';

describe('ContentCreateAssetModalComponent', () => {
  let component: ContentCreateAssetModalComponent;
  let fixture: ComponentFixture<ContentCreateAssetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentCreateAssetModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCreateAssetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
