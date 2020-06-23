import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

@Component({
  selector: 'app-manage-records',
  templateUrl: './manage-records.component.html',
  styleUrls: ['./manage-records.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManageRecordsComponent implements OnInit {
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('addToListModal', { static: false }) addToListModal;

  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', hide: true },
    { label: 'Add to list', icon: 'fa fa-list', click: () => this.onClickAddToList(), hide: true },
  ];

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onClickConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  constructor() {
  }

  ngOnInit(): void {

  }

  onActive(evt: any) {
    const { event, selected } = evt;
    if (event.type === 'checkbox') {
      this.tableButtons[1].hide = selected.length === 0;
      this.tableButtons[2].hide = selected.length === 0;
    }
  }

  onClickCreate() {

  }

  onClickDelete() {
    this.confirmModal.show();
  }

  onClickConfirmDelete() {
    this.confirmModal.hide();
  }

  onClickAddToList() {
    this.addToListModal.show();
  }
}
