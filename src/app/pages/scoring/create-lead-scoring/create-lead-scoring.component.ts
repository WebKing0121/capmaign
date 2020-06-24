import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Inject, Pipe } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LeadCardComponent } from './components/lead-card/lead-card.component';
import { ModalRef, MODAL_DATA } from '@app-components/modal/modal-ref';
import { Scoring, LeadCard } from '@app-core/models/scoring';
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
export class CreateLeadScoringComponent implements OnInit {

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

  destroy$ = new Subject();
  leadScoringCardList: LeadCard[];

  scoring: Scoring;
  scoringMode: 'new' | 'edit';

  @ViewChild('leadCardList', { read: ViewContainerRef })
  leadCardList: ViewContainerRef;

  childUniqueKey: number;
  leadProfileReferences = Array<ComponentRef<LeadCardComponent>>();

  formGroup: FormGroup;

  constructor(
    private scoringService: ScoringService,
    private fb: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(ModalRef) private modalRef: ModalRef<CreateLeadScoringComponent>,
    @Inject(MODAL_DATA) private props: ComponentProps
    ) {
    this.childUniqueKey = 0;
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      searchLeadItem: '',
      profileName: [this.props.scoring && this.props.scoring.name, [Validators.required]],
      profileDescription: this.props.scoring && this.props.scoring.description
    });

    this.scoringMode = this.props.mode === 'new' ? 'new' : 'edit';
    console.log("scoring mode: ", this.scoringMode);

    this.scoringService.getLeadScoringLeadMockData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        list => {
          this.leadScoringCardList = list
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

  onSaveClick() {
    this.modalRef.cancel();
  }

  // public transform(value, keys: string, term: string) {

  //   if (!term) return value;
  //   return (value || []).filter(item => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));

  // }
}
