import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CheckListItem } from '@app-components/list/interface';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss'],
})
export class CheckListComponent implements OnInit {
  @Output() scrolled = new EventEmitter<[number, number]>();

  @Input() data: CheckListItem[] = [];
  @Output() dataChange = new EventEmitter();
  @Input() height = '160px';

  items: CheckListItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.items = JSON.parse(JSON.stringify(this.data));
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("change")
    const dataProp = 'data';
    if (changes[dataProp] && !changes[dataProp].firstChange) {
      this.items = JSON.parse(JSON.stringify(changes[dataProp].currentValue || {}));
    }
  }

  onCheckChange(item: CheckListItem, checked: boolean) {
    const idx = this.items.find(ci => ci.value === item.value);

    if (idx) {
      idx.checked = checked;
      this.dataChange.emit(this.items);
    }
  }

  scrolledIndexChange(index: number) {
    // Emit scrolledIndex and offset to the bottom
    this.scrolled.emit([index, this.data.length - 1 - index]);
  }
}
