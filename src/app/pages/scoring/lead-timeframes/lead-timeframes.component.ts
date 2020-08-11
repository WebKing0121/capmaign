import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ScoringService } from '@app-core/services/scoring.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lead-timeframes',
  templateUrl: './lead-timeframes.component.html',
  styleUrls: ['./lead-timeframes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScoringLeadTimeframesComponent implements OnInit, OnDestroy {
  childUniqueKey: number;
  scoringProfileId = '';

  destroy$ = new Subject();
  selected = [];
  leadScoringTypeList = [];
  loading = false;
  leadScoringTimeFrame: any;
  timeframes: any[] = [];
  filteredTimeframes: any[] = [];
  timeList = [
    {
      id: '30',
      value: 'Less than 30 days'
    },
    {
      id: '60',
      value: 'Less than 60 days'
    },
    {
      id: '90',
      value: 'Less than 90 days'
    },
    {
      id: '180',
      value: 'Less than 180 days'
    },
    {
      id: '360',
      value: 'Less than 360 days'
    },
    {
      id: '700',
      value: 'Less than 700 days'
    }
  ];

  constructor(
    private scoringService: ScoringService
  ) {
    this.childUniqueKey = 0;
  }

  ngOnInit(): void {
    this.loadScoringTypeList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onChange(profileId) {
    this.loadScoringTimeFrame(profileId);
  }

  loadScoringTypeList() {
    const params = {
      SortDirection: 'Ascending',
      maxResultCount: 1000,
      skipCount: 0,
      sorting: '',
    };
    this.loading = true;
    this.scoringService.getLeadScoringProfiles(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          if (data.result) {
            this.leadScoringTypeList = data.result.items.map(x => ({ value: `${x.id}`, label: x.name }));
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }

  loadScoringTimeFrame(profileId) {
    this.scoringService.getLeadScoringTimeFrame(+profileId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          if (data.result) {
            this.childUniqueKey = 0;
            this.leadScoringTimeFrame = data.result;
            this.timeframes = this.leadScoringTimeFrame.timeFrames;
            this.filteredTimeframes = this.timeframes.filter(x => !x.isDeleted);
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }

  addTimeFrame() {
    if (this.scoringProfileId === '') {
      return;
    }

    this.childUniqueKey++;
    const timeFrame = {
      id: `new_${this.childUniqueKey}`,
      isDeleted: true,
      percent: 0,
      timeFrame: 30,
      type: 1,
    };
    this.timeframes.push(timeFrame);
    this.filteredTimeframes = this.timeframes.filter(x => !x.isDeleted);
  }

  removeTimeFrame(timeFrameId) {
    this.timeframes.find(x => x.id === timeFrameId).isDeleted = true;
    this.filteredTimeframes = this.timeframes.filter(x => !x.isDeleted);
  }

  onSaveClick() {
    this.timeframes.forEach(x => {
      if (isNaN(x.id)) {
        delete x.id;
      }
    });

    const params = {
      ...this.leadScoringTimeFrame,
      timeFrames: this.timeframes
    };
    this.loading = true;
    this.scoringService.saveLeadScoringTimeFrame(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }
}
