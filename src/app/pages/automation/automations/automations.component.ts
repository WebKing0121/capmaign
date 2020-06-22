import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';

import { Automation } from '@app-models/automation';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AutomationService } from '@app-core/services/automation.service';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';
import { NgSelectData } from '@app-models/common';

@Component({
  selector: 'app-automations',
  templateUrl: './automations.component.html',
  styleUrls: ['./automations.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AutomationsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('automationModal', { static: false }) automationModal;
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('templateType') templateType: TemplateRef<any>;

  private unsubscribe$ = new Subject();

  automations: Automation[];
  tableSource: DataTableSource<Automation> = new DataTableSource<Automation>(50);
  totalCount: number;
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onCreateAutomation() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onDeleteAutomation(), color: 'red', hide: true },
  ];
  selected: Automation[] = [];

  // add, edit event modal
  isModalNew: boolean;
  automationForm: FormGroup;

  automationTypeList: NgSelectData[] = [
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'pre-event', label: 'Pre Event' },
    { value: 'during-event', label: 'During Event' },
    { value: 'post-event', label: 'Post Event' },
  ];

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  searchString: string;
  displayLimit: number;
  sortField: string;
  sortDirection: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private automationService: AutomationService
  ) {

    this.searchString = '';
    this.displayLimit = 50;
    this.sortField = '';
    this.sortDirection = 0;
    this.automations = [];
    this.totalCount = 0;
    this.automationForm = this.fb.group({
      id: 0,
      type: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.automationService.getAutomations(this.searchString, this.displayLimit, this.sortField, this.sortDirection, 0)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.automations = data.result.items;
          this.totalCount = data.result.totalCount;
          this._updateTable(this.automations);
        },
        error => {
          console.log('error', error.response);
        }
      );

  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'], frozenLeft: true },
      {
        name: 'Modification Date', prop: 'lastModificationTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      },
      {
        name: 'Creation Date', prop: 'creationTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      },
      { name: 'Description', prop: 'description', sortable: true },
      { name: 'Status', prop: 'status', sortable: true },
      { name: 'Type', prop: 'automationType', sortable: true, custom: true, template: this.templateType },

    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  _updateTable(automations: Automation[]) {
    this.tableSource.next(automations.slice(0, 50), automations.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          automations.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          automations.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }


  onActive(event) {
    if (event.type === 'click') {
      this.tableButtons[1].hide = false;
      if (event.cellIndex === 0 && event.column.frozenLeft) {

        const automation: Automation = event.row as Automation;
        this.isModalNew = false;

        this.automationForm.setValue({
          id: automation.id,
          type: this.getAutomationTypeKey(automation),
          name: '' + automation.name,
          description: automation.description
        });

        this.automationModal.show();
      }
    }
  }

  onCreateAutomation() {
    this.isModalNew = true;
    this.automationForm.setValue({
      id: 0,
      type: 'email',
      description: '',
      name: ''
    });

    this.automationModal.show();

  }
  onDeleteAutomation() {
    this.confirmModal.show();
  }

  onConfirmDelete() {
    this.confirmModal.hide();
  }
  onSaveAutomation() {
    console.log(this.automationForm.value);
  }

  getAutomationType(automation: Automation) {
    if (automation.eventAutomationType === 0 && automation.automationType === 0) {
      return 'Email';
    }
    if (automation.eventAutomationType === 2 && automation.automationType === 0) {
      return 'During Event';
    }
    if (automation.eventAutomationType === 0 && automation.automationType === 2) {
      return 'Pre Event';
    }
    if (automation.eventAutomationType === 0 && automation.automationType === 1) {
      return 'SMS';
    }
    if (automation.eventAutomationType === 1 && automation.automationType === 0) {
      return 'Post Event';
    }
    return 'Unknown';
  }

  getAutomationTypeKey(automation: Automation) {
    if (automation.eventAutomationType === 0 && automation.automationType === 0) {
      return 'email';
    }
    if (automation.eventAutomationType === 2 && automation.automationType === 0) {
      return 'during-event';
    }
    if (automation.eventAutomationType === 0 && automation.automationType === 2) {
      return 'pre-event';
    }
    if (automation.eventAutomationType === 0 && automation.automationType === 1) {
      return 'sms';
    }
    if (automation.eventAutomationType === 1 && automation.automationType === 0) {
      return 'post-event';
    }
    return 'unknown';
  }
}
