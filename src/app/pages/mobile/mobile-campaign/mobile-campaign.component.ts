import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CampaignFromDisplayType } from '@app-core/enums/campaign-type.enum';
import { CampaignResponseMockData } from '@app-fake-db/campaign-mock';
import { MODAL_DATA, ModalRef } from '@app-components/modal/modal-ref';

interface ComponentProps {
  id: string;
  mode: string;
}

@Component({
  selector: 'app-mobile-campaign',
  templateUrl: './mobile-campaign.component.html',
  styleUrls: ['./mobile-campaign.component.scss']
})
export class MobileCampaignComponent implements OnInit {
  CampaignFromDisplayType = CampaignFromDisplayType;

  campaignMode: 'new' | 'edit';

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    @Inject(MODAL_DATA) private props: ComponentProps,
    @Inject(ModalRef) private modalRef: ModalRef<MobileCampaignComponent>,
  ) { }

  ngOnInit(): void {
    // const { id } = this.route.snapshot.params;
    // const { mode } = this.route.snapshot.data;
    const id = this.props.id;
    const mode = this.props.mode;

    const data = CampaignResponseMockData.find(d => d.id === id);
    this.campaignMode = mode === 'new' ? 'new' : 'edit';

    this.formGroup = this.fb.group({
      name: data && data.name,
      senderName: '',
      folderName: '',
      emailContent: ''
    });

    if (this.campaignMode === 'new') {
      this.formGroup.controls.name.setValidators(Validators.required);
      this.formGroup.controls.name.updateValueAndValidity();

      this.formGroup.controls.emailContent.setValidators(Validators.required);
      this.formGroup.controls.emailContent.updateValueAndValidity();
    }
  }

  onSave() {
    this.modalRef.cancel();
  }

  onCancel() {
    // this.location.back();
    this.modalRef.cancel();
  }
}
