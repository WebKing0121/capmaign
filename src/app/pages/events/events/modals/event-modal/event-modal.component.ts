import { Component, OnInit, ViewChild, Input, ViewEncapsulation, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { Event } from '@app-models/event';
import { NgSelectData } from '@app-models/common';
import { Subject } from 'rxjs';
import { EventService } from '@app-core/services/event.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-events-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EventModalComponent implements OnInit, OnDestroy {
  @ViewChild('eventModal', { static: false }) eventModal;
  @Input() modalType = ModalType.New;
  @Input() event: Event;
  @Input() displayNameList: NgSelectData[] = [];
  @Input() folderList: NgSelectData[] = [];
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @ViewChild('emailCampaignEditor', { static: false }) emailCampaignEditor;

  ModalType = ModalType;
  private unsubscribe$ = new Subject();
  form: FormGroup;
  loading = false;
  eventFromDB: any;

  constructor(
    private eventService: EventService,
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
      location: '',
      template: '',
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  show() {
    if (this.modalType === ModalType.Edit) {
      this.loading = true;
      this.eventService.getEvent(this.event.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            this.eventFromDB = data.result;
            this.loading = false;
            const {
              eventStartDate, eventEndDate, id, eventName, eventSubject,
              displayName, location, eventBody
            } = data.result;
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
              displayName: this.getDisplayNameKey(displayName),
              location,
              template: eventBody,
            });
          },
          error => {
            this.loading = false;
            console.log('error', error.response);
          }
        );

    } else {
      this.form.setValue({
        id: 0,
        name: '',
        subject: '',
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null,
        displayName: '',
        location: '',
        template: '',
      });
    }
    setTimeout(() => this.eventModal.show());
  }


  hide() {
    this.eventModal.hide();
  }

  onDelete() {
    this.delete.emit();
  }

  getDisplayNameKey(displayName: string): string {
    console.log('displayName', displayName);
    const findOne = this.displayNameList.find(x => x.label === displayName);
    if (findOne) {
      return findOne.value;
    }
    return '';
  }

  getDisplayName(displayNameKey: string): string {
    console.log('displayNameKey', displayNameKey);
    const findOne = this.displayNameList.find(x => x.value === displayNameKey);
    if (findOne) {
      return findOne.label;
    }
    return '';
  }

  onSave() {
    const {
      id,
      name,
      subject,
      startDate,
      startTime,
      endDate,
      endTime,
      displayName,
    } = this.form.value;

    if (this.modalType === ModalType.Edit) {
      this.loading = true;

      const params = {
        ...this.eventFromDB,
        displayName,
        eventBody: this.emailCampaignEditor.getValue(),
        eventEndDate: new Date(endDate.year, endDate.month, endDate.day),
        eventEndTime: endTime,
        eventName: name,
        eventStartDate: new Date(startDate.year, startDate.month, startDate.day),
        eventStartTime: startTime,
        eventSubject: subject,
        rawBodyText: this.emailCampaignEditor.getValue(),
      };
      this.eventService.createEvent(params)
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
      /*
        displayName: "CampaignToCash"
        eventBody: "<!DOCTYPE html>↵<html>↵<head>↵</head>↵<body>↵<p>sdafsdf</p>↵</body>↵</html>"
        eventEndDate: "2020-07-30T10:12:00.000Z"
        eventEndTime: "6:12 AM"
        eventName: "test-02"
        eventStartDate: "2020-07-28T10:11:00.000Z"
        eventStartTime: "6:11 AM"
        eventSubject: "test-02"
        folderId: 1
        fromAddressId: 4
        location: ""
        personalization: ""
        rawBodyText: "<!DOCTYPE html>↵<html>↵<head>↵</head>↵<body>↵<p>sdafsdf</p>↵</body>↵</html>"
        replyAddressId: 4
        sendEventType: ""
        senderid: 4
      */
      const params = {
        displayName: this.getDisplayName(displayName),
        eventBody: this.emailCampaignEditor.getValue(),
        eventEndDate: new Date(endDate.year, endDate.month, endDate.day),
        eventEndTime: endTime,
        eventName: name,
        eventStartDate: new Date(startDate.year, startDate.month, startDate.day),
        eventStartTime: startTime,
        eventSubject: subject,
        rawBodyText: this.emailCampaignEditor.getValue(),
        folderId: 1,
        fromAddressId: Number(displayName),
        location: '',
        personalization: '',
        replyAddressId: Number(displayName),
        sendEventType: '',
        senderid: Number(displayName),
      };

      this.eventService.createEvent(params)
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
