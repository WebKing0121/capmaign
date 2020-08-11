import {
  Component, OnInit, OnDestroy, ViewChild, ComponentFactoryResolver,
  ViewEncapsulation, Input, Output, EventEmitter
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { ScoringService } from '@app-core/services/scoring.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-scoring-lead-category-modal',
  templateUrl: './lead-category.component.html',
  styleUrls: ['./lead-category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScoringLeadCategoryModalComponent implements OnInit, OnDestroy {
  @Input() leadCategory;
  @Input() modalType = ModalType.New;
  @Input() listValuesDropDown = [];
  @Input() leadDbColumns = [];
  @Input() emailAnalyticsColumns = [];
  @Input() mobileAnalyticsColumns = [];
  @Input() socialMediaAnalyticsColumns = [];
  @Input() websiteAnalyticsColumns = [];
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @ViewChild('categoryModal', { static: false }) categoryModal;

  ModalType = ModalType;

  formGroup: FormGroup;
  fields = [];
  fullScreen: boolean;
  modalClass: string;
  conditions = [];
  loading = false;
  newId = 0;
  destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver,
    private scoringService: ScoringService
  ) {
    this.fullScreen = false;
    this.modalClass = 'modal-dialog-centered ' + (this.fullScreen ? 'modal-fullscreen' : 'modal-xl');

    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      leadCategoryName: '',
      fieldName: '',
      criteria: '',
    });

  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onChangeCategory(event) {
    const category = event.target.value;
    this.setFields(category);
  }

  setFields(category) {
    switch (category) {
      case 'Email':
        this.fields = this.emailAnalyticsColumns;
        break;
      case 'Records':
        this.fields = this.leadDbColumns;
        break;
      case 'Mobile':
        this.fields = this.mobileAnalyticsColumns;
        break;
      case 'Social':
        this.fields = this.socialMediaAnalyticsColumns;
        break;
      case 'Website':
        this.fields = this.websiteAnalyticsColumns;
        break;
    }
  }

  addCondition() {
    this.newId++;
    this.conditions = [...this.conditions, {
      id: `new_${this.newId}`,
      name: '',
      value: '',
      score: 0,
      condition: 'contains'
    }];
  }

  removeCondition(conditionId) {
    this.conditions = this.conditions.filter(x => x.id !== conditionId);
  }

  onDelete() {
    this.delete.emit();
  }

  onSave() {
    const {
      name,
      leadCategoryName,
      fieldName,
      criteria,
    } = this.formGroup.value;
    if (this.modalType === ModalType.Edit) {
      const conditions = [];
      this.conditions.forEach(x => {
        if (isNaN(x.id)) {
          conditions.push({ name: x.name, value: x.value, score: x.score, condition: x.condition });
        } else {
          conditions.push({ ...x });
        }
      });

      const params = {
        id: this.leadCategory.id,
        name,
        leadCategoryName,
        fieldName,
        criteria,
        scoringCategoryFields: conditions
      };
      this.loading = true;
      this.scoringService.updateLeadCategory(params)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.loading = false;
            this.update.emit();
            this.hide();
          },
          error => {
            this.loading = false;
            console.log('error', error.response);
          }
        );
    } else {
      const conditions = [];
      this.conditions.forEach(x => {
        if (isNaN(x.id)) {
          conditions.push({ name: x.name, value: x.value, score: x.score, condition: x.condition });
        } else {
          conditions.push({ ...x });
        }
      });
      const params = {
        name,
        leadCategoryName,
        fieldName,
        criteria,
        scoringCategoryFields: conditions
      };
      this.loading = true;
      this.scoringService.createLeadCategory(params)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.loading = false;
            this.update.emit();
            this.hide();
          },
          error => {
            this.loading = false;
            console.log('error', error.response);
          }
        );
    }
  }

  revertFullScreen() {
    this.fullScreen = !this.fullScreen;
    this.modalClass = 'modal-dialog-centered ' + (this.fullScreen ? 'modal-fullscreen' : 'modal-xl');
  }

  show() {
    this.newId = 0;
    if (this.modalType === ModalType.Edit) {
      const {
        name,
        leadCategoryName,
        fieldName,
        criteria,
        scoringCategoryFields
      } = this.leadCategory;

      this.setFields(leadCategoryName);
      this.conditions = scoringCategoryFields;
      this.formGroup.setValue({
        name,
        leadCategoryName,
        fieldName,
        criteria,
      });
    } else {
      this.conditions = [];
      this.formGroup = this.fb.group({
        name: '',
        leadCategoryName: 'Email',
        fieldName: '',
        criteria: 'Explicit',
      });

    }
    setTimeout(() => this.categoryModal.show());
  }

  hide() {
    this.categoryModal.hide();
  }
}
