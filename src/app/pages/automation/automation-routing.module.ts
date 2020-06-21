import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutomationsComponent } from './automations/automations.component';

const routes: Routes = [
  {
    path: 'automations',
    component: AutomationsComponent
  },
  {
    path: '**',
    redirectTo: 'automations'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomationRoutingModule { }
