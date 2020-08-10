import {
  Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation,
  TemplateRef, ViewChild, Input, EventEmitter, Output
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';
import { CollaborateCampaignTask, CollaborateCampaignSubtask } from '@app-models/collaborate';
import { CardButton } from '@app-models/card';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { CollaborateService } from '@app-services/collaborate.service';
import { ToastService } from '../toast/toast.service';
import { DataSourceChange } from '@app-models/data-source';
import { ModalType } from '@app-core/enums/modal-type.enum';

@Component({
  selector: 'app-campaign-sub-tasks',
  templateUrl: './campaign-sub-tasks.component.html',
  styleUrls: ['./campaign-sub-tasks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CampaignSubTasksComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() task: any;
  @Input() user: any;
  @Output() selectRow: EventEmitter<any> = new EventEmitter();

  @ViewChild('cardSubTasks', { static: false }) cardSubTasks;
  @ViewChild('subTaskModal', { static: false }) subTaskModal;
  @ViewChild('progressTemplate') progressTemplate: TemplateRef<any>;
  @ViewChild('userNameTemplate') userNameTemplate: TemplateRef<any>;
  @ViewChild('confirmModal', { static: false }) confirmModal;

  modalType = ModalType.New;
  selectedSubTask: any;

  private unsubscribe$ = new Subject();

  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  subTasks: any[];
  selectedSubTaskId: number;

  tableSource: DataTableSource<any> = new DataTableSource<any>(50);
  selected: CollaborateCampaignTask[] = [];
  tableButtons: CardButton[] = [
    {
      label: 'Create', icon: 'fa fa-edit', click: () => this.onClickAddTask(), disabled: true
    },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', disabled: true },
  ];

  totalCount = 0;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private collaborateService: CollaborateService,
    private toastEvent: ToastService
  ) {
    this.selectedSubTaskId = 0;
  }

  ngOnInit(): void {
    this.initSubTaskTable();
  }

  initSubTaskTable() {
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((change: DataSourceChange) => {
        if (change.pagination !== 'totalCount') {
          if (this.task) {
            this.loadSubTasks(this.task.id);
          }
        }
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }

  ngAfterViewInit() {

    const columns = [
      { name: 'Sub Task', prop: 'subtaskName', sortable: true, cellClass: ['cell-hyperlink'], frozenLeft: true },
      { name: 'Description', prop: 'subtaskDescription', sortable: true },
      {
        name: 'Start', prop: 'subtaskStartDate', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 120
      },
      {
        name: 'End', prop: 'subtaskEndDate', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 120
      },
      {
        name: 'Progress', prop: 'percent', sortable: true, custom: true,
        template: this.progressTemplate, maxWidth: 120
      },
      { name: 'Est.', prop: 'subtaskestimatehours', sortable: true, maxWidth: 80 },
      {
        name: 'Member', prop: 'subtaskmemberId', sortable: true, custom: true,
        template: this.userNameTemplate, maxWidth: 150
      },
    ];

    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**********************************************
   * Click event - Plus icon in sub tasks table *
   * ------------------------------------------ *
   *                                            *
   **********************************************/
  onClickAddTask() {
    if (this.task && this.task.id > 0) {
      this.selectedSubTask = null;
      this.modalType = ModalType.New;
      setTimeout(() => this.subTaskModal.show());
    } else {
      this.toastEvent.toast({ uid: 'toast2', delay: 3000 });
    }
  }
  onClickDelete() {
    this.confirmModal.show();
  }

  onConfirmDelete() {

  }

  setEnableCreate() {
    this.tableButtons[0].disabled = false;
  }

  onCreateSubTask() {

  }
  /******************************************************
   * Click event - select row in Assigned Campaign table *
   * --------------------------------------------------- *
   *                                                     *
   *******************************************************/
  onClickSubTask(event) {
    // this.selectedSubTaskId = subTaskId;
    // this.selectRow.emit(this.selectedSubTaskId);
    if (event.type === 'click') {
      const subTask = event.row;
      this.selectRow.emit(subTask);

      this.tableButtons[1].disabled = false;
      // open edit modal;
      if (
        event.cellIndex === 0
        && event.event.target.classList.value === 'datatable-body-cell-label'
      ) {
        this.selectedSubTask = subTask;
        this.modalType = ModalType.Edit;
        setTimeout(() => this.subTaskModal.show());
      }
    }
  }

  reloadSubTasks() {
    this.loadSubTasks(this.task.id);
  }

  loadSubTasks(taskId: number) {
    // let subtasksFromServer;
    this.tableButtons[1].disabled = true;
    if (taskId === 0) {
      this.subTasks = [];
      this.tableSource.next(this.subTasks, 0);
      return;
    }

    const params = {
      SortDirection: 'Ascending',
      maxResultCount: this.tableSource.pageSize,
      skipCount: (this.tableSource.currentPage - 1) * this.tableSource.pageSize,
      sorting: ''
    };
    this.loading = true;
    this.collaborateService.getCampaignSubTasks(taskId, params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.success && data.result) {
            this.subTasks = data.result.items;
            this.totalCount = data.result.totalCount;
          }
          this.tableSource.next(this.subTasks, this.totalCount);
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error);
        }
      );

  }
}
