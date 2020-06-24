import { Component, OnInit } from '@angular/core';
import { LeadCategoryModalComponent } from '../../lead-category-modal/lead-category-modal.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public uniqueKey: number;
  public parentRef: LeadCategoryModalComponent;

  formGroup: FormGroup;

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

  remove_me() {
    this.parentRef.remove(this.uniqueKey);
  }
}
