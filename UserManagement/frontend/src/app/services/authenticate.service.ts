import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    return this.http.post('/api/login', {
      email: email,
      password: password
    });
  }
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post('/api/register', {
      name: name,
      email: email,
      password: password
    });
  }
  logout(): Observable<any> {
    return this.http.get('/api/logout');
  }
  authUser(): Observable<any> {
    return this.http.get('api/auth');
  }
}
