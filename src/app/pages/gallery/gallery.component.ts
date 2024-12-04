import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { selection, galleryPhotos, ViewGallery } from '../../utils/app_types';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  animations: [
    trigger('slideFade', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('500ms ease-out'),
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 0, transform: 'translateX(100%)' })),
      ]),
    ]),
  ],

})
export class GalleryComponent {
  public selectionUpdating = false;
  public selection = 'SOMNIOVISIO';
  public currentSelection$ = new BehaviorSubject<selection>('SOMNIOVISIO');
  public set currentSelection(selectionIn: selection){
    this.currentSelection$.next(selectionIn);
  }
  public get currentSelection() : selection {
    return this.currentSelection$.value;
  }
  public mainImageHov = false;
  
  isSelected(selectedView: string) : boolean{
    if(selectedView == this.currentSelection){
      return true;
    } else {
      return false;
    }
  }

  public currentGallery: ViewGallery;
  public isAnimating: boolean = false;

setSelection(selection: selection) {
    if (this.isAnimating) return; 
    this.isAnimating = true;
    this.currentGallery = null;

    setTimeout(() => {
      this.currentGallery = this.getSelectedGallery(selection);
      this.isAnimating = false;
    }, 500); // Match the animation duration
  }

  updateSelection(selectionView: selection){
    this.selectionUpdating = true;
    this.currentSelection$.next(selectionView);
    this.setSelection(selectionView);

  }

  public getSelectedGallery(typeIn: selection){
    return galleryPhotos.filter(gp => gp.type == typeIn)[0];
  }

  lightboxOpen = false;
  activeIndex = 0;

  openLightbox(index: number): void {
    this.activeIndex = index;
    this.lightboxOpen = true;
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
  }

}
