import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Shortcuts } from '@app-core/enums/shortcuts.enum';

@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShortcutsComponent implements OnInit {
  @ViewChild('emailRange', { static: false }) emailRange;
  @ViewChild('smsRange', { static: false }) smsRange;
  @ViewChild('emailSendResult', { static: false }) emailSendResult;
  @ViewChild('smsSendResult', { static: false }) smsSendResult;
  shortcuts: any[];
  constructor(
    private router: Router,
  ) {
    this.shortcuts = [];
  }

  ngOnInit(): void {
    this.shortcuts = Shortcuts;
  }

  onClickShortcut(shortcut) {
    const { link } = shortcut;
    if (link !== '/') {
      if (link.startsWith('@modal#')) {
        this[link.substring(7)].show();
      } else {
        this.router.navigate([link]);
      }
    }
  }

}
