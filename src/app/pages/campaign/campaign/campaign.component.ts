import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CampaignFromDisplayType } from '@app-core/enums/campaign-type.enum';

import { CampaignResponseMockData } from '../../../fack-db/campaign-mock';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {
  CampaignFromDisplayType = CampaignFromDisplayType;

  campaignMode: 'new' | 'edit';

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;
    const { mode } = this.route.snapshot.data;

    const data = CampaignResponseMockData.find(d => d.id === id);
    this.campaignMode = mode === 'new' ? 'new' : 'edit';

    this.formGroup = this.fb.group({
      name: data && data.name,
      subject: data && data.subject,
      fromDisplay: '',
      fromAddress: data && data.fromAddress,
      replyAddress: data && data.replyAddress,
      folderName: ''
    });

    if (this.campaignMode === 'new') {
      this.formGroup.controls.name.setValidators(Validators.required);
      this.formGroup.controls.name.updateValueAndValidity();

      this.formGroup.controls.subject.setValidators(Validators.required);
      this.formGroup.controls.subject.updateValueAndValidity();
    }
  }

}
