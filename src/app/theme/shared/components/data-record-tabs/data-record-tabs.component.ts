import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Tab } from '@app-models/common';


@Component({
  selector: 'app-data-record-tabs',
  templateUrl: './data-record-tabs.component.html',
  styleUrls: ['./data-record-tabs.component.scss']
})
export class DataRecordTabsComponent implements OnInit {
  @Input() tabs: Tab[] = [];
  constructor(
    private router: Router,
  ) {

  }

  ngOnInit(): void {
  }

  onClickTab(tab: Tab) {
    this.router.navigate([tab.link]);
  }
}
