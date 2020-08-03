import {
  Component, OnInit, ViewChild, ViewContainerRef,
  ComponentRef, ComponentFactoryResolver,
  OnDestroy, ViewEncapsulation
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TimeFrameComponent } from './components/time-frame/time-frame.component';
import { ScoringService } from '@app-core/services/scoring.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lead-timeframes',
  templateUrl: './lead-timeframes.component.html',
  styleUrls: ['./lead-timeframes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeadTimeframesComponent implements OnInit, OnDestroy {
  @ViewChild('timeFrameList', { read: ViewContainerRef }) timeFrameList: ViewContainerRef;

  childUniqueKey: number;
  timeFrameRefList = Array<ComponentRef<TimeFrameComponent>>();
  form: FormGroup;

  destroy$ = new Subject();
  selected = [];
  leadScoringTypeList = [];
  loading = false;
  constructor(
    private fb: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver,
    private scoringService: ScoringService
  ) {
    this.childUniqueKey = 0;
    this.form = this.fb.group({
      scoringName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadScoringTypeList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadScoringTypeList() {
    const params = {
      SortDirection: 'Ascending',
      maxResultCount: 1000,
      skipCount: 0,
      sorting: '',
    };
    this.loading = true;
    this.scoringService.getLeadScoringProfiles(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          if (data.result) {
            this.leadScoringTypeList = data.result.items.map(x => ({ value: `${x.id}`, label: x.name }));
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }

  add() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TimeFrameComponent);
    const categoryRef = this.timeFrameList.createComponent(componentFactory);
    const category = categoryRef.instance;
    category.uniqueKey = ++this.childUniqueKey;
    category.parentRef = this;
    this.timeFrameRefList.push(categoryRef);
  }

  remove(key) {
    if (this.timeFrameList.length < 1) {
      return;
    } else {
      const componentRef = this.timeFrameRefList.filter(
        x => x.instance.uniqueKey === key
      )[0];

      const vcrIndex: number = this.timeFrameList.indexOf(componentRef.hostView);
      this.timeFrameList.remove(vcrIndex);
      this.timeFrameRefList = this.timeFrameRefList.filter(
        x => x.instance.uniqueKey !== key
      );
    }
  }

  onCancelClick() {
  }

  onSaveClick() {
  }
}
