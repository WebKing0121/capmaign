import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { IAlbum, IEvent, Lightbox, LIGHTBOX_EVENT, LightboxConfig, LightboxEvent } from 'ngx-lightbox';
import { Subscription } from 'rxjs';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {
  @Input() albums: Array<IAlbum>;

  private unsubscribe$ = new Subject();

  private subscription: Subscription;
  constructor(
    private lightbox: Lightbox,
    private lightboxEvent: LightboxEvent,
    private lighboxConfig: LightboxConfig
  ) {
    this.albums = this.albums ? this.albums : [];
    lighboxConfig.fadeDuration = 1;
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  open(index: number): void {
    this.subscription = this.lightboxEvent.lightboxEvent$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((event: IEvent) => this._onReceivedEvent(event));
    this.lightbox.open(this.albums, index, { wrapAround: true, showImageNumberLabel: true });
  }

  private _onReceivedEvent(event: IEvent): void {
    if (event.id === LIGHTBOX_EVENT.CLOSE) {
      this.subscription.unsubscribe();
    }
  }

}
