import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadScoringComponent } from './lead-scoring/lead-scoring.component';
import { LeadGradingComponent } from './lead-grading/lead-grading.component';
import { LeadCategoryComponent } from './lead-category/lead-category.component';
import { LeadTimeframesComponent } from './lead-timeframes/lead-timeframes.component';
import { CreateLeadScoringComponent } from './create-lead-scoring/create-lead-scoring.component';
import { CreateLeadGradingComponent } from './create-lead-grading/create-lead-grading.component';


const routes: Routes = [
  {
    path: 'lead-category',
    component: LeadCategoryComponent
  },
  {
    path: 'lead-scoring',
    component: LeadScoringComponent
  },
  {
    path: 'lead-grading',
    component: LeadGradingComponent
  },
  {
    path: 'lead-timeframes',
    component: LeadTimeframesComponent
  },
  {
    path: 'lead-scoring/create-new-scoring', component: CreateLeadScoringComponent
  },
  {
    path: 'lead-grading/create-new-grading', component: CreateLeadGradingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoringRoutingModule {
  
}
