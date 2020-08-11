import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScoringLeadCategoryComponent } from './lead-category/lead-category.component';
import { ScoringLeadScoringComponent } from './lead-scoring/lead-scoring.component';
import { LeadGradingComponent } from './lead-grading/lead-grading.component';
import { LeadTimeframesComponent } from './lead-timeframes/lead-timeframes.component';

const routes: Routes = [
  {
    path: 'lead-category',
    component: ScoringLeadCategoryComponent
  },
  {
    path: 'lead-scoring',
    component: ScoringLeadScoringComponent
  },
  {
    path: 'lead-grading',
    component: LeadGradingComponent
  },
  {
    path: 'lead-timeframes',
    component: LeadTimeframesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoringRoutingModule {
}
