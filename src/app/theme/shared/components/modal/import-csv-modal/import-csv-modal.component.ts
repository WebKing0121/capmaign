import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-import-csv-modal',
  templateUrl: './import-csv-modal.component.html',
  styleUrls: ['./import-csv-modal.component.scss']
})
export class ImportCsvModalComponent implements OnInit {
  @ViewChild('importCSVModal', { static: false }) importCSVModal;
  constructor() { }

  ngOnInit(): void {
  }

  show() {
    this.importCSVModal.show();
  }

  hide() {
    this.importCSVModal.hide();
  }
}
