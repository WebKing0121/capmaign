import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { CollaborateTeam } from '@app-core/models/collaborate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSelectData } from '@app-core/models/common';

@Component({
  selector: 'app-collaborate-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.scss']
})
export class CollaborateTeamModalComponent implements OnInit {
  @ViewChild('teamModal', { static: false }) teamModal;
  @Input() modalType = ModalType.New;
  @Input() team: CollaborateTeam;
  @Input() users: NgSelectData[];
  ModalType = ModalType;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      description: '',
      members: []
    });
  }

  show() {
    if (this.modalType === ModalType.Edit) {
      this.form.setValue({
        id: this.team.id,
        name: this.team.name,
        description: this.team.desc,
        members: this.team.members.map(x => `${x}`),
      });

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
}
