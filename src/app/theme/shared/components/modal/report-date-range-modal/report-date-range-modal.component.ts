import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { CampaignType } from '@app-core/enums/campaign-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-report-date-range-modal',
  templateUrl: './report-date-range-modal.component.html',
  styleUrls: ['./report-date-range-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportDateRangeModalComponent implements OnInit {
  @ViewChild('dateRangeModal', { static: false }) dateRangeModal;
  @Input() modalType = CampaignType.Email;
  campaignType = CampaignType;
  dateRangeForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.dateRangeForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const year = Number(moment().format('YYYY'));
    const month = Number(moment().format('MM'));
    const day = Number(moment().format('DD'));
    this.dateRangeForm.setValue({
      startDate: { year, month, day },
      endDate: { year, month, day },
    });
  }

  onClickExport() {

  }

  show() {
    this.dateRangeModal.show();
  }

  hide() {
    this.dateRangeModal.hide();
  }
}
