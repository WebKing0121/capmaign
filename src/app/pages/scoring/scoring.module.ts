import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ScoringRoutingModule } from './scoring-routing.module';

import { ScoringLeadCategoryComponent } from './lead-category/lead-category.component';
import { ScoringLeadCategoryModalComponent } from './lead-category/modals/lead-category/lead-category.component';
import { ScoringLeadScoringComponent } from './lead-scoring/lead-scoring.component';
import { ScoringLeadScoringModalComponent } from './lead-scoring/modals/lead-scoring/lead-scoring.component';
import { ScoringLeadGradingComponent } from './lead-grading/lead-grading.component';
import { ScoringLeadGradingModalComponent } from './lead-grading/modals/lead-grading/lead-grading.component';
import { ScoringLeadTimeframesComponent } from './lead-timeframes/lead-timeframes.component';

import { ScoringConfirmDefaultModalComponent } from './components/scoring-confirm-default-modal/scoring-confirm-default-modal.component';

@NgModule({
  declarations: [
    ScoringLeadCategoryComponent,
    ScoringLeadCategoryModalComponent,
    ScoringLeadScoringComponent,
    ScoringLeadScoringModalComponent,
    ScoringLeadGradingComponent,
    ScoringLeadGradingModalComponent,
    ScoringLeadTimeframesComponent,
    ScoringConfirmDefaultModalComponent,
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
