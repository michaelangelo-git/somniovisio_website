import { Injectable, Output, signal } from '@angular/core';
import { WindowRef } from './window-ref.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public count$: BehaviorSubject<string> = new BehaviorSubject<string>('light');
  public get count(): string {
    console.log("getting count from service");
    return this.count$.value;
  }
  public set count(stringIn: string) {
    this.count$.next(stringIn)
  }
}
