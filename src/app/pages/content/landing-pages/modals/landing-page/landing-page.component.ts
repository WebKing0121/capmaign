import { Component, OnInit, Input, ViewChild, OnDestroy, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
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
  @Input() categories: NgSelectData[];
  @ViewChild('landingPageModal', { static: false }) landingPageModal;
  @ViewChild('emailCampaignEditor', { static: false }) emailCampaignEditor;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  ModalType = ModalType;

  private unsubscribe$ = new Subject();

  fullScreen: boolean;
  dialogClass: string;
  landingPageOfDB: any;
  statuses: NgSelectData[];
  externalURL = '';
  form: FormGroup;
  loading = false;
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
      setTimeout(() => this.landingPageModal.show());
    } else {
      this.contentService.getLandingPage({ id: this.landingPage.id })
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            this.landingPageOfDB = data.result;
            const { id, pageNames, externalPageDisplayName, pageDescription, pageStatus, externalURL, pageContent, folderId } = this.landingPageOfDB;
            this.form.setValue({
              id,
              name: pageNames,
              extName: externalPageDisplayName,
              description: pageDescription,
              category: `${folderId}`,
              status: pageStatus,
              content: pageContent,
            });
            this.externalURL = externalURL;
            setTimeout(() => this.landingPageModal.show());
          },
          error => {
            this.loading = false;
            console.log('error', error.response);
          }
        );

    }

  }

  hide() {
    this.landingPageModal.hide();
  }

  revertFullScreen() {
    this.fullScreen = !this.fullScreen;
    this.dialogClass = 'modal-dialog-centered ' + (this.fullScreen ? 'modal-fullscreen' : 'modal-xl');
  }

  onSave() {
    if (this.form.invalid) {
      return;
    }

    const {
      id,
      name,
      extName,
      description,
      category,
      status,
    } = this.form.value;

    if (this.modalType === ModalType.New) {
      const createParam = {
        externalPageDisplayName: extName,
        externalURL: '',
        folderId: category ? Number(category) : 1,
        pageContent: this.emailCampaignEditor.getValue(),
        pageDescription: description,
        pageNames: name,
        pageStatus: status,
        personalization: '',
      };
      this.loading = true;
      this.contentService.createLandingPage(createParam)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            this.saveNewFile();
          },
          error => {
            this.loading = false;
            console.log('error', error.response);
          }
        );

    } else {
      const updateParam = {
        ...this.landingPageOfDB,
        externalPageDisplayName: extName,
        folderId: category ? Number(category) : 1,
        pageContent: this.emailCampaignEditor.getValue(),
        pageDescription: description,
        pageNames: name,
        pageStatus: status,
      };
      this.loading = true;
      this.contentService.updateLandingPage(updateParam)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            this.saveNewFile();
          },
          error => {
            this.loading = false;
            console.log('error', error.response);
          }
        );

    }
  }

  saveNewFile() {
    this.loading = true;
    const params = {
      fileName: `${this.form.value.extName}.html`
    }
    this.contentService.saveNewFile(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.save.emit();
          this.hide();
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.save.emit();
          this.hide();
          console.log('error', error);
        }
      );

  }

  onDelete() {
    this.delete.emit();
  }
}
