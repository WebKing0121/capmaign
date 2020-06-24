import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Tab } from '@app-models/common';


@Component({
  selector: 'app-data-record-tabs',
  templateUrl: './data-record-tabs.component.html',
  styleUrls: ['./data-record-tabs.component.scss']
})
export class DataRecordTabsComponent implements OnInit {
  @Input() tabs: Tab[] = [];
  @Output() selectTab: EventEmitter<any> = new EventEmitter<any>();
  constructor(
  ) {

  }

  ngOnInit(): void {
  }

  onClickTab(tab: Tab) {
    this.selectTab.emit(tab);
  }
}
