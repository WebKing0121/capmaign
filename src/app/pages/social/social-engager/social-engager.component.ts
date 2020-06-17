import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../_services/validation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';
import { SocialEngager } from '@app-models/social-engager';
import { SocialEngagersMockData } from '../../../fack-db/social-engagers-mock';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';


@Component({
  selector: 'app-social-engager',
  templateUrl: './social-engager.component.html',
  styleUrls: ['./social-engager.component.scss']
})
export class SocialEngagerComponent implements OnInit, OnDestroy {
  @ViewChild('newEngagerModal', { static: false }) newEngagerModal;

  cardButtons = [
    { label: 'New Engager', icon: 'icon-plus-circle', action: () => this.onNewEngager() },
  ];

  showSearch: boolean;

  lastId = 3;
  createEnabled = false;
  public maskMobileNo = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  engagerForm: FormGroup;

  destroy$ = new Subject();

  loading = false;
  submitted = false;
  error = '';

  tableSource: DataTableSource<SocialEngager> = new DataTableSource<SocialEngager>(50);
  columns: DataTableColumn[] = [
    { name: 'First name', prop: 'first_name', sortable: true },
    { name: 'Last name', prop: 'last_name', sortable: true },
    { name: 'Company', prop: 'company', sortable: true },
    { name: 'Phone number', prop: 'phone_number', sortable: true },
    { name: 'Corporate Address Zip', prop: 'zip', sortable: true },
    { name: 'Lead Source', prop: 'lead_source', sortable: true },
  ];

  selected: SocialEngager[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showSearch = false;

    this.tableSource.next(SocialEngagersMockData.slice(0, 50), SocialEngagersMockData.length);

    this.tableSource.changed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(change => {
        console.log('Campaign Table Changes: ', change);

        this.tableSource.next(
          SocialEngagersMockData.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
            SocialEngagersMockData.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.destroy$))
      .subscribe(selected => {
        this.selected = selected;
      });


    this.engagerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      mobile_number: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onActive(event) {
    // TODO: Simplify later
   
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
    this.submitted = false;
    this.engagerForm.reset();
    this.newEngagerModal.hide();
  }

  onClickSearchShow() {
    this.showSearch = !this.showSearch;
  }
}
