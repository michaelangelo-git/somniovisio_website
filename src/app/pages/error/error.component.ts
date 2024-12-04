import { Component, ElementRef, Input, Output, Renderer2, inject } from '@angular/core';
import { BarBuilder } from '../../utils/el_builder';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, interval } from 'rxjs';
import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { EventEmitter } from 'stream';
import { ScrollDirective } from '../../directives/scroll.directive';
import { ConfigService } from '../../services/config.service';

type ScrollInfo = {
  behavior: string,
  scrollTop: number,
  direction?: 'up' | 'down' | null,
  scrollheight?:number,
  relPos?: any
}
@Component({
  selector: 'app-error',
  standalone: true,
  providers: [ConfigService],
  imports: [CommonModule, ScrollDirective],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
  animations: []
})
export class ErrorComponent {
  public _config = inject(ConfigService);
  public count$: BehaviorSubject<string> = new BehaviorSubject<string>(this._config.count);
  public get count(): string { return this.count$.value}


  constructor(private _renderer: Renderer2) {
    console.log(this._config.count)
  }

  ngOnInit(): void {
  }

  public toggleMode(mode : string) {
    if(this._config.count != mode){
      this._config.count = mode;
    }
  }
}



