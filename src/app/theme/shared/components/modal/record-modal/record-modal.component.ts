import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { RecordModalType } from '@app-core/enums/data-list-type.enum';
import { Tab, NgSelectData } from '@app-models/common';
import { Tabs } from '@app-core/enums/data-tabs.enum';
import { DataService } from '@app-core/services/data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-record-modal',
  templateUrl: './record-modal.component.html',
  styleUrls: ['./record-modal.component.scss']
})
export class RecordModalComponent implements OnInit, OnDestroy {
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
  leadField: any;
  companyField: any;
  corporateAddressField: any;
  billingAddressField: any;
  shippingAddressField: any;
  customField: any;
  prospectField: any;

  selectedField: any;

  private unsubscribe$ = new Subject();

  constructor(
    private dataService: DataService
  ) {
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
        { key: 'accountName', label: 'Account Name', icon: 'fa fa-user', value: '', type: 'Text' },
        { key: 'accountNumber', label: 'Account Number', icon: 'fa fa-credit', value: '', type: 'Text' },
        { key: 'accountSite', label: 'Account Site', icon: '', value: '', type: 'Text' },
        { key: 'accountOwner', label: 'Account Owner', icon: '', value: '', type: 'Dropdown' },
        { key: 'accountType', label: 'Account Type', icon: '', value: '', type: 'Dropdown' },
        { key: 'officePhone', label: 'Office Phone', icon: '', value: '', type: 'Text' },
        { key: 'businessEmailAddress', label: 'Business Email Address', icon: '', value: '', type: 'Text' },
        { key: 'personalEmail', label: 'Personal Email', icon: '', value: '', type: 'Text' },
        { key: 'otherEmail', label: 'Other Email', icon: '', value: '', type: 'Text' },
        { key: 'fax', label: 'Fax', icon: '', value: '', type: 'Text' },
        { key: 'skypeID', label: 'Skype ID', icon: '', value: '', type: 'Text' },
        { key: 'faceBook', label: 'FaceBook', icon: '', value: '', type: 'Text' },
        { key: 'twitter', label: 'Twitter', icon: '', value: '', type: 'Text' },
        { key: 'linkedIn', label: 'LinedIn', icon: '', value: '', type: 'Text' },
        { key: 'website', label: 'Website', icon: '', value: '', type: 'Text' },
        { key: 'accountOptOut', label: 'Account Opt Out', icon: '', value: '', type: 'Boolean' },
      ]
    };
    this.leadField = {
      key: 'lead', label: 'Lead information',
      fields: [
        { key: 'leadOwner', label: 'Lead Owner', icon: '', value: '', type: 'Text' },
        { key: 'leadStatus', label: 'Lead Status', icon: '', value: '', type: 'Text' },
        { key: 'leadSource', label: 'Lead Source', icon: '', value: '', type: 'Text' },
        { key: 'leadGrade', label: 'Lead Grade', icon: '', value: '', type: 'Dropdown' },
        { key: 'leadScore', label: 'Lead Score', icon: '', value: '', type: 'Dropdown' },
        { key: 'ownership', label: 'Ownership', icon: '', value: '', type: 'Text' },
      ]
    };
    this.companyField = {
      key: 'company', label: 'Company information',
      fields: [
        { key: 'companyName', label: 'Company Name', icon: '', value: '', type: 'Text' },
        { key: 'annualRevenue', label: 'Annual Revenue', icon: '', value: '', type: 'Text' },
        { key: 'numberOfEmployees', label: 'Number Of Employees', icon: '', value: '', type: 'Text' },
        { key: 'industry', label: 'Industry', icon: '', value: '', type: 'Dropdown' },
        { key: 'companyAccountName', label: 'Account Name', icon: '', value: '', type: 'Dropdown' },
        { key: 'sicCode', label: 'SIC Code', icon: '', value: '', type: 'Text' },
        { key: 'ticketSymbol', label: 'Ticket Symbol', icon: '', value: '', type: 'Text' },
      ]
    };

    this.corporateAddressField = {
      key: 'coporateAddress', label: 'Corporate Address',
      fields: [
        { key: 'street1', label: 'Street1', icon: '', value: '', type: 'Text' },
        { key: 'street2', label: 'Street2', icon: '', value: '', type: 'Text' },
        { key: 'city', label: 'City', icon: '', value: '', type: 'Text' },
        { key: 'state', label: 'State/Province', icon: '', value: '', type: 'Dropdown' },
        { key: 'country', label: 'Country', icon: '', value: '', type: 'Dropdown' },
        { key: 'zip', label: 'Zip/Postal Code', icon: '', value: '', type: 'Text' },
      ]
    };
    this.billingAddressField = {
      key: 'billingAddress', label: 'Billing Address',
      fields: [
        { key: 'billingStreet1', label: 'Street1', icon: '', value: '', type: 'Text' },
        { key: 'billingStreet2', label: 'Street2', icon: '', value: '', type: 'Text' },
        { key: 'billingCity', label: 'City', icon: '', value: '', type: 'Text' },
        { key: 'billingState', label: 'State/Province', icon: '', value: '', type: 'Dropdown' },
        { key: 'billingCountry', label: 'Country', icon: '', value: '', type: 'Dropdown' },
        { key: 'billingZip', label: 'Zip/Postal Code', icon: '', value: '', type: 'Text' },
      ]
    };
    this.shippingAddressField = {
      key: 'shippingAddress', label: 'Shipping Address',
      fields: [
        { key: 'shippingStreet1', label: 'Street1', icon: '', value: '', type: 'Text' },
        { key: 'shippingStreet2', label: 'Street2', icon: '', value: '', type: 'Text' },
        { key: 'shippingCity', label: 'City', icon: '', value: '', type: 'Text' },
        { key: 'shippingState', label: 'State/Province', icon: '', value: '', type: 'Dropdown' },
        { key: 'shippingCountry', label: 'Country', icon: '', value: '', type: 'Dropdown' },
        { key: 'shippingZip', label: 'Zip/Postal Code', icon: '', value: '', type: 'Text' },
      ]
    };
    this.prospectField = {
      key: 'prospects', label: 'Prospects Information',
      fields: [
        { key: 'prospectsOwner', label: 'Prospects Owner', icon: '', value: '', type: 'Text' },
        { key: 'prospectsProbability', label: 'Probability', icon: '', value: '', type: 'Text' },
        { key: 'prospectsStage', label: 'Stage', icon: '', value: '', type: 'Dropdown' },
        { key: 'prospectsType', label: 'Type', icon: '', value: '', type: 'Dropdown' },
        { key: 'prospectsAmount', label: 'Amount', icon: '', value: '', type: 'Text' },
        { key: 'prospectsExpectedRevenue', label: 'Expected Revenue', icon: '', value: '', type: 'Text' },
        { key: 'prospectsClosingDate', label: 'Closing Date', icon: '', value: '', type: 'Date' },
      ]
    };
    this.dataService.getCustomFields()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.customField = {
              key: 'customField', label: 'Custom Fields',
              fields: data.result.items.map(x => ({
                key: x.mappedDBField,
                label: x.displayName,
                icon: '',
                value: x.defaultValue,
                type: x.fieldDataType
              }))
            };

          } else {
            this.customField = {
              key: 'customField', label: 'Custom Fields',
              fields: []
            };
          }

          this.rebuildFields();
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

  onChangeAccountType(event: string) {
    const selectedTab = this.tabs.find(x => x.key === event);
    this.recordType = event;
    if (this.type === RecordModalType.New) {
      this.modalTitle = 'Create a new ' + this.getSingleForm(selectedTab.label);
    } else if (this.type === RecordModalType.Edit) {
      this.modalTitle = 'Edit ' + this.getSingleForm(selectedTab.label);
    }
    this.rebuildFields();
  }

  rebuildFields() {
    if (this.recordType === 'subscribers' || this.recordType === 'accounts'
      || this.recordType === 'contacts' || this.recordType === 'unsubscribers') {
      this.fields = [
        this.profileField,
        this.leadField,
        this.companyField,
        this.corporateAddressField,
        this.billingAddressField,
        this.shippingAddressField,
        this.customField
      ];
    } else if (this.recordType === 'leads' || this.recordType === 'transactional') {
      this.fields = [
        this.profileField,
        this.leadField,
        this.companyField,
        this.corporateAddressField,
        this.customField
      ];
    } else if (this.recordType === 'prospects') {
      this.fields = [
        this.profileField,
        this.leadField,
        this.prospectField,
        this.companyField,
        this.corporateAddressField,
        this.customField
      ];
    } else {
      this.fields = [

      ];
    }
    this.selectedField = this.fields.length > 0 ? this.fields[0] : null;
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

  onClickField(field: any) {
    this.selectedField = field;
  }

  hide() {
    this.recordModal.hide();
  }
}
