import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ScoringRoutingModule } from './scoring-routing.module';
import { LeadScoringComponent } from './lead-scoring/lead-scoring.component';
import { LeadGradingComponent } from './lead-grading/lead-grading.component';
import { LeadCategoryComponent } from './lead-category/lead-category.component';
import { LeadTimeframesComponent } from './lead-timeframes/lead-timeframes.component';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { ScoringConfirmDefaultModalComponent } from './components/scoring-confirm-default-modal/scoring-confirm-default-modal.component';
import { CreateLeadScoringComponent } from './create-lead-scoring/create-lead-scoring.component';
import { CreateLeadGradingComponent } from './create-lead-grading/create-lead-grading.component';
import { RuleComponent } from './create-lead-grading/rule/rule.component';
import { LeadScoringTemplateComponent } from './create-lead-scoring/components/lead-scoring-template/lead-scoring-template.component';
import { RuleTemplateComponent } from './create-lead-scoring/components/rule-template/rule-template.component';


@NgModule({
  declarations: [
    LeadScoringComponent,
    LeadGradingComponent,
    LeadCategoryComponent,
    LeadTimeframesComponent,
    ScoringConfirmDefaultModalComponent,
    CreateLeadScoringComponent,
    CreateLeadGradingComponent,
    RuleComponent,
    LeadScoringTemplateComponent,
    RuleTemplateComponent
  ],
  imports: [
    CommonModule,
    ScoringRoutingModule,
    DatatableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ScoringModule { }
