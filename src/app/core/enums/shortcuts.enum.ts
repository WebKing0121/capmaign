export const Shortcuts = [
  {
    id: 1,
    name: 'Administration',
    children: [
      { label: 'Users', link: '/admin/users' },
      { label: 'Roles', link: '/admin/roles' },
      { label: 'Organization Units', link: '/admin/organizations' },
      { label: 'Senders Setup', link: '/admin/senders' },
      { label: 'Add Mobile App', link: '/admin/mobile-apps' },
    ]
  },
  {
    id: 2,
    name: 'Email Campaign Reports',
    children: [
      { label: 'Active Sends', link: '/report/email' },
      { label: 'Email Sent By Dates', link: '@modal#emailRange' },
      { label: 'Subscriber Sends', link: '@modal#sendSubscriber' },
      { label: 'Email Send Result', link: '@modal#emailSendResult' },
      { label: 'Email Send Exports', link: '/report/exports' },
    ]
  },
  {
    id: 3,
    name: 'SMS Campaign Reports',
    children: [
      { label: 'Active Sends', link: '/report/sms' },
      { label: 'SMS Sent By Dates', link: '@modal#smsRange' },
      { label: 'Opt-in Sends', link: '/' },
      { label: 'SMS Send Results', link: '@modal#smsSendResult' },
      { label: 'SMS Send Exports', link: '/report/exports' },
    ]
  },
  {
    id: 4,
    name: 'Lead Scoring and Grading',
    children: [
      { label: 'Lead Category', link: '/scoring/lead-category' },
      { label: 'Lead Scoring', link: '/scoring/lead-scoring' },
      { label: 'Lead Grading', link: '/scoring/lead-grading' },
      { label: 'Lead Time frames', link: '/lead-timeframes' },
    ]
  },
  {
    id: 5,
    name: 'Collaboration',
    children: [
      { label: 'Create collaboration team', link: '/collaborate/teams' },
      { label: 'Associate Team', link: '/collaborate/campaigns' },
      { label: 'My Calendar', link: '/collaborate/my-calendar' },
    ]
  },
  {
    id: 5,
    name: 'Content Setup',
    children: [
      { label: 'Content Category', link: '/content/categories' },
      { label: 'Landing Page Template', link: '/content/landing-page-templates' },
      { label: 'Email Template', link: '/content/email-templates' },
      { label: 'Assets upload', link: '/content/assets' },
    ]
  },
  {
    id: 6,
    name: 'Lists',
    children: [
      { label: 'Lists', link: '@modal#lists' },
      { label: 'Event Lists', link: '@modal#eventLists' },
      { label: 'List of Values', link: '/data/list-values' },
    ]
  },
  {
    id: 7,
    name: 'Miscellaneous',
    children: [
      { label: 'Filters', link: '/data/filters' },
      { label: 'Usage Dashboard', link: '/setup/usage-dashboard' },
      { label: 'Import', link: '@modal#import' },
      { label: 'Import Status', link: '/report/import-status' },
      { label: 'Export', link: '@modal#export' },
      { label: 'Export Status', link: '/report/exports' },
    ]
  }
];
