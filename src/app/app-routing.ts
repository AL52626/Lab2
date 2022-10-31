import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [


  {path: 'Lab1/nogomet', loadChildren: () => import('./module/lab1/table/table.module').then(m => m.TableModule)},
  {path: '/', loadChildren: () => import('./module/lab1/table/table.module').then(m => m.TableModule)},
  {path: '**', loadChildren: () => import('./module/lab1/table/table.module').then(m => m.TableModule)},
  {path: '',redirectTo:'Lab1/nogomet'},


];

