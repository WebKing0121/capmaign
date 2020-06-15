import { Injectable, Injector, Type } from '@angular/core';
import { Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { BasePortalOutlet, ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { takeWhile } from 'rxjs/operators';

import { MODAL_DATA, ModalConfig, ModalRef } from './modal-ref';
import { ModalContainerComponent } from '@app-components/modal/modal-container/modal-container.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private overlay: Overlay,
    private injector: Injector
  ) { }

  openModal(component: Type<any>, config?: ModalConfig) {
    const overlayRef: OverlayRef = this.overlay
      .create({
        positionStrategy: this.getPositionStrategy(config),
        disposeOnNavigation: true,
        hasBackdrop: true,
        panelClass: 'app-modal-pane',
        backdropClass: 'app-modal-pane-backdrop',
        width: config ? config.width : undefined,
        height: config && config.height ? config.height : undefined
      });

    const modalRef = new ModalRef(overlayRef);
    overlayRef.backdropClick().pipe(
      takeWhile(() => Boolean(overlayRef))
    ).subscribe(() => modalRef.backdropClicked());

    const containerRef = this.attachModalContainer(overlayRef, ModalContainerComponent);
    this.attachModal(modalRef, containerRef, component, config);
    return modalRef;
  }

  private attachModalContainer(overlay: OverlayRef, container: Type<any>, config?: any): BasePortalOutlet {
    const containerRef = overlay.attach(new ComponentPortal(container));
    return containerRef.instance;
  }

  private attachModal(modalRef: ModalRef<any>, container: BasePortalOutlet, component: Type<any>, config?: any) {
    const portalInjector = this.createInjector(modalRef, this.injector, config);
    container.attachComponentPortal(new ComponentPortal(component, undefined, portalInjector));
  }

  private getPositionStrategy(config?: ModalConfig): PositionStrategy {
    const positionStrategy = this.overlay.position().global();
    return positionStrategy;
  }

  private createInjector(modalRef: ModalRef<any>, injector: Injector, config?: ModalConfig): PortalInjector {
    const injectionTokens = new WeakMap<any, any>([
      [ModalRef, modalRef],
      [MODAL_DATA, config ? config.data : undefined]
    ]);

    return new PortalInjector(injector, injectionTokens);
  }
}
