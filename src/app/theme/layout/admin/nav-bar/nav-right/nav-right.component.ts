import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { AuthenticationService } from '@app-services/authentication.service';
import { User } from '@app-models/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => this.currentUser = x);
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/auth/signin']);
  }

}
