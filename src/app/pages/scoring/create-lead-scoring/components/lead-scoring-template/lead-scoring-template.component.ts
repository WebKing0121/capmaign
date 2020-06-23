import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CreateLeadScoringComponent } from '../../create-lead-scoring.component';
import { RuleTemplateComponent } from '../rule-template/rule-template.component';

@Component({
  selector: 'app-lead-scoring-template',
  templateUrl: './lead-scoring-template.component.html',
  styleUrls: ['./lead-scoring-template.component.scss']
})
export class LeadScoringTemplateComponent implements OnInit {

  public uniqueKey: number;
  public parentRef: CreateLeadScoringComponent;

  @ViewChild('ruleList', { read: ViewContainerRef })
  ruleList: ViewContainerRef;

  childUniqueKey: number;
  rulesReferences = Array<ComponentRef<RuleTemplateComponent>>();
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    this.childUniqueKey = 0;
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      attitude: '',
      valueType: 0,
      weightage: 0
    });
  }

  remove_me() {
    this.parentRef.remove(this.uniqueKey);
  }

  add() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(RuleTemplateComponent);
    const ruleRef = this.ruleList.createComponent(componentFactory);
    const rule = ruleRef.instance;
    rule.uniqueKey = ++this.childUniqueKey;
    rule.parentRef = this;
    this.rulesReferences.push(ruleRef);
  }

  remove(key: number) {
    if (this.ruleList.length < 1) {
      return
    } else {
      const componentRef = this.rulesReferences.filter(
        x => x.instance.uniqueKey === key
      )[0];

      const vcrIndex: number = this.ruleList.indexOf(componentRef.hostView);
      this.ruleList.remove(vcrIndex);
      this.rulesReferences = this.rulesReferences.filter(
        x => x.instance.uniqueKey !== key
      );
    }
  }
}
