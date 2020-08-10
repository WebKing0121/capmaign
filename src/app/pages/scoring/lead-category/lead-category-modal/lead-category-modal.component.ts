import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Inject, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { CategoryComponent } from '../components/category/category.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { ScoringService } from '@app-core/services/scoring.service';

@Component({
  selector: 'app-scoring-lead-category-modal',
  templateUrl: './lead-category-modal.component.html',
  styleUrls: ['./lead-category-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScoringLeadCategoryModalComponent implements OnInit {
  @Input() leadCategory;
  @Input() modalType = ModalType.New;
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @ViewChild('categoryModal', { static: false }) categoryModal;

  ModalType = ModalType;
  leadCategoryTypeList = [
    {
      id: '1',
      value: 'Email'
    },
    {
      id: '2',
      value: 'Records'
    },
    {
      id: '3',
      value: 'Mobile'
    },
    {
      id: '4',
      value: 'Social'
    },
    {
      id: '5',
      value: 'Website'
    }
  ];

  fieldNameTypeList = [
    {
      id: '1',
      value: 'accountName'
    },
    {
      id: '2',
      value: 'accountNumber'
    },
    {
      id: '3',
      value: 'accountOptOut'
    },
    {
      id: '4',
      value: 'AccountOwner'
    },
    {
      id: '5',
      value: 'AccountSite'
    },
    {
      id: '6',
      value: 'accountOptOut'
    },
    {
      id: '7',
      value: 'AccountOwner'
    },
    {
      id: '8',
      value: 'AccountSite'
    }
  ];

  @ViewChild('categoryList', { read: ViewContainerRef })
  categoryList: ViewContainerRef;

  childUniqueKey: number;
  categoryRefList = Array<ComponentRef<CategoryComponent>>();
  formGroup: FormGroup;

  fullScreen: boolean;
  modalClass: string;

  constructor(
    private fb: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver,
    private scoringService: ScoringService
  ) {
    this.childUniqueKey = 0;
    this.fullScreen = false;
    this.modalClass = 'modal-dialog-centered ' + (this.fullScreen ? 'modal-fullscreen' : 'modal-xl');

    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      leadCategory: '',
      fieldName: '',
      criteria: '',
      leadCategoryType: ''
    });

  }

  ngOnInit(): void { }

  add() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CategoryComponent);
    const categoryRef = this.categoryList.createComponent(componentFactory);
    const category = categoryRef.instance;
    category.uniqueKey = ++this.childUniqueKey;
    category.parentRef = this;
    this.categoryRefList.push(categoryRef);
  }

  remove(key) {
    if (this.categoryList.length < 1) {
      return;
    } else {
      const componentRef = this.categoryRefList.filter(
        x => x.instance.uniqueKey === key
      )[0];

      const vcrIndex: number = this.categoryList.indexOf(componentRef.hostView);
      this.categoryList.remove(vcrIndex);
      this.categoryRefList = this.categoryRefList.filter(
        x => x.instance.uniqueKey !== key
      );
    }
  }


  onSave() {
    this.categoryModal.hide();
  }

  revertFullScreen() {
    this.fullScreen = !this.fullScreen;
    this.modalClass = 'modal-dialog-centered ' + (this.fullScreen ? 'modal-fullscreen' : 'modal-xl');
  }

  show() {
    if (this.modalType === ModalType.Edit) {
      console.log(this.leadCategory);
      this.formGroup = this.fb.group({
        name: ['', Validators.required],
        leadCategory: '',
        fieldName: '',
        criteria: '',
        leadCategoryType: ''
      });
    } else {
      this.formGroup = this.fb.group({
        name: ['', Validators.required],
        leadCategory: '',
        fieldName: '',
        criteria: '',
        leadCategoryType: ''
      });
    }

    setTimeout(() => this.categoryModal.show());
  }

  hide() {
    this.categoryModal.hide();
  }

}
