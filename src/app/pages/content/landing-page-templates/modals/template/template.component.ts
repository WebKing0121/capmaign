import { Component, OnInit, Input, ViewChild, OnDestroy, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LandingPageTemplate } from '@app-models/landing-page';
import { NgSelectData } from '@app-models/common';
import { ContentService } from '@app-core/services/content.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-landing-page-template-modal',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingPageTemplateModalComponent implements OnInit, OnDestroy {
  @Input() modalType = ModalType.New;
  @Input() template: LandingPageTemplate;
  @Input() categories = [];
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @ViewChild('templateModal', { static: false }) templateModal;
  @ViewChild('emailCampaignEditor', { static: false }) emailCampaignEditor;

  ModalType = ModalType;

  private unsubscribe$ = new Subject();

  fullScreen: boolean;
  dialogClass: string;

  // categories: NgSelectData[];
  types: NgSelectData[];
  loading = false;
  form: FormGroup;
  landingPageFromDB: any;

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
      description: '',
      category: ['', Validators.required],
      type: ['', Validators.required],
      url: ['', Validators.required],
      content: ['', Validators.required],
      status: ['', Validators.required],
    });
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
        description: '',
        category: '',
        type: '',
        status: 'Draft',
        url: '',
        content: '',
      });
      setTimeout(() => this.templateModal.show());
    } else {
      this.loading = true;
      this.contentService.getLandingPageTemplate(this.template.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            this.loading = false;
            if (data.success && data.result) {
              this.landingPageFromDB = data.result;
            }

            const { id, categoryId, name, description, template, templateURL, templateType } = this.template;
            this.form.setValue({
              id,
              name,
              description,
              category: `${categoryId}`,
              type: `${templateType}`,
              url: templateURL,
              status: this.landingPageFromDB.pageStatus,
              content: template,
            });
            setTimeout(() => this.templateModal.show());
          },
          error => {
            this.loading = false;
            console.log('error', error.response);
          }
        );

    }

  }

  hide() {
    this.templateModal.hide();
  }

  revertFullScreen() {
    this.fullScreen = !this.fullScreen;
    this.dialogClass = 'modal-dialog-centered ' + (this.fullScreen ? 'modal-fullscreen' : 'modal-xl');
  }

  onSave() {
    const { id, name, description, category, type, url, content, status } = this.form.value;
    if (this.modalType === ModalType.New) {
      const params = {
        TemplateType: type,
        TemplateURL: url,
        categoryId: category,
        description,
        folderId: 1,
        isSystem: true,
        name,
        pageStatus: status,
        template: this.emailCampaignEditor.getValue(),
      };
      this.loading = true;
      this.contentService.createLandingPageTemplate(params)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.loading = false;
            this.save.emit();
            this.templateModal.hide();
          },
          error => {
            this.loading = false;
            console.log('error', error.response);
          }
        );
    } else {
      const params = {
        organizationUnitId: this.landingPageFromDB.organizationUnitId,
        name,
        template: this.emailCampaignEditor.getValue(),
        description,
        templateURL: url,
        templateType: type,
        folderId: this.landingPageFromDB.folderId,
        categoryId: category,
        category: '',
        pageStatus: status,
        isSystem: this.landingPageFromDB.isSystem,
        id,
      };
      this.loading = true;
      this.contentService.updateLandingPageTemplate(params)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.loading = false;
            this.save.emit();
            this.templateModal.hide();
          },
          error => {
            this.loading = false;
            console.log('error', error.response);
          }
        );
    }
  }

  onDelete() {
    this.delete.emit();
  }
}
