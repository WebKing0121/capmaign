import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { Event } from '@app-models/event';
import { NgSelectData } from '@app-core/models/common';

@Component({
  selector: 'app-events-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss']
})
export class EventModalComponent implements OnInit {
  @ViewChild('eventModal', { static: false }) eventModal;
  @Input() modalType = ModalType.New;
  @Input() event: Event;
  @Input() displayNameList: NgSelectData[] = [];
  @Input() folderList: NgSelectData[] = [];
  ModalType = ModalType;


  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const year = Number(moment().format('YYYY'));
    const month = Number(moment().format('MM'));
    const day = Number(moment().format('DD'));
    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      subject: ['', Validators.required],
      startDate: { year, month, day },
      startTime: ['', Validators.required],
      endDate: [moment().format('YYYY-MM-DD'), Validators.required],
      endTime: ['', Validators.required],
      displayName: ['', Validators.required],
      location: ['', Validators.required],
      template: '',
    });
  }

  show() {
    if (this.modalType === ModalType.Edit) {
      const { eventStartDate, eventEndDate, id, eventName, eventSubject, displayName, location, eventBody } = this.event;
      const startYear = Number(moment(eventStartDate).format('YYYY'));
      const startMonth = Number(moment(eventStartDate).format('MM'));
      const startDay = Number(moment(eventStartDate).format('DD'));
      const endYear = Number(moment(eventEndDate).format('YYYY'));
      const endMonth = Number(moment(eventEndDate).format('MM'));
      const endDay = Number(moment(eventEndDate).format('DD'));

      this.form.setValue({
        id,
        name: eventName,
        subject: eventSubject,
        startDate: {
          year: startYear,
          month: startMonth,
          day: startDay
        },
        startTime: moment(eventStartDate).format('HH:mm'),
        endDate: {
          year: endYear,
          month: endMonth,
          day: endDay
        },
        endTime: moment(eventEndDate).format('HH:mm'),
        displayName,
        location,
        template: eventBody,
      });
    } else {

    }
    setTimeout(() => this.eventModal.show());
  }

  hide() {
    this.eventModal.hide();
  }

  // event form submit
  onSaveEvent() {
    console.log(this.form.value);
  }

}
