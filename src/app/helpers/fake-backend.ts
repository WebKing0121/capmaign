import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import * as moment from 'moment';

import { User } from '../_models/user';

const users: User[] = [
    { id: 1, username: 'test', password: 'test', firstName: 'Robert', lastName: 'Robertson' },
    { id: 2, username: 'greyson', password: 'test', firstName: 'Greyson', lastName: 'Wellington' },
    { id: 3, username: 'zander', password: 'test', firstName: 'Zander', lastName: 'Johnston' },
    { id: 4, username: 'ayden', password: 'test', firstName: 'Ayden', lastName: 'Bailey' },
    { id: 5, username: 'jax', password: 'test', firstName: 'Jax', lastName: 'Brook' },
    { id: 6, username: 'jordan', password: 'test', firstName: 'Jordan', lastName: 'Macdonald' },
    { id: 7, username: 'malcolm', password: 'test', firstName: 'Malcolm', lastName: 'Watson' },
    { id: 8, username: 'thomas', password: 'test', firstName: 'Thomas', lastName: 'Sim' },
    { id: 9, username: 'zayn', password: 'test', firstName: 'Zayn', lastName: 'Davies' },
    { id: 10, username: 'jack', password: 'test', firstName: 'Jack', lastName: 'Carlson' },
    { id: 11, username: 'barrett', password: 'test', firstName: 'Barrett', lastName: 'Gale' },
    { id: 12, username: 'francis', password: 'test', firstName: 'Francis', lastName: 'Burt' },
    { id: 13, username: 'bentley', password: 'test', firstName: 'Bentley', lastName: 'Withers' },
    { id: 14, username: 'kayden', password: 'test', firstName: 'Kayden', lastName: 'Carlson' },
];

const campaigns: any[] = [
    {id: 1, name: "Invest Now - Demo1", start_date: "May 3, 2019 2:00:00 AM", end_date: "Sep 14, 2019 2:00:00 AM", percent: 0.0, type: 'Email', status: 'inprogress', team_id: 1 },
    {id: 2, name: "New feature - Demo1", start_date: "Jun 16, 2019 2:00:00 AM", end_date: "Aug 23, 2019 2:00:00 AM", percent: 4.0, type: 'Email', status: 'inprogress', team_id: 2 },
    {id: 3, name: "Webinar Event for Demo", start_date: "Mar 15, 2019 1:00:00 AM", end_date: "Jul 27, 2019 2:00:00 AM", percent: 11.0, type: 'Email', status: 'inprogress', team_id: 3 },
    {id: 4, name: "Campaign Explore new products", start_date: "Jun 19, 2019 2:00:00 AM", end_date: "Jun 20, 2019 2:00:00 AM", percent: 61.0, type: 'Email', status: 'inprogress', team_id: 3 },
    {id: 5, name: "Automation Email", start_date: "May 7, 2019 2:00:00 AM", end_date: "Jul 18, 2019 2:00:00 AM", percent: 23.0, type: 'Email', status: 'inprogress', team_id: 3 },
    {id: 6, name: "Raw office-sticky notes promo", start_date: "May 7, 2019 2:00:00 AM", end_date: "May 7, 2019 2:00:00 AM", percent: 66.0, type: 'Email', status: 'inprogress', team_id: 0 },
];

