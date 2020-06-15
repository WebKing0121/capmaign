import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js';
import { ApexChartService } from './apex-chart.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-apex-chart',
  templateUrl: './apex-chart.component.html',
  styleUrls: ['./apex-chart.component.scss']
})
export class ApexChartComponent implements OnInit, OnDestroy {
  @Input() chartID: string;
  @Input() chartConfig: any;
  @Input() xAxis: any;
  @Input() newData: any;

  private unsubscribe$ = new Subject();

  public chart: any;

  constructor(private apexEvent: ApexChartService) { }

  ngOnInit() {
    setTimeout(() => {
      this.chart = new ApexCharts(document.querySelector('#' + this.chartID), this.chartConfig);
      this.chart.render();
    });

    this.apexEvent.changeTimeRange.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      if (this.xAxis) {
        this.chart.updateOptions({
          xaxis: this.xAxis
        });
      }
    });

    this.apexEvent.changeSeriesData.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      if (this.newData) {
        this.chart.updateSeries([{
          data: this.newData
        }]);
      }
    });
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
