import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appWindowScroll]',
  standalone: true,
  exportAs: '[appWindowScroll]'
})
export class WindowScrollDirective {
  @Output() appWindowScroll: EventEmitter<any> = new EventEmitter();

  @HostListener('document:scroll', ['$event']) 
  onScrollHandler(e: Event) {
    console.log("logging from directive: ");
    console.log(e)
    /* this.appWindowScroll.emit(e) */
  }
  constructor(el: ElementRef) { 
    console.log(el)
   
  }

}
