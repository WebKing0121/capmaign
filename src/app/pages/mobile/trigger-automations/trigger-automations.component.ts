import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, AfterViewInit } from '@angular/core';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { Subject } from 'rxjs';
import { ModalService } from '@app-components/modal/modal.service';
import { takeUntil } from 'rxjs/operators';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';
import { ScoringConfirmDefaultModalComponent } from '../../scoring/components/scoring-confirm-default-modal/scoring-confirm-default-modal.component';
import { Automation } from '@app-core/models/automation';
import { AutomationService } from '@app-core/services/automation.service';
import { AutomationModalType } from '@app-core/enums/automation-type.enum';

@Component({
  selector: 'app-trigger-automations',
  templateUrl: './trigger-automations.component.html',
  styleUrls: ['./trigger-automations.component.scss']
})
export class TriggerAutomationsComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('automationModal', { static: false }) automationModal;

  tableSource: DataTableSource<Automation> = new DataTableSource<Automation>(50);
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onCreateClicked() },
    { label: 'Pause', icon: 'fa fa-pause', click: () => this.onDeleteClicked(), hide: true },
    { label: 'Live', icon: 'fa fa-play', click: () => this.onDeleteClicked(), hide: true },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onDeleteClicked(), color: 'red', hide: true }
  ];

  selected: Automation[];
  automations: Automation[];
  destroy$ = new Subject();

  // add, edit event modal
  modalType: string;
  selectedAutomation: Automation;


  constructor(
    private modalService: ModalService,
    private automationService: AutomationService
  ) {
    this.automations = [];
  }

  ngOnInit(): void {
    this.automationService.getAutomations('', 50, '', 0, 0)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.automations = data.result.items;
        },
        error => {
          console.log('error', error);
        }
      );

    this.automations = this.automations.filter(item => item.automationType === 1);

    this.tableSource.next(this.automations.slice(0, 50), this.automations.length);

    this.tableSource.changed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(change => {
        let mockData = [];
        if (change.search) {
          mockData = this.automations.filter(item => item.name.includes(change.search));
        } else {
          mockData = this.automations;
        }

        this.tableSource.next(
          mockData.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1),
            change.pagination.pageSize * (change.pagination.pageNumber)),
          mockData.length
        );
      });

    this.tableSource.selection$
      .pipe(takeUntil(this.destroy$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'], alwaysVisible: true },
      { name: 'Modification Date', prop: 'lastModificationTime', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm A' } },
      { name: 'Created Date', prop: 'creationTime', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm A' } },
      { name: 'Description', prop: 'description', sortable: true },
      { name: 'Status', prop: 'status', sortable: true },
    ];
    this.tableSource.setColumns(columns);
  }

  onCreateClicked() {
    this.modalType = AutomationModalType.New;
    this.selectedAutomation = null;
    this.automationModal.create();
  }

  getAutomationType() {
    return 'SMS';
  }

  onActive(event) {
    if (event.type === 'click' && event.cellIndex === 1) {
      const triggerAutomation = event.row as Automation;
      this.selectedAutomation = event.row as Automation;
      this.modalType = AutomationModalType.Edit;
      setTimeout(() => this.automationModal.edit());
    }

    if (event.type === 'checkbox') {
      this.tableButtons[3].hide = this.selected.length === 0;
      if (this.selected.length === 1) {
        this.tableButtons[1].hide = this.selected[0].status !== 'Active';
        this.tableButtons[2].hide = this.selected[0].status === 'Active';

        if (this.selected[0].status === 'Failed') {
          this.tableButtons[1].hide = true;
          this.tableButtons[2].hide = true;
        }
      } else {
        this.tableButtons[1].hide = true;
        this.tableButtons[2].hide = true;
      }
    }
  }

  onDeleteClicked() {
    this.modalService.openModal(ScoringConfirmDefaultModalComponent, {
      width: '400px',
      data: {
        message: 'Are you sure you want to delete selected SMS?'
      }
    });
  }
}
