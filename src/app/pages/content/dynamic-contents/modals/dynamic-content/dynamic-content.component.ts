import { Component, OnInit, Input, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NgSelectData } from '@app-models/common';
import { ContentService } from '@app-core/services/content.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DynamicContent } from '@app-models/dynamic-content';

@Component({
  selector: 'app-content-dynamic-content-modal',
  templateUrl: './dynamic-content.component.html',
  styleUrls: ['./dynamic-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DynamicContentModalComponent implements OnInit, OnDestroy {
  @Input() modalType = ModalType.New;
  @Input() content: DynamicContent;
  @ViewChild('templateModal', { static: false }) templateModal;
  ModalType = ModalType;

  private unsubscribe$ = new Subject();

  fullScreen: boolean;
  dialogClass: string;

  categories: NgSelectData[];
  types: NgSelectData[];

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private contentService: ContentService
  ) {
    this.fullScreen = false;
    this.dialogClass = 'modal-dialog-centered ' + (this.fullScreen ? 'modal-fullscreen' : 'modal-xl');
  }

  ngOnInit(): void {
    // this.form = this.fb.group({
    //   id: 0,
    //   name: ['', Validators.required],
    //   description: '',
    //   category: ['', Validators.required],
    //   content: ['', Validators.required],
    // });

    this.types = [
      { value: '1', label: 'Content' },
      { value: '2', label: 'Condition' },
      { value: '3', label: 'Mobile Content' },
    ];

    const params = {
      SortDirection: 'Ascending',
      maxResultCount: 1000,
      skipCount: 0,
      sorting: '',
    };
    this.contentService.getCategories(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.categories = data.result.map(x => ({ value: `${x.categoryId}`, label: x.category }));
          } else {
            this.categories = [];
          }
        },
        error => {
          console.log('error', error.response);
        }
      );

  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  show() {
    if (this.modalType === ModalType.New) {

    } else {


    }
    setTimeout(() => this.templateModal.show());
  }

  hide() {
    this.templateModal.hide();
  }

  revertFullScreen() {
    this.fullScreen = !this.fullScreen;
    this.dialogClass = 'modal-dialog-centered ' + (this.fullScreen ? 'modal-fullscreen' : 'modal-xl');
  }
}
