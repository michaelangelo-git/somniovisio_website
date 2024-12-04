import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ErrorComponent } from './pages/error/error.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component';


export const routes: Routes = [
    {path: 'home' , component: HomeComponent},
    {path: 'error', component: ErrorComponent },
    {path: 'gallery', component: GalleryComponent },
    {path: '', pathMatch: "full", redirectTo: "home"}
];