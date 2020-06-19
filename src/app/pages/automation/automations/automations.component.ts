import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Automation } from '@app-models/automation';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AutomationService } from '@app-core/services/automation.service';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';
import { AutomationsMockData } from '@app-fake-db/automation-mock';

@Component({
  selector: 'app-automations',
  templateUrl: './automations.component.html',
  styleUrls: ['./automations.component.scss']
})
export class AutomationsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('automationModal', { static: false }) automationModal;

  private unsubscribe$ = new Subject();

  automations: Automation[];
  tableSource: DataTableSource<Automation> = new DataTableSource<Automation>(50);
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
    this.automations = AutomationsMockData;
  }

  ngOnInit(): void {
    // this.automationService.getAutomations(this.searchString, this.displayLimit, this.sortField, this.sortDirection, 0)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(
    //     data => {
    //       console.log(data);
    //     },
    //     error => {
    //       console.log('error', error.response);
    //     }
    //   );
    this._updateTable(this.automations);

  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'], frozenLeft: true },
      {
        name: 'Modification Date', prop: 'updated', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      },
      {
        name: 'Created Date', prop: 'created', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      },
      { name: 'Description', prop: 'description', sortable: true },
      { name: 'Status', prop: 'status', sortable: true },
      { name: 'Type', prop: 'type', sortable: true },

    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  _updateTable(automations: Automation[]) {
    this.tableSource.next(automations.slice(0, 50), automations.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          automations.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          automations.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }


  onActive(event) {
    // TODO: Simplify later
    if (event.type === 'click' && event.cellIndex === 0) {
      const automation: Automation = event.row as Automation;
      this.router.navigate([`/automation/edit/${automation.id}`]);
    }
  }

  onCreateAutomation() {
    this.router.navigate(['/automation/new']);
  }

}
