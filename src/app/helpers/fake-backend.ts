import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import * as moment from 'moment';

import { User } from '../_models/user';

const users: User[] = [
  {
    id: 1, username: 'test', password: 'test', firstName: 'Robert', lastName: 'Robertson',
    profileImg: 'assets/images/user/avatar-1.jpg'
  },
  {
    id: 2, username: 'greyson', password: 'test', firstName: 'Greyson', lastName: 'Wellington',
    profileImg: 'assets/images/user/avatar-2.jpg'
  },
  {
    id: 3, username: 'zander', password: 'test', firstName: 'Zander', lastName: 'Johnston',
    profileImg: 'assets/images/user/avatar-3.jpg'
  },
  {
    id: 4, username: 'ayden', password: 'test', firstName: 'Ayden', lastName: 'Bailey',
    profileImg: 'assets/images/user/avatar-4.jpg'
  },
  {
    id: 5, username: 'jax', password: 'test', firstName: 'Jax', lastName: 'Brook',
    profileImg: 'assets/images/user/avatar-5.jpg'
  },
  {
    id: 6, username: 'jordan', password: 'test', firstName: 'Jordan', lastName: 'Macdonald',
    profileImg: 'assets/images/user/img-avatar-1.jpg'
  },
  {
    id: 7, username: 'malcolm', password: 'test', firstName: 'Malcolm', lastName: 'Watson',
    profileImg: 'assets/images/user/img-avatar-2.jpg'
  },
  {
    id: 8, username: 'thomas', password: 'test', firstName: 'Thomas', lastName: 'Sim',
    profileImg: 'assets/images/user/img-avatar-3.jpg'
  },
  {
    id: 9, username: 'zayn', password: 'test', firstName: 'Zayn', lastName: 'Davies',
    profileImg: 'assets/images/user/avatar-1.jpg'
  },
  {
    id: 10, username: 'jack', password: 'test', firstName: 'Jack', lastName: 'Carlson',
    profileImg: 'assets/images/user/avatar-2.jpg'
  },
  {
    id: 11, username: 'barrett', password: 'test', firstName: 'Barrett', lastName: 'Gale',
    profileImg: 'assets/images/user/avatar-3.jpg'
  },
  {
    id: 12, username: 'francis', password: 'test', firstName: 'Francis', lastName: 'Burt',
    profileImg: 'assets/images/user/avatar-4.jpg'
  },
  {
    id: 13, username: 'bentley', password: 'test', firstName: 'Bentley', lastName: 'Withers',
    profileImg: 'assets/images/user/avatar-5.jpg'
  },
  {
    id: 14, username: 'kayden', password: 'test', firstName: 'Kayden', lastName: 'Carlson',
    profileImg: 'assets/images/user/img-avatar-1.jpg'
  },
];

const campaigns: any[] = [
  {
    id: 1, name: 'Invest Now - Demo1', startDate: 'May 3, 2019 2:00:00 AM', endDate: 'Sep 14, 2019 2:00:00 AM',
    percent: 0.0, type: 'Email', status: 'inprogress', teamId: 1
  },
  {
    id: 2, name: 'New feature - Demo1', startDate: 'Jun 16, 2019 2:00:00 AM', endDate: 'Aug 23, 2019 2:00:00 AM',
    percent: 4.0, type: 'Email', status: 'inprogress', teamId: 2
  },
  {
    id: 3, name: 'Webinar Event for Demo', startDate: 'Mar 15, 2019 1:00:00 AM', endDate: 'Jul 27, 2019 2:00:00 AM',
    percent: 11.0, type: 'Email', status: 'inprogress', teamId: 3
  },
  {
    id: 4, name: 'Campaign Explore new products', startDate: 'Jun 19, 2019 2:00:00 AM',
    endDate: 'Jun 20, 2019 2:00:00 AM', percent: 61.0, type: 'Email', status: 'inprogress', teamId: 3
  },
  {
    id: 5, name: 'Automation Email', startDate: 'May 7, 2019 2:00:00 AM',
    endDate: 'Jul 18, 2019 2:00:00 AM',
    percent: 23.0, type: 'Email', status: 'inprogress', teamId: 3
  },
  {
    id: 6, name: 'Raw office-sticky notes promo', startDate: 'May 7, 2019 2:00:00 AM',
    endDate: 'May 7, 2019 2:00:00 AM',
    percent: 66.0, type: 'Email', status: 'inprogress', teamId: 0
  },
];

