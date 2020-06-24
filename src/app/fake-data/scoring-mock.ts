import { Scoring } from '@app-models/scoring';
import { Lead } from '@app-models/scoring';
import { Grading } from '@app-core/models/scoring';

export const LeadScoringMockData: Scoring[] = [
  {
    id: '0',
    name: 'New Zealand Profile',
    description: '',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isLeadScoringForWebsite: false,
    isActive: true,
    isStatic: false
  },
  {
    id: '1',
    name: 'Demo Lead Scoring',
    description: 'Sample scoring for demo',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isLeadScoringForWebsite: false,
    isActive: true,
    isStatic: false
  },
  {
    id: '2',
    name: 'Open Email',
    description: '',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isLeadScoringForWebsite: false,
    isActive: true,
    isStatic: false
  },
  {
    id: '3',
    name: 'Demarcation',
    description: 'Sample',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isLeadScoringForWebsite: false,
    isActive: true,
    isStatic: false
  },
  {
    id: '4',
    name: 'Sample Lead Scoring',
    description: 'Test Scoring',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isLeadScoringForWebsite: false,
    isActive: true,
    isStatic: false
  },
  {
    id: '5',
    name: 'Sample Test',
    description: 'Sample Testing Scoring',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isLeadScoringForWebsite: false,
    isActive: true,
    isStatic: false
  },
  {
    id: '6',
    name: 'DefaultProfile',
    description: '',
    isDefaultForNewRecord: true,
    isDefaultForCampaign: false,
    isLeadScoringForWebsite: false,
    isActive: true,
    isStatic: false
  },
  {
    id: '7',
    name: 'Social',
    description: 'social touch-points implicit example',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isLeadScoringForWebsite: false,
    isActive: true,
    isStatic: false
  },
  {
    id: '8',
    name: 'introductory',
    description: 'introductory campaign',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isLeadScoringForWebsite: false,
    isActive: true,
    isStatic: false
  },
  {
    id: '9',
    name: 'pageview',
    description: '',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isLeadScoringForWebsite: false,
    isActive: true,
    isStatic: false
  },
  {
    id: '10',
    name: 'WebAnalytics',
    description: '',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: true,
    isLeadScoringForWebsite: false,
    isActive: true,
    isStatic: false
  },
  {
    id: '11',
    name: 'Demo Lead Scoring',
    description: 'Sample scoring for demo',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isLeadScoringForWebsite: false,
    isActive: true,
    isStatic: false
  },
  {
    id: '12',
    name: 'Open Email',
    description: '',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isLeadScoringForWebsite: false,
    isActive: true,
    isStatic: false
  },
  {
    id: '13',
    name: 'Demarcation',
    description: 'Sample',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isLeadScoringForWebsite: false,
    isActive: true,
    isStatic: false
  },
  {
    id: '14',
    name: 'Sample Lead Scoring',
    description: 'Test Scoring',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isLeadScoringForWebsite: false,
    isActive: true,
    isStatic: false
  },
  {
    id: '15',
    name: 'Sample Test',
    description: 'Sample Testing Scoring',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isLeadScoringForWebsite: false,
    isActive: true,
    isStatic: false
  },
  {
    id: '16',
    name: 'DefaultProfile',
    description: '',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isLeadScoringForWebsite: false,
    isActive: true,
    isStatic: false
  },
  {
    id: '17',
    name: 'Social',
    description: 'social touch-points implicit example',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isLeadScoringForWebsite: true,
    isActive: true,
    isStatic: false
  },
  {
    id: '18',
    name: 'introductory',
    description: 'introductory campaign',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isLeadScoringForWebsite: false,
    isActive: true,
    isStatic: false
  },
  {
    id: '19',
    name: 'pageview',
    description: '',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isLeadScoringForWebsite: false,
    isActive: true,
    isStatic: false
  },
  {
    id: '20',
    name: 'WebAnalytics',
    description: '',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isLeadScoringForWebsite: false,
    isActive: true,
    isStatic: false
  },
];

export const LeadList: Lead[] = [
  {
    id: '0',
    name: 'GAWebsite',
    profileRulesLeadAttribute: 'isSubscribed',
    valueType: 'boolean',
    weightage: 0,
    rulList: []
  }
];


export const LeadGradingMockData: Grading[] = [
  {
    id: '0',
    name: 'Default Grading',
    description: '',
    isDefaultForNewRecord: true,
    isDefaultForCampaign: true,
    isActive: true,
    isStatic: false
  },
  {
    id: '1',
    name: 'Records Grading',
    description: '',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isActive: true,
    isStatic: false
  },
  {
    id: '2',
    name: 'Lead grading profile',
    description: 'This is the lead grading profile for leads',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isActive: true,
    isStatic: false
  },
  {
    id: '3',
    name: 'Demarcation',
    description: 'Sample',
    isDefaultForNewRecord: false,
    isDefaultForCampaign: false,
    isActive: true,
    isStatic: false
  }
];
