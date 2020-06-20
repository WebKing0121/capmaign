import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

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
  setTrafficStartEndDate: boolean;
  startDate: NgbDate;
  endDate: NgbDate;
  model: any;
  facebookNewsFeed: boolean = false;
  instagramFeed: boolean = false;
  facebookMarketplace: boolean = false;
  facebookVideoFeeds: boolean = false;
  facebookRightColumn: boolean = false;
  instagramExplore: boolean = false;
  messengerInbox: boolean = false;
  messengerSponsoredMessages: boolean = false;
  facebookStories: boolean = false;
  instagramStories: boolean = false;
  messengerStories: boolean = false;
  facebookInStreamVideos: boolean = false;
  facebookSearchResults: boolean = false;
  facebookInstantArticles: boolean = false;
  audienceNetworkNativeBannerAndInterstitial: boolean = false;
  audienceNetworkRewardedVideos: boolean = false;
  audienceNetworkInStreamVideos: boolean = false;
  
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
    this.setTrafficStartEndDate = false;
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
    if(this.facebook) {
      this.facebookNewsFeed = true;
    } else {
      this.facebookNewsFeed = false;
    }
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

  onSetContinuouslyStartingToday() {
    this.setTrafficStartEndDate = false;
  }

  onSetTrafficStartEndDate() {
    this.setTrafficStartEndDate = true;
  }
  
  onStartSelect(event) {
    this.startDate = event;
  }

  onEndSelect(event) {
    this.endDate = event;
  }

  onFacebookNewsFeed() {
    if(this.facebookNewsFeed) {
      this.facebookNewsFeed = false;
    } else {
      this.facebookNewsFeed = true;
    }
  }

  onInstagramFeed() {
    this.instagramFeed = !this.instagramFeed;
  }

  onFacebookMarketplace() {
    this.facebookMarketplace = !this.facebookMarketplace;
  }

  onFacebookVideoFeeds() {
    this.facebookVideoFeeds = !this.facebookVideoFeeds;
  }

  onFacebookRightColumn() {
    this.facebookRightColumn = !this.facebookRightColumn;
  }

  onInstagramExplore() {
    this.instagramExplore = !this.instagramExplore;
  }

  onMessengerInbox() {
    this.messengerInbox = !this.messengerInbox;
  }

  onMessengerSponsoredMessages() {
    this.messengerSponsoredMessages = !this.messengerSponsoredMessages;
  }

  onFacebookStories() {
    this.facebookStories = !this.facebookStories;
  }

  onInstagramStories() {
    this.instagramStories = !this.instagramStories;
  }

  onMessengerStories() {
    this.messengerStories = !this.messengerStories;
  }

  onFacebookInStreamVideos() {
    this.facebookInStreamVideos = !this.facebookInStreamVideos;
  }

  onFacebookSearchResults() {
    this.facebookSearchResults = !this.facebookSearchResults;
  }

  onFacebookInstantArticles() {
    this.facebookInstantArticles = !this.facebookInstantArticles;
  }

  onAudienceNetworkNativeBannerAndInterstitial() {
    this.audienceNetworkNativeBannerAndInterstitial = !this.audienceNetworkNativeBannerAndInterstitial;
  }

  onAudienceNetworkRewardedVideos() {
    this.audienceNetworkRewardedVideos = !this.audienceNetworkRewardedVideos;
  }

  AudienceNetworkInStreamVideos() {
    this.audienceNetworkInStreamVideos = !this.audienceNetworkInStreamVideos;
  }
}
