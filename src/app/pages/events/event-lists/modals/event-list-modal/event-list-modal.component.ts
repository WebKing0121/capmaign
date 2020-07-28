import { Component, OnInit, ViewChild, Input, ViewEncapsulation, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { NgSelectData } from '@app-models/common';
import { EventService } from '@app-core/services/event.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-events-event-list-modal',
  templateUrl: './event-list-modal.component.html',
  styleUrls: ['./event-list-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventListModalComponent implements OnInit, OnDestroy {
  @ViewChild('eventListModal', { static: false }) eventListModal;
  @Input() modalType = ModalType.New;
  @Input() eventList: any;
  @Input() typeList: NgSelectData[] = [];
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  ModalType = ModalType;

  private unsubscribe$ = new Subject();
  form: FormGroup;

  loading = false;
  constructor(
    private eventService: EventService,
    private fb: FormBuilder
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
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  show() {
    if (this.modalType === ModalType.Edit) {
      const { listId, name, description, folderId, type } = this.eventList;
      this.form.setValue({
        id: listId,
        name,
        description,
        folderId,
        type,
      });
    } else {
      this.form.setValue({
        id: 0,
        name: '',
        description: '',
        folderId: '0',
        type: ''
      });
    }

    setTimeout(() => this.eventListModal.show());
  }

  hide() {
    this.eventListModal.hide();
  }

  // event form submit
  onSaveList() {
    if (this.modalType === ModalType.New) {
      const createParam = {
        countrecords: '',
        description: this.form.value.description,
        folderId: 1,
        name: this.form.value.name,
        recordrange: '-',
        skiprecords: '',
        source: 'All Records',
        type: this.form.value.type,
      };
      this.eventService.createEventList(createParam)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            this.loading = false;
            this.save.emit();
            this.hide();
          },
          error => {
            this.loading = false;
            console.log('error', error.response);
          }
        );
    }
  }

  onDelete() {
    this.delete.emit();
  }
}
