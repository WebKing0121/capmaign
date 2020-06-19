import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { NgbDate, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

export interface googleAdsType{
  id: number,
  headline1: string,
  headline2: string,
  description: string
}

@Component({
  selector: 'app-google-ads-create',
  templateUrl: './google-ads-create.component.html',
  styleUrls: ['./google-ads-create.component.scss']
})

export class GoogleAdsCreateComponent implements OnInit {

  formGroup: FormGroup;

  siteLinkCreateForm: FormGroup;
  previewCreateForm: FormGroup;

  siteLinksFormArray: FormArray;

  headline1: any;
  headline2: any;
  description: any;
  model: any;

  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  
  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? states
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  public googleAdsArr: googleAdsType[] = [];

  startDate: NgbDate;
  endDate: NgbDate;

  constructor(
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      details: this.fb.group({
        name: ['', Validators.required],
        customerAccount: '',
        billingAccount: '',
        openGoalFlag: ''
      }),
      locationAndDelivery: this.fb.group({
        include: ['', Validators.required],
        exclude: ['', Validators.required],
        language: '',
        dailyBudget: '',
      }),
      siteLinks: this.fb.array([]),
      template: this.fb.group({
        name: ['', Validators.required],
        billingAccount: [''],
        tagName: ['', Validators.required]
      }),
      groupDetail: this.fb.group({
        adGroupName: ['', Validators.required],
        keywords: ['', Validators.required],
        businessName: '',
        websiteUrl: ['', Validators.required]
      }),
      adsPreview: this.fb.group({
        headline1: ['', Validators.required],
        headline2: ['', Validators.required],
        description: '',
      })
    });

    this.siteLinksFormArray = this.formGroup.controls.siteLinks as FormArray;

    this.siteLinkCreateForm = this.fb.group({
      text: ['', Validators.required],
      description1: ['', Validators.required],
      description2: [''],
      finalUrl: ['', [Validators.required]]
    });

    this.previewCreateForm = this.fb.group({
      headline1: '',
      headline2: '',
      description: ''
    });
  }

  save() {
    console.log('GoogleAdsCreate.Save => ', this.formGroup.value);
  }

  cancel() {
    this.location.back();
  }

  createNewSiteLink() {
    const siteData = this.siteLinkCreateForm.getRawValue();
    this.siteLinkCreateForm.setValue({
      text: '', description1: '', description2: '', finalUrl: ''
    });

    this.siteLinksFormArray.push(this.fb.group({
      text: siteData.text || '',
      description1: siteData.description1 || '',
      description2: siteData.description2 || '',
      finalUrl: siteData.finalUrl || '',
      id: uuidv4(),
      check: true
    }));
  }

  onCreateAds(headline1, headline2, description) {
    this.googleAdsArr = [...this.googleAdsArr, { id:this.googleAdsArr.length,headline1:headline1, headline2:headline2, description:description}];
    console.log(this.googleAdsArr);
  }

  onRemoveAd(id) {
    let tempGoogleAds = this.googleAdsArr;
    let i=0;
    for (i=0; i < tempGoogleAds.length; i++) {
      if(id === tempGoogleAds[i].id) {
        tempGoogleAds.splice(i, 1);
      }
    }
    this.googleAdsArr = tempGoogleAds;
  }

  onStartSelect(event) {
    this.startDate = event;
  }

  onEndSelect(event) {
    this.endDate = event;
  }
}
