import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutomationsComponent } from './automations/automations.component';
import { AutomationComponent } from './automation/automation.component';
const routes: Routes = [
  
  {
    path: 'automations',
    component: AutomationsComponent
  },
  {
    path: 'new',
    component: AutomationComponent
  },
  {
    path: 'edit/:id',
    component: AutomationComponent
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
