import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, ViewRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RuleComponent } from './rule/rule.component';
import { ModalService } from '@app-components/modal/modal.service';
import { ScoringConfirmDefaultModalComponent } from '../components/scoring-confirm-default-modal/scoring-confirm-default-modal.component';
import { ModalRef, MODAL_DATA } from '@app-components/modal/modal-ref';
import { Grading } from '@app-core/models/scoring';

interface ComponentProps {
  grading: Grading;
  mode: string;
}

@Component({
  selector: 'app-create-lead-grading',
  templateUrl: './create-lead-grading.component.html',
  styleUrls: ['./create-lead-grading.component.scss']
})
export class CreateLeadGradingComponent implements OnInit {
  grading: Grading;
  gradingMode: 'new' | 'edit';

  @ViewChild('ruleList', { read: ViewContainerRef })
  ruleList: ViewContainerRef;

  childUniqueKey: number;
  rulesReferences = Array<ComponentRef<RuleComponent>>();
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: ModalService,
    @Inject(ModalRef) private modalRef: ModalRef<CreateLeadGradingComponent>,
    @Inject(MODAL_DATA) private props: ComponentProps
    ) {
    this.childUniqueKey = 0;
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      searchLeadItem: '',
      profileName: [this.props.grading && this.props.grading.name, [Validators.required]],
      profileDescription: this.props.grading && this.props.grading.description
    });

    this.gradingMode = this.props.mode === 'new' ? 'new' : 'edit';
  }

  onSearch(e) {
  }

  add() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(RuleComponent);
    const ruleRef = this.ruleList.createComponent(componentFactory);
    const rule = ruleRef.instance;
    rule.uniqueKey = ++this.childUniqueKey;
    rule.parentRef = this;
    this.rulesReferences.push(ruleRef);
  }

  remove(key: number) {
    if (this.ruleList.length < 1) {
      return;
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

  onSaveClick() {
    if (this.ruleList.length < 1) {
      this.modalService.openModal(ScoringConfirmDefaultModalComponent, {
        width: '400px',
        data: {
          selectedIdx: -1
        }
      });
    } else {
      this.modalRef.cancel();
    }
  }
}
