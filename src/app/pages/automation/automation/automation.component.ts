import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-automation',
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.scss']
})
export class AutomationComponent implements OnInit {
  
  automationMode: 'new' | 'edit';
  formGroup: FormGroup;

  pageTitle: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;
    const {path} = this.route.snapshot.url[0];
    // console.log(path);
    this.automationMode = path === 'new' ? 'new' : 'edit';
    this.pageTitle = path === 'new' ? 'Create Automation' : 'Update Automation';

    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });

    // if (this.automationMode === 'new') {
    //   this.formGroup.controls.name.setValidators(Validators.required);
    //   this.formGroup.controls.name.updateValueAndValidity();

    //   this.formGroup.controls.subject.setValidators(Validators.required);
    //   this.formGroup.controls.subject.updateValueAndValidity();

    //   this.formGroup.controls.emailContent.setValidators(Validators.required);
    //   this.formGroup.controls.emailContent.updateValueAndValidity();
    // }
  }

  onSave() {
    console.log('Campaign component.onSave =>', this.formGroup.value);
  }

  onCancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

}
