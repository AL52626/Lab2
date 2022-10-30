import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {routes} from './app-routing';
import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {AuthModule} from "@auth0/auth0-angular";
import {environment} from "../environments/environment";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatMenuModule} from "@angular/material/menu";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";
import {domain, clientID} from 'auth_config'

const env = environment;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    AuthModule.forRoot({
      domain: domain,
      clientId: clientID
    }),
    MatMenuModule,
    BrowserAnimationsModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule {
}
