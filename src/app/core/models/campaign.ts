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

export class EmailCampaign {
  id: number;
  emailCampaignId: number;
  emailCampaign: string | null;
  emailName: string;
  emailSubject: string;
  typeOfMailing: number;
  isScheduled: boolean;
  scheduledDateTimeOffset: string | null;
  scheduledDateTime: string | null;
  status: string;
  lastModificationTime: string;
  creationTime: string;
  isDeleted: boolean;
  deleterUserId: number | null;
  deletionTime: string | null;
  lastModifierUserId: number | null;
  creatorUserId: number | null;
}

export class SmsCampaign {
  id: number;
  smsCampaignId: number;
  smsCampaign: string | null;
  smsName: string;
  typeOfSms: number;
  isScheduled: boolean;
  scheduledDateTimeOffset: string | null;
  scheduledDateTime: string | null;
  status: string;
  lastModificationTime: string;
  creationTime: string;
  isDeleted: boolean;
  deleterUserId: number | null;
  deletionTime: string | null;
  lastModifierUserId: number | null;
  creatorUserId: number | null;
}
