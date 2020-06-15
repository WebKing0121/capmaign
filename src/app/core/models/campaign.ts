import { CampaignType } from '@app-core/enums/campaign-type.enum';

export class Campaign {
  id: string;
  name: string;
  subject: string;
  type: CampaignType | string;
  updated: string;
  created: string;
  lastSent: string;
  scheduled: string;
  // TODO: Remove later
  [name: string]: any;
}
