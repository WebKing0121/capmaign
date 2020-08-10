import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalRef, MODAL_DATA } from '@app-components/modal/modal-ref';
// import { CampaignSendModalComponent } from 'src/app/pages/campaigns/components/campaign-send-modal/campaign-send-modal.component';
import { Scoring } from '@app-models/scoring';

interface ComponentProps {
  mode: string;
  message: string;
}

@Component({
  selector: 'app-scoring-confirm-default-modal',
  templateUrl: './scoring-confirm-default-modal.component.html',
  styleUrls: ['./scoring-confirm-default-modal.component.scss']
})
export class ScoringConfirmDefaultModalComponent implements OnInit {
  message: string;
  warningMode: boolean;

  constructor(
    private fb: FormBuilder,
  ) {
    this.message = '';
    this.warningMode = false;
  }

  ngOnInit(): void {
    // this.message = this.props.message;
    // this.warningMode = this.props.mode ? true : false;
  }

  onCancelClicked() {
    // this.modalRef.cancel();
  }

  onYesClicked() {
    // this.modalRef.cancel();
  }
}
