import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { CollaborateService } from 'src/app/_services/collaborate.service';
import { ToastService } from '../toast/toast.service';
import * as moment from 'moment';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-campaign-sub-tasks',
  templateUrl: './campaign-sub-tasks.component.html',
  styleUrls: ['./campaign-sub-tasks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CampaignSubTasksComponent implements OnInit, OnDestroy {
  @Input() taskId: number;
  @Input() taskName: string;
  @Input() userId: number;
  @Input() userName: string;
  @ViewChild('cardSubTasks', { static: false }) cardSubTasks;
  @ViewChild('addSubTaskModal', { static: false }) addSubTaskModal;
  @Output() selectRow: EventEmitter<any> = new EventEmitter();

  private unsubscribe$ = new Subject();

  subTasks: any[];
  selectedSubTaskId: number;

  cardButtonsInSubTasks = [
    { label: 'Add Tasks', icon: 'icon-plus-circle', action: () => this.onClickAddTask() },
  ];

  constructor(
    private collaborateService: CollaborateService,
    private toastEvent: ToastService
  ) {
    this.subTasks = [];
    this.selectedSubTaskId = 0;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**********************************************
   * Click event - Plus icon in sub tasks table *
   * ------------------------------------------ *
   *                                            *
   **********************************************/
  onClickAddTask() {
    if (this.taskId > 0) {
      this.addSubTaskModal.show();
    } else {
      this.toastEvent.toast({ uid: 'toast2', delay: 3000 });
    }
  }

  /******************************************************
   * Click event - select row in Assigned Campaign table *
   * --------------------------------------------------- *
   *                                                     *
   *******************************************************/
  onClickSubTask(subTaskId: number) {
    this.selectedSubTaskId = subTaskId;
    this.selectRow.emit(this.selectedSubTaskId);
  }

  loadSubTasks(taskId: number) {
    if (taskId === 0) {
      this.subTasks = [];
    } else {
      this.cardSubTasks.setCardRefresh(true);
      this.collaborateService.getCampaignSubTasks(taskId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            this.subTasks = data;
            this.cardSubTasks.setCardRefresh(false);
          },
          error => {
            console.log('error', error);
          }
        );
    }
  }
}
