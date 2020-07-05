import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataRecordsComponent } from './records/records.component';
import { DataListsComponent } from './lists/lists.component';
import { DataCustomFieldsComponent } from './custom-fields/custom-fields.component';
import { DataFiltersComponent } from './filters/filters.component';
import { DataListValuesComponent } from './list-values/list-values.component';

const routes: Routes = [
  {
    path: 'records',
    component: DataRecordsComponent
  },
  {
    path: 'lists',
    component: DataListsComponent
  },
  {
    path: 'list-values',
    component: DataListValuesComponent
  },
  {
    path: 'custom-fields',
    component: DataCustomFieldsComponent
  },
  {
    path: 'filters',
    component: DataFiltersComponent
  },
  {
    path: '**',
    redirectTo: 'manage-records'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule { }
