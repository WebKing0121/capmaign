import { ComponentRef, Directive, ElementRef, HostListener, Input, Type, OnDestroy } from '@angular/core';
import {
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
  ScrollStrategy,
  ScrollStrategyOptions
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { DataTableSource } from '@app-components/datatable/datatable-source';
import { DatatableColumnsMenuComponent } from '@app-components/datatable/menus/datatable-columns-menu/datatable-columns-menu.component';
import { takeWhile, takeUntil } from 'rxjs/operators';
import { DatatableHeaderMenuInterface } from '@app-components/datatable/datatable-header-menu.interface';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appDatatableHeaderMenu]'
})
export class DatatableHeaderMenuDirective implements OnDestroy {
  @Input() tableSource: DataTableSource<any>;
  @Input() menuType: 'columnsMenu';
  @Input() align: 'right' | 'left' = 'left';

  private overlayRef: OverlayRef;
  private readonly scrollStrategy: ScrollStrategy;
  private unsubscribe$ = new Subject();

  constructor(
    private overlayPositionBuilder: OverlayPositionBuilder,
    private readonly sso: ScrollStrategyOptions,
    private elementRef: ElementRef,
    private overlay: Overlay
  ) {
    this.scrollStrategy = this.sso.block();
  }

  @HostListener('click') onClick() {
    this.showMenu();
  }

  showMenu() {
    if (this.menuType !== 'columnsMenu') {
      return;
    }

    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: this.align === 'left' ? 'end' : 'start',
          originY: 'bottom',
          overlayX: this.align === 'left' ? 'end' : 'start',
          overlayY: 'top'
        }
      ]);

    // If there is prev overlay, detach that overlay first
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
    }

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.scrollStrategy,
      hasBackdrop: true,
      backdropClass: ''
    });

    this.overlayRef
      .backdropClick()
      .pipe(takeWhile(() => Boolean(this.overlayRef)))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.overlayRef.detach());

    let componentType: Type<any>;
    if (this.menuType === 'columnsMenu') {
      componentType = DatatableColumnsMenuComponent;
    }

    const menuPortal = new ComponentPortal(componentType);
    const menuRef: ComponentRef<DatatableHeaderMenuInterface> = this.overlayRef.attach(
      menuPortal
    );
    // Pass content to tooltip component instance
    menuRef.instance.setDataSource(this.tableSource);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
