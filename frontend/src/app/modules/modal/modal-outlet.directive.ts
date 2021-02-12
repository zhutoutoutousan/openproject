import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[opModalOutlet]',
})
export class OpModalOutletDirective {
  constructor(public viewContainerRef:ViewContainerRef) { }
}
