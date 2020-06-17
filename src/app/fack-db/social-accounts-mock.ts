import { SocialType, SocialLabelType, SocialAccountType } from '@app-core/enums/social-type.enum'
import { SocialAccount } from '@app-models/social-account';

export const SocialAccountsMockData: SocialAccount[] = [
  {
    id: 1,
    social: SocialType.Facebook,
    label: SocialLabelType.Facebook,
    img: 'assets/images/social-icons/facebook-selected.png',
    user_id: 296,
    type: SocialAccountType.Profile,
    connected: true,
    unique_user_id: 10220279568677599,
    user_profile_name: 'Samir Safu',
    // tslint:disable-next-line:max-line-length
    user_profile_image: 'https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/cp0/p74x74/62447688_104904750778894_564438730820026368_o.jpg?_nc_cat=105&_nc_sid=dbb9e7&_nc_ohc=4m8n4PUUfKMAX8AJrvA&_nc_ht=scontent-fml2-1.xx&oh=a91a37056fa377bb9a23fdd10cf0d511&oe=5F015684',
    posts: [

    ],
  },
  {
    id: 2,
    social: SocialType.Facebook,
    label: SocialLabelType.Facebook,
    type: SocialAccountType.Profile,
    connected: false,
    img: 'assets/images/social-icons/facebook-selected.png',
    user_id: 280,
    unique_user_id: 108276963665638,
    user_profile_name: 'Archit Patil',
    // tslint:disable-next-line:max-line-length
    user_profile_image: 'https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/cp0/c120.120.720.720a/s74x74/21230996_1667709066594025_116809688593393743_n.jpg?_nc_cat=108&_nc_sid=dbb9e7&_nc_ohc=3Xm1H6jeyp8AX8rfweP&_nc_ht=scontent-fml2-1.xx&oh=421be8035b4e9eff4fae28baca9b7a7c&oe=5EFF416B'
  },
  {
    id: 3,
    social: SocialType.LinkedIn,
    label: SocialLabelType.LinkedIn,
    type: SocialAccountType.Page,
    connected: false,
    img: 'assets/images/social-icons/linkedin-selected.png',
    page_id: 17983826,
    page_name: 'campaigntocash.com-inc',
    // tslint:disable-next-line:max-line-length
    user_profile_image: 'https://media-exp1.licdn.com/dms/image/C560BAQEZxrL7ZxS4kA/company-logo_200_200/0?e=1599696000&v=beta&t=22F3QKDyUpe2HzM-SQhVj1JnMmg98AtgJne-5awAQ9w'
  },
  {
    id: 4,
    social: SocialType.Facebook,
    label: SocialLabelType.Facebook,
    type: SocialAccountType.Page,
    connected: false,
    img: 'assets/images/social-icons/facebook-selected.png',
    page_id: 144534772822248,
    page_name: 'Campaigntocash',
    // tslint:disable-next-line:max-line-length
    user_profile_image: 'https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/72630715_398306764111713_7982094538049060864_n.png?_nc_cat=102&_nc_sid=dbb9e7&_nc_ohc=5aW0jISrgS4AX89DNga&_nc_ht=scontent-fml2-1.xx&oh=6bd493d1df69a761fbe7c6e10b6d95cf&oe=5EFF78E9'
  },
  {
    id: 5,
    social: SocialType.Facebook,
    label: SocialLabelType.Facebook,
    type: SocialAccountType.Page,
    connected: false,
    img: 'assets/images/social-icons/facebook-selected.png',
    page_id: 2225449960849243,
    page_name: 'About School',
    // tslint:disable-next-line:max-line-length
    user_profile_image: 'https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/p200x200/74860127_114076336706779_1417539520659718144_n.jpg?_nc_cat=109&_nc_sid=dbb9e7&_nc_ohc=134zm6XVvJcAX9-iX6Y&_nc_ht=scontent-fml2-1.xx&_nc_tp=6&oh=e00f0a478af954d12b61d031843af4a0&oe=5F00D332'
  },
  {
    id: 6,
    social: SocialType.LinkedIn,
    label: SocialLabelType.LinkedIn,
    type: SocialAccountType.Profile,
    connected: false,
    img: 'assets/images/social-icons/linkedin-selected.png',
    user_id: 294,
    unique_user_id: '6rfvCx_ZDb',
    user_profile_name: 'Manoj',
    // tslint:disable-next-line:max-line-length
    user_profile_image: 'https://media-exp1.licdn.com/dms/image/C4E03AQESBn4kuePbMQ/profile-displayphoto-shrink_200_200/0?e=1596672000&v=beta&t=pRqrgoLVkFnthOEdwZF5J4m2vs5rSyKmQUt__TzGHt8'
  },
  {
    id: 7,
    social: SocialType.Twitter,
    label: SocialLabelType.Twitter,
    type: SocialAccountType.Profile,
    connected: false,
    img: 'assets/images/social-icons/twitter-selected.png',
    user_id: 292,
    unique_user_id: 1149900189882339328,
    user_profile_name: 'Campaigntocash',
    // tslint:disable-next-line:max-line-length
    user_profile_image: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'
  },
];