import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { ContentService } from '@app-core/services/content.service';
import { Subject } from 'rxjs';
import { Asset } from '@app-core/models/asset';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { takeUntil } from 'rxjs/operators';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';
import { AutomationModalType } from '@app-core/enums/automation-type.enum';

@Component({
  selector: 'app-content-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class ContentAssetsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('fileSizeTemplate', { static: false }) fileSizeTemplate: TemplateRef<any>;

  private unsubscribe$ = new Subject();

  assets: Asset[];
  tableSource: DataTableSource<Asset> = new DataTableSource<Asset>(50);
  totalCount: number;
  tableButtons = [
    { label: 'Upload', icon: 'fa fa-upload', click: () => this.onClickUpload() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', disabled: true },
    { label: 'Download', icon: 'fa fa-download', click: () => this.onClickDownload(), disabled: true },
  ];
  selected: Asset[] = [];

  // add, edit modal
  modalType: string;
  selectedAsset: Asset;

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.contentService.getAssets()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.assets = data.result.items;
          this.totalCount = data.result.totalCount;
          this._updateTable(this.assets);
        },
        error => {
          console.log('error', error.response);
        }
      );
  }

  onClickUpload() {

  }
  onClickDownload() {

  }
  onClickDelete() {

  }

  onConfirmDelete() {

  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'File Name', prop: 'fileName', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'Path', prop: 'imgPhysicalPath', sortable: true, maxWidth: 600, width: 600, cellClass: ['cell-hyperlink'] },
      { name: 'Size', prop: 'fileSize', sortable: true, custom: true, template: this.fileSizeTemplate },
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

  _updateTable(assets: Asset[]) {
    this.tableSource.next(assets.slice(0, 50), assets.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          assets.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          assets.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }

  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  onActive(event) {
    if (event.type === 'click') {
      // this.tableButtons[1].disabled = this.selected.length === 0;
      // this.tableButtons[2].disabled = !(this.selected.length === 1 && this.selected
      //   .filter(x => x.status === 'Scheduled' || x.status === 'Active').length === 1);
      // this.tableButtons[3].disabled = !(this.selected.length === 1 && this.selected
      //   .filter(x => x.status === 'Scheduled' || x.status === 'Active' || x.status === 'Paused').length === 1);
      // if (event.cellIndex === 1) {

      //   this.selectedAsset = event.row as Asset;
      //   this.modalType = AutomationModalType.Edit;
      //   setTimeout(() => this.automationModal.edit());
      // }
    }
  }
}
