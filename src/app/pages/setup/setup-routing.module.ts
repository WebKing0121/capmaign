import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShortcutsComponent } from './shortcuts/shortcuts.component';
import { UsageDashboardComponent } from './usage-dashboard/usage-dashboard.component';

const routes: Routes = [
  {
    path: 'shortcuts',
    component: ShortcutsComponent
  },
  {
    path: 'usage-dashboard',
    component: UsageDashboardComponent
  },
  {
    path: '**',
    redirectTo: 'shortcuts'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
