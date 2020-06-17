import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MODAL_DATA, ModalRef } from '@app-components/modal/modal-ref';
import { CheckListItem } from '@app-components/list/interface';
import { Campaign } from '@app-models/campaign';
import { CampaignScheduler } from '@app-core/enums/campaign-scheduler.enum';

interface ComponentProps {
  campaign: Campaign;
  mode?: 'full' | 'test';
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

  formGroup: FormGroup;
  sendOnFormControl: FormControl;

  mailableList: CheckListItem[] = [];
  includeFiltersList: CheckListItem[] = [];

  constructor(
    private fb: FormBuilder,
    @Inject(ModalRef) private modalRef: ModalRef<CampaignSendModalComponent>,
    @Inject(MODAL_DATA) private props: ComponentProps
  ) { }

  ngOnInit(): void {
    this.mailableList = MAILABLE_LIST.map(item => ({
      ...item,
      checked: false
    }));
    this.includeFiltersList = INCLUDE_FILTERS.map(item => ({
      ...item,
      checked: false
    }));

    this.sendOnFormControl = this.fb.control(CampaignScheduler.SendNow, Validators.required);
  }

  onCancel() {
    this.modalRef.cancel();
  }
}
