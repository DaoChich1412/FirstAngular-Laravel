import { Injectable } from '@angular/core';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  constructor() { }
  get token(): string {
    return localStorage.getItem('token');
  }
  set token(token: string) {
    localStorage.setItem('token', token);
  }
  get roles() {
    return localStorage.getItem('roles');
  }
  set roles(roles: string) {
    localStorage.setItem('roles', roles);
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('token') != null;
  }
  resetStore() {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
  }
}
