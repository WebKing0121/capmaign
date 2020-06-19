import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CollaborateChatRoom } from '@app-models/collaborate';
import { CollaborateChatRoomsMockData } from '@app-fake-db/collaborate-chat-users-mock';
import { CollaborateService } from '@app-services/collaborate.service';

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss']
})
export class ChatWidgetComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  route: string;
  isOpened: boolean;
  newMessages: number;

  myRooms: CollaborateChatRoom[];
  filteredRooms: CollaborateChatRoom[];
  searchKey: string;

  selectedRoomId: number;
  selectedRoom: CollaborateChatRoom;

  messages: any[];

  constructor(
    private collaborateService: CollaborateService,
    private location: Location,
    private router: Router
  ) {
    router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(val => {
      if (this.route !== location.path()) {
        this.selectedRoomId = 0;
        this.isOpened = false;
      }
      this.route = location.path();
    });

    this.isOpened = false;
    this.newMessages = 8;
    this.selectedRoomId = 0;
    this.searchKey = '';
    this.messages = [
      {
        message: 'hello',
        message_time: '2020-06-11 10:30:21',
        mine: 0,
      },
      {
        message: 'Hi! Good morning!',
        message_time: '2020-06-11 10:30:25',
        mine: 1,
      },
      {
        message: 'Good morning, I have some issues on creating new brand for this campaign.',
        message_time: '2020-06-11 10:31:16',
        mine: 0,
      },
      {
        message: 'Hi! Good morning!',
        message_time: '2020-06-11 10:30:25',
        mine: 1,
      },
      {
        message: 'Good morning, I have some issues on creating new brand for this campaign.',
        message_time: '2020-06-11 10:31:16',
        mine: 0,
      },
      {
        message: 'Hi! Good morning!',
        message_time: '2020-06-11 10:30:25',
        mine: 1,
      },
      {
        message: 'Good morning, I have some issues on creating new brand for this campaign.',
        message_time: '2020-06-11 10:31:16',
        mine: 0,
      },
      {
        message: 'Hi! Good morning!',
        message_time: '2020-06-11 10:30:25',
        mine: 1,
      },
      {
        message: 'Good morning, I have some issues on creating new brand for this campaign.',
        message_time: '2020-06-11 10:31:16',
        mine: 0,
      },

    ];
  }

  ngOnInit(): void {
    // this.cardTeams.setCardRefresh(true);
    // this.collaborateService.getChatUsers()
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(
    //     data => {
    //       this.myRooms = data;
    //       this.filteredRooms = [...this.myRooms];
    //     },
    //     error => {
    //       console.log('error', error);
    //     }
    //   );
    this.myRooms = CollaborateChatRoomsMockData;
    this.filteredRooms = [...this.myRooms];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getTimeAgo(time: string) {
    const momentTime = moment(time);
    if (!momentTime.isValid()) {
      return '';
    }
    if (momentTime.isSame(moment(), 'day')) {
      return momentTime.format('LT');
    } else if (momentTime.week() === moment().week()) {
      return momentTime.format('dddd');
    }
    return momentTime.format('YYYY-MM-DD');
  }

  getMessageTime(time: string) {
    return moment(time).format('LT');
  }

  openChatWidget() {
    this.isOpened = true;
    this.selectedRoomId = 0;
  }

  closeChatWidget() {
    this.isOpened = false;
  }

  onChangeSearchKey() {
    if (this.searchKey) {
      this.filteredRooms = this.myRooms.filter(room => room.name.indexOf(this.searchKey) >= 0);
    } else {
      this.filteredRooms = [...this.myRooms];
    }

  }

  onClickRoom(room: any) {
    this.selectedRoomId = room.id;
    this.selectedRoom = room;
  }

  onCloseChatDetails() {
    this.selectedRoomId = 0;
  }
}
