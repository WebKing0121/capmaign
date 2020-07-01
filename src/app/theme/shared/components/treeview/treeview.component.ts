import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.scss']
})
export class TreeviewComponent implements OnInit {
  @Input() checkable: boolean;
  @Input() list: any[];

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

}
