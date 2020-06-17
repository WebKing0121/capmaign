import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageRecordsComponent } from './manage-records/manage-records.component';
const routes: Routes = [
  {
    path: '**',
    redirectTo: 'manage-records'
  },
  {
    path: 'manage-records',
    component: ManageRecordsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule { }
