import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private router: Router) { }

  getListUsers(): Observable<any> {
    return this.http.get('/api/admin/users');
  }
  detailOfUser(id: number): Observable<any> {
    return this.http.get('/api/admin/user/' + id);
  }
  createNewUser(name: string, email: string, password: string, roles: number[]): Observable<any> {
    return this.http.post('/api/admin/create', {
      name: name,
      email: email,
      password: password,
      roles: roles
    });
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete('/api/admin/delete/' + id);
  }
  editUser(id: number, name: string, roles: number[]): Observable<any> {
    return this.http.put('/api/admin/edit', {
      id: id,
      name: name,
      roles: roles
    });
  }
  getAllRoles(): Observable<any> {
    return this.http.get('/api/admin/roles');
  }
}
