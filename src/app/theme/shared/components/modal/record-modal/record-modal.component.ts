import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { RecordModalType } from '@app-core/enums/data-list-type.enum';
import { Tab, NgSelectData } from '@app-models/common';
import { Tabs } from '@app-core/enums/data-tabs.enum';

@Component({
  selector: 'app-record-modal',
  templateUrl: './record-modal.component.html',
  styleUrls: ['./record-modal.component.scss']
})
export class RecordModalComponent implements OnInit {
  @ViewChild('recordModal', { static: false }) recordModal;
  @Input() recordType = 'subscribers';
  @Output() saveRecord: EventEmitter<any> = new EventEmitter();
  tabs = Tabs;
  type: string;
  record: any;
  modalTitle: string;

  accountTypeList: NgSelectData[];
  fields: any[];
  profileField: any;
  constructor() {
    this.type = this.type = RecordModalType.New;
    this.accountTypeList = [];
    this.tabs.map(x => {
      if (x.key !== 'all') {
        this.accountTypeList.push({ value: x.key, label: x.key === 'all' ? '' : this.getSingleForm(x.label) });
      }
    });
  }

  ngOnInit(): void {
    this.profileField = {
      key: 'profile', label: 'Profile',
      fields: [
        { key: 'accountName', label: 'Account Name', icon: 'fa fa-user', value: '' },
        { key: 'accountNumber', label: 'Account Number', icon: 'fa fa-credit', value: '' },
        { key: 'accountSite', label: 'Account Site', icon: '', value: '' },
        { key: 'accountOwner', label: 'Account Type', icon: '', value: '' },
        { key: 'officePhone', label: 'Office Phone', icon: '', value: '' },
        { key: 'businessEmailAddress', label: 'Business Email Address', icon: '', value: '' },
        { key: 'personalEmail', label: 'Personal Email', icon: '', value: '' },
        { key: 'otherEmail', label: 'Other Email', icon: '', value: '' },
        { key: 'fax', label: 'Fax', icon: '', value: '' },
        { key: 'skypeID', label: 'Skype ID', icon: '', value: '' },
        { key: 'faceBook', label: 'FaceBook', icon: '', value: '' },
        { key: 'twitter', label: 'Twitter', icon: '', value: '' },
        { key: 'linkedIn', label: 'LinedIn', icon: '', value: '' },
        { key: 'website', label: 'Website', icon: '', value: '' },
        { key: 'accountOptOut', label: 'Account Opt Out', icon: '', value: '' },
      ]
    };
    this.fields = [
      this.profileField
    ];
  }

  onChangeAccountType(event: string) {
    const selectedTab = this.tabs.find(x => x.key === event);
    if (this.type === RecordModalType.New) {
      this.modalTitle = 'Create a new ' + this.getSingleForm(selectedTab.label);
    } else if (this.type === RecordModalType.Edit) {
      this.modalTitle = 'Edit ' + this.getSingleForm(selectedTab.label);
    }
  }

  onClickSave() {

  }

  newRecord() {
    this.record = null;
    this.type = RecordModalType.New;
    const selectedTab = this.tabs.find(x => x.key === this.recordType);
    this.modalTitle = 'Create a new ' + this.getSingleForm(selectedTab.label);
    this.recordModal.show();
  }

  getSingleForm(str: string) {
    return str.charAt(str.length - 1) === 's' ? str.substr(0, str.length - 1) : str;
  }

  editRecord(record: any) {
    this.record = record;
    this.type = RecordModalType.Edit;
    this.recordModal.show();
  }

  hide() {
    this.recordModal.hide();
  }
}
