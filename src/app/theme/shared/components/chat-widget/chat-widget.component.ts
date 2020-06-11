import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss']
})
export class ChatWidgetComponent implements OnInit {

  isOpened: boolean;
  newMessages: number;
  constructor() {
    this.isOpened = false;
    this.newMessages = 8;
  }

  ngOnInit(): void {
  }

}
