import { Component, OnInit, Inject, ViewChild, TemplateRef, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalRef, MODAL_DATA } from '@app-components/modal/modal-ref';
import { Campaign } from '@app-core/models/campaign';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { CampaignType } from '@app-core/enums/campaign-type.enum';
import { CampaignResponseMockData } from '@app-fake-db/campaign-mock';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';

interface ComponentProps {
  campaign: Campaign;
}

@Component({
  selector: 'app-facebook-ads-modal',
  templateUrl: './facebook-ads-modal.component.html',
  styleUrls: ['./facebook-ads-modal.component.scss']
})
export class FacebookAdsModalComponent implements OnInit, OnDestroy, AfterViewInit {

  CampaignType = CampaignType;

  @ViewChild('tableColumnSettings') tableColumnSettingsTemplate: TemplateRef<any>;
  @ViewChild('tableColumnType') tableColumnTypeTemplate: TemplateRef<any>;

  tableSource: DataTableSource<Campaign> = new DataTableSource<Campaign>(50);
  tableButtons = [];
  destroy$ = new Subject();
  selected: Campaign[] = [];

  constructor(
    private fb: FormBuilder,
    @Inject(ModalRef) private modalRef: ModalRef<FacebookAdsModalComponent>,
    @Inject(MODAL_DATA) private props: ComponentProps
  ) { }

  ngOnInit(): void {
    this.tableSource.next(CampaignResponseMockData.slice(0, 50), CampaignResponseMockData.length);

    this.tableSource.changed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(change => {
        setTimeout(() => {
          let mockData = [];
          if (change.search) {
            mockData = CampaignResponseMockData.filter(item =>
              item.name.includes(change.search) || item.subject.includes(change.search));
          } else {
            mockData = CampaignResponseMockData;
          }

          this.tableSource.next(
            mockData.slice(
              change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
            mockData.length
          );
        }, 600);
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
      { name: 'Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'], alwaysVisible: true},
      { name: 'Subject', prop: 'subject', sortable: true },
      { name: 'Type', prop: 'type', sortable: true, maxWidth: 90, custom: true, template: this.tableColumnTypeTemplate },
      { name: 'Modification Date', prop: 'updated', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm A' } },
      { name: 'Created Date', prop: 'created', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm A' } },
      { name: 'Last Sent', prop: 'lastSent', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm A' } },
      { name: 'Scheduled', prop: 'scheduled', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm A' } },
    ];
    this.tableSource.setColumns(columns);
  }

  onCancel() {
    this.modalRef.cancel();
  }

}
