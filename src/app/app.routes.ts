import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'creative', loadComponent: () => import('./pages/creative/creative.component').then(m => m.CreativeComponent) },
  { path: 'montage', loadComponent: () => import('./pages/montage/montage.component').then(m => m.MontageComponent) },
  { path: '**', redirectTo: '' }
];
