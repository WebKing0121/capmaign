import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShortcutsComponent implements OnInit {

  shortcuts: any[];
  constructor(
    private router: Router,
  ) {
    this.shortcuts = [];
  }

  ngOnInit(): void {
    this.shortcuts = [
      {
        id: 1,
        name: 'Administration',
        children: [
          {label: 'Users', link: '/' },
          {label: 'Roles', link: '/' },
          {label: 'Organization Units', link: '/' },
          {label: 'Senders Setup', link: '/' },
          {label: 'Add Mobile App', link: '/' },
        ]
      },
      {
        id: 2,
        name: 'Email Campaign Reports',
        children: [
          {label: 'Active Sends', link: '/report/email' },
          {label: 'Email Sent By Dates', link: '/' },
          {label: 'Subscriber Sends', link: '/' },
          {label: 'Email Send Result', link: '/' },
          {label: 'Download Campaign Report', link: '/' },
        ]
      },
      {
        id: 3,
        name: 'SMS Campaign Reports',
        children: [
          {label: 'Active Sends', link: '/report/sms' },
          {label: 'SMS Sent By Dates', link: '/' },
          {label: 'Opt-in Sends', link: '/' },
          {label: 'SMS Send Results', link: '/' },
          {label: 'SMS Send Export', link: '/' },
        ]
      },
      {
        id: 4,
        name: 'Lead Scoring and Grading',
        children: [
          {label: 'Lead Category', link: '/scoring/lead-category' },
          {label: 'Lead Scoring', link: '/scoring/lead-scoring' },
          {label: 'Lead Grading', link: '/scoring/lead-grading' },
          {label: 'Lead Time frames', link: '/lead-timeframes' },
        ]
      },
      {
        id: 5,
        name: 'Collaboration',
        children: [
          {label: 'Create collaboration team', link: '/collaborate/teams' },
          {label: 'Associate Team', link: '/collaborate/campaigns' },
          {label: 'My Calendar', link: '/collaborate/my-calendar' },
        ]
      },
      {
        id: 5,
        name: 'Content Setup',
        children: [
          {label: 'Landing Page Template', link: '/' },
          {label: 'Email Template', link: '/' },
          {label: 'Assets upload', link: '/' },
        ]
      },
      {
        id: 6,
        name: 'Lists',
        children: [
          {label: 'Lists', link: '/data/lists' },
          {label: 'Event Lists', link: '/events/lists' },
          {label: 'List of Values', link: '/' },
        ]
      },
      {
        id: 7,
        name: 'Miscellaneous',
        children: [
          {label: 'Filters', link: '/data/filters' },
          {label: 'Usage Dashboard', link: '/' },
          {label: 'Import', link: '/' },
          {label: 'New Import', link: '/' },
          {label: 'Export', link: '/' },
        ]
      }
    ];
  }

  onClickShortcut(link) {
    if (link.link !== '/') {
      this.router.navigate([link.link]);
    }
  }

}
