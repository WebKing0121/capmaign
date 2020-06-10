import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollaborateService {
  
  private url = 'collaborate';
  
  constructor(private http: HttpClient) { }
  
  getCollaborateTeams() {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}/teams`);
  }

  getCollaborateCampaigns() {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}/campaigns`);
  }

  getCampaignTasks(campaignId: number) {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}/campaign/${campaignId}/tasks`);
  }
  
  getCampaignSubTasks(taskId: number) {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}/task/${taskId}/sub-tasks`);
  }
}