const campaignTasks: any[] = [
  {
    id: 1, campaigns: 1, name: 'Task - 1', userId: 1, percent: 0,
    desc: 'Task - 1 Description', startDate: 'May 3, 2019 2:00:00 AM',
    endDate: 'Sep 14, 2019 2:00:00 AM', estiHours: 40,
  },
  {
    id: 2, campaigns: 1, name: 'Task - 2', userId: 2, percent: 0,
    desc: 'Task - 2 Description', startDate: 'May 3, 2019 2:00:00 AM',
    endDate: 'Sep 14, 2019 2:00:00 AM', estiHours: 60,
  },

  {
    id: 3, campaigns: 2, name: 'Task - 3 ', userId: 3, percent: 8,
    desc: 'Task - 3 Description', startDate: 'Jun 16, 2019 2:00:00 AM',
    endDate: 'Aug 23, 2019 2:00:00 AM', estiHours: 85,
  },
  {
    id: 4, campaigns: 2, name: 'Task - 4 ', userId: 4, percent: 3,
    desc: 'Task - 4 Description', startDate: 'Jun 16, 2019 2:00:00 AM',
    endDate: 'Aug 23, 2019 2:00:00 AM', estiHours: 60,
  },
  {
    id: 5, campaigns: 2, name: 'Task - 5 ', userId: 5, percent: 1,
    desc: 'Task - 5 Description', startDate: 'Jun 16, 2019 2:00:00 AM',
    endDate: 'Aug 23, 2019 2:00:00 AM', estiHours: 120,
  },

  {
    id: 6, campaigns: 3, name: 'Task - 6', userId: 6, percent: 13,
    desc: 'Task - 6 Description', startDate: 'Mar 15, 2019 1:00:00 AM',
    endDate: 'Jul 27, 2019 2:00:00 AM', estiHours: 147,
  },
  {
    id: 7, campaigns: 3, name: 'Task - 7', userId: 7, percent: 9,
    desc: 'Task - 7 Description', startDate: 'Mar 15, 2019 1:00:00 AM',
    endDate: 'Jul 27, 2019 2:00:00 AM', estiHours: 180,
  },
  {
    id: 8, campaigns: 4, name: 'Task - 8', userId: 8, percent: 70,
    desc: 'Task - 8 Description', startDate: 'Jun 19, 2019 2:00:00 AM',
    endDate: 'Jun 20, 2019 2:00:00 AM', estiHours: 115,
  },
  {
    id: 9, campaigns: 4, name: 'Task - 9', userId: 9, percent: 60,
    desc: 'Task - 9 Description', startDate: 'Jun 19, 2019 2:00:00 AM',
    endDate: 'Jun 20, 2019 2:00:00 AM', estiHours: 35,
  },
  {
    id: 10, campaigns: 4, name: 'Task - 10', userId: 7, percent: 25,
    desc: 'Task - 10 Description', startDate: 'Jun 19, 2019 2:00:00 AM',
    endDate: 'Jun 20, 2019 2:00:00 AM', estiHours: 170,
  },
  {
    id: 11, campaigns: 5, name: 'Task - 11', userId: 8, percent: 21,
    desc: 'Task - 11 Description', startDate: 'May 3, 2019 2:00:00 AM',
    endDate: 'Sep 14, 2019 2:00:00 AM', estiHours: 90,
  },
];
const campaignSubtasks: any[] = [
  {
    id: 1, taskId: 1, name: 'Sub Task - 1', userId: 1, percent: 0,
    desc: 'Sub Task - 1 Description', startDate: 'May 3, 2019 2:00:00 AM', endDate: 'Sep 14, 2019 2:00:00 AM', estiHours: 40,
  },
  {
    id: 2, taskId: 1, name: 'Sub Task - 2', userId: 2, percent: 0,
    desc: 'Sub Task - 2 Description', startDate: 'May 3, 2019 2:00:00 AM', endDate: 'Sep 14, 2019 2:00:00 AM', estiHours: 60,
  },

  {
    id: 3, taskId: 3, name: 'Sub Task - 3 ', userId: 3, percent: 8,
    desc: 'Sub Task - 3 Description', startDate: 'Jun 16, 2019 2:00:00 AM', endDate: 'Aug 23, 2019 2:00:00 AM', estiHours: 85,
  },
  {
    id: 4, taskId: 3, name: 'Sub Task - 4 ', userId: 4, percent: 3,
    desc: 'Sub Task - 4 Description', startDate: 'Jun 16, 2019 2:00:00 AM', endDate: 'Aug 23, 2019 2:00:00 AM', estiHours: 60,
  },
  {
    id: 5, taskId: 3, name: 'Sub Task - 5 ', userId: 5, percent: 1,
    desc: 'Sub Task - 5 Description', startDate: 'Jun 16, 2019 2:00:00 AM', endDate: 'Aug 23, 2019 2:00:00 AM', estiHours: 120,
  },

  {
    id: 6, taskId: 4, name: 'Sub Task - 6', userId: 6, percent: 13,
    desc: 'Sub Task - 6 Description', startDate: 'Mar 15, 2019 1:00:00 AM', endDate: 'Jul 27, 2019 2:00:00 AM', estiHours: 147,
  },
  {
    id: 7, taskId: 7, name: 'Sub Task - 7', userId: 7, percent: 9,
    desc: 'Sub Task - 7 Description', startDate: 'Mar 15, 2019 1:00:00 AM', endDate: 'Jul 27, 2019 2:00:00 AM', estiHours: 180,
  },
  {
    id: 8, taskId: 7, name: 'Sub Task - 8', userId: 8, percent: 70,
    desc: 'Sub Task - 8 Description', startDate: 'Jun 19, 2019 2:00:00 AM', endDate: 'Jun 20, 2019 2:00:00 AM', estiHours: 115,
  },
  {
    id: 9, taskId: 8, name: 'Sub Task - 9', userId: 9, percent: 60,
    desc: 'Sub Task - 9 Description', startDate: 'Jun 19, 2019 2:00:00 AM', endDate: 'Jun 20, 2019 2:00:00 AM', estiHours: 35,
  },
  {
    id: 10, taskId: 9, name: 'Sub Task - 10', userId: 7, percent: 25,
    desc: 'Sub Task - 10 Description', startDate: 'Jun 19, 2019 2:00:00 AM', endDate: 'Jun 20, 2019 2:00:00 AM', estiHours: 170,
  },
  {
    id: 11, taskId: 9, name: 'Sub Task - 11', userId: 8, percent: 21,
    desc: 'Sub Task - 11 Description', startDate: 'May 3, 2019 2:00:00 AM', endDate: 'Sep 14, 2019 2:00:00 AM', estiHours: 90,
  },
];


