import { CampaignType } from '@app-core/enums/campaign-type.enum';

export class Campaign {
  campaignType: string;
  creationTime: string;
  creatorUserId: number | null;
  deleterUserId: number | null;
  deletionTime: string | null;
  displayName: string
  id: number;
  isDeleted: boolean;
  lastModificationTime: string | null;
  lastModifierUserId: number | null;
  lastSent: string | null;
  mobileNumber: string;
  name: string;
  organizationUnitId: number;
  scheduled: string | null;
  senderName: string;
  subject: string;
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
