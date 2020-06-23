import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalRef, MODAL_DATA } from '@app-components/modal/modal-ref';
import { CampaignSendModalComponent } from 'src/app/pages/campaign/components/campaign-send-modal/campaign-send-modal.component';
import { Scoring } from '@app-core/models/scoring';

interface ComponentProps {
  scoring: Scoring;
  selectedIdx: number;
}

@Component({
  selector: 'app-scoring-confirm-default-modal',
  templateUrl: './scoring-confirm-default-modal.component.html',
  styleUrls: ['./scoring-confirm-default-modal.component.scss']
})
export class ScoringConfirmDefaultModalComponent implements OnInit {
  alertText: string;
  hiddenCancelbtn: boolean;

  constructor(
    private fb: FormBuilder,
    @Inject(ModalRef) private modalRef: ModalRef<CampaignSendModalComponent>,
    @Inject(MODAL_DATA) private props: ComponentProps
  ) {
    this.alertText = '';
    this.hiddenCancelbtn = false;
  }

  ngOnInit(): void {
    switch (this.props.selectedIdx) {
      case -1:
        this.alertText = 'Please add atleast one Profile Rule';
        this.hiddenCancelbtn = true;
        break;
      case 3:
        this.alertText = 'Are You Sure You want to make this profile as default for new record';
        break;
      case 4:
        this.alertText = 'Are You Sure You want to make this profile as default for campaign';
        break;
      case 5:
        this.alertText = 'Are You Sure You want to make this profile as lead scoring profile for website';
        break;
      case 6:
        this.alertText = this.props.scoring.isActive
          ? 'Are you sure you want to deactivate this Lead Scoring Profile'
          : 'Are you sure you want to activate this Lead Scoring Profile';
        break;
    }
  }

  onCancel() {
    this.modalRef.cancel();
  }

  onYes() {
    this.modalRef.cancel();
  }
}
