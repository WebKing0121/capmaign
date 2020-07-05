import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageRecordsComponent } from './manage-records/manage-records.component';
import { DataListsComponent } from './lists/lists.component';
import { DataCustomFieldsComponent } from './custom-fields/custom-fields.component';
import { DataFiltersComponent } from './filters/filters.component';

const routes: Routes = [
  {
    path: 'manage-records',
    component: ManageRecordsComponent
  },
  {
    path: 'lists',
    component: DataListsComponent
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
