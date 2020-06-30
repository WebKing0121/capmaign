import { CollaborateChatRoom } from '@app-models/collaborate';
import { UsersMockData } from './users-mock';
export const CollaborateChatRoomsMockData: CollaborateChatRoom[] = [
  {
    id: 1, name: 'My team', newMessageCount: 2, type: 'group',
    lastMessage: 'are you around here?', lastMessageTime: '2020-06-11 10:30:21'
  },
  {
    id: 2, name: 'Digital Marketing Team', newMessageCount: 0, type: 'group',
    lastMessage: 'Sure', lastMessageTime: '2020-06-10 10:32:21'
  },
  ...UsersMockData.result.items.map((x, index) => ({
    id: 3 + index, name: x.surname + ' ' + x.name,
    newMessageCount: 0, type: 'person', lastMessage: '', lastMessageTime: '', profileImg: x.profileImg
  }))
];
