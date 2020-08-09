import { Component, OnInit, Input, ViewChild, OnDestroy, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { ContentService } from '@app-core/services/content.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-page-template-demo-modal',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingPageTemplateDemoModalComponent implements OnInit, OnDestroy {
  @Input() templateId = 0;
  @ViewChild('demoModal', { static: false }) demoModal;
  ModalType = ModalType;

  private unsubscribe$ = new Subject();

  fullScreen: boolean;
  dialogClass: string;

  loading = false;
  landingPageFromDB: any;

  template = '';
  landingPageType = 0;
  urlSafe;

  constructor(
    private sanitizer: DomSanitizer,
    private contentService: ContentService
  ) {
    this.fullScreen = true;
    this.dialogClass = 'modal-dialog-centered ' + (this.fullScreen ? 'modal-fullscreen' : 'modal-xl');
  }

  ngOnInit(): void { }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  show() {

    this.loading = true;
    this.contentService.getLandingPageTemplate(this.templateId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.loading = false;
          if (data.success && data.result) {
            this.landingPageFromDB = data.result;
            this.landingPageType = this.landingPageFromDB.templateType;
            if (this.landingPageFromDB.templateType === 1) {
              this.template = this.landingPageFromDB.template
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
            } else {
              this.template = `${this.landingPageFromDB.templateURL}/index.html`;
              this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.template);
            }
          }

          setTimeout(() => this.demoModal.show());
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );

  }

  hide() {
    this.demoModal.hide();
  }

  revertFullScreen() {
    this.fullScreen = !this.fullScreen;
    this.dialogClass = 'modal-dialog-centered ' + (this.fullScreen ? 'modal-fullscreen' : 'modal-xl');
  }
}
