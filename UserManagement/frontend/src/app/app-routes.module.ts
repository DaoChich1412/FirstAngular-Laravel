import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/authentication/login/login.component';
import {RegisterComponent} from './components/authentication/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './guards/auth.guard';
import {UserListComponent} from './components/admin/user-list/user-list.component';
import {CreateUserComponent} from './components/admin/create-user/create-user.component';
import {EditUserComponent} from './components/admin/edit-user/edit-user.component';
import {AuthorizedComponent} from './components/authentication/authorized/authorized.component';
import {RoleGuard} from './guards/role.guard';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'admin/all-user', component: UserListComponent, canActivate: [AuthGuard, RoleGuard]},
  {path: 'admin/create-user', component: CreateUserComponent, canActivate: [AuthGuard, RoleGuard]},
  {path: 'admin/edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard, RoleGuard]},
  {path: 'authorized', component: AuthorizedComponent},
  {path: 'logout', redirectTo: '/login', canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/register'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutesModule { }
