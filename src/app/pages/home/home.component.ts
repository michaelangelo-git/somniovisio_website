
import { Component, ElementRef, HostListener, signal, ViewChild, ViewChildren } from '@angular/core';
import { WindowRef } from '../../services/window-ref.service';
import { CommonModule } from '@angular/common';
import { animate, keyframes, state, style, transition, trigger, sequence, query, stagger, group, animation, useAnimation } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';
import { ScrollDirective } from '../../directives/scroll.directive';
import { ElementTrigger } from '../../utils/el_builder';
import { ThemeService } from '../../services/theme.service';

const individualAnimation = animation([
  animate('1.2s ease-out', keyframes([
    style({ display: 'flex'}),
    style({ transform: 'scale(.8)', opacity: 1, boxShadow: `5px 3px 30px 5px` }),
    style({ transform: 'scale(.9)', opacity: .8, boxShadow: `5px 3px 25px 5px` }),
    style({ transform: 'scale(1.1) rotate3d(0, 1,0, 30deg)', opacity: .7, boxShadow: `5px 3px 25px 5px` }),
    style({ transform: 'scale(1) rotate3d(1, 1,1, 0deg)', opacity: .6, boxShadow: `none`}),
    style({ opacity: '*' }),
  ]))
]);

const slide = animation([
  animate('.25s ease-out', keyframes([
    style({ transform: 'scale(1)' }),
    style({ transform: 'scale(1.5)' }),
    style({ transform: 'scale(1)' }),
  ]))
]);

type ScrollInfo = {
  behavior?: string,
  scrollTop: number,
  direction?: 'up' | 'down' | null,
  entireHeight: number,
  relPos?: any,
  scrollTrigger?: HTMLElement,
  theta?: number
}

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [WindowRef],
  hostDirectives: [ScrollDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule],
  animations: [
    trigger('wrapperScale', [
      /* state('*', style({ zIndex: -3000 })), */
      state('enter', style({ opacity: '*', display: 'flex' })),
      state('leave', style({ display: 'hidden' })),
      transition('* => enter', [
        query('.wrapper-bg div', [
          group([
            stagger(100, useAnimation(individualAnimation)),
          ]),
        ]),
      ]),
    ]),
   /*  trigger('containerTwoAnimation', [
      state('*', style({ opacity: 0, backdropFilter: 'blur(20px)' })),
      state('in', style({ opacity: 1, backdropFilter: 'blur(20px)' })),
      state('out', style({ opacity: 0 })),
      transition('* => in', [
        animate(".25s ease", style({ opacity: 1 }))
      ]),
      transition('in => *', [
        animate(".25s ease", style({ opacity: 0 }))
      ]),
      transition('out => out', [
        style({ opacity: 0 })
      ])
    ]), */
    trigger('textAnimations', [
      transition('* => enter', [
        group([
          query('.main-text .text, .main-text-shadow .text', [
            group([
              stagger(-70, useAnimation(slide, { delay: 50 })),
            ]),
          ]),
          query('span', [
            group([
              useAnimation(slide, { delay: 50 }),
            ]),
          ]),
        ])
      ]),
    ])
  ]
})
export class HomeComponent {

  @ViewChild('scrollTriggerOne') scrollTriggerOne: ElementRef;
  @ViewChild('scrollTriggerTwo') scrollTriggerTwo: ElementRef;

  @HostListener('window:load', ['$event']) load(e: Event): void {
    this.setObserver(this.scrollTriggerOne.nativeElement, { threshold: 1, rootMargin: '0%' });
    ElementTrigger.updateTriggerList(new ElementTrigger(this.scrollTriggerOne.nativeElement, false));
  }
  @HostListener('window:scroll', ['$event']) windowScrolled(e: any): void {
    let window = (e.currentTarget);
    // this.windowScroll = {
    //   behavior: window.screen.height + '', direction: window.scroll.direction, scrollTop: e.currentTarget.scrollY,
    //   entireHeight: window.screen.height, relPos: this._getScrollPercent(), theta: (360 * (this._getScrollPercent() / 100.0))
    // };
  }

  public windowScroll$: BehaviorSubject<ScrollInfo> = new BehaviorSubject<ScrollInfo>(null);
  public get windowScroll(): ScrollInfo { return this.windowScroll$.value }
  public set windowScroll(newInfo: ScrollInfo) { this.windowScroll$.next(newInfo); }

  public observers: Map<string, IntersectionObserver> = new Map<string, IntersectionObserver>();
  public barAmount = new Array(45);

   public isDarkMode : boolean;
  constructor(private themeService: ThemeService) { 
    this.isDarkMode = this.themeService.isDarkMode();  
  }

  ngOnInit(){
    
  }

  // private _getScrollPercent(scale?: number) {
  //   var h = document.documentElement, b = document.body, st = 'scrollTop', sh = 'scrollHeight';
  //   if (scale != null) {
  //     return (((h[st] || b[st])) / (((h[sh] || b[sh])) - h.clientHeight) * scale) * (100 / scale);
  //   } else {
  //     return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
  //   }
  // }

  public getTriggerElements(): ElementTrigger[] {
    ElementTrigger.updateTriggerList(new ElementTrigger(this.scrollTriggerOne.nativeElement, false));
    return ElementTrigger.getTriggerElements;
  }

  public isTriggered(el: HTMLElement) {
    // console.log(ElementTrigger.triggerList.find(elTrigger => elTrigger.classname == el.className)?.triggered);
    return ElementTrigger.triggerList.find(elTrigger => elTrigger.classname == el.className)?.triggered;
  }

  // populate observer list and setting observe to active
  private async setObserver(el: Element, params?: { threshold?: number, rootMargin?: string }) {
    this.observers.set(el?.className, new IntersectionObserver((entries) => this.cb(entries), params ? params : { threshold: 1.0, rootMargin: '100%'}));
    this.observers.get(el?.className).observe(el);
  }
  
  // called when the observed element is currently being observed, and sets triggered prop to false or true 
  private async cb(e: IntersectionObserverEntry[]) {
    e.forEach((e?: IntersectionObserverEntry) => {
      let el = e.target as HTMLElement;
      if (e.isIntersecting) {
        ElementTrigger.updateTriggerList(new ElementTrigger(el, true));
      } 
    });
  }
}