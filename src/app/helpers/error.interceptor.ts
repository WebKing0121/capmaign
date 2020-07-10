import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@app-services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {

      if (err.status === 401) {
        // auto logout if 401 response returned from api
        // this.authenticationService.logout();
        // location.reload(true);
        const routerStateKey = '_routerState';
        this.router.navigate(['/auth/lock-screen'], { queryParams: { returnUrl: this.route.snapshot[routerStateKey].url } });
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
