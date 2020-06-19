
import { SocialType, SocialLabelType, SocialAccountType } from '@app-core/enums/social-type.enum';

export class SocialAccount {
  id: number;
  social: SocialType | string;
  label: SocialLabelType | string;
  img: string;
  type: SocialAccountType | string;
  connected: boolean;
  // tslint:disable-next-line
  user_id?: number;
  // tslint:disable-next-line
  unique_user_id?: number | string;
  // tslint:disable-next-line
  user_profile_name?: string;
  // tslint:disable-next-line
  user_profile_image?: string;
  // tslint:disable-next-line
  page_id?: number;
  // tslint:disable-next-line
  page_name?: string;
  posts?: any[];
}

export interface SocialLinkSelected {
  id: number;
  selected: number;
}

export class SocialChatMessage {
  id?: number;
  message: string;
  // tslint:disable-next-line
  user_name: string;
  // tslint:disable-next-line
  profile_image: string;
  // tslint:disable-next-line
  message_time: string;
  mine?: 0 | 1;
}

export class SocialChatUser {
  id: number;
  site: SocialType | string;
  page: string;
  // tslint:disable-next-line
  profile_name: string;
  // tslint:disable-next-line
  profile_image: string;
  created: string;
}

export class SocialEngager {
  id: number;
  email: string;
  // tslint:disable-next-line
  first_name: string;
  // tslint:disable-next-line
  last_name: string;
  company: string;
  // tslint:disable-next-line
  phone_number: string;
  zip: string;
  // tslint:disable-next-line
  lead_source: string;
  created: string;
  updated: string;
}

export class SocialSiteButton {
  label: string;
  icon: string;
  type: SocialAccountType;
}

export class SocialSite {
  id: SocialType;
  label: SocialLabelType | string;
  img: string;
  // tslint:disable-next-line
  selected_img: string;
  // tslint:disable-next-line
  normal_img: string;
  buttons: SocialSiteButton[];
}
