import { SocialType } from '@app-core/enums/social-type.enum'
import { SocialChatMessage } from '@app-models/social-chat-message';
export const SocialChatMessagesMockData: SocialChatMessage[] = [
    {
      message: 'hello',
      user_name: 'Brad Frost',
      // tslint:disable-next-line:max-line-length
      profile_image: 'https://nemsmbr.org/wp-content/uploads/2019/11/no-image-icon-md-1.png',
      message_time: '2020/6/5 10:30pm',
      mine: 0,
    },
    {
      message: 'Hi! Please let us know how we can help you!',
      user_name: 'Campaigntocash',
      // tslint:disable-next-line:max-line-length
      profile_image: 'https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/cp0/p74x74/62447688_104904750778894_564438730820026368_o.jpg?_nc_cat=105&_nc_sid=dbb9e7&_nc_ohc=4m8n4PUUfKMAX8AJrvA&_nc_ht=scontent-fml2-1.xx&oh=a91a37056fa377bb9a23fdd10cf0d511&oe=5F015684',
      message_time: '2020/6/5 10:31pm',
      mine: 1,
    },

    {
      message: 'Can I learn more about your business?',
      user_name: 'Brad Frost',
      // tslint:disable-next-line:max-line-length
      profile_image: 'https://nemsmbr.org/wp-content/uploads/2019/11/no-image-icon-md-1.png',
      message_time: '2020/6/5 10:32pm',
      mine: 0,
    },
  ];