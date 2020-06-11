import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { CampaignResponseMockData } from 'src/app/fack-db/campaign-mock'

@Component({
    selector: 'app-campaign',
    templateUrl: './campaign.component.html',
    styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit, AfterViewInit {

    value = '';
    types: string[] = [
        'Create Email Campaign',
        'Create Mobile Campaign',
        'Create Social Campaign',
        'Create Google Ads Campaign',
        'Create Facebook Campaign',
    ];

    columns: any[] = [
        {mark: true, label: 'Name'},
        {mark: true, label: 'Subject'},
        {mark: true, label: 'Type'},
        {mark: true, label: 'Modification Date'},
        {mark: true, label: 'Created Date'},
        {mark: true, label: 'Last sent'},
        {mark: true, label: 'Scheduled'},
    ];

    mockData: any[] = CampaignResponseMockData;

    displayedColumns: string[] = ['check', 'name', 'subject', 'type', 'modificationdate', 'createddate', 'lastsent', 'scheduled'];
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    selectedCampaigns: any[] = [];

    dataSource: MatTableDataSource<any>;
    selection = new SelectionModel<any>(true, []);

    constructor() { }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<any>([]);
        this.dataSource.data = this.mockData;
        this.dataSource.filterPredicate = (data: any, filter) => {
            const dataStr = JSON.stringify(data).toLowerCase();
            return dataStr.indexOf(filter) !== -1;
        };
    }

    ngAfterViewInit(): void {
        this.sortData();
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    onClose() {
        this.value = '';
        this.applyFilter(this.value);
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        if (this.isAllSelected()) {
            this.selectedCampaigns.length = 0;
            this.selection.clear();
        } else {
            this.selectedCampaigns.length = 0;
            this.dataSource.data.forEach(element => {
                this.selection.select(element);
                this.selectedCampaigns.push(element);
            });
        }
        console.log('-----', this.selectedCampaigns);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(element?: any): string {
        if (!element) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(element) ? 'deselect' : 'select'} element ${element.name}`;  // use index
    }

    removeElement(element) {
        this.selectedCampaigns = this.selectedCampaigns.filter(c => c !== element);
    }

    checkboxSelection($event, element) {
        $event.stopPropagation();
        this.selection.isSelected(element) ? this.removeElement(element) : this.selectedCampaigns.push(element);
        console.log('checkboxSelection func ----------', this.selectedCampaigns);
    }

    sortData() {
        this.dataSource.sortingDataAccessor = (item, property) => {
            return item[property];
        };
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    isVisible(column: any, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        column.mark = !column.mark;
    }
}
