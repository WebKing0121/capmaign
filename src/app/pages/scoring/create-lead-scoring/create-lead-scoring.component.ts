import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-lead-scoring',
  templateUrl: './create-lead-scoring.component.html',
  styleUrls: ['./create-lead-scoring.component.scss']
})
export class CreateLeadScoringComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      searchLeadItem: ""
    })
  }

  onSearch(e) {
    console.log("_______________", e);
  }
}
