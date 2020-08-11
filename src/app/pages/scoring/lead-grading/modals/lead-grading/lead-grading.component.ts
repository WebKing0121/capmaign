import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { ScoringService } from '@app-core/services/scoring.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-scoring-lead-grading-modal',
  templateUrl: './lead-grading.component.html',
  styleUrls: ['./lead-grading.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ScoringLeadGradingModalComponent implements OnInit, OnDestroy {
  @Input() leadGrading;
  @Input() modalType = ModalType.New;
  @Input() listValuesDropDown = [];
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @ViewChild('leadGradingModal', { static: false }) leadGradingModal;

  ModalType = ModalType;
  childUniqueKey: number;
  formGroup: FormGroup;
  fullScreen: boolean;
  modalClass: string;

  destroy$ = new Subject();
  leadGradingFromDB: any;
  rules: any[] = [];
  filteredRules: any[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private scoringService: ScoringService
  ) {
    this.childUniqueKey = 0;
    this.fullScreen = false;
    this.modalClass = 'modal-dialog-centered ' + (this.fullScreen ? 'modal-fullscreen' : 'modal-xl');

    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      description: ''
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch(e) {
  }

  addRule() {
    this.childUniqueKey++;
    const rule = {
      id: `new_${this.childUniqueKey}`,
      name: '',
      minRange: 0,
      maxRange: 100,
      grade: ''
    };
    this.rules.push(rule);
    this.filteredRules = this.rules.filter(x => !x.isDeleted);
  }

  removeRule(ruleId) {
    this.rules.find(x => x.id === ruleId).isDeleted = true;
    this.filteredRules = this.rules.filter(x => !x.isDeleted);
  }

  revertFullScreen() {
    this.fullScreen = !this.fullScreen;
    this.modalClass = 'modal-wrapper' + (this.fullScreen ? ' full-screen' : '');
  }

  show() {
    this.childUniqueKey = 0;
    if (this.modalType === ModalType.Edit) {
      const { name, description, id } = this.leadGrading;
      this.scoringService.getLeadGradingProfile(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            this.leadGradingFromDB = data.result;
            this.rules = this.leadGradingFromDB.leadGradingRules;
            this.filteredRules = this.rules.filter(x => !x.isDeleted);
            this.formGroup.setValue({
              name,
              description,
            });
            setTimeout(() => this.leadGradingModal.show());
          },
          error => {
            console.log('error', error.response);
          }
        );


    } else {
      this.rules = [];
      this.filteredRules = [];
      this.formGroup.setValue({
        name: '',
        description: '',
      });
      setTimeout(() => this.leadGradingModal.show());
    }
  }

  hide() {
    this.leadGradingModal.hide();
  }

  onDelete() {
    this.delete.emit();
  }

  onSave() {
    const { name, description } = this.formGroup.value;
    if (this.modalType === ModalType.Edit) {
      const paramsForEdit = {
        ...this.leadGradingFromDB,
        name,
        description,
        leadGradingRules: this.rules
      };
      paramsForEdit.leadGradingRules.forEach(x => {
        if (isNaN(x.id)) {
          delete x.id;
        }
      });

      this.loading = true;
      this.scoringService.updateLeadGradingProfile(paramsForEdit)
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
      const ParamsForCreate = {
        name,
        description,
        leadGradingRules: this.rules,
        isActive: true,
        isDefaultForRecord: false,
        isDefaultForCampaign: false,
        isStatic: false,
      };
      ParamsForCreate.leadGradingRules.forEach(x => {
        if (isNaN(x.id)) {
          delete x.id;
        }
      });
      this.loading = true;
      this.scoringService.createLeadGradingProfile(ParamsForCreate)
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
}
