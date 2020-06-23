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

  child_unique_key: number = 0;
  leadProfileReferences = Array<ComponentRef<LeadScoringTemplateComponent>>()

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(ModalRef) private modalRef: ModalRef<CreateLeadScoringComponent>,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      searchLeadItem: '',
      profileName: ['', [Validators.required]],
      profileDescription: ''
    })
  }

  onSearch(e) {
    console.log("_______________", e);
  }

  openProfile(type) {
    this.add();
  }

  add() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LeadScoringTemplateComponent);
    const leadScoringRef = this.leadProfileList.createComponent(componentFactory);
    let leadScoringItem = leadScoringRef.instance;
    leadScoringItem.unique_key = ++this.child_unique_key;
    leadScoringItem.parentRef = this;
    this.leadProfileReferences.push(leadScoringRef);
  }

  remove(key: number) {
    if (this.leadProfileList.length < 1) return;

    let componentRef = this.leadProfileReferences.filter(
      x => x.instance.unique_key == key
    )[0];

    let vcrIndex: number = this.leadProfileList.indexOf(componentRef.hostView);
    this.leadProfileList.remove(vcrIndex);
    this.leadProfileReferences = this.leadProfileReferences.filter(
      x => x.instance.unique_key !== key
    );
  }

  onSaveClick() {
    this.modalRef.cancel();
  }
}
