import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-advertise-adsimulator',
  templateUrl: './ad-simulator.component.html',
  styleUrls: ['./ad-simulator.component.scss']
})
export class AdSimulatorComponent {
  iFramePath = 'https://app.geru.com/canvas';
  urlSafe;
  constructor(
    public sanitizer: DomSanitizer
  ) {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.iFramePath);
  }
}
