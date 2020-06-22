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