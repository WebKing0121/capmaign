import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { NgSelectData } from '@app-core/models/common';

@Component({
  selector: 'app-events-event-list-modal',
  templateUrl: './event-list-modal.component.html',
  styleUrls: ['./event-list-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventListModalComponent implements OnInit {
  @ViewChild('eventListModal', { static: false }) eventListModal;
  @Input() modalType = ModalType.New;
  @Input() eventList: any;
  @Input() typeList: NgSelectData[] = [];
  ModalType = ModalType;

  form: FormGroup;

  constructor(
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
    console.log(this.form.value);
  }

}
