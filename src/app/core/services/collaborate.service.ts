import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import * as moment from 'moment';
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

  getCollaborateTeams(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/collaborationTeam/GetTeamViewforPaging`, params);
  }

  getCollaborateTeam(id: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/collaborationTeam/GetCollaborationTeamForEdit`, { id });
  }

  getCollaborateTeamMembers(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/collaborationTeam/GetDetailMember`, params);
  }

  createCollaborateTeam(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/collaborationTeam/createCollaborationTeam`, params);
  }
  
  updateCollaborateTeam(params: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/collaborationTeam/UpdateCollaborationTeam`, params);
  }
  
  getCollaborateCampaigns(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/collaborationTeam/GetAllCampaignsforPaging`, params);
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
    // https://c2cstaging.azurewebsites.net/api/services/app/collaborationTeam/GetAllActivityRecent
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/collaborationTeam/GetAllActivityRecent`);

    // const activities = [];
    // let lastActivityTime = moment(date).format('YYYY-MM-DD HH:mm:ss');

    // let RecordsPerRequest = 20;
    // let userId = 0;
    // let newCampaignId = 0;
    // let campaign;
    // let user;
    // let userIdIndex = 0;
    // const userIdArray = UsersMockData.result.items.map(x => x.id);

    // while (RecordsPerRequest > 0) {
    //   lastActivityTime = moment(lastActivityTime).subtract(1, 'm').format('YYYY-MM-DD HH:mm:ss');
    //   userIdIndex = Math.ceil(Math.random() * (userIdArray.length - 1));
    //   userId = userIdArray[userIdIndex];
    //   user = UsersMockData.result.items.find(x => x.id === userId);
    //   newCampaignId = campaignId > 0 ? campaignId : Math.ceil(Math.random() * 6);
    //   campaign = CollaborateCampaignsMockData.find(x => x.id === newCampaignId);
    //   activities.push({
    //     time: lastActivityTime,
    //     user: user.surname + ' ' + user.name,
    //     module_id: 1,
    //     campaign: campaign.name,
    //     message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    //   });
    //   RecordsPerRequest--;
    // }
    // return of(activities);

  }

  getChatUsers() {
    // return this.http.get<any>(`${environment.apiUrl}/${this.url}/chat-users`);
    return of(CollaborateChatRoomsMockData);
  }
}
