import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { AuthenticationService } from '@app-core/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.scss']
})
export class LockScreenComponent implements OnInit, OnDestroy {
  secondIndicator: boolean;
  hh: string;
  mm: string;
  date: string;
  currentUser: any;
  error: string;
  returnUrl: string;

  submitted: boolean;
  private unsubscribe$ = new Subject();

  isRequiredTimer: boolean;
  form: FormGroup;

  bgImgs = [
    '/assets/images/background/01.jpg',
    '/assets/images/background/02.jpg'
  ];

  currentBgIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    const now = moment();
    this.hh = now.format('hh');
    this.mm = now.format('mm');
    this.date = now.format('ddd MMM Do');
    this.submitted = false;
    this.isRequiredTimer = true;
  }

  ngOnInit(): void {
    const key = 'returnUrl';
    this.returnUrl = this.route.snapshot.queryParams[key] || '/';

    this.form = this.fb.group({
      password: ['', Validators.required]
    });

    this.currentUser = this.authenticationService.currentUserValue;
    const isLoggedIn = this.currentUser && this.currentUser.token;

    if (isLoggedIn) {
      setTimeout(() => this.getTimeValue(), 500);
    } else {
      this.router.navigate(['/signin']);
    }
  }

  getTimeValue() {
    this.secondIndicator = !this.secondIndicator;
    if (this.isRequiredTimer) {
      setTimeout(() => this.getTimeValue(), 500);
    }
  }

  ngOnDestroy(): void {
    this.isRequiredTimer = false;
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onUnlockScreen() {
    this.submitted = true;
    this.authenticationService.login(this.currentUser.tenancyName, this.currentUser.userName, this.f.password.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.submitted = false;
          if (data.success) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.error = data.message;
          }
        },
        error => {
          this.submitted = false;
          this.error = error;
        });
  }
}
