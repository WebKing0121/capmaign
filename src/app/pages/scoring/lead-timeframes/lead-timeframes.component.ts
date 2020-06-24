import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Inject } from '@angular/core';
import { CategoryComponent } from '../lead-category/components/category/category.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalRef, MODAL_DATA } from '@app-components/modal/modal-ref';
import { LeadCategoryModalComponent } from '../lead-category/lead-category-modal/lead-category-modal.component';
import { TimeFrameComponent } from './components/time-frame/time-frame.component';

@Component({
  selector: 'app-lead-timeframes',
  templateUrl: './lead-timeframes.component.html',
  styleUrls: ['./lead-timeframes.component.scss']
})
export class LeadTimeframesComponent implements OnInit {

  leadScoringTypeList = [
    {
      id: '1',
      value: 'Default'
    },
    {
      id: '2',
      value: 'Default-new record'
    },
    {
      id: '3',
      value: 'Default new'
    },
    {
      id: '4',
      value: 'Default scoring'
    },
    {
      id: '5',
      value: 'Default profile'
    },
    {
      id: '6',
      value: 'Demarcation location'
    },
    {
      id: '7',
      value: 'Demo lead scoring'
    },
    {
      id: '8',
      value: 'Demo sample'
    }
  ];

  @ViewChild('timeFrameList', { read: ViewContainerRef })
  timeFrameList: ViewContainerRef;

  childUniqueKey: number;
  timeFrameRefList = Array<ComponentRef<TimeFrameComponent>>();
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    this.childUniqueKey = 0;
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
    })
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
