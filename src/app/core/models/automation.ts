import { AutomationType } from '@app-core/enums/automation-type.enum';

export class Automation {
  id: number;
  name: string;
  description: string;
  status: string;
  lastModificationTime: string;
  creationTime: string;
  journeyEventLinkJson: null | number | string;
  organizationUnitId: null | number | string;
  automationType: number;
  eventAutomationType: number;
  isDeleted: boolean;
  deleterUserId: null | number;
  deletionTime: null | string;
  lastModifierUserId: null | number;
  creatorUserId: null | number;
}
