import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SocialLinkSelected } from '@app-models/social';

@Component({
  selector: 'app-social-monitor',
  templateUrl: './social-monitor.component.html',
  styleUrls: ['./social-monitor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SocialMonitorComponent implements OnInit {
  @ViewChild('newTabModal', { static: false }) newTabModal;
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('newStreamModal', { static: false }) newStreamModal;
  @ViewChild('addConnection', { static: false }) addConnection;

  confirmButtons = [
    { label: 'Yes', action: this.closeTab.bind(this), class: 'btn-primary' }
  ];

  tabForm: FormGroup;
  loading = false;
  submitted = false;

  tabId: number;
  tabs = [
    { id: 1, label: 'Campaign', streams: [] }
  ];
  selectedTabId: number;

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
    this.tabForm = this.formBuilder.group({
      tabname: ['', Validators.required]
    });
  }

  addTabDialog() {
    this.newTabModal.show();
  }

  // convenience getter for easy access to form fields
  get f() { return this.tabForm.controls; }

  onAddTab() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.tabForm.invalid) {
      return;
    }

    this.tabId++;
    this.tabs.push({
      id: this.tabId, label: this.f.tabname.value, streams: []
    });
    this.tabForm.reset();
    this.submitted = false;
    this.newTabModal.hide();
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
    this.modalStreamTitle = this.getStreamModalTitle();
    this.newStreamModal.show();
  }

  onAddConnection(): void {
    this.addConnection.onAddConnection();
  }

  onSelectedUsers(users: SocialLinkSelected[]): void {
    this.selectedLinks = users;
  }
}
