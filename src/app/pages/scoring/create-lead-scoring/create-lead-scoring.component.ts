import {
  Component, OnInit, ViewChild, ViewContainerRef,
  ComponentFactoryResolver, ComponentRef, Inject,
  Pipe, OnDestroy
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LeadCardComponent } from './components/lead-card/lead-card.component';
import { ModalRef, MODAL_DATA } from '@app-components/modal/modal-ref';
import { Scoring, LeadCard } from '@app-models/scoring';
import { ScoringService } from '@app-core/services/scoring.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface ComponentProps {
  scoring: Scoring;
  mode: string;
}

// @Pipe({
//   name: 'search'
// })

@Component({
  selector: 'app-create-lead-scoring',
  templateUrl: './create-lead-scoring.component.html',
  styleUrls: ['./create-lead-scoring.component.scss']
})
export class CreateLeadScoringComponent implements OnInit, OnDestroy {

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
  leadCategories: any[];
  csvFields: any[];
  mappingFields: any[];
  dbFields: any[];
  filteredDbFields: any[];
  searchDB: string;

  destroy$ = new Subject();
  leadScoringCardList: LeadCard[];

  scoring: Scoring;
  createMode: boolean;

  @ViewChild('leadCardList', { read: ViewContainerRef })
  leadCardList: ViewContainerRef;

  childUniqueKey: number;
  leadProfileReferences = Array<ComponentRef<LeadCardComponent>>();

  formGroup: FormGroup;
  fullScreen: boolean;
  modalClass: string;

  constructor(
    private scoringService: ScoringService,
    private fb: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(ModalRef) private modalRef: ModalRef<CreateLeadScoringComponent>,
    @Inject(MODAL_DATA) private props: ComponentProps
  ) {
    this.childUniqueKey = 0;
    this.searchIdx = '';
    this.csvFields = [
      { id: 1, name: 'Location', hidden: false, },
      { id: 2, name: 'Same Email Campaign', hidden: false, },
      { id: 3, name: 'Dummy', hidden: false, },
      { id: 4, name: 'Test Record', hidden: false, },
      { id: 5, name: 'Test Default', hidden: false, },
      { id: 6, name: 'Commented on Ads', hidden: false, },
      { id: 7, name: 'Page Visited', hidden: false, },
      { id: 8, name: 'Number of Employees', hidden: false, },
      { id: 9, name: 'Title of role', hidden: false, },
      { id: 10, name: 'Location', hidden: false, },
      { id: 11, name: 'Buy Time', hidden: false, },
      { id: 12, name: 'Tool', hidden: false, },
      { id: 13, name: 'Dummy', hidden: false, },
      { id: 14, name: 'Test Record', hidden: false, },
      { id: 15, name: 'Test Default', hidden: false, },
      { id: 16, name: 'Commented on Ads', hidden: false, },
      { id: 17, name: 'Page Visited', hidden: false, },
      { id: 18, name: 'Number of Employees', hidden: false, },
      { id: 19, name: 'Title of role', hidden: false, },
      { id: 20, name: 'Location', hidden: false, },
      { id: 21, name: 'Buy Time', hidden: false, },
      { id: 22, name: 'Tool', hidden: false, },
    ];
    this.mappingFields = [];
    this.searchIdx = '';
    this.searchDB = '';
    this.fullScreen = false;
    this.modalClass = 'modal-wrapper';
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.searchLeadCategoryQuery(this.searchIdx);
    // this.searchDbQuery(this.searchDB);
    this.formGroup = this.fb.group({
      searchLeadCard: '',
      profileName: [this.props.scoring && this.props.scoring.name, [Validators.required]],
      description: this.props.scoring && this.props.scoring.description,
    });

    this.createMode = this.props.mode === 'new' ? true : false;

    this.scoringService.getLeadScoringLeadMockData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        list => {
          this.leadScoringCardList = list;
        }
      );
  }

  onSearch(e) {
    console.log('__', e);
  }

  openProfile(id) {
    this.add(id);
    this.leadScoringCardList.slice(id, 1);
  }

  add(id) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LeadCardComponent);
    const leadCardRef = this.leadCardList.createComponent(componentFactory);
    const leadCard = leadCardRef.instance;
    leadCard.uniqueKey = ++this.childUniqueKey;
    leadCard.parentRef = this;
    this.leadProfileReferences.push(leadCardRef);
  }

  remove(key: number) {
    if (this.leadCardList.length < 1) {
      return;
    } else {
      const componentRef = this.leadProfileReferences.filter(
        x => x.instance.uniqueKey === key
      )[0];

      const vcrIndex: number = this.leadCardList.indexOf(componentRef.hostView);
      this.leadCardList.remove(vcrIndex);
      this.leadProfileReferences = this.leadProfileReferences.filter(
        x => x.instance.uniqueKey !== key
      );
    }
  }

  onCancelClick() {
    this.modalRef.cancel();
  }

  onSaveClick() {
    this.modalRef.cancel();
  }

  // public transform(value, keys: string, term: string) {

  //   if (!term) return value;
  //   return (value || []).filter(item => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));

  // }
  searchLeadCategoryQuery(searchIdx) {
    if (searchIdx === '') {
      this.leadCategories = this.csvFields.filter(x => !x.hidden);
    } else {
      this.leadCategories = this.csvFields.filter(x => !x.hidden)
        .filter(x => x.name.toLowerCase().indexOf(searchIdx.toLowerCase()) >= 0);
    }
  }

  onClickLeadCategory(field: any) {
    field.hidden = true;
    this.searchLeadCategoryQuery(this.searchIdx);
    this.openProfile(0);
  }

  onClickRemoveMappingRow(index: number) {
    const mapRow = this.mappingFields[index];
    if (mapRow.left) {
      mapRow.leftField.hidden = false;
      this.searchLeadCategoryQuery(this.searchIdx);

    }
    if (mapRow.right) {
      mapRow.rightField.hidden = false;
      // this.searchDbQuery(this.searchDB);
    }

    this.mappingFields.splice(index, 1);

  }

  revertFullScreen() {
    this.fullScreen = !this.fullScreen;
    this.modalClass = 'modal-wrapper' + (this.fullScreen ? ' full-screen' : '');
  }
}
