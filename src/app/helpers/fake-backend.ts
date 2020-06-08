import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '../_models/user';

const users: User[] = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

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
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};