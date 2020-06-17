import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Automation } from '@app-models/automation';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AutomationService } from 'src/app/_services/automation.service';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';

@Component({
  selector: 'app-automations',
  templateUrl: './automations.component.html',
  styleUrls: ['./automations.component.scss']
})
export class AutomationsComponent implements OnInit, OnDestroy {
  @ViewChild('automationModal', { static: false }) automationModal;
  
  private unsubscribe$ = new Subject();

  tableSource: DataTableSource<Automation> = new DataTableSource<Automation>(50);
  columns: DataTableColumn[] = [
    { name: 'Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'] },
    { name: 'Modification Date', prop: 'updated', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' } },
    { name: 'Created Date', prop: 'created', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' } },
    { name: 'Description', prop: 'subject', sortable: true },
    { name: 'Status', prop: 'status', sortable: true },
    { name: 'Type', prop: 'type', sortable: true},
    
  ];
  selected: Automation[] = [];
  
  searchString: string;
  displayLimit: number;
  sortField: string;
  sortDirection: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private automationService: AutomationService
  ) {
    
    this.searchString = '';
    this.displayLimit = 50;
    this.sortField = '';
    this.sortDirection = 0;
  }

  ngOnInit(): void {
    this.automationService.getAutomations(this.searchString, this.displayLimit, this.sortField, this.sortDirection, 0)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log('error', error.response);
        }
      );
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onActive(event) {
    // TODO: Simplify later
    if (event.type === 'click' && event.cellIndex === 1) {
      this.router.navigate([(event.row as Automation).id], {relativeTo: this.route});
    }
  }

  onCreateAutomation() {
    this.router.navigate(['/automation/new']);
  }

}
