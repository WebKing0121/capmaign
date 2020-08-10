import { Component, OnInit, ViewChild, Input, ViewEncapsulation, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CollaborateService } from '@app-core/services/collaborate.service';

@Component({
  selector: 'app-campaign-tasks-task-modal',
  templateUrl: './campaign-task.component.html',
  styleUrls: ['./campaign-task.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CampaignTasksTaskModalComponent implements OnInit, OnDestroy {
  @Input() modalType = ModalType.New;
  @Input() task: any;
  @Input() members: any[] = [];
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @ViewChild('taskModal', { static: false }) taskModal;

  private unsubscribe$ = new Subject();

  ModalType = ModalType;
  form: FormGroup;
  loading = false;

  constructor(
    private collaborateService: CollaborateService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const year = Number(moment().format('YYYY'));
    const month = Number(moment().format('MM'));
    const day = Number(moment().format('DD'));
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: { year, month, day },
      endDate: [moment().format('YYYY-MM-DD'), Validators.required],
      member: [0, Validators.required],
      estHours: [0, Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  show() {
    if (this.modalType === ModalType.Edit) {
      this.form.reset();

      const { startdate, enddate, taskname, taskdescription, memberId, estimatedhours } = this.task;

      const startYear = Number(moment(startdate).format('YYYY'));
      const startMonth = Number(moment(startdate).format('MM'));
      const startDay = Number(moment(startdate).format('DD'));
      const endYear = Number(moment(enddate).format('YYYY'));
      const endMonth = Number(moment(enddate).format('MM'));
      const endDay = Number(moment(enddate).format('DD'));

      this.form.setValue({
        name: taskname,
        description: taskdescription,
        startDate: {
          year: startYear,
          month: startMonth,
          day: startDay
        },
        endDate: {
          year: endYear,
          month: endMonth,
          day: endDay
        },
        member: memberId,
        estHours: estimatedhours
      });

    } else {
      const startYear = Number(moment().format('YYYY'));
      const startMonth = Number(moment().format('MM'));
      const startDay = Number(moment().format('DD'));

      this.form.setValue({
        name: '',
        description: '',
        startDate: {
          year: startYear,
          month: startMonth,
          day: startDay
        },
        endDate: {
          year: startYear,
          month: startMonth,
          day: startDay
        },
        member: 0,
        estHours: 0
      });
    }
    setTimeout(() => this.taskModal.show());
  }


  hide() {
    this.taskModal.hide();
  }

  onDelete() {
    this.delete.emit();
  }

  onSave() {
    const {
      name,
      description,
      startDate,
      endDate,
      member,
      estHours,
    } = this.form.value;

    if (this.modalType === ModalType.Edit) {
      this.loading = true;

      const params = {
        ...this.task,
        taskname: name,
        taskdescription: description,
        enddate: new Date(endDate.year, endDate.month, endDate.day),
        startdate: new Date(startDate.year, startDate.month, startDate.day),
        memberId: member,
        estimatedhours: estHours,
      };
      this.collaborateService.updateCollaborateTask(params)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.loading = false;
            this.hide();
            this.save.emit();
          },
          error => {
            this.loading = false;
            console.log('error', error.response);
          }
        );
    } else {
      this.loading = true;

      const params = {
        taskname: name,
        taskdescription: description,
        enddate: new Date(endDate.year, endDate.month, endDate.day),
        startdate: new Date(startDate.year, startDate.month, startDate.day),
        memberId: member,
        estimatedhours: estHours,
      };

      this.collaborateService.createCollaborateTask(params)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.loading = false;
            this.hide();
            this.save.emit();
          },
          error => {
            this.loading = false;
            console.log('error', error.response);
          }
        );
    }
  }

}
