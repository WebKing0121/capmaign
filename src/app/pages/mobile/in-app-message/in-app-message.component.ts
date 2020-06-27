import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-in-app-message',
  templateUrl: './in-app-message.component.html',
  styleUrls: ['./in-app-message.component.scss']
})
export class InAppMessageComponent implements OnInit {

  optionList: string[];
  step: boolean[];
  constructor() {
    this.step = [true, false, false, false, false, false];
  }

  ngOnInit(): void {
    this.optionList = ['Tesh Header', 'UAT Header', 'UAT1010', 'Test In App', 'Test InApp'];
  }

  openContent(tab: number) {
    this.step = this.step.map(flag => flag = false);
    this.step[tab] = true;
  }
}
