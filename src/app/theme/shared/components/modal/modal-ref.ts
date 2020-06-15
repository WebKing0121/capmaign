import { InjectionToken } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export class ModalConfig {
  width?: number | string;
  height?: number | string;
  modalClass?: string;
  data?: any;
}

export interface ModalExitEvent<R> {
  type: 'backdropClick' | 'close' | 'cancel';
  data?: R;
}

export const MODAL_DATA = new InjectionToken<any>('ModalData');


export class ModalRef<T = any, R = any> {
  componentInstance: T;

  private readonly afterClosedSubject = new Subject<ModalExitEvent<R>>();
  private exit: 'backdropClick' | 'close' | 'cancel';
  private result: R | undefined;

  constructor(
    private overlayRef: OverlayRef
  ) {

    overlayRef.detachments().subscribe(() => {
      this.afterClosedSubject.next({
        type: this.exit,
        data: this.result
      });
      this.afterClosedSubject.complete();
      this.componentInstance = null;
      this.overlayRef.dispose();
    });
  }

  backdropClicked() {
    this.exit = 'backdropClick';

    this.overlayRef.detachBackdrop();
    this.overlayRef.detach();
  }

  closeWithResult(result?: R) {
    this.exit = 'close';
    this.result = result;

    this.overlayRef.detachBackdrop();
    this.overlayRef.detach();
  }

  cancel() {
    this.exit = 'cancel';

    this.overlayRef.detachBackdrop();
    this.overlayRef.detach();
  }

  afterClosed(): Observable<ModalExitEvent<R>> {
    return this.afterClosedSubject.asObservable();
  }

  afterClosedWithSuccess(): Observable<R | undefined> {
    return this.afterClosedSubject.asObservable().pipe(
      filter(e => e.type === 'close'),
      map(e => e.data)
    );
  }
}
