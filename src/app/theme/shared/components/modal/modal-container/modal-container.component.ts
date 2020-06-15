import { Component, ComponentRef, EmbeddedViewRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss']
})
export class ModalContainerComponent extends BasePortalOutlet implements OnInit {
  @HostBinding('class.app-modal-container') hostClassName = true;
  @ViewChild(CdkPortalOutlet, {static: true}) portalOutlet: CdkPortalOutlet;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    return this.portalOutlet.attachComponentPortal<T>(portal);
  }
  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    return undefined;
  }
}
