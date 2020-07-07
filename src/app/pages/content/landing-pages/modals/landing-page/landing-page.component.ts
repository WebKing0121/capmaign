import { Component, OnInit, Input, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LandingPage } from '@app-models/landing-page';
import { NgSelectData } from '@app-models/common';
import { ContentService } from '@app-core/services/content.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-content-landing-page-modal',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingPageModalComponent implements OnInit, OnDestroy {
  @Input() modalType = ModalType.New;
  @Input() landingPage: LandingPage;
  @ViewChild('landingPageModal', { static: false }) landingPageModal;
  ModalType = ModalType;

  private unsubscribe$ = new Subject();

  fullScreen: boolean;
  dialogClass: string;

  categories: NgSelectData[];
  statuses: NgSelectData[];

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private contentService: ContentService
  ) {
    this.fullScreen = false;
    this.dialogClass = 'modal-dialog-centered ' + (this.fullScreen ? 'modal-fullscreen' : 'modal-xl');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      extName: ['', Validators.required],
      description: '',
      category: '',
      status: ['', Validators.required],
      content: '',
    });

    this.statuses = [
      { value: 'Draft', label: 'Draft' },
      { value: 'Published', label: 'Published' },
    ];

    this.contentService.getCategories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.categories = data.result.map(x => ({ value: `${x.categoryId}`, label: x.category }));
          } else {
            this.categories = [];
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

  show() {
    if (this.modalType === ModalType.New) {
      this.form.setValue({
        id: 0,
        name: '',
        extName: '',
        description: '',
        category: '',
        status: '',
        content: '',
      });
    } else {

      const { id, pageNames, externalPageDisplayName, pageDescription, pageStatus, externalURL } = this.landingPage;
      this.form.setValue({
        id,
        name: pageNames,
        extName: externalPageDisplayName,
        description: pageDescription,
        category: '',
        status: pageStatus,
        content: '',
      });
    }
    setTimeout(() => this.landingPageModal.show());
  }

  hide() {
    this.landingPageModal.hide();
  }

  revertFullScreen() {
    this.fullScreen = !this.fullScreen;
    this.dialogClass = 'modal-dialog-centered ' + (this.fullScreen ? 'modal-fullscreen' : 'modal-xl');
  }
}
