import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() width: number;
  @Input() height: number;

  @HostBinding('class')
  @Input() classes = '';

  constructor() { }

  ngOnInit() {
  }

}
