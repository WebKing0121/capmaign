import { Component, OnInit, ViewEncapsulation, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { CollaborateService } from 'src/app/_services/collaborate.service';
import { first } from 'rxjs/operators';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-campaign-sub-tasks',
  templateUrl: './campaign-sub-tasks.component.html',
  styleUrls: ['./campaign-sub-tasks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CampaignSubTasksComponent implements OnInit {
  @Input() taskId: number;
  @Input() taskName: string;
  @Input() userId: number;
  @Input() userName: string;
  @ViewChild('cardSubTasks', { static: false }) cardSubTasks;
  @ViewChild('addSubTaskModal', { static: false }) addSubTaskModal;
  @Output() onSelectRow: EventEmitter<any> = new EventEmitter();

  subTasks: any[];
  selectedSubTaskId: number;

  cardButtonsInSubTasks = [
    { label: 'Add Tasks', icon: 'icon-plus-circle', action: ()=>this.onClickAddTask()},
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

  /**********************************************
   * Click event - Plus icon in sub tasks table *
   * ------------------------------------------ *
   *                                            *
   **********************************************/
  onClickAddTask() {
    if (this.taskId > 0) {
      this.addSubTaskModal.show();
    } else {
      this.toastEvent.toast({uid: 'toast2', delay: 3000});
    }
    
  }

  /******************************************************
   * Click event - select row in Assigned Campaign table *
   * --------------------------------------------------- *
   *                                                     *
   *******************************************************/
  onClickSubTask(subTaskId: number) {
    this.selectedSubTaskId = subTaskId;
    this.onSelectRow.emit(this.selectedSubTaskId);
  }

  loadSubTasks(taskId: number) {
    if (taskId === 0) {
      this.subTasks = [];
    } else {
      this.cardSubTasks.setCardRefresh( true );  
      this.collaborateService.getCampaignSubTasks(taskId)
      .pipe(first())
      .subscribe(
        data => {
          this.subTasks = data;
          this.cardSubTasks.setCardRefresh( false );  
        },
        error => {
          console.log('error', error)
        }
      );
    }
    
  }
}
