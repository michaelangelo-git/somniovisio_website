// import { ViewportScroller } from '@angular/common';
import { HostBinding, HostListener, Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
export type WindowScroll = {
  scrollY: number,
  innerHeight: number,
  screenTop: number,
  direction: any;
  radius?: number,
  relativeTheta?: number,
}
function getWindow(): any {
  return window;
}
@Injectable()
export class WindowRef {
  get nativeWindow(): Window {
    return getWindow();
  }

  get scrollY():  number {
    return getWindow().scrollY;
  }
}

