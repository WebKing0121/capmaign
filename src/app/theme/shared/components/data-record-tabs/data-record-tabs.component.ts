import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tab } from '@app-models/common';


@Component({
  selector: 'app-data-record-tabs',
  templateUrl: './data-record-tabs.component.html',
  styleUrls: ['./data-record-tabs.component.scss']
})
export class DataRecordTabsComponent implements OnInit, AfterViewInit {
  @ViewChild('tabContainer', { static: false }) tabContainer;
  @Input() tabs: Tab[] = [];
  @Output() selectTab: EventEmitter<any> = new EventEmitter<any>();

  leftScroll: boolean;
  rightScroll: boolean;

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    setTimeout(() => this.initScrollView());
  }

  initScrollView() {
    const { clientWidth, scrollWidth } = this.tabContainer.nativeElement;
    if (clientWidth < scrollWidth) {
      this.leftScroll = false;
      this.rightScroll = true;
    } else {
      this.leftScroll = false;
      this.rightScroll = false;
    }
  }
  onClickTab(tab: Tab) {
    this.selectTab.emit(tab);
  }

  onClickLeft() {
    const { clientWidth } = this.tabContainer.nativeElement;
    this.tabContainer.nativeElement.scrollLeft -= clientWidth;
    this.rightScroll = true;
    if (this.tabContainer.nativeElement.scrollLeft <= 0) {
      this.leftScroll = false;
    }
  }

  onClickRight() {
    this.tabContainer.nativeElement.scrollLeft += this.tabContainer.nativeElement.clientWidth;
    this.leftScroll = true;
    const { scrollWidth, scrollLeft, clientWidth } = this.tabContainer.nativeElement;
    if (scrollLeft + clientWidth >= scrollWidth) {
      this.rightScroll = false;
    }
  }
}
