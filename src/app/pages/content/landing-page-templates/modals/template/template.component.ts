import { Component, OnInit, Input, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { LandingPageTemplateModalType } from '@app-core/enums/modal-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LandingPageTemplate } from '@app-core/models/landing-page';
import { NgSelectData } from '@app-core/models/common';
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
  @Input() modalType = LandingPageTemplateModalType.New;
  @Input() template: LandingPageTemplate;
  @ViewChild('templateModal', { static: false }) templateModal;
  LandingPageTemplateModalType = LandingPageTemplateModalType;

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
      type: ['', Validators.required],
      url: ['', Validators.required],
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
    if (this.modalType === LandingPageTemplateModalType.New) {
      this.form.setValue({
        id: 0,
        name: '',
        description: '',
        category: '',
        type: '',
        url: '',
        content: '',
      });
    } else {
      const { id, categoryId, name, description, template, templateURL, templateType } = this.template;
      this.form.setValue({
        id,
        name,
        description,
        category: `${categoryId}`,
        type: `${templateType}`,
        url: templateURL,
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
