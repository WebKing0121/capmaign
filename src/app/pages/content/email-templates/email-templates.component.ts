import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { EmailTemplate } from '@app-models/email-template';
import { Subject } from 'rxjs';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { ContentService } from '@app-core/services/content.service';
import { takeUntil } from 'rxjs/operators';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';
import { ModalType } from '@app-core/enums/modal-type.enum';

@Component({
  selector: 'app-content-email-templates',
  templateUrl: './email-templates.component.html',
  styleUrls: ['./email-templates.component.scss']
})
export class EmailTemplatesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('templateModal', { static: false }) templateModal;

  private unsubscribe$ = new Subject();

  templates: EmailTemplate[];
  tableSource: DataTableSource<EmailTemplate> = new DataTableSource<EmailTemplate>(50);
  totalCount: number;
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', disabled: true },
  ];
  selected: EmailTemplate[] = [];


  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  modalType = ModalType.New;
  template: EmailTemplate;

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.contentService.getEmailTemplates()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.templates = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.templates = [];
            this.totalCount = 0;
          }
          this._updateTable(this.templates);
        },
        error => {
          console.log('error', error.response);
        }
      );

  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'Description', prop: 'description', sortable: true },
      { name: 'Category', prop: 'categoryId', sortable: true },
      { name: 'Status', prop: 'pageStatus', sortable: true },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onClickCreate() {
    this.modalType = ModalType.New;
    this.template = null;
    setTimeout(() => this.templateModal.show());
  }

  onActive(event) {
    if (event.type === 'click') {
      this.tableButtons[1].disabled = this.selected.length === 0;
      if (event.cellIndex === 1 && event.event.target.classList.value === 'datatable-body-cell-label') {
        this.template = event.row as EmailTemplate;
        this.modalType = ModalType.Edit;
        setTimeout(() => this.templateModal.show());
      }
    }
  }

  onClickDelete() {
    this.confirmModal.show();
  }

  onConfirmDelete() {
    this.confirmModal.hide();
  }

  _updateTable(templates: EmailTemplate[]) {
    this.tableSource.next(templates.slice(0, 50), templates.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          templates.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          templates.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }
}
