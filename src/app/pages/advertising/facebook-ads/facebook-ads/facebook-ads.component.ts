import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from '@app-components/modal/modal.service';
import { FacebookAdsCreateComponent } from '../facebook-ads-create/facebook-ads-create.component';
import { FacebookService } from '@app-core/services/facebook.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataTableSource } from '@app-components/datatable/datatable-source';
import { User } from '@app-core/models/user';
import { DataSourceChange } from '@app-core/models/data-source';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';

@Component({
  selector: 'app-facebook-ads',
  templateUrl: './facebook-ads.component.html',
  styleUrls: ['./facebook-ads.component.scss']
})
export class FacebookAdsComponent implements OnInit, OnDestroy, AfterViewInit {
  private unsubscribe$ = new Subject();
  tokens: any[];
  adAccounts: any[];
  selectedToken = '';
  selectedAdAccount = '';
  loading = false;

  adCampaigns = [];
  tableSource: DataTableSource<User> = new DataTableSource<User>(50);
  totalCount = 0;
  selected: any[] = [];
  selectedCampaign: any;

  loadingCampaigns = false;

  constructor(
    private router: Router,
    private facebookService: FacebookService,
    private route: ActivatedRoute,
  ) {
    this.tokens = [];
    this.adAccounts = [];
  }

  ngOnInit(): void {
    this.initCampaignsTable();
    this.getAccessTokens();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngAfterViewInit() {
    const columns = [
      { name: 'Campaign', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'Budget', prop: 'budget_remaining', sortable: true },
      { name: 'Delivery', prop: 'status', sortable: true },
      { name: 'Result', prop: 'result', sortable: true },
      { name: 'Research', prop: 'research', sortable: true },
      { name: 'Impressions', prop: 'impressions', sortable: true, },
      { name: 'Cost Per Result', prop: 'cost_per_result', sortable: true },
      { name: 'Amount Spend', prop: 'amount_spend', sortable: true },
      {
        name: 'Ends', prop: 'stop_time', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 120
      },
    ];

    this.tableSource.setColumns(columns);
  }


  onClickCreate() {
    this.router.navigate(['new-ads'], { relativeTo: this.route });
  }

  onChangeToken(token) {
    this.selectedToken = token;
    if (token === '') {
      this.adAccounts = [];
      return;
    }
    this.loading = true;
    this.facebookService.getAdAccountByToken(token)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.adAccounts = data.data;
          if (this.adAccounts.length > 0) {
            this.onChangeAdAccount(this.adAccounts[0].id);
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }

  onChangeAdAccount(accountId) {
    this.selectedAdAccount = accountId;
    this.loadingCampaigns = true;
    this.facebookService.getAdCampaigns(accountId, this.selectedToken)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.data) {
            this.adCampaigns = data.data.map(x => ({
              ...x,
              result: '-',
              research: '-',
              impressions: '-',
              cost_per_result: '-',
              amount_spend: '-',
            }));

            this.adCampaigns.forEach(campaign => {
              this.facebookService.getAdCampaignDetails(campaign.id, this.selectedToken)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(
                  aData => {
                    console.log(aData);
                  },
                  error => {
                    console.log('error', error.response);
                  }
                );
            });
          } else {
            this.adCampaigns = [];
          }
          this.tableSource.next(this.adCampaigns, this.adCampaigns.length);
          this.loadingCampaigns = false;
        },
        error => {
          this.loadingCampaigns = false;
          console.log('error', error.response);
        }
      );
  }

  onActive(evt) {
    if (evt.type === 'click') {
      this.selectedCampaign = evt.row;
    }
  }

  getAccessTokens() {
    this.loading = true;
    this.facebookService.getAccessTokens()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.success && data.result) {
            this.tokens = data.result.map(x => JSON.parse(x));
            if (this.tokens.length > 0) {
              this.onChangeToken(this.tokens[0].token);
            }
          } else {
            this.tokens = [];
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }

  initCampaignsTable() {
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((change: DataSourceChange) => {
        if (change.pagination !== 'totalCount') {
          // this.loadCampaigns();
        }
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }
}
