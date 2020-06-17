import { CollaborateCampaign } from '@app-models/collaborate-campaign';

export const CollaborateCampaignsMockData: CollaborateCampaign[] = [
  {
    id: 1, name: 'Invest Now - Demo1', started: 'May 3, 2019 2:00:00 AM', ended: 'Sep 14, 2019 2:00:00 AM',
    percent: 0.0, type: 'Email', status: 'in-progress', team_id: 1
  },
  {
    id: 2, name: 'New feature - Demo1', started: 'Jun 16, 2019 2:00:00 AM', ended: 'Aug 23, 2019 2:00:00 AM',
    percent: 4.0, type: 'Email', status: 'in-progress', team_id: 2
  },
  {
    id: 3, name: 'Webinar Event for Demo', started: 'Mar 15, 2019 1:00:00 AM', ended: 'Jul 27, 2019 2:00:00 AM',
    percent: 11.0, type: 'Email', status: 'in-progress', team_id: 3
  },
  {
    id: 4, name: 'Campaign Explore new products', started: 'Jun 19, 2019 2:00:00 AM',
    ended: 'Jun 20, 2019 2:00:00 AM', percent: 61.0, type: 'Email', status: 'in-progress', team_id: 3
  },
  {
    id: 5, name: 'Automation Email', started: 'May 7, 2019 2:00:00 AM',
    ended: 'Jul 18, 2019 2:00:00 AM',
    percent: 23.0, type: 'Email', status: 'in-progress', team_id: 3
  },
  {
    id: 6, name: 'Raw office-sticky notes promo', started: 'May 7, 2019 2:00:00 AM',
    ended: 'May 7, 2019 2:00:00 AM',
    percent: 66.0, type: 'Email', status: 'in-progress', team_id: 0
  },
  {
    id: 7, name: 'Lipstick', started: 'May 7, 2019 2:00:00 AM',
    ended: 'May 7, 2019 2:00:00 AM',
    percent: 66.0, type: 'SMS', status: 'in-progress', team_id: 0
  },
  {
    id: 8, name: 'Breast Cancer', started: 'May 7, 2019 2:00:00 AM',
    ended: 'May 7, 2019 2:00:00 AM',
    percent: 66.0, type: 'SMS', status: 'completed', team_id: 0
  },

];