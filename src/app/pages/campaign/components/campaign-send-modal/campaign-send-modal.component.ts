import { Component, Inject, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NgbDatepicker, NgbDate } from '@ng-bootstrap/ng-bootstrap';

import { MODAL_DATA, ModalRef } from '@app-components/modal/modal-ref';
import { CheckListItem } from '@app-components/list/interface';
import { Campaign } from '@app-models/campaign';
import { CampaignScheduler } from '@app-core/enums/campaign-scheduler.enum';
import { CampaignSendAsType } from '@app-core/enums/campaign-type.enum';
import { CampaignLeadGradingType } from '@app-core/enums/campaign-type.enum';

import { CampaignResponseMockData } from '@app-fake-db/campaign-mock';
import { WizardComponent } from 'angular-archwizard';
import { ModalService } from '@app-components/modal/modal.service';
import { ScoringConfirmDefaultModalComponent } from 'src/app/pages/scoring/components/scoring-confirm-default-modal/scoring-confirm-default-modal.component';
interface ComponentProps {
  campaign: Campaign;
}

const MAILABLE_LIST = [
  { value: 'newEventListTable', label: 'ajay / NewEventListTable' },
  { value: 'uatTestingList', label: 'ajay / UATTestingList' },
  { value: 'dummyDemoForImport', label: 'Dummy / Demo list for Import' }
];

const INCLUDE_FILTERS = [
  { value: 'filterTest', label: 'Filter Test' },
  { value: 'basisOnLocation', label: 'Basis on Location and Requirement' },
  { value: 'goAirBasis', label: 'Go Air-basis on income and office' }
];

@Component({
  selector: 'app-campaign-send-modal',
  templateUrl: './campaign-send-modal.component.html',
  styleUrls: ['./campaign-send-modal.component.scss']
})

export class CampaignSendModalComponent implements OnInit {

  CampaignScheduler = CampaignScheduler;
  CampaignSendAsType = CampaignSendAsType;
  CampaignLeadGradingType = CampaignLeadGradingType;


  formGroup: FormGroup;
  sendOnFormControl: FormControl;

  includeMailableList: CheckListItem[] = [];
  includeFiltersList: CheckListItem[] = [];
  excludeMailableList: CheckListItem[] = [];
  excludeFiltersList: CheckListItem[] = [];

  checkedIncludeMailableList: CheckListItem[] = [];
  checkedIncludeFiltersList: CheckListItem[] = [];
  checkedExcludeMailableList: CheckListItem[] = [];
  checkedExcludeFiltersList: CheckListItem[] = [];

  campaignNameList: string[];
  emailCampaignType: any;
  navigateForward: string;

  sendOnFlag: boolean;
  selectedDate: NgbDate;
  public model: any = {};

  sendAsOption: CampaignSendAsType;
  leadGradingOption: CampaignLeadGradingType;

  @ViewChild(WizardComponent)
  wizard: WizardComponent;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    @Inject(ModalRef) private modalRef: ModalRef<CampaignSendModalComponent>,
    @Inject(MODAL_DATA) private props: ComponentProps
  ) { }

  ngOnInit(): void {
    this.includeMailableList = MAILABLE_LIST.map(item => ({
      ...item,
      checked: false, disabled: false
    }));
    this.includeFiltersList = INCLUDE_FILTERS.map(item => ({
      ...item,
      checked: false, disabled: false
    }));
    this.excludeMailableList = MAILABLE_LIST.map(item => ({
      ...item,
      checked: false, disabled: false
    }));
    this.excludeFiltersList = INCLUDE_FILTERS.map(item => ({
      ...item,
      checked: false, disabled: false
    }));

    this.campaignNameList = CampaignResponseMockData.map(campaign => campaign.name);

    this.sendAsOption = CampaignSendAsType.Commercial;
    this.leadGradingOption = CampaignLeadGradingType.DefaultGrading;

    this.formGroup = this.fb.group({
      name: this.props && this.props.campaign.name,
      subject: this.props && this.props.campaign.subject,
      fromAddress: '',
      replyAddress: '',
      fromName: '',
      sendAs: '',
      leadScoring: '',
      leadGrading: '',
      dp_to: ''
    });
    this.sendOnFlag = false;
    this.emailCampaignType = this.campaignNameList;
    this.sendOnFormControl = this.fb.control(CampaignScheduler.SendNow, Validators.required);
  }

  onCancel() {
    this.modalRef.cancel();
  }

  onEmailCampaignTypeChange(value) {
    const campaign = CampaignResponseMockData.find(x => x.name === value);
    this.formGroup.controls.name.setValue(campaign.name);
    this.formGroup.controls.subject.setValue(campaign.subject);
  }

  onNextClick() {
    const nextFlag = this.includeMailableList.find(item => item.checked === true) ||
      this.includeFiltersList.find(item => item.checked === true);
    if (!nextFlag) {
      this.modalService.openModal(ScoringConfirmDefaultModalComponent, {
        width: '400px',
        data: {
          mode: 'Warning',
          message: 'Please select at least one list/filter to send/schedule email.'
        }
      })
    } else {
      this.checkedIncludeMailableList = this.includeMailableList.filter(item => item.checked);
      this.checkedIncludeMailableList = this.checkedIncludeMailableList.map(item => ({ ...item, disabled: true }));
      this.checkedIncludeFiltersList = this.includeFiltersList.filter(item => item.checked);
      this.checkedIncludeFiltersList = this.checkedIncludeFiltersList.map(item => ({ ...item, disabled: true }));
      this.checkedExcludeMailableList = this.excludeMailableList.filter(item => item.checked);
      this.checkedExcludeMailableList = this.checkedExcludeMailableList.map(item => ({ ...item, disabled: true }));
      this.checkedExcludeFiltersList = this.excludeFiltersList.filter(item => item.checked);
      this.checkedExcludeFiltersList = this.checkedExcludeFiltersList.map(item => ({ ...item, disabled: true }));
      this.wizard.goToNextStep();
    }
  }

  sendNowClick(evt) {
    const target = evt.target;
    if (target.checked) {
      this.sendOnFlag = false;
    }
  }

  sendOnClick(evt) {
    const target = evt.target;
    if (target.checked) {
      this.sendOnFlag = true;
    }
  }

  onSelect(event): void {
    this.selectedDate = event;
  }

  onSelectTime(evnt): void {
  }
}
