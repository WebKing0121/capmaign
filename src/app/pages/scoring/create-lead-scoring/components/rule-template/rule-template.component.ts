import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LeadScoringTemplateComponent } from '../lead-scoring-template/lead-scoring-template.component';

@Component({
  selector: 'app-rule-template',
  templateUrl: './rule-template.component.html',
  styleUrls: ['./rule-template.component.scss']
})
export class RuleTemplateComponent implements OnInit {

  public unique_key: number;
  public parentRef: LeadScoringTemplateComponent;

  formGroup:FormGroup;


  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      description: '',
      condition: '',
      value: '',
      points: 0
    });
  }

  remove_me() {
    this.parentRef.remove(this.unique_key);
  }
}
