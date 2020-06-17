
import { SocialAccountType, SocialType, SocialLabelType } from '@app-core/enums/social-type.enum';

export class SocialSiteButton {
  label: string;
  icon: string;
  type: SocialAccountType;
};

export class SocialSite {
  id: SocialType;
  label: SocialLabelType | string;
  img: string;
  selected_img: string;
  normal_img: string;
  buttons: SocialSiteButton[];
};
