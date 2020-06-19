import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import * as moment from 'moment';
import { UsersMockData } from '@app-fake-db/users-mock';
import { CollaborateCampaignsMockData } from '@app-fake-db/collaborate-campaigns-mock';
import { CollaborateCampaignsTasksMockData } from '@app-fake-db/collaborate-campaign-tasks-mock';
import { CollaborateCampaignsSubtasksMockData } from '@app-fake-db/collaborate-campaign-subtasks-mock';
import { CollaborateTeamsMockData } from '@app-fake-db/collaborate-teams-mock';
import { SocialAccountsMockData } from '@app-fake-db/social-accounts-mock';
import { SocialSitesMockData } from '@app-fake-db/social-sites-mock';
import { SocialChatUsersMockData } from '@app-fake-db/social-chat-users-mock';
import { SocialChatMessagesMockData } from '@app-fake-db/social-chat-messages-mock';
let lastActivityTime = '';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      let subURL = '';
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.endsWith('/social/accounts') && method === 'GET':
          return getSocialAccounts();
        case url.endsWith('/social/sites') && method === 'GET':
          return getSocialSites();
        case url.endsWith('/social/chat-users') && method === 'GET':
          return getSocialChatUsers();
        case url.includes('/social/chat-messages/') && method === 'GET':
          const userId = url.substring(url.lastIndexOf('/') + 1);
          return getSocialChatMessages(userId);
        case url.endsWith('/collaborate/teams') && method === 'GET':
          return getCollaborateTeams();
        case url.endsWith('/collaborate/campaigns') && method === 'GET':
          return getCollaborateCampaigns();
        case url.includes('/collaborate/campaign/') && method === 'GET':
          subURL = url.split('/collaborate/campaign/')[1];
          let campaignId = '';
          switch (true) {
            case subURL.endsWith('/tasks'):
              campaignId = subURL.split('/tasks')[0];
              return getCampaignTasks(Number(campaignId));
          }
          return ok([]);
        case url.includes('/collaborate/task/') && method === 'GET':
          subURL = url.split('/collaborate/task/')[1];
          switch (true) {
            case subURL.endsWith('/sub-tasks'):
              let taskId = '';
              taskId = subURL.split('/sub-tasks')[0];
              return getCampaignSubTasks(Number(taskId));
          }
          return ok([]);
        case url.endsWith('/activity') && method === 'POST':
          return getRecentActivities();
        case url.endsWith('/collaborate/chat-users') && method === 'GET':
          return getCollaborateChatUsers();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { username, password } = body;
      const user = UsersMockData.find(x => x.username === username && x.password === password);
      if (!user) {
        return error('Username or password is incorrect');
      }
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'fake-jwt-token'
      });
    }

    function getUsers() {
      if (!isLoggedIn()) {
        return unauthorized();
      }

      return ok(UsersMockData);
    }

    // helper functions

    function ok(bodyObject?) {
      return of(new HttpResponse({ status: 200, body: bodyObject }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function getSocialAccounts() {
      return ok(SocialAccountsMockData);
    }

    function getSocialSites() {
      return ok(SocialSitesMockData);
    }

    function getSocialChatUsers() {
      return ok(SocialChatUsersMockData);
    }

    function getSocialChatMessages(userId: any) {
      let message = [];
      switch (Number(userId)) {
        case 1:
          message = SocialChatMessagesMockData;
          break;
        case 2:
          message = SocialChatMessagesMockData;
          break;

      }
      return ok(message);
    }

    function getCollaborateTeams() {
      return ok(CollaborateTeamsMockData);
    }

    function getCollaborateCampaigns() {
      return ok(CollaborateCampaignsMockData);
    }

    function getCampaignTasks(campaignId) {
      return ok(CollaborateCampaignsTasksMockData.filter(task => task.campaign_id === campaignId));
    }

    function getCampaignSubTasks(taskId) {
      return ok(CollaborateCampaignsSubtasksMockData.filter(subtask => subtask.task_id === taskId));
    }

    function getRecentActivities() {
      const activities = [];
      const { date, campaignId } = body;
      if (lastActivityTime === '') {
        lastActivityTime = moment(date).format('YYYY-MM-DD HH:mm:ss');
      }
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
      return ok(activities);
    }

    function getCollaborateChatUsers() {
      const collaboarUsers = UsersMockData.map((x, index) => ({
        id: 3 + index, name: x.firstName + ' ' + x.lastName,
        newMessageCount: 0, type: 'person', lastMessage: '', lastMessageTime: '', profileImg: x.profileImg
      }));
      return ok([
        {
          id: 1, name: 'My team', newMessageCount: 2, type: 'group',
          lastMessage: 'are you around here?', lastMessageTime: '2020-06-11 10:30:21'
        },
        {
          id: 2, name: 'Digital Marketing Team', newMessageCount: 0, type: 'group',
          lastMessage: 'Sure', lastMessageTime: '2020-06-10 10:32:21'
        },
        ...collaboarUsers
      ]);
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
