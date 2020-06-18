export class CollaborateCampaignSubtask {
  id: number;
  // tslint:disable-next-line
  task_id: number;
  name: string;
  desc: string;
  percent: number;
  // tslint:disable-next-line
  user_id: number;
  started: string;
  ended: string;
  // tslint:disable-next-line
  esti_hours: number;
}

export class CollaborateCampaignTask {
  id: number;
  name: string;
  desc: string;
  // tslint:disable-next-line
  campaign_id: number;
  percent: number;
  // tslint:disable-next-line
  user_id: number;
  started: string;
  ended: string;
  // tslint:disable-next-line
  esti_hours: number;
}

export class CollaborateCampaign {
  id: number;
  name: string;
  type: string;
  percent: number;
  status: string;
  started: string;
  ended: string;
  // tslint:disable-next-line
  team_id: number;
}

export class CollaborateTeam {
  id: number;
  name: string;
  created: string;
  members: number[] | null;
  campaigns: number[] | null;
}
