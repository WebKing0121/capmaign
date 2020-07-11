import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserService } from '@app-core/services/user.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-admin-organization-modal',
  templateUrl: './organization-modal.component.html',
  styleUrls: ['./organization-modal.component.scss']
})
export class AdminOrganizationModalComponent implements OnInit, OnDestroy {
  @ViewChild('organizationModal', { static: false }) organizationModal;

  @Input() organization: any;
  @Input() modalType = ModalType.Edit;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  ModalType = ModalType;

  form: FormGroup;
  private unsubscribe$ = new Subject();
  loading = false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      displayName: ['', Validators.required],
      emailCampaignPermission: false,
      facebookAdsCampaignPermission: false,
      googleAdsCampaignPermission: false,
      eventCampaignPermission: false,
      smsCampaignPermission: false,
      socialCampaignPermission: false,
      activetenant: false,
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  show() {
    if (this.modalType === ModalType.Edit) {

      this.loading = true;
      this.userService.getOrganization(this.organization.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            if (data.success) {
              const {
                displayName,
                emailCampaignPermission,
                facebookAdsCampaignPermission,
                googleAdsCampaignPermission,
                eventCampaignPermission,
                smsCampaignPermission,
                socialCampaignPermission,
              } = data.result;
              this.form.setValue({
                displayName,
                emailCampaignPermission,
                facebookAdsCampaignPermission,
                googleAdsCampaignPermission,
                eventCampaignPermission,
                smsCampaignPermission,
                socialCampaignPermission,
                activetenant: false,
              });
              this.organizationModal.show();
            } else {
              console.log('not success');
            }

            this.loading = false;
          },
          error => {
            console.log('error', error.response);
            this.loading = false;
          }
        );


    } else {
      this.form.setValue({
        displayName: '',
        emailCampaignPermission: false,
        facebookAdsCampaignPermission: false,
        googleAdsCampaignPermission: false,
        eventCampaignPermission: false,
        smsCampaignPermission: false,
        socialCampaignPermission: false,
        activetenant: false,
      });
      this.organizationModal.show();
    }

  }

  hide() {
    this.organizationModal.hide();
  }

  getPermissionString(): string {
    let permissionString = '';
    const {
      emailCampaignPermission,
      facebookAdsCampaignPermission,
      googleAdsCampaignPermission,
      eventCampaignPermission,
      smsCampaignPermission,
      socialCampaignPermission,
    } = this.form.value;

    if (emailCampaignPermission) {
      permissionString += 'Pages.Email,';
    }
    if (smsCampaignPermission) {
      permissionString += 'Pages.Mobile,';
    }
    if (socialCampaignPermission) {
      permissionString += 'Pages.Social,';
    }
    if (eventCampaignPermission) {
      permissionString += 'Pages.Event,';
    }
    if (facebookAdsCampaignPermission) {
      permissionString += 'Pages.FacebookAds,';
    }
    if (googleAdsCampaignPermission) {
      permissionString += 'Pages.GoogleAds,';
    }

    return permissionString;
  }
  onCreateorUpdate() {
    if (this.modalType === ModalType.Edit) {

      const updateObj = {
        ...this.form.value,
        id: this.organization.id,
        parentId: this.organization.parentId,
        organizationPermission: this.getPermissionString(),
      };
      this.loading = true;
      this.userService.updateOrganization(updateObj)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            this.save.emit();
            this.loading = false;
            this.hide();
          },
          error => {
            console.log('error', error.response);
            this.loading = false;
          }
        );
    } else {
      const createObj = {
        ...this.form.value,
        organizationUnit: '',
        parentId: this.organization.id,
      };
      this.loading = true;
      this.userService.createOrganization(createObj)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            this.save.emit();
            this.loading = false;
            this.hide();
          },
          error => {
            console.log('error', error.response);
            this.loading = false;
          }
        );
    }
  }

  onDelete() {
    this.delete.emit();
  }
}
