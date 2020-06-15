import { Component, OnInit } from '@angular/core';

import { PersonalizationData } from '@app-components/email-campaign-editor/personalization-data';

@Component({
  selector: 'app-personalization-selector',
  templateUrl: './personalization-selector.component.html',
  styleUrls: ['./personalization-selector.component.scss']
})
export class PersonalizationSelectorComponent implements OnInit {
  PersonalizationData = PersonalizationData;

  constructor() { }

  ngOnInit(): void {
  }

}