const campaign_tasks: any[] = [
    {
        id:1, campaign_id: 1, name: "Task - 1", user_id: 1, percent: 0,
        desc: "Task - 1 Description", start_date:"May 3, 2019 2:00:00 AM",  end_date: "Sep 14, 2019 2:00:00 AM", esti_hours: 40,
    },
    {
        id:2, campaign_id: 1, name: "Task - 2", user_id: 2, percent: 0,
        desc: "Task - 2 Description", start_date:"May 3, 2019 2:00:00 AM",  end_date: "Sep 14, 2019 2:00:00 AM", esti_hours: 60,
    },

    {
        id:3, campaign_id: 2, name: "Task - 3 ", user_id: 3, percent: 8,
        desc: "Task - 3 Description", start_date:"Jun 16, 2019 2:00:00 AM",  end_date: "Aug 23, 2019 2:00:00 AM", esti_hours: 85,
    },
    {
        id:4, campaign_id: 2, name: "Task - 4 ", user_id: 4, percent: 3,
        desc: "Task - 4 Description", start_date:"Jun 16, 2019 2:00:00 AM",  end_date: "Aug 23, 2019 2:00:00 AM", esti_hours: 60,
    },
    {
        id:5, campaign_id: 2, name: "Task - 5 ", user_id: 5, percent: 1,
        desc: "Task - 5 Description", start_date:"Jun 16, 2019 2:00:00 AM",  end_date: "Aug 23, 2019 2:00:00 AM", esti_hours: 120,
    },

    {
        id:6, campaign_id: 3, name: "Task - 6", user_id: 6, percent: 13,
        desc: "Task - 6 Description", start_date:"Mar 15, 2019 1:00:00 AM",  end_date: "Jul 27, 2019 2:00:00 AM", esti_hours: 147,
    },
    {
        id:7, campaign_id: 3, name: "Task - 7", user_id: 7, percent: 9,
        desc: "Task - 7 Description", start_date:"Mar 15, 2019 1:00:00 AM",  end_date: "Jul 27, 2019 2:00:00 AM", esti_hours: 180,
    },
    {
        id:8, campaign_id: 4, name: "Task - 8", user_id: 8, percent: 70,
        desc: "Task - 8 Description", start_date:"Jun 19, 2019 2:00:00 AM",  end_date: "Jun 20, 2019 2:00:00 AM", esti_hours: 115,
    },
    {
        id:9, campaign_id: 4, name: "Task - 9", user_id: 9, percent: 60,
        desc: "Task - 9 Description", start_date:"Jun 19, 2019 2:00:00 AM",  end_date: "Jun 20, 2019 2:00:00 AM", esti_hours: 35,
    },
    {
        id:10, campaign_id: 4, name: "Task - 10", user_id: 7, percent: 25,
        desc: "Task - 10 Description", start_date:"Jun 19, 2019 2:00:00 AM",  end_date: "Jun 20, 2019 2:00:00 AM", esti_hours: 170,
    },
    {
        id:11, campaign_id: 5, name: "Task - 11", user_id: 8, percent: 21,
        desc: "Task - 11 Description", start_date:"May 3, 2019 2:00:00 AM",  end_date: "Sep 14, 2019 2:00:00 AM", esti_hours: 90,
    },
];
const campaign_subtasks: any[] = [
    {
        id:1, task_id: 1, name: "Sub Task - 1", user_id: 1, percent: 0,
        desc: "Sub Task - 1 Description", start_date:"May 3, 2019 2:00:00 AM",  end_date: "Sep 14, 2019 2:00:00 AM", esti_hours: 40,
    },
    {
        id:2, task_id: 1, name: "Sub Task - 2", user_id: 2, percent: 0,
        desc: "Sub Task - 2 Description", start_date:"May 3, 2019 2:00:00 AM",  end_date: "Sep 14, 2019 2:00:00 AM", esti_hours: 60,
    },

    {
        id:3, task_id: 3, name: "Sub Task - 3 ", user_id: 3, percent: 8,
        desc: "Sub Task - 3 Description", start_date:"Jun 16, 2019 2:00:00 AM",  end_date: "Aug 23, 2019 2:00:00 AM", esti_hours: 85,
    },
    {
        id:4, task_id: 3, name: "Sub Task - 4 ", user_id: 4, percent: 3,
        desc: "Sub Task - 4 Description", start_date:"Jun 16, 2019 2:00:00 AM",  end_date: "Aug 23, 2019 2:00:00 AM", esti_hours: 60,
    },
    {
        id:5, task_id: 3, name: "Sub Task - 5 ", user_id: 5, percent: 1,
        desc: "Sub Task - 5 Description", start_date:"Jun 16, 2019 2:00:00 AM",  end_date: "Aug 23, 2019 2:00:00 AM", esti_hours: 120,
    },

    {
        id:6, task_id: 4, name: "Sub Task - 6", user_id: 6, percent: 13,
        desc: "Sub Task - 6 Description", start_date:"Mar 15, 2019 1:00:00 AM",  end_date: "Jul 27, 2019 2:00:00 AM", esti_hours: 147,
    },
    {
        id:7, task_id: 7, name: "Sub Task - 7", user_id: 7, percent: 9,
        desc: "Sub Task - 7 Description", start_date:"Mar 15, 2019 1:00:00 AM",  end_date: "Jul 27, 2019 2:00:00 AM", esti_hours: 180,
    },
    {
        id:8, task_id: 7, name: "Sub Task - 8", user_id: 8, percent: 70,
        desc: "Sub Task - 8 Description", start_date:"Jun 19, 2019 2:00:00 AM",  end_date: "Jun 20, 2019 2:00:00 AM", esti_hours: 115,
    },
    {
        id:9, task_id: 8, name: "Sub Task - 9", user_id: 9, percent: 60,
        desc: "Sub Task - 9 Description", start_date:"Jun 19, 2019 2:00:00 AM",  end_date: "Jun 20, 2019 2:00:00 AM", esti_hours: 35,
    },
    {
        id:10, task_id: 9, name: "Sub Task - 10", user_id: 7, percent: 25,
        desc: "Sub Task - 10 Description", start_date:"Jun 19, 2019 2:00:00 AM",  end_date: "Jun 20, 2019 2:00:00 AM", esti_hours: 170,
    },
    {
        id:11, task_id: 9, name: "Sub Task - 11", user_id: 8, percent: 21,
        desc: "Sub Task - 11 Description", start_date:"May 3, 2019 2:00:00 AM",  end_date: "Sep 14, 2019 2:00:00 AM", esti_hours: 90,
    },
];


