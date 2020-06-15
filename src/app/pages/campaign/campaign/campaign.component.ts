import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CampaignResponseMockData } from '../../../fack-db/campaign-mock';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;
    const data = CampaignResponseMockData.find(d => d.id === id);

    this.formGroup = this.fb.group({
      name: data.name,
      subject: data.subject
    });
  }

}
