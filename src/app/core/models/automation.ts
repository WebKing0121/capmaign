import { AutomationType } from '@app-core/enums/automation-type.enum';

export class Automation {
  id: string;
  name: string;
  description: string;
  type: AutomationType | string;
  status: string;
  updated: string;
  created: string;
  // TODO: Remove later
  [name: string]: any;
}
