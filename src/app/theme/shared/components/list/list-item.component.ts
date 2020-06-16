import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @HostBinding('class.list-item') hostClassName = true;
  @HostBinding('class.hover') hoverClassName = false;

  @HostListener('mouseover') onMouseOver() {
    this.hoverClassName = true;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.hoverClassName = false;
  }

  constructor() { }

  ngOnInit() {
  }

}
