import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'collaborate',
        pathMatch: 'full'
      },
      {
        path: 'social',
        loadChildren: () => import('./pages/social/social.module').then(module => module.SocialModule)
      },
      {
        path: 'collaborate',
        loadChildren: () => import('./pages/collaborate/collaborate.module').then(module => module.CollaborateModule)
      },
      {
        path: 'data',
        loadChildren: () => import('./pages/data/data.module').then(module => module.DataModule)
      },
      {
        path: 'automation',
        loadChildren: () => import('./pages/automation/automation.module').then(module => module.AutomationModule)
      },
      {
        path: 'events',
        loadChildren: () => import('./pages/events/events.module').then(module => module.EventsModule)
      },
      {
        path: 'campaign',
        loadChildren: () => import('./pages/campaign/campaign.module').then(module => module.CampaignModule)
      },
      {
        path: 'mobile',
        loadChildren: () => import('./pages/mobile/mobile.module').then(module => module.MobileModule)
      },
      {
        path: 'advertising',
        loadChildren: () => import('./pages/advertising/advertising.module').then(module => module.AdvertisingModule)
      },
      {
        path: 'scoring',
        loadChildren: () => import('./pages/scoring/scoring.module').then(module => module.ScoringModule)
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./pages/authentication/authentication.module').then(module => module.AuthenticationModule)
      },
    ]
  },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
