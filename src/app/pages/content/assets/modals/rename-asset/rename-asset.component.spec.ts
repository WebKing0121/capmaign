import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentRenameAssetModalComponent } from './rename-asset.component';

describe('ContentRenameAssetModalComponent', () => {
  let component: ContentRenameAssetModalComponent;
  let fixture: ComponentFixture<ContentRenameAssetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentRenameAssetModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentRenameAssetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
