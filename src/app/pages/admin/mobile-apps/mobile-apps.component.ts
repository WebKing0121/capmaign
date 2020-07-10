import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '@app-core/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { ModalType } from '@app-core/enums/modal-type.enum';

@Component({
  selector: 'app-admin-mobile-apps',
  templateUrl: './mobile-apps.component.html',
  styleUrls: ['./mobile-apps.component.scss']
})
export class AdminMobileAppsComponent implements OnInit, OnDestroy {
  @ViewChild('mobileApps', { static: false }) mobileApps;
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('mobileAppModal', { static: false }) mobileAppModal;

  modalType = ModalType.New;
  private unsubscribe$ = new Subject();
  apps: any[];
  selectedApp: any;

  tableButtons = [
    { label: 'Add Mobile App', icon: 'fa fa-plus', click: () => this.onClickAdd() },
  ];
  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onDeleteConfirm.bind(this), class: 'btn-danger', disabled: false }
  ];

  loading: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true;
    this.loadMobileApps();
  }

  loadMobileApps() {
    this.loading = true;
    this.userService.getMobileApps()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.apps = data.result;
          } else {
            this.apps = [];
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
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
    this.modalType = ModalType.Edit;
    setTimeout(() => this.mobileAppModal.show());
  }

  onClickAdd() {
    this.modalType = ModalType.New;
    this.selectedApp = null;
    setTimeout(() => this.mobileAppModal.show());
  }

  onDeleteApp() {
    this.confirmButtons[0].disabled = false;
    this.confirmModal.show();
  }

  onDeleteConfirm() {
    this.confirmButtons[0].disabled = true;
    this.loading = true;
    this.userService.deleteMobileApp(this.selectedApp.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.confirmButtons[0].disabled = false;
          this.loadMobileApps();
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );

  }

  onSave(appInfo: any) {
    this.loading = true;
    this.confirmButtons[0].disabled = true;
    this.userService.createMobileApp(appInfo)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          // this.confirmButtons[0].disabled = false;
          this.loadMobileApps();
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }
}
