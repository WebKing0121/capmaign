import { Component, OnInit, Input, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { CampaignType } from '@app-core/enums/campaign-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NgSelectData } from '@app-core/models/common';
import { ReportService } from '@app-services/report.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-report-send-result-modal',
  templateUrl: './report-send-result-modal.component.html',
  styleUrls: ['./report-send-result-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportSendResultModalComponent implements OnInit, OnDestroy {
  @ViewChild('sendResultModal', { static: false }) sendResultModal;
  @Input() modalType = CampaignType.Email;
  campaignType = CampaignType;
  campaignForm: FormGroup;
  campaigns: NgSelectData[];

  private unsubscribe$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService
  ) {
    this.campaigns = [];
    this.campaignForm = this.fb.group({
      campaign: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.campaignForm.setValue({
      campaign: ''
    });

    if (this.modalType === CampaignType.Email) {
      this.reportService.getEmailCampaigns()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            if (data.result) {
              this.campaigns = data.result.items.map(x => ({ value: `${x.emailCampaignId}`, label: x.emailName }));
            } else {
              this.campaigns = [];
            }

          },
          error => {
            console.log('error', error.response);
          }
        );
    } else if (this.modalType === CampaignType.SMS) {
      this.reportService.getSmsCampaigns()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            if (data.result) {
              this.campaigns = data.result.items.map(x => ({ value: `${x.smsCampaignId}`, label: x.smsName }));
            } else {
              this.campaigns = [];
            }
          },
          error => {
            console.log('error', error.response);
          }
        );
    }

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  onClickExport() {

  }

  show() {
    this.sendResultModal.show();
  }

  hide() {
    this.sendResultModal.hide();
  }
}
