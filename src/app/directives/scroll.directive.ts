import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type ScrollInfo = {
  behavior?: string,
  scrollTop: number,
  direction?: 'up' | 'down' | null,
  scrollHeight: number,
  relPos?: any
  scrollTrigger?: HTMLElement,
  theta?: number
}
@Directive({
  selector: '[appScroll]',
  exportAs: '[appScroll]',
  standalone: true,
})
export class ScrollDirective {
  @Output() windowScrolled: EventEmitter<ScrollInfo> = new EventEmitter(null);

  @HostListener('window:scroll', ['$event']) onscroll(e: any) {
    let window = (e.currentTarget);
    this.scroll = {
      behavior: window.screen.height + '',
      scrollTop: e.currentTarget.scrollY,
      scrollHeight: e.currentTarget.scrollHeight,
      relPos: this._getScrollPercent(), // scroll position relative to entire window
      theta: (360 * (this._getScrollPercent() / 100.0))
    };

    this.windowScrolled.emit({
      behavior: window.screen.height + '',
      scrollTop: window.scrollY,
      scrollHeight: document.documentElement.scrollHeight,
      relPos: this._getScrollPercent(), // scroll position relative to entire window
      theta: (360 * (this._getScrollPercent() / 100.0))
    });

    // console.log(this.scrollTrigger);
  }
  private scroll$: BehaviorSubject<ScrollInfo> = new BehaviorSubject<ScrollInfo>({ behavior: null, scrollTop: 0, scrollHeight: 0, direction: null });
  public set scroll(infoInput: ScrollInfo) {
    if (infoInput.scrollTop > this.scroll$.value.scrollTop) { this.scroll$.next({ behavior: infoInput.behavior, scrollTop: infoInput.scrollTop, scrollHeight: infoInput.scrollHeight, direction: 'down', relPos: infoInput.relPos, theta: infoInput.theta }); }
    if (infoInput.scrollTop < this.scroll$.value.scrollTop) { this.scroll$.next({ behavior: infoInput.behavior, scrollTop: infoInput.scrollTop, scrollHeight: infoInput.scrollHeight, direction: 'up', relPos: infoInput.relPos, theta: infoInput.theta }); }
  }
  public get scroll(): ScrollInfo { return this.scroll$.value }



  @Input() scrollTrigger: HTMLElement[] | null;
  private elMap: Map<string, HTMLElement> = new Map();
  constructor(el: ElementRef) {
    // console.log(el);
  }

  private _getScrollPercent(scale?: number) {
    var h = document.documentElement,
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';
    if (scale != null) {
      return (((h[st] || b[st])) / (((h[sh] || b[sh])) - h.clientHeight) * scale) * (100 / scale);
    } else {
      return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
    }

  }
}

