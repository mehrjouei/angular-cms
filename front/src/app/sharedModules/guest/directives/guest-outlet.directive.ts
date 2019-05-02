import { Directive, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appGuest]'
})
export class GuestDirective {

  constructor(public viewContainerRef: ViewContainerRef) {}

}
