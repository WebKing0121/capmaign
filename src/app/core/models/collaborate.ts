import { ChatRoomType } from '@app-core/enums/chat-user-type.enum.ts';
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
  collaborationTeamName: string;
  creationDate: string;
  creationTime: string;
  creatorUserId: number | null;
  deleterUserId: number | null;
  deletionTime: string | null;
  id: number;
  isDeleted: boolean;
  lastModificationTime: string | null;
  lastModifierUserId: number | null;
  membername: string | null;
  userCount: number;
  members?: number[];
  campaigns?: number[];
}

export class CollaborateChatRoom {
  id: number;
  name: string;
  newMessageCount: number;
  type: ChatRoomType | string;
  lastMessage: string;
  lastMessageTime: string;
  profileImg?: string;
}
