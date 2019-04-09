import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appGuest]'
})
export class GuestDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
