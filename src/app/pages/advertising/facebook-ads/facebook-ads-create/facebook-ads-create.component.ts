import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '@app-components/modal/modal.service';
import { FacebookAdsModalComponent } from './facebook-ads-modal/facebook-ads-modal.component';
import { DataTableSource } from '@app-components/datatable/datatable-source';
import { Campaign } from '@app-core/models/campaign';
import { Location } from '@angular/common';

export interface LocalDrive {
  id: number;
  path: any;
}

export interface CampaignAdSets {
  id: number;
  adSetName: string;
  adName: string;
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
  facebookNewsFeed: boolean;
  instagramFeed: boolean;
  facebookMarketplace: boolean;
  facebookVideoFeeds: boolean;
  facebookRightColumn: boolean;
  instagramExplore: boolean;
  messengerInbox: boolean;
  messengerSponsoredMessages: boolean;
  facebookStories: boolean;
  instagramStories: boolean;
  messengerStories: boolean;
  facebookInStreamVideos: boolean;
  facebookSearchResults: boolean;
  facebookInstantArticles: boolean;
  audienceNetworkNativeBannerAndInterstitial: boolean;
  audienceNetworkRewardedVideos: boolean;
  audienceNetworkInStreamVideos: boolean;

  tableSource: DataTableSource<Campaign> = new DataTableSource<Campaign>(50);
  imageArr: LocalDrive[];

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private location: Location
  ) {
    this.desktopMode = true;
    this.mobileMode = true;
    this.facebook = true;
    this.audienceNetwork = true;
    this.instagram = true;
    this.messenger = true;
    this.facebookNewsFeed = true;
    this.instagramFeed = true;
    this.facebookMarketplace = true;
    this.facebookVideoFeeds = true;
    this.facebookRightColumn = true;
    this.instagramExplore = true;
    this.messengerInbox = true;
    this.messengerSponsoredMessages = true;
    this.facebookStories = true;
    this.instagramStories = true;
    this.messengerStories = true;
    this.facebookInStreamVideos = true;
    this.facebookSearchResults = true;
    this.facebookInstantArticles = true;
    this.audienceNetworkNativeBannerAndInterstitial = true;
    this.audienceNetworkRewardedVideos = true;
    this.audienceNetworkInStreamVideos = true;
    this.imageArr = [
      {
        id: 0,
        path: ''
      }
    ];
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      details: this.fb.group({
        name: ['', Validators.required],
        adAccount: '',
        adLabel: '',
        campaignObjective: '',
        websiteUrl: ''
      })
    });

    this.spliteTestFlag = false;
    this.campaignAdsArr = [
      {
        id: 1,
        adSetName: '',
        adName: ''
      }
    ];
    this.editPlacementsFlag = false;
    this.setTrafficStartEndDate = false;
  }

  onSplitTestClick() {
    this.spliteTestFlag = !this.spliteTestFlag;
  }

  onSetTestNum(num) {
    let i = 1;
    this.campaignAdsArr = [
      {
        id: 1,
        adSetName: '',
        adName: ''
      }
    ];

    while (num > 1) {
      this.campaignAdsArr = [
        ...this.campaignAdsArr,
        {
          id: i + 1,
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

  onImportFromLeads() {
    this.modalService.openModal(FacebookAdsModalComponent, {
      width: '80%',
      data: {
        campaign: this.tableSource.selected[0]
      }
    });
  }

  onDesktopModeClick() {
    this.desktopMode = !this.desktopMode;

    if (!this.mobileMode) {
      this.desktopMode = true;
    }
  }

  onMobileModeClick() {
    this.mobileMode = !this.mobileMode;

    if (!this.desktopMode) {
      this.mobileMode = true;
    }
  }

  onFacebookClick() {
    this.facebook = !this.facebook;

    if (this.facebook) {
      this.facebookNewsFeed = true;
      this.facebookMarketplace = true;
      this.facebookVideoFeeds = true;
      this.facebookRightColumn = true;
      this.facebookStories = true;
      this.facebookInStreamVideos = true;
      this.facebookSearchResults = true;
      this.facebookInstantArticles = true;
    } else {
      this.facebookNewsFeed = false;
      this.facebookMarketplace = false;
      this.facebookVideoFeeds = false;
      this.facebookRightColumn = false;
      this.facebookStories = false;
      this.facebookInStreamVideos = false;
      this.facebookSearchResults = false;
      this.facebookInstantArticles = false;
    }
  }

  onAudienceNetworkClick() {
    this.audienceNetwork = !this.audienceNetwork;

    if (this.audienceNetwork) {
      this.audienceNetworkNativeBannerAndInterstitial = true;
      this.audienceNetworkRewardedVideos = true;
      this.audienceNetworkInStreamVideos = true;
    } else {
      this.audienceNetworkNativeBannerAndInterstitial = false;
      this.audienceNetworkRewardedVideos = false;
      this.audienceNetworkInStreamVideos = false;
    }
  }

  onInstagramClick() {
    this.instagram = !this.instagram;

    if (this.instagram) {
      this.instagramFeed = true;
      this.instagramExplore = true;
      this.instagramStories = true;
    } else {
      this.instagramFeed = false;
      this.instagramExplore = false;
      this.instagramStories = false;
    }
  }

  onMessengerClick() {
    this.messenger = !this.messenger;

    if (this.messenger) {
      this.messengerInbox = true;
      this.messengerSponsoredMessages = true;
      this.messengerStories = true;
    } else {
      this.messengerInbox = false;
      this.messengerSponsoredMessages = false;
      this.messengerStories = false;
    }
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
    if (this.facebookNewsFeed) {
      this.facebookNewsFeed = false;
    } else {
      this.facebookNewsFeed = true;
    }
  }

  onInstagramFeed() {
    if (this.instagramFeed) {
      this.instagramFeed = false;
    } else {
      this.instagramFeed = true;
    }
  }

  onFacebookMarketplace() {
    if (this.facebookMarketplace) {
      this.facebookMarketplace = false;
    } else {
      this.facebookMarketplace = true;
    }
  }

  onFacebookVideoFeeds() {
    if (this.facebookVideoFeeds) {
      this.facebookVideoFeeds = false;
    } else {
      this.facebookVideoFeeds = true;
    }
  }

  onFacebookRightColumn() {
    if (this.facebookRightColumn) {
      this.facebookRightColumn = false;
    } else {
      this.facebookRightColumn = true;
    }
  }

  onInstagramExplore() {
    if (this.instagramExplore) {
      this.instagramExplore = false;
    } else {
      this.instagramExplore = true;
    }
  }

  onMessengerInbox() {
    if (this.messengerInbox) {
      this.messengerInbox = false;
    } else {
      this.messengerInbox = true;
    }
  }

  onMessengerSponsoredMessages() {
    if (this.messengerSponsoredMessages) {
      this.messengerSponsoredMessages = false;
    } else {
      this.messengerSponsoredMessages = true;
    }
  }

  onFacebookStories() {
    if (this.facebookStories) {
      this.facebookStories = false;
    } else {
      this.facebookStories = true;
    }
  }

  onInstagramStories() {
    if (this.instagramStories) {
      this.instagramStories = false;
    } else {
      this.instagramStories = true;
    }
  }

  onMessengerStories() {
    if (this.messengerStories) {
      this.messengerStories = false;
    } else {
      this.messengerStories = true;
    }
  }

  onFacebookInStreamVideos() {
    if (this.facebookInStreamVideos) {
      this.facebookInStreamVideos = false;
    } else {
      this.facebookInStreamVideos = true;
    }
  }

  onFacebookSearchResults() {
    if (this.facebookSearchResults) {
      this.facebookSearchResults = false;
    } else {
      this.facebookSearchResults = true;
    }
  }

  onFacebookInstantArticles() {
    if (this.facebookInstantArticles) {
      this.facebookInstantArticles = false;
    } else {
      this.facebookInstantArticles = true;
    }
  }

  onAudienceNetworkNativeBannerAndInterstitial() {
    if (this.audienceNetworkNativeBannerAndInterstitial) {
      this.audienceNetworkNativeBannerAndInterstitial = false;
    } else {
      this.audienceNetworkNativeBannerAndInterstitial = true;
    }
  }

  onAudienceNetworkRewardedVideos() {
    if (this.audienceNetworkRewardedVideos) {
      this.audienceNetworkRewardedVideos = false;
    } else {
      this.audienceNetworkRewardedVideos = true;
    }
  }

  onAudienceNetworkInStreamVideos() {
    if (this.audienceNetworkInStreamVideos) {
      this.audienceNetworkInStreamVideos = false;
    } else {
      this.audienceNetworkInStreamVideos = true;
    }
  }

  uploadImage(files, id) {

    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    // this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.imageArr[id].path = reader.result;
    };
  }

  onAddImage() {
    this.imageArr = [...this.imageArr, {
      id: this.imageArr.length,
      path: ''
    }];
  }

  cancel() {
    this.location.back();
  }
}
