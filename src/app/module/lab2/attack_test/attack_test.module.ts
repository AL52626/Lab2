import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Attack_testComponent} from './attack_test.component';
import {Route, RouterModule} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatExpansionModule} from "@angular/material/expansion";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {RecaptchaModule} from "ng-recaptcha";

const routes: Route[] = [

  {
    path: '',
    component: Attack_testComponent
  },
];

@NgModule({
  declarations: [
    Attack_testComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RecaptchaModule
  ]
})

export class Attack_testModule {
}
