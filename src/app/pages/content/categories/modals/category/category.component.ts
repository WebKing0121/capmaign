import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ContentService } from '@app-core/services/content.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-content-category-modal',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class ContentCategoryModalComponent implements OnInit, OnDestroy {
  @Input() modalType = ModalType.New;
  @Input() category: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  @ViewChild('categoryModal', { static: false }) categoryModal;

  private unsubscribe$ = new Subject();

  ModalType = ModalType;
  loading = false;
  form: FormGroup;
  constructor(
    private contentService: ContentService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  show() {
    if (this.modalType === ModalType.New) {
      this.form.setValue({
        id: 0,
        name: '',
      });
    } else {

      const { id, names } = this.category;
      this.form.setValue({
        id,
        name: names
      });
    }
    setTimeout(() => this.categoryModal.show());
  }

  hide() {
    this.categoryModal.hide();
  }

  onDelete() {
    this.delete.emit();
  }

  onSave() {
    const {
      name,
      id,
    } = this.form.value;

    if (this.modalType === ModalType.Edit) {
      this.loading = true;

      const params = {
        names: name,
        id,
      };
      this.contentService.updateCategory(params)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.loading = false;
            this.hide();
            this.save.emit();
          },
          error => {
            this.loading = false;
            console.log('error', error.response);
          }
        );
    } else {
      this.loading = true;

      const params = {
        names: name
      };

      this.contentService.createCategory(params)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.loading = false;
            this.hide();
            this.save.emit();
          },
          error => {
            this.loading = false;
            console.log('error', error.response);
          }
        );
    }
  }
}
