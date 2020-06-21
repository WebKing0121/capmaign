import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutomationService } from '@app-core/services/automation.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-automation',
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.scss']
})
export class AutomationComponent implements OnInit, OnDestroy {

  automationMode: 'new' | 'edit';
  formGroup: FormGroup;
  automationTypes: any[];
  pageTitle: string;
  private unsubscribe$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private automationService: AutomationService
  ) {
    this.automationTypes = [
      {value: 'Email', label: 'Email Automation'},
      {value: 'SMS', label: 'SMS Automation'},
      {value: 'PreEvent', label: 'Pre Event Automation'},
      {value: 'DuringEvent', label: 'During Event Automation'},
      {value: 'PostEvent', label: 'Post Event Automation'},

    ];
  }

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;
    const { path } = this.route.snapshot.url[0];

    this.automationMode = path === 'new' ? 'new' : 'edit';
    this.pageTitle = path === 'new' ? 'Create Automation' : 'Update Automation';

    this.formGroup = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      description: '',
      status: ['', Validators.required],
      automationType: ['', Validators.required],
    });

    if (this.automationMode === 'edit') {
      this.automationService.getAutomation(id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            this.formGroup.setValue({
              id: data.id,
              name: data.name,
              description: data.description,
              status: data.status,
              automationType: data.type,
            });
          },
          error => {
            console.log('error', error.response);
          }
        );
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSave() {
    console.log('Campaign component.onSave =>', this.formGroup.value);
  }

  onCancel() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}
