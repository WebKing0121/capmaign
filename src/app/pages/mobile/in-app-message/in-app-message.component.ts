import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-in-app-message',
  templateUrl: './in-app-message.component.html',
  styleUrls: ['./in-app-message.component.scss']
})
export class InAppMessageComponent implements OnInit {

  step: boolean[];
  constructor() {
    this.step = [true, false, false, false, false];
  }

  ngOnInit(): void {
  }

  openContent(tab: number) {
    this.step = this.step.map(flag => flag=false);
    this.step[tab] = true;
  }
}
