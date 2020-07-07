import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ToastService } from './toast.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() uID: string;
  @Input() toastTitle: string;
  @Input() toastCaption: string;
  @Input() toastClass: string;

  public isShow: boolean;
  private unsubscribe$ = new Subject();

  constructor(public toastEvent: ToastService) {
    this.isShow = false;
  }

  ngOnInit() {
    this.toastEvent.toggleToast.pipe(takeUntil(this.unsubscribe$)).subscribe((toast) => {
      console.log(toast.id);
      document.querySelector('#' + toast.id).classList.add('show');
      setTimeout(() => {
        document.querySelector('#' + toast.id).classList.remove('show');
      }, toast.delay ? toast.delay : 500);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  closeToast(uid) {
    document.querySelector('#' + uid).classList.remove('show');
  }

}
