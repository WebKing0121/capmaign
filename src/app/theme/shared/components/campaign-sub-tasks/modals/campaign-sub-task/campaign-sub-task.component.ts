import { Component, OnInit, ViewChild, Input, ViewEncapsulation, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CollaborateService } from '@app-core/services/collaborate.service';

@Component({
  selector: 'app-campaign-tasks-sub-task-modal',
  templateUrl: './campaign-sub-task.component.html',
  styleUrls: ['./campaign-sub-task.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CampaignTasksSubTaskModalComponent implements OnInit, OnDestroy {
  @Input() modalType = ModalType.New;
  @Input() subTask: any;
  @Input() user: any;
  @Input() task: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @ViewChild('subTaskModal', { static: false }) subTaskModal;

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
      const { subtaskStartDate, subtaskEndDate, subtaskName, subtaskDescription, subtaskmemberId, subtaskestimatehours } = this.subTask;
      const startYear = Number(moment(subtaskStartDate).format('YYYY'));
      const startMonth = Number(moment(subtaskStartDate).format('MM'));
      const startDay = Number(moment(subtaskStartDate).format('DD'));
      const endYear = Number(moment(subtaskEndDate).format('YYYY'));
      const endMonth = Number(moment(subtaskEndDate).format('MM'));
      const endDay = Number(moment(subtaskEndDate).format('DD'));

      this.form.setValue({
        name: subtaskName,
        description: subtaskDescription,
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
        member: subtaskmemberId,
        estHours: subtaskestimatehours
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
    setTimeout(() => this.subTaskModal.show());
  }


  hide() {
    this.subTaskModal.hide();
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
        ...this.subTask,
        subtaskName: name,
        subtaskDescription: description,
        subtaskEndDate: new Date(endDate.year, endDate.month, endDate.day),
        subtaskStartDate: new Date(startDate.year, startDate.month, startDate.day),
        subtaskmemberId: member,
        subtaskestimatehours: estHours,
      };
      this.collaborateService.updateCollaborateSubTask(params)
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
        subtaskName: name,
        subtaskDescription: description,
        subtaskEndDate: new Date(endDate.year, endDate.month, endDate.day),
        subtaskStartDate: new Date(startDate.year, startDate.month, startDate.day),
        subtaskmemberId: member,
        subtaskestimatehours: estHours,
      };

      this.collaborateService.createCollaborateSubTask(params)
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
