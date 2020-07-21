import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { ContentService } from '@app-core/services/content.service';
import { Subject } from 'rxjs';
import { Asset } from '@app-models/asset';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { takeUntil } from 'rxjs/operators';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';
import { DataSourceChange } from '@app-models/data-source';

@Component({
  selector: 'app-content-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class ContentAssetsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('fileSizeTemplate', { static: false }) fileSizeTemplate: TemplateRef<any>;
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('renameModal', { static: false }) renameModal;
  @ViewChild('createAssetModal', { static: false }) createAssetModal;
  @ViewChild('uploadAssetModal', { static: false }) uploadAssetModal;

  private unsubscribe$ = new Subject();

  assets: Asset[];
  tableSource: DataTableSource<Asset> = new DataTableSource<Asset>(50);
  totalCount: number;
  tableView: boolean;
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Upload', icon: 'fa fa-upload', click: () => this.onClickUpload() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', disabled: true },
    { label: 'Download', icon: 'fa fa-download', click: () => this.onClickDownload(), disabled: true },
  ];
  tableViewButtons = [
    { label: 'Table View', icon: 'fa fa-th-list', click: () => this.onClickTableView(), selected: true, },
    { label: 'List View', icon: 'fa fa-th-large', click: () => this.onClickListView(), selected: false },
  ];
  selected: Asset[] = [];
  selectedAssets: number[];
  // add, edit modal
  modalType: string;
  selectedAsset: Asset;

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  loading = false;
  constructor(
    private contentService: ContentService
  ) {
    this.selectedAssets = [];
  }

  ngOnInit(): void {
    this.tableView = true;
    this.initAssetsTable();
  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'File Name', prop: 'fileName', sortable: true, maxWidth: 200, width: 200, cellClass: ['cell-hyperlink'] },
      { name: 'Path', prop: 'imgPhysicalPath', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'Size', prop: 'fileSize', sortable: true, custom: true, template: this.fileSizeTemplate, maxWidth: 200, width: 200, },
      {
        name: 'Modification Date', prop: 'lastModificationTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }, maxWidth: 200, width: 200,
      },
      {
        name: 'Creation Date', prop: 'creationTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }, maxWidth: 200, width: 200,
      },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onClickCreate() {
    this.createAssetModal.show();
  }

  onClickUpload() {
    this.uploadAssetModal.show();
  }
  onClickDownload() {

  }
  onClickDelete() {
    this.confirmModal.show();
  }

  onConfirmDelete() {
    this.confirmModal.hide();
  }

  onClickTableView() {
    this.tableView = true;
    this.tableViewButtons[0].selected = true;
    this.tableViewButtons[1].selected = false;
    this.selectedAssets = [];
    this.tableButtons[2].disabled = true;
    this.tableButtons[3].disabled = true;
  }

  onClickListView() {
    this.tableView = false;
    this.tableViewButtons[0].selected = false;
    this.tableViewButtons[1].selected = true;
    this.selectedAssets = [];
    this.tableButtons[2].disabled = true;
    this.tableButtons[3].disabled = true;
  }

  onSelectAsset(assetId: number) {
    const pos = this.selectedAssets.indexOf(assetId);
    if (pos < 0) {
      this.selectedAssets.push(assetId);
    } else {
      this.selectedAssets.splice(pos, 1);
    }
    this.tableButtons[2].disabled = !(this.selectedAssets.length > 0);
    this.tableButtons[3].disabled = !(this.selectedAssets.length > 0);
  }

  initAssetsTable() {
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((change: DataSourceChange) => {
        if (change.pagination !== 'totalCount') {
          this.loadAssets();
        }
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }

  loadAssets() {
    const params = {
      SortDirection: 'Ascending',
      maxResultCount: this.tableSource.pageSize,
      skipCount: (this.tableSource.currentPage - 1) * this.tableSource.pageSize,
      sorting: '',
    };
    this.loading = true;
    this.contentService.getAssets(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.assets = data.result.items;
          this.totalCount = data.result.totalCount;
          this.tableSource.next(this.assets, this.totalCount);
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
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
      this.tableButtons[1].disabled = this.selected.length === 0;
      this.tableButtons[2].disabled = this.selected.length === 0;
      if (event.cellIndex === 1 && event.event.target.classList.value === 'datatable-body-cell-label') {
        this.selectedAsset = event.row as Asset;
        setTimeout(() => this.renameModal.show());
      }
      if (event.cellIndex === 2 && event.event.target.classList.value === 'datatable-body-cell-label') {
        const asset = event.row as Asset;
        window.open(asset.imgPhysicalPath, '_blank');
      }
    }
  }
}
