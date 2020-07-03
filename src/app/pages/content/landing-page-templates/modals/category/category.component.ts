import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing-page-template-category-modal',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class LandingPageTemplateCategoryModalComponent implements OnInit {
  @Input() modalType = ModalType.New;
  @Input() category: any;
  @ViewChild('categoryModal', { static: false }) categoryModal;
  ModalType = ModalType;

  form: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
    });
  }
  show() {
    if (this.modalType === ModalType.New) {
      this.form.setValue({
        id: 0,
        name: '',
      });
    } else {

      const { categoryId, category } = this.category;
      this.form.setValue({
        id: categoryId,
        name: category
      });
    }
    setTimeout(() => this.categoryModal.show());
  }

  hide() {
    this.categoryModal.hide();
  }
}
