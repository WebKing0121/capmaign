import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { NgSelectData } from '@app-core/models/common';
import { DataService } from '@app-core/services/data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-import-csv-modal',
  templateUrl: './import-csv-modal.component.html',
  styleUrls: ['./import-csv-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImportCsvModalComponent implements OnInit, OnDestroy {
  @ViewChild('importCSVModal', { static: false }) importCSVModal;

  accountList: NgSelectData[];
  leadCategoryList: NgSelectData[];
  mappingList: NgSelectData[];

  csvFields: any[];
  filteredCsvFields: any[];
  dbFields: any[];
  filteredDbFields: any[];
  searchCVS: string;
  searchDB: string;
  mappingFields: any[];
  uniqueSelected: number;
  private unsubscribe$ = new Subject();

  constructor(
    private dataService: DataService
  ) {
    this.accountList = [];
    this.leadCategoryList = [];
    this.mappingList = [];
    this.searchCVS = '';
    this.searchDB = '';
    this.uniqueSelected = 0;
    this.csvFields = [
      { id: 1, name: 'Id', hidden: false, },
      { id: 2, name: 'First Name', hidden: false, },
      { id: 3, name: 'Last Name', hidden: false, },
      { id: 4, name: 'Email Address', hidden: false, },
      { id: 5, name: 'Lead Source', hidden: false, },
      { id: 6, name: 'Industry', hidden: false, },
      { id: 7, name: 'Company zip', hidden: false, },
      { id: 8, name: 'Number of Employees', hidden: false, },
      { id: 9, name: 'Title of role', hidden: false, },
      { id: 10, name: 'Location', hidden: false, },
      { id: 11, name: 'Buy Time', hidden: false, },
      { id: 12, name: 'Tool', hidden: false, },
    ];
    this.dbFields = [
      { id: 1, name: 'Id', type: 'number', hidden: false, unique: false },
      { id: 2, name: 'First Name', type: 'string', hidden: false, unique: false },
      { id: 3, name: 'Last Name', type: 'string', hidden: false, unique: false },
      { id: 4, name: 'Email', type: 'string', hidden: false, unique: false },
      { id: 5, name: 'Lead Source', type: 'string', hidden: false, unique: false },
      { id: 6, name: 'Industry', type: 'string', hidden: false, unique: false },
      { id: 7, name: 'Company zip', type: 'string', hidden: false, unique: false },
      { id: 8, name: 'Number of Employees', type: 'number', hidden: false, unique: false },
      { id: 9, name: 'Title', type: 'string', hidden: false, unique: false },
      { id: 10, name: 'Location', type: 'string', hidden: false, unique: false },
      { id: 11, name: 'Buy Time', type: 'string', hidden: false, unique: false },
      { id: 12, name: 'Tool', type: 'boolean', hidden: false, unique: false },
    ];
    this.mappingFields = [];
  }


  ngOnInit(): void {
    this.searchCvsQuery(this.searchCVS);
    this.searchDbQuery(this.searchDB);

    this.dataService.getImportAccounts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.accountList = data.result.map(x => ({ value: `${x.id}`, label: `${x.name}` }));
          } else {
            this.accountList = [];
          }
        },
        error => {
          console.log('error', error.response);
        }
      );

    this.dataService.getImportLeadCategories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.leadCategoryList = data.result.map(x => ({ value: `${x.id}`, label: `${x.displayName}` }));
          } else {
            this.leadCategoryList = [];
          }
        },
        error => {
          console.log('error', error.response);
        }
      );

    this.dataService.getImportMappings()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.mappingList = data.result.map(x => ({ value: `${x.id}`, label: `${x.name}` }));
          } else {
            this.mappingList = [];
          }
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

  searchCvsQuery(searchQuery: string) {
    if (searchQuery === '') {
      this.filteredCsvFields = this.csvFields.filter(x => !x.hidden);
    } else {
      this.filteredCsvFields = this.csvFields.filter(x => !x.hidden)
        .filter(x => x.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0);
    }
  }

  searchDbQuery(searchQuery: string) {
    if (searchQuery === '') {
      this.filteredDbFields = this.dbFields.filter(x => !x.hidden);
    } else {
      this.filteredDbFields = this.dbFields.filter(x => !x.hidden)
        .filter(x => x.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0);
    }
  }

  onClickCSVFields(field: any) {
    if (this.mappingFields.length === 0) {
      this.mappingFields.push({
        left: true,
        leftField: field,
        right: false,
        rightField: null,
      });
      field.hidden = true;
      this.searchCvsQuery(this.searchCVS);
    } else {
      const lastIndex = this.mappingFields.length - 1;
      if (!this.mappingFields[lastIndex].left) {
        this.mappingFields[lastIndex].left = true;
        this.mappingFields[lastIndex].leftField = field;
        // this.csvFields = this.csvFields.filter(x => x.id != field.id);
        field.hidden = true;
        this.searchCvsQuery(this.searchCVS);
      } else {
        if (this.mappingFields[lastIndex].right) {
          this.mappingFields.push({
            left: true,
            leftField: field,
            right: false,
            rightField: null,
          });
          // this.csvFields = this.csvFields.filter(x => x.id != field.id);
          field.hidden = true;
          this.searchCvsQuery(this.searchCVS);
        }
      }
    }
  }

  onClickDBFields(field: any) {
    if (this.mappingFields.length === 0) {
      this.mappingFields.push({
        right: true,
        rightField: field,
        left: false,
        leftField: null,
      });
      // this.dbFields = this.dbFields.filter(x => x.id != field.id);
      field.hidden = true;
      this.searchDbQuery(this.searchDB);
    } else {
      const lastIndex = this.mappingFields.length - 1;
      if (!this.mappingFields[lastIndex].right) {
        this.mappingFields[lastIndex].right = true;
        this.mappingFields[lastIndex].rightField = field;
        // this.dbFields = this.dbFields.filter(x => x.id != field.id);
        field.hidden = true;
        this.searchDbQuery(this.searchDB);
      } else {
        if (this.mappingFields[lastIndex].left) {
          this.mappingFields.push({
            right: true,
            rightField: field,
            left: false,
            leftField: null,
          });
          // this.dbFields = this.dbFields.filter(x => x.id != field.id);
          field.hidden = true;
          this.searchDbQuery(this.searchDB);
        }
      }
    }
  }

  onClickRemoveMappingRow(index: number) {
    const mapRow = this.mappingFields[index];
    if (mapRow.left) {
      mapRow.leftField.hidden = false;
      this.searchCvsQuery(this.searchCVS);

    }
    if (mapRow.right) {
      mapRow.rightField.hidden = false;
      this.searchDbQuery(this.searchDB);
    }

    this.mappingFields.splice(index, 1);

  }

  onClickAutomapping() {
    this.csvFields.forEach(x => x.hidden = false);
    this.dbFields.forEach(x => x.hidden = false);
    this.mappingFields = [];
    this.csvFields.forEach(x => {
      const dbField = this.dbFields.find(y => y.name === x.name);
      if (dbField) {
        x.hidden = true;
        dbField.hidden = true;
        this.mappingFields.push({
          left: true,
          leftField: x,
          right: true,
          rightField: dbField
        });
      }
    });
    this.searchCvsQuery(this.searchCVS);
    this.searchDbQuery(this.searchDB);
  }

  onClickUniqueCheck(field: any) {
    field.unique = !field.unique;
    if (field.unique) {
      this.uniqueSelected++;
    } else {
      this.uniqueSelected--;
    }
  }

  getFirstLetter(str: string) {
    return str ? str.charAt(0) : '';
  }

  show() {
    this.importCSVModal.show();
  }

  hide() {
    this.importCSVModal.hide();
  }
}
