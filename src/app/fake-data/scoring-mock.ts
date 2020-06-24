import { Scoring } from '@app-models/scoring';
import { LeadCard } from '@app-models/scoring';
import { Grading, LeadCategory } from '@app-core/models/scoring';
import { LeadScoringRuleConditionType } from '@app-core/enums/scoring-type.enum';

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

export const LeadScoringCardListMockData: LeadCard[] = [
  {
    id: '0',
    name: 'New2020',
    profileRulesLeadAttribute: 'isSubscribed',
    valueType: 'boolean',
    weightage: 0,
    rulList: [
      {
        id: '0',
        ruleDescription: 'FirstName',
        condition: LeadScoringRuleConditionType.Equals,
        value: 'Manoj',
        points: 10
      },
      {
        id: '1',
        ruleDescription: 'Location',
        condition: LeadScoringRuleConditionType.Contains,
        value: 'Delhi',
        points: 5
      },
      {
        id: '2',
        ruleDescription: 'FirstName',
        condition: LeadScoringRuleConditionType.Contains,
        value: 'Mumbai',
        points: 5
      },
    ]
  },
  {
    id: '1',
    name: 'GA2020',
    profileRulesLeadAttribute: 'isSubscribed',
    valueType: 'boolean',
    weightage: 0,
    rulList: [
      {
        id: '0',
        ruleDescription: 'FirstName',
        condition: LeadScoringRuleConditionType.Equals,
        value: 'Manoj',
        points: 10
      },
      {
        id: '1',
        ruleDescription: 'Location',
        condition: LeadScoringRuleConditionType.Contains,
        value: 'Delhi',
        points: 5
      },
      {
        id: '2',
        ruleDescription: 'FirstName',
        condition: LeadScoringRuleConditionType.Contains,
        value: 'Mumbai',
        points: 5
      },
    ]
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

export const LeadCategoryMockData: LeadCategory[] = [
  {
    id: '1',
    name: 'Website',
    criteria: 'Explicit'
  },
  {
    id: '2',
    name: 'Website Visited Time',
    criteria: 'Explicit'
  },
  {
    id: '3',
    name: 'Downloaded',
    criteria: 'Explicit'
  },
  {
    id: '4',
    name: 'lead owner',
    criteria: 'Explicit'
  },
  {
    id: '5',
    name: 'prospect owner',
    criteria: 'Explicit'
  },
  {
    id: '6',
    name: 'test category',
    criteria: 'Explicit'
  },
  {
    id: '7',
    name: 'Website',
    criteria: 'Implicit'
  },
  {
    id: '8',
    name: 'test category',
    criteria: 'Explicit'
  },
  {
    id: '9',
    name: 'Demo',
    criteria: 'Explicit'
  },
  {
    id: '10',
    name: 'Website',
    criteria: 'Implicit'
  },
  {
    id: '11',
    name: 'PersonalAddrCountry',
    criteria: 'Explicit'
  },
  {
    id: '12',
    name: 'Countrycheck',
    criteria: 'Explicit'
  },
  {
    id: '13',
    name: 'SMS Score',
    criteria: 'Implicit'
  },
  {
    id: '14',
    name: 'SMS campaign Scoring',
    criteria: 'Explicit'
  },
  {
    id: '15',
    name: 'Country Wise',
    criteria: 'Implicit'
  },
]
