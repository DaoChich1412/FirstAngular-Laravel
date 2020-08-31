import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { AppRoutesModule } from './app-routes.module';
import {AuthenticateService} from './services/authenticate.service';
import {UserStoreService} from './services/user-store.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AppInterceptor} from './services/app.interceptor';
import {HomeComponent} from './components/home/home.component';
import {UserListComponent} from './components/admin/user-list/user-list.component';
import {CreateUserComponent} from './components/admin/create-user/create-user.component';
import {AdminService} from './services/admin.service';
import {EditUserComponent} from './components/admin/edit-user/edit-user.component';
import {AuthorizedComponent} from './components/authentication/authorized/authorized.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserListComponent,
    CreateUserComponent,
    EditUserComponent,
    AuthorizedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutesModule
  ],
  providers: [
    AuthenticateService,
    UserStoreService,
    AdminService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
