import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { EventListsComponent } from './event-lists/event-lists.component';

const routes: Routes = [
  {
    path: 'lists',
    component: EventListsComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: '**',
    redirectTo: 'events'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
