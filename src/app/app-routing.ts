import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [


  {
    path: 'Lab2',
    loadChildren: () => import('./module/lab2/attack_test/attack_test.module').then(m => m.Attack_testModule)
  },
  {
    path: '/',
    loadChildren: () => import('./module/lab2/attack_test/attack_test.module').then(m => m.Attack_testModule)
  },
  {
    path: '**',
    loadChildren: () => import('./module/lab2/attack_test/attack_test.module').then(m => m.Attack_testModule)
  },
  {path: '', redirectTo: 'Lab2'},


];