const teams: any[] = [
    {
        id: 1, name: "C2C Team", created_at: 'Jan 29, 2019 5:06:44',
        members: [1, 2], assigned_campaigns: [1]
    },
    {
        id: 2, name: "My Team", created_at: 'Feb 3, 2019 12:17:41',
        members: [3, 4, 5], assigned_campaigns: [2]
    },
    {
        id: 3, name: "Digial Marketing Team", created_at: 'Feb 12, 2019 16:22:15',
        members: [6, 7, 8, 9], assigned_campaigns: [3, 4, 5]
    },
    {
        id: 4, name: "Test Team", created_at: 'Feb 3, 2019 12:17:41',
        members: [10, 11], assigned_campaigns: []
    }
];

let last_activity_time = '';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
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
                    switch( true ) {
                        case subURL.endsWith('/tasks'):
                            campaignId = subURL.split('/tasks')[0];
                            return getCampaignTasks(Number(campaignId));
                    }
                    return ok([]);
                case url.includes('/collaborate/task/') && method === 'GET':
                    subURL = url.split('/collaborate/task/')[1];
                    switch( true ) {
                        case subURL.endsWith('/sub-tasks'):
                            let taskId = '';
                            taskId = subURL.split('/sub-tasks')[0];
                            return getCampaignSubTasks(Number(taskId));
                    }
                    return ok([]);
                case url.endsWith('/activity') && method === 'POST':
                    return getRecentActivities();

                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            })
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
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
                  social: "facebook",
                  label: "FaceBook",
                  img: 'assets/images/social-icons/facebook-selected.png',
                  userId: 296,
                  type: 'profile',
                  connected: true,
                  uniqueUserId: 10220279568677599,
                  userProfileName: 'Samir Safu',
                  profileImg: 'https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/cp0/p74x74/62447688_104904750778894_564438730820026368_o.jpg?_nc_cat=105&_nc_sid=dbb9e7&_nc_ohc=4m8n4PUUfKMAX8AJrvA&_nc_ht=scontent-fml2-1.xx&oh=a91a37056fa377bb9a23fdd10cf0d511&oe=5F015684',
                  posts: [
            
                  ],
                },
                {
                  id: 2,
                  social: "facebook",
                  label: "FaceBook",
                  type: 'profile',
                  connected: false,
                  img: 'assets/images/social-icons/facebook-selected.png',
                  userId: 280,
                  uniqueUserId: 108276963665638,
                  userProfileName: 'Archit Patil',
                  profileImg: 'https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/cp0/c120.120.720.720a/s74x74/21230996_1667709066594025_116809688593393743_n.jpg?_nc_cat=108&_nc_sid=dbb9e7&_nc_ohc=3Xm1H6jeyp8AX8rfweP&_nc_ht=scontent-fml2-1.xx&oh=421be8035b4e9eff4fae28baca9b7a7c&oe=5EFF416B'
                },
                {
                  id: 3,
                  social: "linkedin",
                  label: "LinkedIn",
                  type: 'page',
                  connected: false,
                  img: 'assets/images/social-icons/linkedin-selected.png',
                  pageId: 17983826,
                  pageName: 'campaigntocash.com-inc',
                  profileImg: 'https://media-exp1.licdn.com/dms/image/C560BAQEZxrL7ZxS4kA/company-logo_200_200/0?e=1599696000&v=beta&t=22F3QKDyUpe2HzM-SQhVj1JnMmg98AtgJne-5awAQ9w'
                },
                {
                  id: 4,
                  social: "facebook",
                  label: "FaceBook",
                  type: 'page',
                  connected: false,
                  img: 'assets/images/social-icons/facebook-selected.png',
                  pageId: 144534772822248,
                  pageName: 'Campaigntocash',
                  profileImg: 'https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/72630715_398306764111713_7982094538049060864_n.png?_nc_cat=102&_nc_sid=dbb9e7&_nc_ohc=5aW0jISrgS4AX89DNga&_nc_ht=scontent-fml2-1.xx&oh=6bd493d1df69a761fbe7c6e10b6d95cf&oe=5EFF78E9'
                },
                {
                  id: 5,
                  social: "facebook",
                  label: "FaceBook",
                  type: 'page',
                  connected: false,
                  img: 'assets/images/social-icons/facebook-selected.png',
                  pageId: 2225449960849243,
                  pageName: 'About School',
                  profileImg: 'https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/p200x200/74860127_114076336706779_1417539520659718144_n.jpg?_nc_cat=109&_nc_sid=dbb9e7&_nc_ohc=134zm6XVvJcAX9-iX6Y&_nc_ht=scontent-fml2-1.xx&_nc_tp=6&oh=e00f0a478af954d12b61d031843af4a0&oe=5F00D332'
                },
                {
                  id: 6,
                  social: "linkedin",
                  label: "LinkedIn",
                  type: 'profile',
                  connected: false,
                  img: 'assets/images/social-icons/linkedin-selected.png',
                  userId: 294,
                  uniqueUserId: '6rfvCx_ZDb',
                  userProfileName: 'Manoj',
                  profileImg: 'https://media-exp1.licdn.com/dms/image/C4E03AQESBn4kuePbMQ/profile-displayphoto-shrink_200_200/0?e=1596672000&v=beta&t=pRqrgoLVkFnthOEdwZF5J4m2vs5rSyKmQUt__TzGHt8'
                },
                {
                  id: 7,
                  social: "twitter",
                  label: "Twitter",
                  type: 'profile',
                  connected: false,
                  img: 'assets/images/social-icons/twitter-selected.png',
                  userId: 292,
                  uniqueUserId: 1149900189882339328,
                  userProfileName: 'Campaigntocash',
                  profileImg: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'
                },
            ]);
        }

        function getSocialSites() {
            return ok([
                {
                    id: "facebook",
                    label: "Facebook",
                    selectedImg: 'assets/images/social-icons/facebook-selected.png',
                    normalImg: 'assets/images/social-icons/facebook-normal.png',
                    img: 'assets/images/social-icons/facebook.png',
                    buttons: [
                        {label: 'Connect Profile', icon: 'icon-user', type: 'profile' },
                        {label: 'Connect Page', icon: 'icon-user', type: 'page' },
                        {label: 'Connect Group', icon: 'icon-user', type: 'group' },
                    ]
                },
                {
                    id: "linkedin",
                    label: "LinkedIn",
                    selectedImg: 'assets/images/social-icons/linkedin-selected.png',
                    normalImg: 'assets/images/social-icons/linkedin-normal.png',
                    img: 'assets/images/social-icons/linkedin.png',
                    buttons: [
                        {label: 'Connect Profile', icon: 'icon-user', type: 'profile' },
                        {label: 'Connect Page', icon: 'icon-user', type: 'page' }
                    ]
                },
                {
                    id: "twitter",
                    label: "Twitter",
                    selectedImg: 'assets/images/social-icons/twitter-selected.png',
                    normalImg: 'assets/images/social-icons/twitter-normal.png',
                    img: 'assets/images/social-icons/twitter.png',
                    buttons: [
                        {label: 'Connect Profile', icon: 'icon-user', type: 'profile' }
                    ]
                },
            ]);
        }

        function getSocialChatUsers() {
            return ok([
                {
                    id: 1,
                    site: "facebook",
                    page: "Campaigntocash",
                    profileName: "Samir Sahu",
                    profileImage: "https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/cp0/p74x74/62447688_104904750778894_564438730820026368_o.jpg?_nc_cat=105&_nc_sid=dbb9e7&_nc_ohc=4m8n4PUUfKMAX8AJrvA&_nc_ht=scontent-fml2-1.xx&oh=a91a37056fa377bb9a23fdd10cf0d511&oe=5F015684",
                    registeredAt: '2020/06/05 10:22:30',
                },
                {
                    id: 2,
                    site: "facebook",
                    page: "About School",
                    profileName: "Archit Patil",
                    profileImage: "https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/cp0/c120.120.720.720a/s74x74/21230996_1667709066594025_116809688593393743_n.jpg?_nc_cat=108&_nc_sid=dbb9e7&_nc_ohc=3Xm1H6jeyp8AX8rfweP&_nc_ht=scontent-fml2-1.xx&oh=421be8035b4e9eff4fae28baca9b7a7c&oe=5EFF416B",
                    registeredAt: '2020/04/13 10:22:30',
                },
                {
                    id: 3,
                    site: "facebook",
                    page: "All Around City",
                    profileName: "Archit Patil",
                    profileImage: "https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/cp0/c120.120.720.720a/s74x74/21230996_1667709066594025_116809688593393743_n.jpg?_nc_cat=108&_nc_sid=dbb9e7&_nc_ohc=3Xm1H6jeyp8AX8rfweP&_nc_ht=scontent-fml2-1.xx&oh=421be8035b4e9eff4fae28baca9b7a7c&oe=5EFF416B",
                    registeredAt: '2020/06/05 10:22:30',
                },
                {
                    id: 4,
                    site: "twitter",
                    page: "Campaigntocash",
                    profileName: "Campaigntocash",
                    profileImage: "http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
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
                            message: "hello",
                            userName: "Brad Frost",
                            profileImage: "https://nemsmbr.org/wp-content/uploads/2019/11/no-image-icon-md-1.png",
                            message_time: "2020/6/5 10:30pm",
                            mine: 0,
                        },
                        {
                            message: "Hi! Please let us know how we can help you!",
                            userName: "Campaigntocash",
                            profileImage: "https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/cp0/p74x74/62447688_104904750778894_564438730820026368_o.jpg?_nc_cat=105&_nc_sid=dbb9e7&_nc_ohc=4m8n4PUUfKMAX8AJrvA&_nc_ht=scontent-fml2-1.xx&oh=a91a37056fa377bb9a23fdd10cf0d511&oe=5F015684",
                            message_time: "2020/6/5 10:31pm",
                            mine: 1,
                        },

                        {
                            message: "Can I learn more about your business?",
                            userName: "Brad Frost",
                            profileImage: "https://nemsmbr.org/wp-content/uploads/2019/11/no-image-icon-md-1.png",
                            message_time: "2020/6/5 10:32pm",
                            mine: 0,
                        },

                    ];
                    break;
                case 2:
                    message = [
                        {
                            message: "How are you?",
                            userName: "German Solis",
                            profileImage: "https://nemsmbr.org/wp-content/uploads/2019/11/no-image-icon-md-1.png",
                            message_time: "2020/6/6 10:30am",
                            mine: 0,
                        },
                        {
                            message: "Hi! Please let us know how we can help you!",
                            userName: "Campaigntocash",
                            profileImage: "https://scontent-fml2-1.xx.fbcdn.net/v/t1.0-1/cp0/p74x74/62447688_104904750778894_564438730820026368_o.jpg?_nc_cat=105&_nc_sid=dbb9e7&_nc_ohc=4m8n4PUUfKMAX8AJrvA&_nc_ht=scontent-fml2-1.xx&oh=a91a37056fa377bb9a23fdd10cf0d511&oe=5F015684",
                            message_time: "2020/6/6 10:30am",
                            mine: 1,
                        },

                        {
                            message: "German Solis replied to an ad.",
                            userName: "German Solis",
                            profileImage: "https://nemsmbr.org/wp-content/uploads/2019/11/no-image-icon-md-1.png",
                            message_time: "2020/6/6 10:30am",
                            mine: 0,
                        },
                    ];
                    break;
                             

            }
            return ok(message);
        }

        function getCollaborateTeams() {
            return ok(teams)
        }

        function getCollaborateCampaigns() {
            return ok(campaigns)
        }

        function getCampaignTasks(campaignId) {
            return ok(campaign_tasks.filter(task => task.campaign_id === campaignId));
        }

        function getCampaignSubTasks(taskId) {
            return ok(campaign_subtasks.filter(subtask =>  subtask.task_id === taskId));
        }

        function getRecentActivities() {
            const activities = [];
            const { date, campaignId } = body;
            if (last_activity_time === '') {
                last_activity_time = moment(date).format('YYYY-MM-DD HH:mm:ss');
            }
            let activity_records = 20;
            let user_id = 0;
            let campaign_id = 0;
            let campaign;
            let user;
            while (activity_records > 0) {
                last_activity_time = moment(last_activity_time).subtract(1, 'm').format('YYYY-MM-DD HH:mm:ss');
                user_id = Math.ceil(Math.random() * 14);
                user = users.find(x => x.id === user_id);
                campaign_id = campaignId > 0 ? campaignId: Math.ceil(Math.random() * 6);
                campaign = campaigns.find(x => x.id === campaign_id);
                activities.push({
                    time: last_activity_time,
                    user: user.firstName + ' ' + user.lastName,
                    module_id: 1,
                    campaign: campaign.name,
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                });
                activity_records --;
            }
            return ok(activities);
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};