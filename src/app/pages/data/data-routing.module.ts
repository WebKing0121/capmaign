import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageRecordsComponent } from './manage-records/manage-records.component';
import { ListsComponent } from './lists/lists.component';
import { CustomFieldsComponent } from './custom-fields/custom-fields.component';
import { FiltersComponent } from './filters/filters.component';

const routes: Routes = [
  {
    path: 'manage-records',
    component: ManageRecordsComponent
  },
  {
    path: 'lists',
    component: ListsComponent
  },
  {
    path: 'custom-fields',
    component: CustomFieldsComponent
  },
  {
    path: 'filters',
    component: FiltersComponent
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
