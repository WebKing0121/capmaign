import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileCampaignEditorComponent } from './mobile-campaign-editor.component';

describe('MobileCampaignEditorComponent', () => {
  let component: MobileCampaignEditorComponent;
  let fixture: ComponentFixture<MobileCampaignEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileCampaignEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileCampaignEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
