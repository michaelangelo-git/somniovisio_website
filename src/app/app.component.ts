import { CommonModule } from '@angular/common';
import { pageExit, lensAnimation, textAnimation, bounceCharacters } from '../assets/animations/animations';
import { Component, computed, Input, signal} from '@angular/core';
import { trigger, state, style, transition, query, stagger, group, useAnimation, animate, keyframes, sequence } from '@angular/animations';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { WindowRef } from './services/window-ref.service';
import { HomeComponent } from './pages/home/home.component';
import { ScrollDirective } from './directives/scroll.directive';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [WindowRef],
  imports: [RouterOutlet, CommonModule, RouterLink, HomeComponent, ScrollDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('page', [
      state('null', style({ display: 'none' })),
      transition('void => *', [
        group([
          query('.row-one', [useAnimation(lensAnimation)]),
          query('#title-text', [
            style({ opacity: 0 }),
            stagger(100, [useAnimation(textAnimation)]),
          ]),
          query('#title-text', [
            style({ opacity: 0 }),
            stagger(100, [useAnimation(bounceCharacters)]),
          ]),
          /*   query('#title-text', [ stagger(100, [useAnimation(bounceCharacters)]), ]), */
        ]),
      ])
    ]),
    trigger('exit', [
      state('begin', style({ display: 'none' })),
      state('end', style({ display: 'flex' })),
      transition('begin <=> end', [useAnimation(pageExit)])
    ]),
    trigger('awaitContent', [
      state('void', style({ opacity: 0, width: 0, height: 0, transform: 'translateX(130%)' })),
      state('*', style({ opacity: 1, width: '100%', height: '100%', transform: 'translateX(0)' })),
      transition(':enter', [animate('1s 3.2s ease')]),
      transition(':leave', [animate('1s 3.2s ease')])
    ]),
    trigger('expandNav', [
      state('inactive', style({ opacity: 0, transform: 'translateX(0)' })),
      state('active', style({ opacity: 1, transform: 'translateX(400px)' })),
      transition('inactive => active', [
        sequence([
          query(':self', [
            animate('.350s ease', keyframes([
              style({ opacity: 1 }),
              style({ transform: 'translateX(400px)' })
            ]))
          ]),
        ]),
      ]),
      transition('active => inactive', [


        animate('.350s .2s ease', keyframes([
          style({ transform: 'translateX(-200px)', opacity: 0 })
        ]))


      ])
    ]),

  ]
})

export class AppComponent {
  public isDarkMode: boolean;

  public navClicked$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public get navClicked(): boolean { return this.navClicked$.value; }
  public set navClicked(input: boolean) {
    if (input != this.navClicked$.value) {
      this.navClicked$.next(input);
    } else {
      input == true ? this.navClicked$.next(false) : this.navClicked$.next(true);
    }

  }

  private _window$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public get window() : Window { return this._window$.value; }

  public lensComplete: boolean = null;
  public get isLensComplete(): boolean { return this.lensComplete; }

  public animationDone: boolean = false;
  public get isAnimationDone(): boolean { return this.animationDone; }

  title = 'SomnioVisio';
  titleArray = [...this.title];

  constructor(private _router: Router, _window: WindowRef, private themeService: ThemeService) {
    this.isDarkMode = this.themeService.isDarkMode();
  }

  public toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }

  public captureStartEvent(event: any) { this.lensComplete = false; }
  public captureDoneEvent(event: any) { this.lensComplete = true; }

  handleScroll(event: any){
  }

}
