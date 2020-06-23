export class Scoring {
  id: string;
  name: string;
  description: string;
  isDefaultForNewRecord: boolean;
  isDefaultForCampaign: boolean;
  isLeadScoringForWebsite: boolean;
  isActive: boolean;
  isStatic: boolean;
  // TODO: Remove later
  [name: string]: any;
}

class Rule {
  id: string;
  ruleDescription: string;
  condition: string;
  value: string;
  points: number;
}

export class Lead {
  id: string;
  name: string;
  profileRulesLeadAttribute: string;
  valueType: string;
  weightage: number;
  rulList: Rule[];
}

export class Grading {
  id: string;
  name: string;
  description: string;
  isDefaultForNewRecord: boolean;
  isDefaultForCampaign: boolean;
  isActive: boolean;
  isStatic: boolean;
  [name: string]: any;
}
