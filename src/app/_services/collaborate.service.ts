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
    console.log('teams');
    return this.http.get<any>(`${environment.apiUrl}/${this.url}/teams`);
  }
}
