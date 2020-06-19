import { SocialAccountType, SocialType, SocialLabelType } from '@app-core/enums/social-type.enum';
import { SocialSite } from '@app-models/social';

export const SocialSitesMockData: SocialSite[] = [
  {
    id: SocialType.Facebook,
    label: SocialLabelType.Facebook,
    selected_img: 'assets/images/social-icons/facebook-selected.png',
    normal_img: 'assets/images/social-icons/facebook-normal.png',
    img: 'assets/images/social-icons/facebook.png',
    buttons: [
      { label: 'Connect Profile', icon: 'icon-user', type: SocialAccountType.Profile },
      { label: 'Connect Page', icon: 'icon-user', type: SocialAccountType.Page },
      { label: 'Connect Group', icon: 'icon-user', type: SocialAccountType.Group },
    ]
  },
  {
    id: SocialType.LinkedIn,
    label: SocialLabelType.LinkedIn,
    selected_img: 'assets/images/social-icons/linkedin-selected.png',
    normal_img: 'assets/images/social-icons/linkedin-normal.png',
    img: 'assets/images/social-icons/linkedin.png',
    buttons: [
      { label: 'Connect Profile', icon: 'icon-user', type: SocialAccountType.Profile },
      { label: 'Connect Page', icon: 'icon-user', type: SocialAccountType.Page },
    ]
  },
  {
    id: SocialType.Twitter,
    label: SocialLabelType.Twitter,
    selected_img: 'assets/images/social-icons/twitter-selected.png',
    normal_img: 'assets/images/social-icons/twitter-normal.png',
    img: 'assets/images/social-icons/twitter.png',
    buttons: [
      { label: 'Connect Profile', icon: 'icon-user', type: SocialAccountType.Profile },
    ]
  },
];
