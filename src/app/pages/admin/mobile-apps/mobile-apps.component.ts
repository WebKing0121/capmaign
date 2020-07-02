import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '@app-core/services/user.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mobile-apps',
  templateUrl: './mobile-apps.component.html',
  styleUrls: ['./mobile-apps.component.scss']
})
export class MobileAppsComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();
  apps: any[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getMobileApps()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.apps = data.result;

          } else {
            this.apps = [];

          }

        },
        error => {
          console.log('error', error.response);
        }
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
