import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';
import { SocialEngager } from '@app-models/social';
import { ValidationService } from '@app-services/validation.service';
import { SocialService } from '@app-core/services/social.service';


@Component({
  selector: 'app-social-engager',
  templateUrl: './social-engager.component.html',
  styleUrls: ['./social-engager.component.scss']
})
export class SocialEngagerComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('newEngagerModal', { static: false }) newEngagerModal;
  @ViewChild('confirmModal', { static: false }) confirmModal;
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
  engagers: any[];

  tableSource: DataTableSource<any> = new DataTableSource<any>(50);
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onNewEngager() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onDeleteEngager(), color: 'red', hide: true },
  ];
  selected: any[] = [];

  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private socialService: SocialService,
  ) { }

  ngOnInit(): void {
    this.showSearch = false;
    this.engagerForm = this.formBuilder.group({
      id: 0,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      company: ['', Validators.required],
      email: '',
      mobileNumber: ['', Validators.required],
      zip: ['', Validators.required],
    });

    this.loading = true;
    this.socialService.getSocialEngagers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.engagers = data.result.items;
          this._updateTable(this.engagers);
        },
        error => {
          console.log('error', error);
          this.loading = false;
        });
  }

  ngAfterViewInit() {
    const columns: DataTableColumn[] = [
      { name: 'First name', prop: 'firstName', sortable: true, cellClass: ['cell-hyperlink'], frozenLeft: true },
      { name: 'Last name', prop: 'lastName', sortable: true },
      { name: 'Company', prop: 'company', sortable: true },
      { name: 'Phone number', prop: 'mobileNumberPersonal', sortable: true },
      { name: 'Corporate Address Zip', prop: 'corporateAddressZip', sortable: true },
      { name: 'Lead Source', prop: 'leadSource', sortable: true },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onActive(event) {
    // TODO: Simplify later
    if (event.type === 'click') {
      const engager = event.row as any;
      this.tableButtons[1].hide = false;
      if (event.cellIndex === 0 && event.column.frozenLeft && event.event.target.classList.value === 'datatable-body-cell-label') {
        this.engagerForm.setValue({
          id: engager.id,
          firstName: engager.firstName,
          lastName: engager.lastName,
          company: engager.company,
          email: engager.emailAddress,
          mobileNumber: engager.mobileNumberPersonal,
          zip: engager.corporateAddressZip,
        });
        this.newEngagerModal.show();
      }

    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.engagerForm.controls; }

  onNewEngager() {
    this.engagerForm.reset();
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

  onConfirmDelete() {

  }

  onDeleteEngager() {
    this.confirmModal.show();
  }

  _updateTable(engagers: any[]) {
    this.tableSource.next(engagers.slice(0, 50), engagers.length);

    this.tableSource.changed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(change => {
        this.tableSource.next(
          engagers.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          engagers.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.destroy$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }
}
