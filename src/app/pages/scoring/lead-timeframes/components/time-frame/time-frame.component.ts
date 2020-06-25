import { Component, OnInit } from '@angular/core';
import { LeadTimeframesComponent } from '../../lead-timeframes.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-time-frame',
  templateUrl: './time-frame.component.html',
  styleUrls: ['./time-frame.component.scss']
})
export class TimeFrameComponent implements OnInit {

  public uniqueKey: number;
  public parentRef: LeadTimeframesComponent;

  leadScoringTypeList = [
    {
      id: '1',
      value: 'Less than 30 days'
    },
    {
      id: '2',
      value: 'Less than 60 days'
    },
    {
      id: '3',
      value: 'Less than 90 days'
    },
    {
      id: '4',
      value: 'Less than 180 days'
    },
    {
      id: '5',
      value: 'Less than 360 days'
    },
    {
      id: '6',
      value: 'Less than 700 days'
    }
  ];

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      timeFrameType: '',
      weightage: 0,
      positive: false,
      negative: false
    });
  }

  remove_me() {
    this.parentRef.remove(this.uniqueKey);
  }
}
