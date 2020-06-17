
import { SocialType, SocialLabelType, SocialAccountType } from '@app-core/enums/social-type.enum';

export class SocialAccount {
  id: number;
  social: SocialType | string;
  label: SocialLabelType | string;
  img: string;
  type: SocialAccountType | string;
  connected: boolean;
  user_id?: number;
  unique_user_id?: number | string;
  user_profile_name?: string;
  user_profile_image?: string;
  page_id?: number;
  page_name?: string;
  posts?: any[];
};