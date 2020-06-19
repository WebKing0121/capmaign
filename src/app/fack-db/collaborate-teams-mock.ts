import { CollaborateTeam } from '@app-models/collaborate';

export const CollaborateTeamsMockData: CollaborateTeam[] = [
  {
    id: 1, name: 'C2C Team', created: 'Jan 29, 2019 5:06:44',
    desc: '',
    members: [1, 2], campaigns: [1]
  },
  {
    id: 2, name: 'My Team', created: 'Feb 3, 2019 12:17:41',
    desc: '',
    members: [3, 4, 5], campaigns: [2]
  },
  {
    id: 3, name: 'Digial Marketing Team', created: 'Feb 12, 2019 16:22:15',
    desc: '',
    members: [6, 7, 8, 9], campaigns: [3, 4, 5]
  },
  {
    id: 4, name: 'Test Team', created: 'Feb 3, 2019 12:17:41',
    desc: '',
    members: [10, 11], campaigns: []
  }
];
