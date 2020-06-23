import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, ViewRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RuleComponent } from './rule/rule.component';
import { ModalService } from '@app-components/modal/modal.service';
import { ScoringConfirmDefaultModalComponent } from '../components/scoring-confirm-default-modal/scoring-confirm-default-modal.component';
import { ModalRef } from '@app-components/modal/modal-ref';

@Component({
  selector: 'app-create-lead-grading',
  templateUrl: './create-lead-grading.component.html',
  styleUrls: ['./create-lead-grading.component.scss']
})
export class CreateLeadGradingComponent implements OnInit {
  @ViewChild('ruleList', { read: ViewContainerRef })
  ruleList: ViewContainerRef;

  child_unique_key: number = 0;
  rulesReferences = Array<ComponentRef<RuleComponent>>()
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: ModalService,
    @Inject(ModalRef) private modalRef: ModalRef<CreateLeadGradingComponent>,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      searchLeadItem: '',
      profileName: ['', [Validators.required]],
      profileDescription: '',
      
    })
  }

  ngAfterViewInit() {
    
  }

  onSearch(e) {
    console.log("_______________", e);
  }

  add() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(RuleComponent);
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

  onSaveClick() {
    if(this.ruleList.length<1) {
      this.modalService.openModal(ScoringConfirmDefaultModalComponent, {
        width: '400px',
        data: {
          selectedIdx: -1
        }
      })
    } else {
      this.modalRef.cancel();
    }
  }
}
