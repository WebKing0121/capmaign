import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import * as moment from 'moment';

import { CollaborateTeamsMockData } from '@app-fake-db/collaborate-teams-mock';
import { CollaborateCampaignsMockData } from '@app-fake-db/collaborate-campaigns-mock';
import { CollaborateCampaignsTasksMockData } from '@app-fake-db/collaborate-campaign-tasks-mock';
import { CollaborateCampaignsSubtasksMockData } from '@app-fake-db/collaborate-campaign-subtasks-mock';
import { CollaborateChatRoomsMockData } from '@app-fake-db/collaborate-chat-users-mock';
import { UsersMockData } from '@app-fake-db/users-mock';
@Injectable({
  providedIn: 'root'
})
export class CollaborateService {

  private url = 'collaborate';

  constructor(private http: HttpClient) { }

  getCollaborateTeams() {
    // return this.http.get<any>(`${environment.apiUrl}/${this.url}/teams`);
    return of(CollaborateTeamsMockData);
  }

  getCollaborateCampaigns() {
    // return this.http.get<any>(`${environment.apiUrl}/${this.url}/campaigns`);
    return of(CollaborateCampaignsMockData);
  }

  getCampaignTasks(campaignId: number) {
    // return this.http.get<any>(`${environment.apiUrl}/${this.url}/campaign/${campaignId}/tasks`);
    return of(CollaborateCampaignsTasksMockData.filter(x => x.campaign_id === campaignId));
  }

  getCampaignSubTasks(taskId: number) {
    // return this.http.get<any>(`${environment.apiUrl}/${this.url}/task/${taskId}/sub-tasks`);
    return of(CollaborateCampaignsSubtasksMockData.filter(x => x.task_id === taskId));
  }

  getRecentActivities(date: string, campaignId: number) {
    // return this.http.post<any>(`${environment.apiUrl}/${this.url}/activity`, {
    //   date,
    //   campaignId
    // });

    const activities = [];
    let lastActivityTime = moment(date).format('YYYY-MM-DD HH:mm:ss');

    let RecordsPerRequest = 20;
    let userId = 0;
    let newCampaignId = 0;
    let campaign;
    let user;
    while (RecordsPerRequest > 0) {
      lastActivityTime = moment(lastActivityTime).subtract(1, 'm').format('YYYY-MM-DD HH:mm:ss');
      userId = Math.ceil(Math.random() * 14);
      user = UsersMockData.find(x => x.id === userId);
      newCampaignId = campaignId > 0 ? campaignId : Math.ceil(Math.random() * 6);
      campaign = CollaborateCampaignsMockData.find(x => x.id === newCampaignId);
      activities.push({
        time: lastActivityTime,
        user: user.firstName + ' ' + user.lastName,
        module_id: 1,
        campaign: campaign.name,
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      });
      RecordsPerRequest--;
    }
    return of(activities);

  }

  getChatUsers() {
    // return this.http.get<any>(`${environment.apiUrl}/${this.url}/chat-users`);
    return of(CollaborateChatRoomsMockData);
  }
}
