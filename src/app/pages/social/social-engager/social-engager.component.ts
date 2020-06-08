import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../_services/validation.service';
@Component({
  selector: 'app-social-engager',
  templateUrl: './social-engager.component.html',
  styleUrls: ['./social-engager.component.scss']
})
export class SocialEngagerComponent implements OnInit {
  @ViewChild('newEngagerModal', { static: false }) newEngagerModal;

  cardButtons = [
    { label: 'New Engager', icon: 'icon-plus-circle', action: ()=>this.onNewEngager()},
  ]

  engagers = [
    {
      id: 1,
      first_name: 'David',
			last_name: 'Wilson',
			company: 'Kensington Brewing',
			phone_number: '+1 647-628-6062',
			zip: 'M4W 2L8',
			lead_source: ''
    }, 
    {
      id: 2,
      first_name: 'Drew',
			last_name: 'Hamilton',
			company: 'Attix Pharmaceuticals',
			phone_number: '+1 416-603-2912',
			zip: 'M5T 1T1',
			lead_source: ''
    }, 
    {
      id: 3,
      first_name: 'Kaden',
			last_name: 'Anderson',
			company: 'Paper Bag Records Inc',
			phone_number: '+1 416-901-7470',
			zip: 'M6E 1A5',
			lead_source: ''
    }
  ];
  lastId = 3;
  createEnabled = false;
  public maskMobileNo = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  engagerForm: FormGroup;

  loading = false;
  submitted = false;
  error= '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.engagerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      mobile_number: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.engagerForm.controls; }

  onNewEngager() {
    this.newEngagerModal.show();
  }

  onCreateEngager() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.engagerForm.invalid) {
      return;
    }
    this.lastId ++;
    this.engagers.push({
      id: 3,
      first_name: this.f.first_name.value,
			last_name: this.f.last_name.value,
			company: this.f.company.value,
			phone_number: this.f.mobile_number.value,
			zip: this.f.zip.value,
			lead_source: ''
    });
    this.submitted = false;
    this.engagerForm.reset()
    this.newEngagerModal.hide();
  }
}
