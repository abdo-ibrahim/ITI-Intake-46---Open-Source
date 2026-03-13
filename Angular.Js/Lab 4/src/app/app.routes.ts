import { Routes } from '@angular/router';
import { CategoryOrder } from './components/category-order/category-order';
import { NotFound } from './components/not-found/not-found';
import { Home } from './components/home/home';
import { CourseDetails } from './components/course-details/course-details';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'courses',
    component: CategoryOrder,
  },
  {
    path: 'about',
    loadComponent: () => import('./components/about/about').then((m) => m.About),
  },
  {
    path: 'contact',
    loadComponent: () => import('./components/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'courses/:id',
    component: CourseDetails,
  },
  {
    path: '**',
    component: NotFound,
  },
];
