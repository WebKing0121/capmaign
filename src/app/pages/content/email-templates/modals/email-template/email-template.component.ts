import { Component, OnInit, Input, ViewChild, OnDestroy, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LandingPageTemplate } from '@app-models/landing-page';
import { NgSelectData } from '@app-models/common';
import { ContentService } from '@app-core/services/content.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-content-email-template-modal',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmailTemplateModalComponent implements OnInit, OnDestroy {
  @Input() modalType = ModalType.New;
  @Input() template: LandingPageTemplate;
  @Input() categories: NgSelectData[] = [];
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @ViewChild('templateModal', { static: false }) templateModal;
  @ViewChild('emailCampaignEditor', { static: false }) emailCampaignEditor;

  ModalType = ModalType;

  private unsubscribe$ = new Subject();

  fullScreen: boolean;
  dialogClass: string;

  emailTemplateFromDB: any;
  types: NgSelectData[];
  statuses: NgSelectData[];
  loading = false;
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
      description: '',
      category: ['', Validators.required],
      content: '',
      status: '',
    });

    this.types = [
      { value: '1', label: 'Static' },
      { value: '2', label: 'Dynamic / Responsive' },
    ];

    this.statuses = [
      { value: 'Draft', label: 'Draft' },
      { value: 'Publish', label: 'Publish' },
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
        description: '',
        category: '',
        content: '',
        status: 'Draft'
      });

      setTimeout(() => this.templateModal.show());
    } else {
      this.loading = true;
      this.contentService.getEmailTemplate(this.template.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            this.emailTemplateFromDB = data.result;
            const { id, categoryId, name, description, template, templateURL, templateType, pageStatus } = data.result;
            this.form.setValue({
              id,
              name,
              description,
              category: `${categoryId}`,
              content: template,
              status: pageStatus
            });
            this.loading = false;
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

  onDelete() {
    this.delete.emit();
  }

  onSave() {
    const {
      name,
      description,
      category,
      status
    } = this.form.value;

    if (this.modalType === ModalType.Edit) {
      this.loading = true;

      const params = {
        ...this.emailTemplateFromDB,
        categoryId: category ? Number(category) : 0,
        name,
        description,
        pageStatus: status,
        template: this.emailCampaignEditor.getValue()
      };
      this.contentService.updateEmailTemplate(params)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.loading = false;
            this.hide();
            this.save.emit();
          },
          error => {
            this.loading = false;
            console.log('error', error.response);
          }
        );
    } else {
      this.loading = true;

      const params = {
        folderId: 1,
        isSystem: true,
        personalization: '',
        categoryId: category ? Number(category) : 0,
        name,
        description,
        pageStatus: status,
        template: this.emailCampaignEditor.getValue()
      };

      this.contentService.createEmailTemplate(params)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.loading = false;
            this.hide();
            this.save.emit();
          },
          error => {
            this.loading = false;
            console.log('error', error.response);
          }
        );
    }
  }
}
