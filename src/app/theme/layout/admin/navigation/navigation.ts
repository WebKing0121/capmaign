import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: 'create',
        title: 'New',
        type: 'collapse',
        icon: 'feather icon-plus',
        children: [
          {
            id: 'create-email',
            title: 'Email',
            type: 'item',
            url: 'javascript:',
            external: true
          },
          {
            id: 'create-subscriber',
            title: 'Subscriber',
            type: 'item',
            url: 'javascript:',
            external: true
          },
          {
            id: 'create-leads',
            title: 'Leads',
            type: 'item',
            url: 'javascript:',
            external: true
          },
          {
            id: 'create-contacts',
            title: 'Contacts',
            type: 'item',
            url: 'javascript:',
            external: true
          },
          {
            id: 'create-prospects',
            title: 'Prospects',
            type: 'item',
            url: 'javascript:',
            external: true
          },
          {
            id: 'create-accounts',
            title: 'Accounts',
            type: 'item',
            url: 'javascript:',
            external: true
          },
          {
            id: 'create-transactional',
            title: 'Transactional',
            type: 'item',
            url: 'javascript:',
            external: true
          },
          {
            id: 'create-automation',
            title: 'Automation',
            type: 'item',
            url: 'javascript:',
            external: true
          },
          {
            id: 'create-list',
            title: 'List',
            type: 'item',
            url: 'javascript:',
            external: true
          },
          {
            id: 'create-custom-fields',
            title: 'Custom Fields',
            type: 'item',
            url: 'javascript:',
            external: true
          },
          {
            id: 'create-filter',
            title: 'Filter',
            type: 'item',
            url: 'javascript:',
            external: true
          },
          {
            id: 'create-landing-page-template',
            title: 'Landing Page Template',
            type: 'item',
            url: 'javascript:',
            external: true
          },

          {
            id: 'create-email-template',
            title: 'Email Template',
            type: 'item',
            url: 'javascript:',
            external: true
          },

          {
            id: 'create-landing-page-category',
            title: 'Landing Page Category',
            type: 'item',
            url: 'javascript:',
            external: true
          },
        ]
      },
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: 'feather icon-home',
        url: '/dashboard',
        external: false
      },
      {
        id: 'data',
        title: 'Data',
        type: 'collapse',
        icon: 'feather icon-grid',
        children: [
          {
            id: 'data-all-records',
            title: 'All Records',
            type: 'item',
            url: '/data/manage-records/',
            external: false
          }, {
            id: 'data-lists',
            title: 'Lists',
            type: 'item',
            url: '/data/lists',
            external: false
          }, {
            id: 'data-custom-fields',
            title: 'Custom Fields',
            type: 'item',
            url: '/data/custom-fields',
            external: false
          }, {
            id: 'data-filters',
            title: 'Filters',
            type: 'item',
            url: '/data/filters',
            external: false
          },
        ]
      },
      {
        id: 'contents',
        title: 'Contents',
        type: 'collapse',
        icon: 'feather icon-pocket',
        children: [
          {
            id: 'contents-assets',
            title: 'Assets',
            type: 'item',
            url: 'javascript:',
            external: true
          }, {
            id: 'contents-landing-pages',
            title: 'Landing Pages',
            type: 'item',
            url: 'javascript:',
            external: true
          }, {
            id: 'contents-dynamic-contents',
            title: 'Dynamic Contents',
            type: 'item',
            url: 'javascript:',
            external: true
          }, {
            id: 'contents-email-templates',
            title: 'Email Templates',
            type: 'item',
            url: 'javascript:',
            external: true
          }, {
            id: 'contents-landing-page-templates',
            title: 'Landing Page Templates',
            type: 'item',
            url: 'javascript:',
            external: true
          }, {
            id: 'contents-dynamic-qr-codes',
            title: 'Dynamic QR codes',
            type: 'item',
            url: 'javascript:',
            external: true
          }, {
            id: 'contents-creatives',
            title: 'Creatives',
            type: 'item',
            url: 'javascript:',
            external: true
          },
        ]
      },
      {
        id: 'campaign',
        title: 'Campaigns',
        type: 'item',
        icon: 'feather icon-globe',
        url: '/campaign',
        external: false
      },
      {
        id: 'automation',
        title: 'Automation',
        type: 'item',
        icon: 'feather icon-monitor',
        url: '/automation/automations',
        external: false
      },
      {
        id: 'collaborate',
        title: 'Collaborate',
        type: 'collapse',
        url: '/collaborate',
        icon: 'feather icon-at-sign',
        children: [
          {
            id: 'collaborate-teams',
            title: 'Teams',
            type: 'item',
            url: '/collaborate/teams',
            external: false
          },
          {
            id: 'collaborate-campaigns',
            title: 'Campaigns',
            type: 'item',
            url: '/collaborate/campaigns',
            external: false
          },
          {
            id: 'collaborate-my-calendar',
            title: 'My Calendar',
            type: 'item',
            url: '/collaborate/my-calendar',
            external: false
          },
          {
            id: 'collaborate-recent-activity',
            title: 'Recent Activity',
            type: 'item',
            url: '/collaborate/recent-activity',
            external: false
          },
        ]
      },
      {
        id: 'events',
        title: 'Events',
        type: 'collapse',
        icon: 'feather icon-square',
        url: 'javascript:',
        children: [
          {
            id: 'data-event',
            title: 'Events',
            type: 'item',
            url: '/events/events',
            external: false,
          },
          {
            id: 'data-event-lists',
            title: 'Event Lists',
            type: 'item',
            url: '/events/lists',
            external: false,
          },
        ]
      },
      {
        id: 'scoring',
        title: 'Scoring',
        type: 'collapse',
        url: '/scoring',
        icon: 'feather icon-award',
        children: [
          {
            id: 'scoring-lead-category',
            title: 'Lead Category',
            type: 'item',
            url: '/scoring/lead-category',
            external: false
          },
          {
            id: 'scoring-lead-scoring',
            title: 'Lead Scoring',
            type: 'item',
            url: '/scoring/lead-scoring',
            external: false
          },
          {
            id: 'scoring-lead-grading',
            title: 'Lead Grading',
            type: 'item',
            url: '/scoring/lead-grading',
            external: false
          },
          {
            id: 'scoring-lead-timeframes',
            title: 'Lead Timeframes',
            type: 'item',
            url: '/scoring/lead-timeframes',
            external: false
          },
        ]
      },
      {
        id: 'mobile',
        title: 'Mobile',
        type: 'collapse',
        url: '/mobile',
        icon: 'feather icon-book',
        children: [
          {
            id: 'mobile-sms-messages',
            title: 'SMS Messages',
            type: 'item',
            url: '/mobile/manage-sms-campaign',
            external: false
          },
          {
            id: 'mobile-inapp-messages',
            title: 'InApp Messages',
            type: 'item',
            url: '/mobile/in-app-messages',
            external: false
          },
          {
            id: 'mobile-push-notification',
            title: 'Push Notification',
            type: 'item',
            url: '/mobile/push-notifications',
            external: false
          },
          {
            id: 'mobile-triggers',
            title: 'Triggers',
            type: 'item',
            url: '/mobile/trigger-automations',
            external: false
          },
        ]
      },
      {
        id: 'advertising',
        title: 'Advertising',
        type: 'collapse',
        icon: 'feather icon-map',
        url: '/advertising',
        children: [
          {
            id: 'advertising-facebook-ads',
            title: 'Facebook Ads',
            type: 'item',
            url: '/advertising/facebook-ads/new-ads',
            external: false
          },
          {
            id: 'advertising-google-ads',
            title: 'Google Ads',
            type: 'item',
            url: '/advertising/google-ads/new-ads',
            external: false
          },
          {
            id: 'advertising-ad-simulator',
            title: 'Ad Simulator',
            type: 'item',
            url: 'javascript:',
            external: false
          },
        ]
      },
      {
        id: 'social',
        title: 'Social',
        type: 'collapse',
        url: '/social',
        icon: 'feather icon-share-2',
        children: [
          {
            id: 'social-post',
            title: 'Post',
            type: 'item',
            url: '/social/post',
            external: false
          },
          {
            id: 'social-messages',
            title: 'Messages',
            type: 'item',
            url: '/social/message',
            external: false
          },
          {
            id: 'social-monitor',
            title: 'Monitor',
            type: 'item',
            url: '/social/monitor',
            external: false
          },
          {
            id: 'social-utm-builder',
            title: 'UTM Builder',
            type: 'item',
            url: '/social/utm-builder',
            external: false
          },
          {
            id: 'social-engager',
            title: 'Social Engager',
            type: 'item',
            url: '/social/engager',
            external: false
          },
          {
            id: 'social-policy',
            title: 'Social Policy',
            type: 'item',
            url: '/social/policy',
            external: false
          },
        ]
      },
      {
        id: 'setup',
        title: 'Setup',
        type: 'item',
        icon: 'feather icon-monitor',
        url: '/setup/shortcuts',
        external: false,
        children: [
          {
            id: 'setup-usage-dashboard',
            title: 'Usage Dashboard',
            type: 'item',
            url: '/setup/usage-dashboard',
            external: false
          },
        ]
      },
    ]
  }
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
