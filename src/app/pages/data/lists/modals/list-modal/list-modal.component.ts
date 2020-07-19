import { Component, OnInit, Input, ViewChild, OnDestroy, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { List } from '@app-models/list';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '@app-core/services/data.service';
import { takeUntil } from 'rxjs/operators';
import { NgSelectData } from '@app-models/common';

@Component({
  selector: 'app-data-list-modal',
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataListModalComponent implements OnInit, OnDestroy {
  @ViewChild('listModal', { static: false }) listModal;
  @Input() modalType = ModalType.New;
  @Input() list: List;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  ModalType = ModalType;
  private unsubscribe$ = new Subject();

  form: FormGroup;
  typeList: NgSelectData[];

  loading = false;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
  ) {
    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      description: ['', Validators.required],
      folderId: ['0', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.dataService.getTypeList()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.typeList = data;
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
    if (this.modalType === ModalType.Edit) {
      const { listId, name, description, folderId, type } = this.list;
      this.form.setValue({ id: listId, name, description, folderId: `${folderId}`, type });
    } else {
      this.form.setValue({
        id: 0,
        name: '',
        description: '',
        folderId: '0',
        type: ''
      });
    }
    setTimeout(() => this.listModal.show());
  }

  onSave() {
    const params = {
      name: this.form.value.name,
      description: this.form.value.description,
      type: this.form.value.type,
      folderId: 0,
      organizationUnitId: 0,
      countrecords: '',
      recordrange: '-',
      skiprecords: '',
      source: 'All Records',
    };

    this.loading = true;
    this.dataService.addList(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.save.emit();
          this.hide();
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }

  hide() {
    this.listModal.hide();
  }
}
