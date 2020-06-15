import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCampaignEditorComponent } from './email-campaign-editor.component';

describe('EmailCampaignEditorComponent', () => {
  let component: EmailCampaignEditorComponent;
  let fixture: ComponentFixture<EmailCampaignEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailCampaignEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCampaignEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
