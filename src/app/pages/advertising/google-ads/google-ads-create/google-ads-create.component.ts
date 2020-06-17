import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

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

  constructor(
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      details: this.fb.group({
        name: ['', Validators.required]
      }),
      locationAndDelivery: this.fb.group({}),
      siteLinks: this.fb.array([]),
      template: this.fb.group({
        name: ['', Validators.required],
        billingAccount: [''],
        tagName: ['', Validators.required]
      }),
      groupDetail: this.fb.group({}),
      adsPreview: this.fb.array([])
    });

    this.siteLinksFormArray = this.formGroup.controls.siteLinks as FormArray;

    this.siteLinkCreateForm = this.fb.group({
      text: ['', Validators.required],
      description1: ['', Validators.required],
      description2: [''],
      finalUrl: ['', [Validators.required]]
    });

    this.previewCreateForm = this.fb.group({
      headline1: ['', Validators.required],
      headline2: ['', Validators.required],
      description: ['', Validators.required]
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
}
