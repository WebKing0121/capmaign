import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShortcutsComponent } from './shortcuts/shortcuts.component';

const routes: Routes = [
  {
    path: 'shortcuts',
    component: ShortcutsComponent
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
