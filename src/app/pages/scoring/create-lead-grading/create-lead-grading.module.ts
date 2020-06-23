import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RuleComponent } from './rule/rule.component';



@NgModule({
  declarations: [
    RuleComponent
  ],
  imports: [
    CommonModule,,
    BrowserModule,
    FormsModule,
  ]
})
export class CreateLeadGradingModule { }
