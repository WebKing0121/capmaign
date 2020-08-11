import {
  Component, OnInit, ViewChild, OnDestroy, ViewEncapsulation, Input, Output, EventEmitter
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScoringService } from '@app-core/services/scoring.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ModalType } from '@app-core/enums/modal-type.enum';

@Component({
  selector: 'app-scoring-lead-scoring-modal',
  templateUrl: './lead-scoring.component.html',
  styleUrls: ['./lead-scoring.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ScoringLeadScoringModalComponent implements OnInit, OnDestroy {
  @Input() leadScoring;
  @Input() leadCategories = [];
  @Input() modalType = ModalType.New;
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @ViewChild('leadScoringModal', { static: false }) leadScoringModal;

  ModalType = ModalType;
  leadDbColumns = [];
  items = [
    {
      id: 1,
      text: 'First item'
    },
    {
      id: 2,
      text: 'Second item'
    },
    {
      id: 3,
      text: 'Third item'
    }
  ];

  searchIdx: string;
  filteredLeadCategories: any[];

  mappingFields: any[];
  dbFields: any[];
  filteredDbFields: any[];
  searchDB: string;
  scoringProfileFromDB: any;

  destroy$ = new Subject();

  childUniqueKey: number;
  // leadProfileReferences = Array<ComponentRef<LeadCardComponent>>();

  formGroup: FormGroup;
  fullScreen: boolean;
  modalClass: string;

  loading = false;
  constructor(
    private scoringService: ScoringService,
    private fb: FormBuilder,
  ) {
    this.childUniqueKey = 0;
    this.searchIdx = '';
    this.mappingFields = [];
    this.searchIdx = '';
    this.searchDB = '';

    this.fullScreen = false;
    this.modalClass = 'modal-dialog-centered ' + (this.fullScreen ? 'modal-fullscreen' : 'modal-xl');

    this.formGroup = this.fb.group({
      searchLeadCard: '',
      profileName: ['', [Validators.required]],
      description: '',
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    // this.searchLeadCategoryQuery(this.searchIdx);
  }

  onSearch(e) {
    console.log('__', e);
  }

  openProfile(leadCategory: any) {
    this.scoringService.getLeadDbColumnsByLeadCategory(leadCategory.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.leadDbColumns = data.result;
          this.addGroup(leadCategory);
        },
        error => {
          console.log('error', error.response);
        }
      );
  }

  show() {
    this.searchIdx = '';

    if (this.modalType === ModalType.Edit) {
      const { name, description, id } = this.leadScoring;
      this.scoringService.getLeadScoringProfile(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            this.scoringProfileFromDB = data.result;
            const usedCategoryIds = this.scoringProfileFromDB.leadScoringGroups.map(x => x.categoryId);

            this.leadCategories.forEach(x => {
              x.hidden = usedCategoryIds.indexOf(x.id) >= 0;
            });
            this.searchLeadCategories('');
            this.formGroup.setValue({
              searchLeadCard: '',
              profileName: name,
              description,
            });
            setTimeout(() => this.leadScoringModal.show());
          },
          error => {
            console.log('error', error.response);
          }
        );


    } else {
      this.scoringProfileFromDB = {
        leadScoringGroups: []
      };
      this.searchLeadCategories('');
      this.formGroup.setValue({
        searchLeadCard: '',
        profileName: '',
        description: '',
      });
      setTimeout(() => this.leadScoringModal.show());
    }

  }

  hide() {
    this.leadScoringModal.hide();
  }

  onDelete() {
    this.delete.emit();
  }

  onSave() {
    const { profileName, description } = this.formGroup.value;
    if (this.modalType === ModalType.Edit) {
      const paramsForEdit = {
        ...this.scoringProfileFromDB,
        name: profileName,
        description
      };
      paramsForEdit.leadScoringGroups.forEach(x => {
        x.rules.forEach(y => {
          y.leadScoringProfileId = this.leadScoring.id;
        });
      });
      this.loading = true;
      this.scoringService.updateLeadScoringProfile(paramsForEdit)
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
        name: profileName,
        description,
        organizationUnitId: 0,
        leadScoringGroups: this.scoringProfileFromDB.leadScoringGroups,
        leadScoringRules: [],
        isActive: true,
        isDefaultForRecord: false,
        isDefaultForCampaign: false,
        isStatic: false,
      };
      this.loading = true;
      this.scoringService.createLeadScoringProfile(ParamsForCreate)
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

  removeGroup(index: number) {
    this.scoringProfileFromDB.leadScoringGroups.splice(index, 1);
  }

  addGroup(leadCategory: any) {
    const field = this.leadDbColumns.find(x => x.mappedField === leadCategory.fieldName);
    const group = {
      categoryId: leadCategory.id,
      columnName: leadCategory.fieldName,
      rules: leadCategory.scoringCategoryFields.map(x => ({
        columnName: leadCategory.fieldName,
        condition: x.condition,
        leadScoringCategoryId: x.scoringCategoryId,
        leadScoringProfileId: this.modalType === ModalType.Edit ? this.leadScoring.id : 0,
        name: x.name,
        organizationUnitId: x.organizationUnitId,
        score: x.score,
        valueToCompare: x.value,
        valueType: field.mappedFieldType,
        weightage: 0,
      })),
      valueType: field.mappedFieldType,
      weightage: 0
    };

    this.scoringProfileFromDB.leadScoringGroups.push(group);
  }

  removeRule(groupIndex: number, ruleIndex: number) {
    this.scoringProfileFromDB.leadScoringGroups[groupIndex].rules.splice(ruleIndex, 1);
  }

  addRule(groupIndex: number) {
    const { columnName, valueType, rules } = this.scoringProfileFromDB.leadScoringGroups[groupIndex];
    const rule = {
      columnName,
      condition: '',
      leadScoringCategoryId: rules[0].leadScoringCategoryId,
      leadScoringProfileId: this.modalType === ModalType.Edit ? this.leadScoring.id : 0,
      name: '',
      organizationUnitId: rules[0].organizationUnitId,
      score: 0,
      valueToCompare: '',
      valueType,
      weightage: 0,
    };
    this.scoringProfileFromDB.leadScoringGroups[groupIndex].rules.push(rule);
  }

  searchLeadCategories(searchIdx) {
    if (searchIdx === '') {

      this.filteredLeadCategories = this.leadCategories.filter(x => !x.hidden);
    } else {
      this.filteredLeadCategories = this.leadCategories.filter(x => !x.hidden)
        .filter(x => x.name.toLowerCase().indexOf(searchIdx.toLowerCase()) >= 0);
    }
  }

  onClickLeadCategory(field: any) {
    field.hidden = true;
    this.searchLeadCategories(this.searchIdx);
    this.openProfile(field);
  }

  onClickRemoveMappingRow(index: number) {
    // const mapRow = this.mappingFields[index];
    // if (mapRow.left) {
    //   mapRow.leftField.hidden = false;
    //   this.searchLeadCategoryQuery(this.searchIdx);

    // }
    // if (mapRow.right) {
    //   mapRow.rightField.hidden = false;
    //   // this.searchDbQuery(this.searchDB);
    // }

    // this.mappingFields.splice(index, 1);

  }

  revertFullScreen() {
    this.fullScreen = !this.fullScreen;
    this.modalClass = 'modal-wrapper' + (this.fullScreen ? ' full-screen' : '');
  }

}
