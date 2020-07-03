import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentUploadAssetModalComponent } from './upload-asset.component';

describe('ContentUploadAssetModalComponent', () => {
  let component: ContentUploadAssetModalComponent;
  let fixture: ComponentFixture<ContentUploadAssetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentUploadAssetModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentUploadAssetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
