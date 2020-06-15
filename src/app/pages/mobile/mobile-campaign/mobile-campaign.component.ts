import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CampaignFromDisplayType } from '@app-core/enums/campaign-type.enum';
import { CampaignResponseMockData } from '../../../fack-db/campaign-mock';

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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;
    const { mode } = this.route.snapshot.data;

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
  }

  onCancel() {
    this.location.back();
  }
}
