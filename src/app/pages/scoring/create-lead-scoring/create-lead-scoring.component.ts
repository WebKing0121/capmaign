import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LeadScoringTemplateComponent } from './components/lead-scoring-template/lead-scoring-template.component';
import { ModalRef } from '@app-components/modal/modal-ref';

@Component({
  selector: 'app-create-lead-scoring',
  templateUrl: './create-lead-scoring.component.html',
  styleUrls: ['./create-lead-scoring.component.scss']
})
export class CreateLeadScoringComponent implements OnInit {

  @ViewChild('leadProfileList', { read: ViewContainerRef })
  leadProfileList: ViewContainerRef;

  childUniqueKey: number;
  leadProfileReferences = Array<ComponentRef<LeadScoringTemplateComponent>>();

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(ModalRef) private modalRef: ModalRef<CreateLeadScoringComponent>,
  ) {
    this.childUniqueKey = 0;
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      searchLeadItem: '',
      profileName: ['', [Validators.required]],
      profileDescription: ''
    });
  }

  onSearch(e) {
    console.log('__', e);
  }

  openProfile(type) {
    this.add();
  }

  add() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LeadScoringTemplateComponent);
    const leadScoringRef = this.leadProfileList.createComponent(componentFactory);
    const leadScoringItem = leadScoringRef.instance;
    leadScoringItem.uniqueKey = ++this.childUniqueKey;
    leadScoringItem.parentRef = this;
    this.leadProfileReferences.push(leadScoringRef);
  }

  remove(key: number) {
    if (this.leadProfileList.length < 1) {
      return;
    } else {
      const componentRef = this.leadProfileReferences.filter(
        x => x.instance.uniqueKey === key
      )[0];

      const vcrIndex: number = this.leadProfileList.indexOf(componentRef.hostView);
      this.leadProfileList.remove(vcrIndex);
      this.leadProfileReferences = this.leadProfileReferences.filter(
        x => x.instance.uniqueKey !== key
      );
    }
  }

  onSaveClick() {
    this.modalRef.cancel();
  }
}
