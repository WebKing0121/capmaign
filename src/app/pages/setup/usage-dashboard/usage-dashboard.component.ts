import { Component, OnInit } from '@angular/core';
import { NgSelectData } from '@app-core/models/common';

@Component({
  selector: 'app-usage-dashboard',
  templateUrl: './usage-dashboard.component.html',
  styleUrls: ['./usage-dashboard.component.scss']
})
export class UsageDashboardComponent implements OnInit {
  analyticItems: NgSelectData[] = [
    {value: 'email', label: 'Email Analytics'},
    {value: 'mobile', label: 'Mobile Analytics'},
    {value: 'social', label: 'Social & PPC Analytics'},
    {value: 'website', label: 'Website Analytics'},
    {value: 'event', label: 'Event Analytics'},
    {value: 'qrcode', label: 'QRCode Analytics'},
    {value: 'lead', label: 'Lead Analytics'}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
