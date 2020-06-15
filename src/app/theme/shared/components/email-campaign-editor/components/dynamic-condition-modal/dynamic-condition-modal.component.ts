import { Component, Inject, OnInit } from '@angular/core';
import { ModalRef } from '@app-components/modal/modal-ref';

import { EmailCampaignDynamicCondition } from '../../../../../../fack-db/campaign-personalization-data';

@Component({
  selector: 'app-dynamic-condition-modal',
  templateUrl: './dynamic-condition-modal.component.html',
  styleUrls: ['./dynamic-condition-modal.component.scss']
})
export class DynamicConditionModalComponent implements OnInit {
  EmailCampaignDynamicCondition = EmailCampaignDynamicCondition;

  condition = '';

  constructor(
    @Inject(ModalRef) private modalRef: ModalRef<DynamicConditionModalComponent>,
  ) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.modalRef.cancel();
  }

  onInsert() {
    const dynamicItem = EmailCampaignDynamicCondition.find(item => item.key === this.condition);
    this.modalRef.closeWithResult(dynamicItem);
  }
}
