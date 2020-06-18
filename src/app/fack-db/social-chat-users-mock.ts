import { SocialType } from '@app-core/enums/social-type.enum';
import { SocialChatUser } from '@app-models/social';
export const SocialChatUsersMockData: SocialChatUser[] = [
  {
    id: 1,
    site: SocialType.Facebook,
    page: 'Campaigntocash',
    profile_name: 'Samir Sahu',
    // tslint:disable-next-line:max-line-length
    profile_image: 'https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/cp0/p74x74/62447688_104904750778894_564438730820026368_o.jpg?_nc_cat=105&_nc_sid=dbb9e7&_nc_ohc=4m8n4PUUfKMAX8AJrvA&_nc_ht=scontent-fml2-1.xx&oh=a91a37056fa377bb9a23fdd10cf0d511&oe=5F015684',
    created: '2020/06/05 10:22:30',
  },
  {
    id: 2,
    site: SocialType.Facebook,
    page: 'About School',
    profile_name: 'Archit Patil',
    // tslint:disable-next-line:max-line-length
    profile_image: 'https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/cp0/c120.120.720.720a/s74x74/21230996_1667709066594025_116809688593393743_n.jpg?_nc_cat=108&_nc_sid=dbb9e7&_nc_ohc=3Xm1H6jeyp8AX8rfweP&_nc_ht=scontent-fml2-1.xx&oh=421be8035b4e9eff4fae28baca9b7a7c&oe=5EFF416B',
    created: '2020/04/13 10:22:30',
  },
  {
    id: 3,
    site: SocialType.Facebook,
    page: 'All Around City',
    profile_name: 'Archit Patil',
    // tslint:disable-next-line:max-line-length
    profile_image: 'https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/cp0/c120.120.720.720a/s74x74/21230996_1667709066594025_116809688593393743_n.jpg?_nc_cat=108&_nc_sid=dbb9e7&_nc_ohc=3Xm1H6jeyp8AX8rfweP&_nc_ht=scontent-fml2-1.xx&oh=421be8035b4e9eff4fae28baca9b7a7c&oe=5EFF416B',
    created: '2020/06/05 10:22:30',
  },
  {
    id: 4,
    site: SocialType.Twitter,
    page: 'Campaigntocash',
    profile_name: 'Campaigntocash',
    // tslint:disable-next-line:max-line-length
    profile_image: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
    created: '2020/06/05 10:22:30',
  },
];
