import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Injectable, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import {LoginComponent} from './login/login.component';
import {VenueService} from './service/venue-service/venue.service';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import { LogoutComponent } from './logout/logout.component';
import {AuthGaurdService} from './service/authgaurd-service/authguard.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {DataTableModule} from 'angular7-data-table';
import {MatIconModule, MatProgressSpinnerModule} from '@angular/material';
import {Gaurd2Service} from './service/gaurd2-service/gaurd2.service';




@NgModule({
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    FormsModule,
    HttpClientModule,
    DataTableModule,
    ComponentsModule,
    NgbModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService]},
      {path: 'login', component: LoginComponent},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [Gaurd2Service, AuthGaurdService]},
      {
        path: '', component: AdminLayoutComponent,
        children: [{
          path: '',
          loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
        }]/*, canActivate: [AuthGaurdService/!*, Gaurd2Service*!/]*/
      },
      {path: '**', redirectTo: 'dashboard', canActivate: [AuthGaurdService, Gaurd2Service]},
    ]),
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent,
    LogoutComponent,
  ],
  providers: [VenueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
