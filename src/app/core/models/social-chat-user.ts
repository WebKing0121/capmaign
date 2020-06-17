
import { SocialType } from '@app-core/enums/social-type.enum';

export class SocialChatUser {
  id: number;
  site: SocialType | string;
  page: string;
  profile_name: string;
  profile_image: string;
  created: string;
};
