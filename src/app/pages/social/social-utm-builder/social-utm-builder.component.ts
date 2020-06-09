import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-social-utm-builder',
  templateUrl: './social-utm-builder.component.html',
  styleUrls: ['./social-utm-builder.component.scss']
})
export class SocialUtmBuilderComponent implements OnInit {
  @ViewChild('inputTrackableURL', { static: false }) inputTrackableURL;

  inputValues = {
    'website_url': "",
    'campaign_source': "",
    'campaign_medium': "",
    'campaign_name': "",
    'campaign_term': "",
    'campaign_content': "",
  };
  trackableURL: string;
  constructor() {
    this.trackableURL = '';
  }

  ngOnInit(): void {
  }

  onKeyUpEvent(event) {
    this.inputValues[event.target.name] = event.target.value;
    
    const {
      website_url,
      campaign_source,
      campaign_medium,
      campaign_name,
      campaign_term,
      campaign_content,
    } = this.inputValues;

    this.trackableURL = '';
    let question_mark = 0;
    if (website_url !== '') {
      this.trackableURL = website_url;
    }

    //?utm_source=a&utm_medium=b&utm_campaign=c&utm_term=e&utm_content=e
    if (campaign_source !== '') {
      this.trackableURL += '?utm_source=' + campaign_source;
      question_mark = 1;
    }
    if (campaign_medium !== '') {
      if (question_mark === 0) {
        this.trackableURL += '?utm_medium=' + campaign_medium;
        question_mark = 1;
      } else {
        this.trackableURL += '&utm_medium=' + campaign_medium;
      }
    }
    if (campaign_name !== '') {
      if (question_mark === 0) {
        this.trackableURL += '?utm_campaign=' + campaign_name;
        question_mark = 1;
      } else {
        this.trackableURL += '&utm_campaign=' + campaign_name;
      }
    }

    if (campaign_term !== '') {
      if (question_mark === 0) {
        this.trackableURL += '?utm_term=' + campaign_term;
        question_mark = 1;
      } else {
        this.trackableURL += '&utm_term=' + campaign_term;
      }
    }
    if (campaign_content !== '') {
      if (question_mark === 0) {
        this.trackableURL += '?utm_content=' + campaign_content;
        question_mark = 1;
      } else {
        this.trackableURL += '&utm_content=' + campaign_content;
      }
    }
  }

  copyText(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);  
  }
}