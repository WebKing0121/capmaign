import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';

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
import { LeadCardComponent } from './create-lead-scoring/components/lead-card/lead-card.component';
import { RuleTemplateComponent } from './create-lead-scoring/components/rule-template/rule-template.component';
import { LeadCategoryModalComponent } from './lead-category/lead-category-modal/lead-category-modal.component';
import { CategoryComponent } from './lead-category/components/category/category.component';
import { TimeFrameComponent } from './lead-timeframes/components/time-frame/time-frame.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

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
    LeadCardComponent,
    RuleTemplateComponent,
    LeadCategoryModalComponent,
    CategoryComponent,
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
