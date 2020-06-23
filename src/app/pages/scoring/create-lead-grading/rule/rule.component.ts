import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CreateLeadGradingComponent } from '../create-lead-grading.component';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit {

  public unique_key: number;
  public parentRef: CreateLeadGradingComponent;

  formGroup:FormGroup;
  
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      description: '',
      min: 0,
      max: 0,
      grade: ''
    });
  }

  remove() {
    this.parentRef.remove(this.unique_key);
  }
}
