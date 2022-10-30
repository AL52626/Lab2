import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [



  {
    path: '',
    children: [
      {path: '', loadChildren: () => import('./module/lab1/table/table.module').then(m => m.TableModule)},
    ]
  },
];

