import { HostBinding, HostListener, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventEmitter } from 'stream';

@Injectable()
export class ScrollerService {
  public static windowScroll$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public set windowScroll(scrollIn: any) { ScrollerService.windowScroll$.next(scrollIn)}
  public get windowScroll() : any { return ScrollerService.windowScroll$.value}
  constructor(){

  }
}
