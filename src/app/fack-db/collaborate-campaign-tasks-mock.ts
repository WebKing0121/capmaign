import { CollaborateCampaignTask } from '@app-models/collaborate-campaign-task';

export const CollaborateCampaignsTasksMockData: CollaborateCampaignTask[] = [
  {
    id: 1, campaign_id: 1, name: 'Task - 1', user_id: 1, percent: 0,
    desc: 'Task - 1 Description', started: 'May 3, 2019 2:00:00 AM',
    ended: 'Sep 14, 2019 2:00:00 AM', esti_hours: 40,
  },
  {
    id: 2, campaign_id: 1, name: 'Task - 2', user_id: 2, percent: 0,
    desc: 'Task - 2 Description', started: 'May 3, 2019 2:00:00 AM',
    ended: 'Sep 14, 2019 2:00:00 AM', esti_hours: 60,
  },

  {
    id: 3, campaign_id: 2, name: 'Task - 3 ', user_id: 3, percent: 8,
    desc: 'Task - 3 Description', started: 'Jun 16, 2019 2:00:00 AM',
    ended: 'Aug 23, 2019 2:00:00 AM', esti_hours: 85,
  },
  {
    id: 4, campaign_id: 2, name: 'Task - 4 ', user_id: 4, percent: 3,
    desc: 'Task - 4 Description', started: 'Jun 16, 2019 2:00:00 AM',
    ended: 'Aug 23, 2019 2:00:00 AM', esti_hours: 60,
  },
  {
    id: 5, campaign_id: 2, name: 'Task - 5 ', user_id: 5, percent: 1,
    desc: 'Task - 5 Description', started: 'Jun 16, 2019 2:00:00 AM',
    ended: 'Aug 23, 2019 2:00:00 AM', esti_hours: 120,
  },

  {
    id: 6, campaign_id: 3, name: 'Task - 6', user_id: 6, percent: 13,
    desc: 'Task - 6 Description', started: 'Mar 15, 2019 1:00:00 AM',
    ended: 'Jul 27, 2019 2:00:00 AM', esti_hours: 147,
  },
  {
    id: 7, campaign_id: 3, name: 'Task - 7', user_id: 7, percent: 9,
    desc: 'Task - 7 Description', started: 'Mar 15, 2019 1:00:00 AM',
    ended: 'Jul 27, 2019 2:00:00 AM', esti_hours: 180,
  },
  {
    id: 8, campaign_id: 4, name: 'Task - 8', user_id: 8, percent: 70,
    desc: 'Task - 8 Description', started: 'Jun 19, 2019 2:00:00 AM',
    ended: 'Jun 20, 2019 2:00:00 AM', esti_hours: 115,
  },
  {
    id: 9, campaign_id: 4, name: 'Task - 9', user_id: 9, percent: 60,
    desc: 'Task - 9 Description', started: 'Jun 19, 2019 2:00:00 AM',
    ended: 'Jun 20, 2019 2:00:00 AM', esti_hours: 35,
  },
  {
    id: 10, campaign_id: 4, name: 'Task - 10', user_id: 7, percent: 25,
    desc: 'Task - 10 Description', started: 'Jun 19, 2019 2:00:00 AM',
    ended: 'Jun 20, 2019 2:00:00 AM', esti_hours: 170,
  },
  {
    id: 11, campaign_id: 5, name: 'Task - 11', user_id: 8, percent: 21,
    desc: 'Task - 11 Description', started: 'May 3, 2019 2:00:00 AM',
    ended: 'Sep 14, 2019 2:00:00 AM', esti_hours: 90,
  },
];