import { UsageViewOptionType } from '@app-core/enums/usage-dashboard-type.enum';

export class UsageViewOpion {
  id: string;
  value: UsageViewOptionType;
}

export class OrganizationData {
  id: string;
  name: string;
  recordCount: number;
  sentEmailCount: number;
  userCount: number;
  diskSpace: number;
  // TODO: Remove later
  [name: string]: any;
}