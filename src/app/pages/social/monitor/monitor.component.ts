import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SocialLinkSelected } from '@app-models/social';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { SocialService } from '@app-core/services/social.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SocialAccountType, SocialType } from '@app-core/enums/social-type.enum';

@Component({
  selector: 'app-social-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SocialMonitorComponent implements OnInit, OnDestroy {
  @ViewChild('tabModal', { static: false }) tabModal;
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('newStreamModal', { static: false }) newStreamModal;
  @ViewChild('addConnection', { static: false }) addConnection;

  confirmButtons = [
    { label: 'Yes', action: this.closeTab.bind(this), class: 'btn-primary' }
  ];

  private unsubscribe$ = new Subject();

  loading = false;
  loadingTabs = false;
  submitted = false;

  tabId: number;
  tabs = [
    // { id: 1, label: 'Campaign', streams: [] }
  ];
  selectedTabId: number;
  modalType = ModalType.New;
  selectedLinks: SocialLinkSelected[];
  modalStreamTitle: string;

  SocialSiteImages = [
    'assets/images/social-icons/twitter-selected.png',
    'assets/images/social-icons/facebook-selected.png',
    'assets/images/social-icons/google-plus-selected.png',
    'assets/images/social-icons/linkedin-selected.png',
  ];

  constructor(
    private socialService: SocialService
  ) {
    this.tabId = 1;
    this.selectedTabId = 0;
    this.selectedLinks = [];
    this.modalStreamTitle = '';
  }

  ngOnInit(): void {
    this.loadTabs();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addTabDialog() {
    this.tabModal.show();
  }


  onAddTab(tabName: string) {
    this.tabId++;
    this.tabs.push({
      id: this.tabId, label: tabName, streams: []
    });
  }

  onCloseTabConfirm(tabId: number) {
    this.selectedTabId = tabId;
    this.confirmModal.show();
  }

  getStreamModalTitle(): string {
    const selectedTab = this.tabs.find(x => x.id === this.selectedTabId);
    if (selectedTab) {
      return selectedTab.streams.length > 0 ? 'Update Stream' : 'Add Stream';
    } else {
      return 'Add Stream';
    }

  }

  closeTab() {
    this.tabs = this.tabs.filter(tab => tab.id !== this.selectedTabId);
  }

  onAddStream(tabId: number) {
    this.selectedTabId = tabId;
    this.modalType = ModalType.New;
    this.newStreamModal.show();
  }

  onAddConnection(): void {
    this.addConnection.onAddConnection();
  }

  onSelectedUsers(users: SocialLinkSelected[]): void {
    this.selectedLinks = users;
  }

  onClickTab(tabChange: any) {
    console.log(tabChange.nextId);
    if (this.selectedTabId === tabChange.nextId) {
      return;
    }
    this.selectedTabId = tabChange.nextId;
    const tab = this.tabs.find(x => x.id === this.selectedTabId);
    if (tab.streams.length === 0) {
      this.loadTabStreams(tabChange.nextId);
    }
  }

  loadTabs() {
    this.loadingTabs = true;
    this.socialService.getSocialTabs()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.success) {
            this.tabs = data.result.map(x => ({ ...x, streams: [] }));
            if (this.tabs.length > 0) {
              this.loadTabStreams(this.tabs[0].id);
            }
          } else {
            this.tabs = [];
          }
          this.loadingTabs = false;
        },
        error => {
          this.loadingTabs = false;
          console.log('error', error.response);
        }
      );
  }

  loadTabStreams(tabId: number) {
    this.loading = true;
    this.socialService.getSocialTabStreams(tabId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.success) {
            const tab = this.tabs.find(x => x.id === tabId);
            if (tab) {
              tab.streams = data.result;
            }
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }
}


