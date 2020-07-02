import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '@app-core/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { MobileAppModalType } from '@app-core/enums/user-type.enum';

@Component({
  selector: 'app-mobile-apps',
  templateUrl: './mobile-apps.component.html',
  styleUrls: ['./mobile-apps.component.scss']
})
export class MobileAppsComponent implements OnInit, OnDestroy {
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('mobileAppModal', { static: false }) mobileAppModal;

  modalType = MobileAppModalType.New;
  private unsubscribe$ = new Subject();
  apps: any[];
  selectedApp: any;

  tableButtons = [
    { label: 'Add Mobile App', icon: 'fa fa-plus', click: () => this.onClickAdd() },
  ];
  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onDeleteConfirm.bind(this), class: 'btn-primary' }
  ];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getMobileApps()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.apps = data.result;

          } else {
            this.apps = [];

          }

        },
        error => {
          console.log('error', error.response);
        }
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSelectApp(app) {
    this.selectedApp = app;
  }

  onEditApp(app) {
    this.selectedApp = app;
    this.modalType = MobileAppModalType.Edit;
    setTimeout(() => this.mobileAppModal.show());
  }

  onClickAdd() {
    this.modalType = MobileAppModalType.New;
    this.selectedApp = null;
    setTimeout(() => this.mobileAppModal.show());
  }

  onDeleteApp() {
    this.confirmModal.show();
  }

  onDeleteConfirm() {

  }
}
