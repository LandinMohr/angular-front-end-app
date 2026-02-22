import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { AdminComponent } from '../pages/home/admin/admin';
import { ListComponent } from '../pages/home/list.component';
import { DetailComponent } from '../pages/home/details.component';
export const routes: Routes = [
  

  { path: '', component: HomeComponent },
  { path: 'list', component: ListComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' }
];
