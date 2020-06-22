import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from '@app-models/event';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '@app-services/data.service';
import { EventService } from '@app-services/event.service';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';

import { NgSelectData } from '@app-models/common';
import { List } from '@app-models/list';
import * as moment from 'moment';

@Component({
  selector: 'app-data-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('listModal', { static: false }) listModal;
  @ViewChild('confirmModal', { static: false }) confirmModal;

  @ViewChild('templateDisplayFrom') templateDisplayFrom: TemplateRef<any>;
  @ViewChild('templateFolder') templateFolder: TemplateRef<any>;

  private unsubscribe$ = new Subject();

  lists: List[];

  tableSource: DataTableSource<List> = new DataTableSource<List>(50);
  totalCount: number;
  selected: List[] = [];
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', hide: true },
  ];

  // add, edit list modal
  isModalNew: boolean;
  listForm: FormGroup;

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  typeList: NgSelectData[];
  folderList: NgSelectData[];
  folders: any[]; // data from API;
  dataLoaded: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dataService: DataService,
    private eventService: EventService
  ) {
    this.totalCount = 0;
    this.lists = [];
    this.isModalNew = true;
    this.listForm = fb.group({
      id: 0,
      name: ['', Validators.required],
      description: ['', Validators.required],
      folderId: ['0', Validators.required],
      type: ['', Validators.required],
    });
    this.dataLoaded = 0;
  }

  ngOnInit(): void {
    this.eventService.getFolders()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.folders = data.result;
          this.folderList = data.result.map(x => ({ value: '' + x.folderId, label: x.folderName }));
          this.dataLoaded++;
        },
        error => {
          console.log('error', error.response);
        }
      );

    this.dataService.getTypeList()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.typeList = data;
          this.dataLoaded++;
        },
        error => {
          console.log('error', error.response);
        }
      );

    this.dataService.getLists()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.lists = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.lists = [];
            this.totalCount = 0;
          }

          this.dataLoaded++;
        },
        error => {
          console.log('error', error.response);
        }
      );
    setTimeout(() => this.checkLoaded());
  }

  checkLoaded() {
    if (this.dataLoaded === 3) {
      this._updateTable(this.lists);
    } else {
      setTimeout(() => this.checkLoaded);
    }
  }

  ngAfterViewInit(): void {

    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'], frozenLeft: true },
      { name: 'Description', prop: 'description', sortable: true },
      {
        name: 'Modification Date', prop: 'lastModificationTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      },
      {
        name: 'Creation Date', prop: 'creationTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      },
      { name: 'Type', prop: 'type', sortable: true },
      { name: 'Folder', prop: 'folderName', sortable: true },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  _updateTable(lists: List[]) {
    this.tableSource.next(lists.slice(0, 50), lists.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          lists.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          lists.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }


  onActive(evt) {
    if (evt.type === 'click') {
      this.tableButtons[1].hide = false;
      if (evt.cellIndex === 0 && evt.column.frozenLeft) {
        const list: List = evt.row as List;
        this.isModalNew = false;

        this.listForm.setValue({
          id: list.listId,
          name: list.name,
          description: list.description,
          folderId: `${list.folderId}`,
          type: list.type,
        });
        console.log(this.listForm.value);
        this.listModal.show();
      }
    }
  }

  onClickCreate() {
    this.isModalNew = true;
    this.listForm.reset();
    this.listModal.show();
  }

  // event form submit
  onSaveList() {
    console.log(this.listForm.value);
  }

  onClickDelete() {
    this.confirmModal.show();
  }

  onConfirmDelete() {
    this.confirmModal.hide();
  }

  getTypeList(value: string | null) {
    return value ? this.typeList.find(x => x.value === value).label : '';
  }

  getFolder(value: string) {
    return this.folderList.find(x => x.value === value).label;
  }
}
