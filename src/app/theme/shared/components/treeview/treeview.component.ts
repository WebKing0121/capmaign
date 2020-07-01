import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.scss']
})
export class TreeviewComponent implements OnInit {
  @Input() checkable: boolean;
  @Input() primaryKey: string;
  @Input() list: any[];
  @Input() selectedNode: any;
  @Output() selectItem: EventEmitter<any> = new EventEmitter();

  treedata: any[];

  constructor() { }

  ngOnInit(): void {
  }

  onCheckTree(node) {
    this.checkChildren(node, node.checked);
  }

  checkChildren(node, value) {
    node.children.forEach(element => {
      element.checked = value;
      if (element.children.length > 0) {
        this.checkChildren(element, value);
      }
    });
  }

  onExpandTree(node) {
    node.expanded = !node.expanded;
  }

  onClickItem(node) {
    this.selectItem.emit(node);
  }
}
