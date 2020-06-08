import {Component, OnInit} from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../../../_services/authentication.service';
import { User } from '../../../../../_models/user';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() { }

  logout() {
    console.log("----dddd");
    this.authenticationService.logout();
    this.router.navigate(['/auth/signin']);
  }

}
