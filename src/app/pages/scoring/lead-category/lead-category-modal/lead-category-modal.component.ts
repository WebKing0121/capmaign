import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Inject } from '@angular/core';
import { LeadCategory } from '@app-core/models/scoring';
import { CategoryComponent } from '../components/category/category.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalRef, MODAL_DATA } from '@app-components/modal/modal-ref';

interface ComponentProps {
  leadCategory: LeadCategory;
  createMode: boolean;
}

@Component({
  selector: 'app-lead-category-modal',
  templateUrl: './lead-category-modal.component.html',
  styleUrls: ['./lead-category-modal.component.scss']
})
export class LeadCategoryModalComponent implements OnInit {

  leadCategory: LeadCategory;
  mode: boolean;
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
    @Inject(ModalRef) private modalRef: ModalRef<LeadCategoryModalComponent>,
    @Inject(MODAL_DATA) private props: ComponentProps
  ) {
    this.childUniqueKey = 0;
    this.fullScreen = false;
    this.modalClass = 'modal-wrapper';
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: [this.props.leadCategory && this.props.leadCategory.name, Validators.required],
      leadCategory: '',
      fieldName: '',
      criteria: this.props.leadCategory && this.props.leadCategory.criteria
    });

    this.mode = this.props.createMode;
  }

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

  onCancelClick() {
    this.modalRef.cancel();
  }

  onSaveClick() {
    this.modalRef.cancel();
  }

  revertFullScreen() {
    this.fullScreen = !this.fullScreen;
    this.modalClass = 'modal-wrapper' + (this.fullScreen ? ' full-screen' : '');
  }
}
