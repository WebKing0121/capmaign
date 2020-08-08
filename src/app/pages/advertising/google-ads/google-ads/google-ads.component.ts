import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { GoogleService } from '@app-core/services/google.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-google-ads',
  templateUrl: './google-ads.component.html',
  styleUrls: ['./google-ads.component.scss']
})
export class GoogleAdsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  adsCustomers = [];
  adAccounts = [];
  selectedAdsCustomer: any;
  selectedAdAccount = '';
  loading = false;

  adCampaigns = [];
  totalCount = 0;
  selected: any[] = [];
  selectedCampaign: any;

  loadingCampaigns = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private googleService: GoogleService
  ) {

  }

  ngOnInit(): void {
    this.getAdsCustomers();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onClickCreate() {
    this.router.navigate(['new-ads'], { relativeTo: this.route });
  }

  onChangeAdCustomer(customerId) {
    this.selectedAdsCustomer = this.adsCustomers.find(x => x.customerId === customerId);
    this.loading = true;
    this.googleService.getAdsAccountByCustomer(this.selectedAdsCustomer)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.loading = false;
          if (data.success && data.result) {
            this.adAccounts = data.result;
            if (this.adAccounts.length > 0) {
              this.onChangeAdAccount(this.adAccounts[0].clientId);
            }
          } else {
            this.adAccounts = [];
          }
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }

  onChangeAdAccount(accountId) {
    const { clientId, clientSecret, refreshToken } = this.selectedAdsCustomer;
    const params = { clientId, clientSecret, customerId: `${accountId}`, refreshToken };
    this.loading = true;
    this.googleService.getAdsCampaigns(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.loading = false;
          if (data.success && data.result) {
            this.adCampaigns = data.result;
            console.log(this.adCampaigns);
          } else {
            this.adCampaigns = [];
          }
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );


  }

  getAdsCustomers() {
    this.loading = true;
    this.googleService.getAdsCustomers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.loading = false;
          if (data.result) {
            this.adsCustomers = data.result;
            if (this.adsCustomers.length > 0) {
              this.onChangeAdCustomer(this.adsCustomers[0].customerId);
            }
          }
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }
}
