import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import * as moment from 'moment';

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyCalendarComponent implements OnInit {
  @ViewChild('newEventModal', { static: false }) newEventModal;

  selectedDate: string;
  prevDayElement: any;
  schedules: any[];
  calendarOptions: any;

  eventTypes = [
    { value: 'all-day-event', label: 'All Day Event' },
    { value: 'time-event', label: 'Time Event' }
  ];

  eventType: string;

  constructor() {
    this.selectedDate = '';
    this.schedules = [];
    this.eventType = 'time-event';
  }

  ngOnInit(): void {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        start: 'prev next today',
        center: 'title',
        end: 'dayGridMonth timeGridWeek timeGridDay'
      },
      dateClick: (info: any) => this.onClickDate(info),
      droppable: true,
      editable: true,
      eventClick: (info: any) => this.onClickEvent(info),
      eventLimit: true, // for all non-TimeGrid views,
      views: {
        timeGrid: {
          eventLimit: 3,
        }
      },

      events: [
        {
          title: 'event1',
          start: '2020-06-13'
        },
        {
          title: 'event2',
          start: '2020-06-15',
          end: '2020-06-17'
        },
        {
          title: 'event3',
          start: '2020-06-09T12:30:00',
          allDay: false // will make the time show
        },
        {
          title: 'event4',
          start: '2020-06-09T13:30:00',
          allDay: false // will make the time show
        },
        {
          title: 'event5',
          start: '2020-06-09T14:30:00',
          allDay: false // will make the time show
        },
        {
          title: 'event6',
          start: '2020-06-09T15:30:00',
          allDay: false // will make the time show
        },
        {
          title: 'event7',
          start: '2020-06-09T16:30:00',
          allDay: false // will make the time show
        },
        {
          title: 'event8',
          start: '2020-06-09T17:30:00',
          allDay: false // will make the time show
        },
        {
          title: 'event9',
          start: '2020-06-09T18:30:00',
          allDay: false // will make the time show
        }
      ]
    };
  }

  onClickDate(info: any) {
    this.selectedDate = moment(info.dateStr).format('YYYY-MM-DD');
    if (info.view.type === 'dayGridMonth') {
      if (this.prevDayElement) {
        this.prevDayElement.className = this.prevDayElement.className.replace(' selected', '');
      }
      info.dayEl.className += ' selected';
      this.prevDayElement = info.dayEl;
    }
  }

  onClickEvent(info: any) {
    console.log(info);
  }

  onClickCreateEvent() {
    this.newEventModal.show();
  }


}
