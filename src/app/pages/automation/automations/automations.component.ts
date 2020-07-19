import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Automation } from '@app-models/automation';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AutomationService } from '@app-core/services/automation.service';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';
import { ModalType } from '@app-core/enums/modal-type.enum';

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
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onDeleteAutomation(), color: 'red', disabled: true },
    { label: 'Pause', icon: 'fa fa-pause', click: () => this.onClickPause(), disabled: true },
    { label: 'Resume', icon: 'fa fa-play', click: () => this.onClickLive(), disabled: true },
  ];
  selected: Automation[] = [];

  // add, edit event modal
  modalType: string;
  selectedAutomation: Automation;

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private automationService: AutomationService
  ) {
    this.automations = [];
    this.totalCount = 0;
  }

  ngOnInit(): void {
    this.initTable();
  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'Description', prop: 'description', sortable: true },
      { name: 'Type', prop: 'automationType', sortable: true, custom: true, template: this.templateType },
      { name: 'Status', prop: 'status', sortable: true },
      {
        name: 'Modification Date', prop: 'lastModificationTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      },
      {
        name: 'Creation Date', prop: 'creationTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onActive(event) {
    if (event.type === 'click') {
      this.tableButtons[1].disabled = this.selected.length === 0;
      this.tableButtons[2].disabled = !(this.selected.length === 1 && this.selected
        .filter(x => x.status === 'Scheduled' || x.status === 'Active').length === 1);
      this.tableButtons[3].disabled = !(this.selected.length === 1 && this.selected
        .filter(x => x.status === 'Scheduled' || x.status === 'Active' || x.status === 'Paused').length === 1);

      if (event.cellIndex === 1 && event.event.target.classList.value === 'datatable-body-cell-label') {

        this.selectedAutomation = event.row as Automation;
        this.modalType = ModalType.Edit;
        setTimeout(() => this.automationModal.edit());
      }
    }
  }

  onClickLive() {

  }

  onClickPause() {

  }

  onCreateAutomation() {
    this.modalType = ModalType.New;
    this.selectedAutomation = null;
    setTimeout(() => this.automationModal.create());
  }
  onDeleteAutomation() {
    this.confirmModal.show();
  }

  onConfirmDelete() {
    this.confirmModal.hide();
  }
  onSaveAutomation() {

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

  initTable() {
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        if (change.pagination !== 'totalCount') {
          this.loadTableData();
        }
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }

  loadTableData() {
    this.loading = true;
    const params = {
      SortDirection: 'Ascending',
      maxResultCount: this.tableSource.pageSize,
      skipCount: (this.tableSource.currentPage - 1) * this.tableSource.pageSize,
      sorting: ''
    };
    this.automationService.getAutomations(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.automations = data.result.items;
          this.totalCount = data.result.totalCount;
          this.tableSource.next(this.automations, this.totalCount);
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }

}
