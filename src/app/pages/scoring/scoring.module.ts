import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { ScoringRoutingModule } from './scoring-routing.module';

import { ScoringLeadCategoryComponent } from './lead-category/lead-category.component';
import { ScoringLeadCategoryModalComponent } from './lead-category/modals/lead-category/lead-category.component';

import { ScoringLeadScoringComponent } from './lead-scoring/lead-scoring.component';
import { ScoringLeadScoringModalComponent } from './lead-scoring/modals/lead-scoring/lead-scoring.component';


import { LeadGradingComponent } from './lead-grading/lead-grading.component';

import { LeadTimeframesComponent } from './lead-timeframes/lead-timeframes.component';
import { ScoringConfirmDefaultModalComponent } from './components/scoring-confirm-default-modal/scoring-confirm-default-modal.component';
import { CreateLeadGradingComponent } from './create-lead-grading/create-lead-grading.component';
import { RuleComponent } from './create-lead-grading/rule/rule.component';
// import { LeadCardComponent } from './lead-scoring/modals/create-lead-scoring/components/lead-card/lead-card.component';
// import { RuleTemplateComponent } from './lead-scoring/modals/create-lead-scoring/components/rule-template/rule-template.component';


import { TimeFrameComponent } from './lead-timeframes/components/time-frame/time-frame.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  declarations: [
    ScoringLeadCategoryComponent,
    ScoringLeadCategoryModalComponent,

    ScoringLeadScoringComponent,
    ScoringLeadScoringModalComponent,

    LeadGradingComponent,

    LeadTimeframesComponent,
    ScoringConfirmDefaultModalComponent,

    CreateLeadGradingComponent,
    RuleComponent,
    // LeadCardComponent,
    // RuleTemplateComponent,
    TimeFrameComponent,
  ],
  imports: [
    CommonModule,
    ScoringRoutingModule,
    DatatableModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    SharedModule
  ]
})
export class ScoringModule { }
