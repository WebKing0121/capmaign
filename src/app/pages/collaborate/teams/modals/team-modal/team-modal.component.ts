import { Component, OnInit, ViewChild, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { CollaborateTeam } from '@app-models/collaborate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSelectData } from '@app-models/common';
import { CollaborateService } from '@app-core/services/collaborate.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-collaborate-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.scss']
})
export class CollaborateTeamModalComponent implements OnInit, OnDestroy {
  @ViewChild('teamModal', { static: false }) teamModal;
  @Input() modalType = ModalType.New;
  @Input() team: CollaborateTeam;
  @Input() users: NgSelectData[];
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  teamForEdit: any;
  ModalType = ModalType;

  form: FormGroup;
  private unsubscribe$ = new Subject();
  loading = false;

  constructor(
    private fb: FormBuilder,
    private collaborateService: CollaborateService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      description: '',
      members: []
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  show() {
    if (this.modalType === ModalType.Edit) {
      this.loadTeamDetails()
    } else {
      this.form.setValue({
        id: 0,
        name: '',
        description: '',
        members: [],
      });
    }
    setTimeout(() => this.teamModal.show());
  }

  hide() {
    this.teamModal.hide();
  }

  loadTeamDetails() {
    this.loading = true;
    this.collaborateService.getCollaborateTeam(this.team.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.loading = false;
          this.teamForEdit = data.result;
          this.form.setValue({
            id: this.teamForEdit.id,
            name: this.teamForEdit.teamName,
            description: this.teamForEdit.comments,
            members: []
          });
          this.loadTeamMembers();
        },
        error => {
          this.loading = false;
          console.log('error', error);
        }
      );
  }

  loadTeamMembers() {
    this.loading = true;
    const params = {
      teamid: this.team.id,
      teamname: this.team.collaborationTeamName
    };
    this.collaborateService.getCollaborateTeamMembers(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.form.controls.members.setValue(
            data.result.map(x => `${x.id}`)
          );
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error);
        }
      );
  }

  onSave() {
    if (this.modalType === ModalType.Edit) {

      const paramsForUpdate = {
        Id: this.form.value.id,
        comments: this.form.value.description,
        creationDateTime: this.teamForEdit.creationDateTime,
        id: this.form.value.id,
        organizationUnitId: this.teamForEdit.organizationUnitId,
        teamName: this.form.value.name,
        teammemberinfo: this.form.value.members.map(x => ({ Id: Number(x) })),
      };
      this.loading = true;
      this.collaborateService.updateCollaborateTeam(paramsForUpdate)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            this.loading = false;
            this.hide();
            this.save.emit();
          },
          error => {
            this.loading = false;
            console.log('error', error);
          }
        );
    } else {
      const paramsForCreate = {
        comments: this.form.value.description,
        teamname: this.form.value.name,
        teammemberinfo: this.form.value.members.map(x => ({ Id: x })),
      };

      this.loading = true;
      this.collaborateService.createCollaborateTeam(paramsForCreate)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            this.loading = false;
            this.hide();
            this.save.emit();
          },
          error => {
            this.loading = false;
            console.log('error', error);
          }
        );
    }

  }

  onDelete() {
    this.delete.emit();
  }
}
