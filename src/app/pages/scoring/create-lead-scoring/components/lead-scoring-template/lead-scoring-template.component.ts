import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CreateLeadScoringComponent } from '../../create-lead-scoring.component';
import { RuleComponent } from '../../../create-lead-grading/rule/rule.component';
import { ModalService } from '@app-components/modal/modal.service';
import { ModalRef } from '@app-components/modal/modal-ref';
import { ScoringConfirmDefaultModalComponent } from '../../../components/scoring-confirm-default-modal/scoring-confirm-default-modal.component';
import { RuleTemplateComponent } from '../rule-template/rule-template.component';

@Component({
  selector: 'app-lead-scoring-template',
  templateUrl: './lead-scoring-template.component.html',
  styleUrls: ['./lead-scoring-template.component.scss']
})
export class LeadScoringTemplateComponent implements OnInit {

  public unique_key: number;
  public parentRef: CreateLeadScoringComponent;

  @ViewChild('ruleList', { read: ViewContainerRef })
  ruleList: ViewContainerRef;

  child_unique_key: number = 0;
  rulesReferences = Array<ComponentRef<RuleTemplateComponent>>()
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      attitude: '',
      valueType: 0,
      weightage: 0
    });
  }

  remove_me() {
    this.parentRef.remove(this.unique_key);
  }

  add() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(RuleTemplateComponent);
    const ruleRef = this.ruleList.createComponent(componentFactory);
    let rule = ruleRef.instance;
    rule.unique_key = ++this.child_unique_key;
    rule.parentRef = this;
    this.rulesReferences.push(ruleRef);
  }

  remove(key: number) {
    if (this.ruleList.length < 1) return;

    let componentRef = this.rulesReferences.filter(
      x => x.instance.unique_key == key
    )[0];

    let vcrIndex: number = this.ruleList.indexOf(componentRef.hostView);
    this.ruleList.remove(vcrIndex);
    this.rulesReferences = this.rulesReferences.filter(
      x => x.instance.unique_key !== key
    );
  }
}