const teams: any[] = [
  {
    id: 1, name: 'C2C Team', created_at: 'Jan 29, 2019 5:06:44',
    members: [1, 2], campaigns: [1]
  },
  {
    id: 2, name: 'My Team', created_at: 'Feb 3, 2019 12:17:41',
    members: [3, 4, 5], campaigns: [2]
  },
  {
    id: 3, name: 'Digial Marketing Team', created_at: 'Feb 12, 2019 16:22:15',
    members: [6, 7, 8, 9], campaigns: [3, 4, 5]
  },
  {
    id: 4, name: 'Test Team', created_at: 'Feb 3, 2019 12:17:41',
    members: [10, 11], campaigns: []
  }
];

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
      const user = users.find(x => x.username === username && x.password === password);
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

      return ok(users);
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
      return ok([
        {
          id: 1,
          social: 'facebook',
          label: 'FaceBook',
          img: 'assets/images/social-icons/facebook-selected.png',
          userId: 296,
          type: 'profile',
          connected: true,
          uniqueUserId: 10220279568677599,
          userProfileName: 'Samir Safu',
          // tslint:disable-next-line:max-line-length
          profileImg: 'https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/cp0/p74x74/62447688_104904750778894_564438730820026368_o.jpg?_nc_cat=105&_nc_sid=dbb9e7&_nc_ohc=4m8n4PUUfKMAX8AJrvA&_nc_ht=scontent-fml2-1.xx&oh=a91a37056fa377bb9a23fdd10cf0d511&oe=5F015684',
          posts: [

          ],
        },
        {
          id: 2,
          social: 'facebook',
          label: 'FaceBook',
          type: 'profile',
          connected: false,
          img: 'assets/images/social-icons/facebook-selected.png',
          userId: 280,
          uniqueUserId: 108276963665638,
          userProfileName: 'Archit Patil',
          // tslint:disable-next-line:max-line-length
          profileImg: 'https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/cp0/c120.120.720.720a/s74x74/21230996_1667709066594025_116809688593393743_n.jpg?_nc_cat=108&_nc_sid=dbb9e7&_nc_ohc=3Xm1H6jeyp8AX8rfweP&_nc_ht=scontent-fml2-1.xx&oh=421be8035b4e9eff4fae28baca9b7a7c&oe=5EFF416B'
        },
        {
          id: 3,
          social: 'linkedin',
          label: 'LinkedIn',
          type: 'page',
          connected: false,
          img: 'assets/images/social-icons/linkedin-selected.png',
          pageId: 17983826,
          pageName: 'campaigntocash.com-inc',
          // tslint:disable-next-line:max-line-length
          profileImg: 'https://media-exp1.licdn.com/dms/image/C560BAQEZxrL7ZxS4kA/company-logo_200_200/0?e=1599696000&v=beta&t=22F3QKDyUpe2HzM-SQhVj1JnMmg98AtgJne-5awAQ9w'
        },
        {
          id: 4,
          social: 'facebook',
          label: 'FaceBook',
          type: 'page',
          connected: false,
          img: 'assets/images/social-icons/facebook-selected.png',
          pageId: 144534772822248,
          pageName: 'Campaigntocash',
          // tslint:disable-next-line:max-line-length
          profileImg: 'https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/72630715_398306764111713_7982094538049060864_n.png?_nc_cat=102&_nc_sid=dbb9e7&_nc_ohc=5aW0jISrgS4AX89DNga&_nc_ht=scontent-fml2-1.xx&oh=6bd493d1df69a761fbe7c6e10b6d95cf&oe=5EFF78E9'
        },
        {
          id: 5,
          social: 'facebook',
          label: 'FaceBook',
          type: 'page',
          connected: false,
          img: 'assets/images/social-icons/facebook-selected.png',
          pageId: 2225449960849243,
          pageName: 'About School',
          // tslint:disable-next-line:max-line-length
          profileImg: 'https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/p200x200/74860127_114076336706779_1417539520659718144_n.jpg?_nc_cat=109&_nc_sid=dbb9e7&_nc_ohc=134zm6XVvJcAX9-iX6Y&_nc_ht=scontent-fml2-1.xx&_nc_tp=6&oh=e00f0a478af954d12b61d031843af4a0&oe=5F00D332'
        },
        {
          id: 6,
          social: 'linkedin',
          label: 'LinkedIn',
          type: 'profile',
          connected: false,
          img: 'assets/images/social-icons/linkedin-selected.png',
          userId: 294,
          uniqueUserId: '6rfvCx_ZDb',
          userProfileName: 'Manoj',
          // tslint:disable-next-line:max-line-length
          profileImg: 'https://media-exp1.licdn.com/dms/image/C4E03AQESBn4kuePbMQ/profile-displayphoto-shrink_200_200/0?e=1596672000&v=beta&t=pRqrgoLVkFnthOEdwZF5J4m2vs5rSyKmQUt__TzGHt8'
        },
        {
          id: 7,
          social: 'twitter',
          label: 'Twitter',
          type: 'profile',
          connected: false,
          img: 'assets/images/social-icons/twitter-selected.png',
          userId: 292,
          uniqueUserId: 1149900189882339328,
          userProfileName: 'Campaigntocash',
          // tslint:disable-next-line:max-line-length
          profileImg: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'
        },
      ]);
    }

    function getSocialSites() {
      return ok([
        {
          id: 'facebook',
          label: 'Facebook',
          selectedImg: 'assets/images/social-icons/facebook-selected.png',
          normalImg: 'assets/images/social-icons/facebook-normal.png',
          img: 'assets/images/social-icons/facebook.png',
          buttons: [
            { label: 'Connect Profile', icon: 'icon-user', type: 'profile' },
            { label: 'Connect Page', icon: 'icon-user', type: 'page' },
            { label: 'Connect Group', icon: 'icon-user', type: 'group' },
          ]
        },
        {
          id: 'linkedin',
          label: 'LinkedIn',
          selectedImg: 'assets/images/social-icons/linkedin-selected.png',
          normalImg: 'assets/images/social-icons/linkedin-normal.png',
          img: 'assets/images/social-icons/linkedin.png',
          buttons: [
            { label: 'Connect Profile', icon: 'icon-user', type: 'profile' },
            { label: 'Connect Page', icon: 'icon-user', type: 'page' }
          ]
        },
        {
          id: 'twitter',
          label: 'Twitter',
          selectedImg: 'assets/images/social-icons/twitter-selected.png',
          normalImg: 'assets/images/social-icons/twitter-normal.png',
          img: 'assets/images/social-icons/twitter.png',
          buttons: [
            { label: 'Connect Profile', icon: 'icon-user', type: 'profile' }
          ]
        },
      ]);
    }

    function getSocialChatUsers() {
      return ok([
        {
          id: 1,
          site: 'facebook',
          page: 'Campaigntocash',
          profileName: 'Samir Sahu',
          // tslint:disable-next-line:max-line-length
          profileImage: 'https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/cp0/p74x74/62447688_104904750778894_564438730820026368_o.jpg?_nc_cat=105&_nc_sid=dbb9e7&_nc_ohc=4m8n4PUUfKMAX8AJrvA&_nc_ht=scontent-fml2-1.xx&oh=a91a37056fa377bb9a23fdd10cf0d511&oe=5F015684',
          registeredAt: '2020/06/05 10:22:30',
        },
        {
          id: 2,
          site: 'facebook',
          page: 'About School',
          profileName: 'Archit Patil',
          // tslint:disable-next-line:max-line-length
          profileImage: 'https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/cp0/c120.120.720.720a/s74x74/21230996_1667709066594025_116809688593393743_n.jpg?_nc_cat=108&_nc_sid=dbb9e7&_nc_ohc=3Xm1H6jeyp8AX8rfweP&_nc_ht=scontent-fml2-1.xx&oh=421be8035b4e9eff4fae28baca9b7a7c&oe=5EFF416B',
          registeredAt: '2020/04/13 10:22:30',
        },
        {
          id: 3,
          site: 'facebook',
          page: 'All Around City',
          profileName: 'Archit Patil',
          // tslint:disable-next-line:max-line-length
          profileImage: 'https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/cp0/c120.120.720.720a/s74x74/21230996_1667709066594025_116809688593393743_n.jpg?_nc_cat=108&_nc_sid=dbb9e7&_nc_ohc=3Xm1H6jeyp8AX8rfweP&_nc_ht=scontent-fml2-1.xx&oh=421be8035b4e9eff4fae28baca9b7a7c&oe=5EFF416B',
          registeredAt: '2020/06/05 10:22:30',
        },
        {
          id: 4,
          site: 'twitter',
          page: 'Campaigntocash',
          profileName: 'Campaigntocash',
          // tslint:disable-next-line:max-line-length
          profileImage: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
          registeredAt: '2020/06/05 10:22:30',
        },
      ]);
    }

    function getSocialChatMessages(userId: any) {
      let message = [];
      switch (Number(userId)) {
        case 1:
          message = [
            {
              message: 'hello',
              userName: 'Brad Frost',
              // tslint:disable-next-line:max-line-length
              profileImage: 'https://nemsmbr.org/wp-content/uploads/2019/11/no-image-icon-md-1.png',
              message_time: '2020/6/5 10:30pm',
              mine: 0,
            },
            {
              message: 'Hi! Please let us know how we can help you!',
              userName: 'Campaigntocash',
              // tslint:disable-next-line:max-line-length
              profileImage: 'https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/cp0/p74x74/62447688_104904750778894_564438730820026368_o.jpg?_nc_cat=105&_nc_sid=dbb9e7&_nc_ohc=4m8n4PUUfKMAX8AJrvA&_nc_ht=scontent-fml2-1.xx&oh=a91a37056fa377bb9a23fdd10cf0d511&oe=5F015684',
              message_time: '2020/6/5 10:31pm',
              mine: 1,
            },

            {
              message: 'Can I learn more about your business?',
              userName: 'Brad Frost',
              // tslint:disable-next-line:max-line-length
              profileImage: 'https://nemsmbr.org/wp-content/uploads/2019/11/no-image-icon-md-1.png',
              message_time: '2020/6/5 10:32pm',
              mine: 0,
            },

          ];
          break;
        case 2:
          message = [
            {
              message: 'How are you?',
              userName: 'German Solis',
              // tslint:disable-next-line:max-line-length
              profileImage: 'https://nemsmbr.org/wp-content/uploads/2019/11/no-image-icon-md-1.png',
              message_time: '2020/6/6 10:30am',
              mine: 0,
            },
            {
              message: 'Hi! Please let us know how we can help you!',
              userName: 'Campaigntocash',
              // tslint:disable-next-line:max-line-length
              profileImage: 'https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/cp0/p74x74/62447688_104904750778894_564438730820026368_o.jpg?_nc_cat=105&_nc_sid=dbb9e7&_nc_ohc=4m8n4PUUfKMAX8AJrvA&_nc_ht=scontent-fml2-1.xx&oh=a91a37056fa377bb9a23fdd10cf0d511&oe=5F015684',
              message_time: '2020/6/6 10:30am',
              mine: 1,
            },

            {
              message: 'German Solis replied to an ad.',
              userName: 'German Solis',
              // tslint:disable-next-line:max-line-length
              profileImage: 'https://nemsmbr.org/wp-content/uploads/2019/11/no-image-icon-md-1.png',
              message_time: '2020/6/6 10:30am',
              mine: 0,
            },
          ];
          break;


      }
      return ok(message);
    }

    function getCollaborateTeams() {
      return ok(teams);
    }

    function getCollaborateCampaigns() {
      return ok(campaigns);
    }

    function getCampaignTasks(campaignId) {
      return ok(campaignTasks.filter(task => task.campaigns === campaignId));
    }

    function getCampaignSubTasks(taskId) {
      return ok(campaignSubtasks.filter(subtask => subtask.taskId === taskId));
    }

    function getRecentActivities() {
      const activities = [];
      const { date, campaignId } = body;
      if (lastActivityTime === '') {
        lastActivityTime = moment(date).format('YYYY-MM-DD HH:mm:ss');
      }
      let RecordsPerRequest = 20;
      let userId = 0;
      let newCampainId = 0;
      let campaign;
      let user;
      while (RecordsPerRequest > 0) {
        lastActivityTime = moment(lastActivityTime).subtract(1, 'm').format('YYYY-MM-DD HH:mm:ss');
        userId = Math.ceil(Math.random() * 14);
        user = users.find(x => x.id === userId);
        newCampainId = campaignId > 0 ? campaignId : Math.ceil(Math.random() * 6);
        campaign = campaigns.find(x => x.id === newCampainId);
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
      const collaboarUsers = users.map((x, index) => ({
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
