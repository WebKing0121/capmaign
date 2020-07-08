import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SocialLinkSelected } from '@app-models/social';
import { ModalType } from '@app-core/enums/modal-type.enum';

@Component({
  selector: 'app-social-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SocialMonitorComponent implements OnInit {
  @ViewChild('tabModal', { static: false }) tabModal;
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('newStreamModal', { static: false }) newStreamModal;
  @ViewChild('addConnection', { static: false }) addConnection;

  confirmButtons = [
    { label: 'Yes', action: this.closeTab.bind(this), class: 'btn-primary' }
  ];


  loading = false;
  submitted = false;

  tabId: number;
  tabs = [
    { id: 1, label: 'Campaign', streams: [] }
  ];
  selectedTabId: number;
  modalType = ModalType.New;
  selectedLinks: SocialLinkSelected[];
  modalStreamTitle: string;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.tabId = 1;
    this.selectedTabId = 0;
    this.selectedLinks = [];
    this.modalStreamTitle = '';
  }

  ngOnInit(): void {

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
}
