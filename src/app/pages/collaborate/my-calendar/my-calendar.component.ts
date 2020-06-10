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
  calendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'prev next today',
      center: 'title',
      end: 'dayGridMonth timeGridWeek timeGridDay'
    },
    dateClick: (info)=> this.onClickDate(info),
    droppable: true,
  };

  eventTypes = [
    {value: 'all-day-event', label: 'All Day Event'},
    {value: 'time-event', label: 'Time Event'}
  ];
  
  eventType: string;


  constructor() {
    this.selectedDate = '';
    this.schedules = [];
    this.eventType = 'time-event';
  }

  ngOnInit(): void {
  }

  onClickDate(info) {
    this.selectedDate = moment(info.dateStr).format('YYYY-MM-DD');
    if (info.view.type === 'dayGridMonth') {
      if (this.prevDayElement) {
        this.prevDayElement.className = this.prevDayElement.className.replace(' selected', '');
      }
      info.dayEl.className += " selected";
      this.prevDayElement = info.dayEl;
    }
  }

  onClickCreateEvent() {
    this.newEventModal.show();
  }

  
}
