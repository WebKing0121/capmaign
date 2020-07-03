import { Component, OnInit, Input, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LandingPageTemplate } from '@app-core/models/landing-page';
import { NgSelectData } from '@app-core/models/common';
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
  @ViewChild('templateModal', { static: false }) templateModal;
  ModalType = ModalType;

  private unsubscribe$ = new Subject();

  fullScreen: boolean;
  dialogClass: string;

  categories: NgSelectData[];
  types: NgSelectData[];

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
      content: ['', Validators.required],
    });

    this.types = [
      { value: '1', label: 'Static' },
      { value: '2', label: 'Dynamic / Responsive' },
    ];

    this.contentService.getLandingPageCategories()
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
        description: '',
        category: '',
        content: '',
      });
    } else {
      const { id, categoryId, name, description, template, templateURL, templateType } = this.template;
      this.form.setValue({
        id,
        name,
        description,
        category: `${categoryId}`,
        content: template,
      });
    }
    setTimeout(() => this.templateModal.show());
  }

  hide() {
    this.templateModal.hide();
  }

  revertFullScreen() {
    this.fullScreen = !this.fullScreen;
    this.dialogClass = 'modal-dialog-centered ' + (this.fullScreen ? 'modal-fullscreen' : 'modal-xl');
  }
}
