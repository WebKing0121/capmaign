import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface CampaignAdSets {
  id: number,
  adSetName: string,
  adName: string
}
@Component({
  selector: 'app-facebook-ads-create',
  templateUrl: './facebook-ads-create.component.html',
  styleUrls: ['./facebook-ads-create.component.scss']
})
export class FacebookAdsCreateComponent implements OnInit {

  formGroup: FormGroup;
  spliteTestFlag: boolean;
  campaignAdsArr: CampaignAdSets[];
  campaignBudgetOptimisationFlag: boolean;
  editPlacementsFlag: boolean;
  desktopMode: boolean;
  mobileMode: boolean;
  facebook: boolean;
  audienceNetwork: boolean;
  instagram: boolean;
  messenger: boolean;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      details: this.fb.group({
        name: ['', Validators.required],
        adAccount: '',
        adLabel: '',
      })
    });

    this.spliteTestFlag = false;
    this.campaignAdsArr = [
      {
        id:1,
        adSetName: '',
        adName:''
      }
    ];
    this.editPlacementsFlag = false;
  }

  onSplitTestClick() {
    this.spliteTestFlag = !this.spliteTestFlag;
  }
  
  onSetTestNum(num) {
    let i=1;
    this.campaignAdsArr = [
      {
        id:1,
        adSetName: '',
        adName:''
      }
    ];

    while(num>1) {
      this.campaignAdsArr = [
        ...this.campaignAdsArr,
      {
        id: i+1,
        adSetName: '',
        adName: ''
      }];

      i++;
      num--;
    }
  }

  onCampaignBudgetOptimisationClick() {
    this.campaignBudgetOptimisationFlag = !this.campaignBudgetOptimisationFlag;
  }

  onEditPlacementsClick(flag) {
    this.editPlacementsFlag = flag;
  }

  onDesktopModeClick() {
    this.desktopMode = !this.desktopMode;

    if(!this.mobileMode) {
      this.desktopMode = true;
    }
  }

  onMobileModeClick() {
    this.mobileMode = !this.mobileMode;

    if(!this.desktopMode) {
      this.mobileMode = true;
    }
  }

  onFacebookClick() {
    this.facebook = !this.facebook;
  }

  onAudienceNetworkClick() {
    this.audienceNetwork = !this.audienceNetwork;
  }

  onInstagramClick() {
    this.instagram = !this.instagram;
  }

  onMessengerClick() {
    this.messenger = !this.messenger;
  }
}
