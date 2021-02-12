import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  Injector,
} from '@angular/core';
import {UntilDestroyedMixin} from "core-app/helpers/angular/until-destroyed.mixin";
import {
  OpModalComponent,
  OpModalService,
  OP_MODAL_DATA,
} from './modal.service';
import {OpModalOutletDirective} from './modal-outlet.directive';

@Component({
  selector: 'op-modal-outlet',
  host: {
    class: 'op-modal-outlet',
  },
  directives: [ OpModalOutletDirective ],
})
export class OpModalOutletComponent extends UntilDestroyedMixin implements OnInit, OnDestroy {
  @ViewChild(OpModalOutletDirective, { static: true }) outlet:OpModalOutletDirective;

  protected constructor(
    private injector:Injector,
    private opModalService:OpModalService,
    private componentFactoryResolver:ComponentFactoryResolver,
  ) {
    super();
  }

  ngOnInit() {
    const viewContainerRef = this.outlet.viewContainerRef;
    this.opModalService.modal$.subscribe(({ data, component }) => {
      viewContainerRef.clear();
      if (component) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(component);
        const injector = Injector.create({
          parent: this.injector,
          providers: {
            provide: OP_MODAL_DATA,
            useValue: data,
          },
        });
        const componentRef = viewContainerRef.createComponent<OpModalComponent>(factory, 0, injector);
      }
    });
  }

  ngOnDestroy() {
  }
}
