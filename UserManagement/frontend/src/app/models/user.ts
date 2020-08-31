import {Role} from './role';

export class User {
  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public roles: Role[];
  constructor(id: number = null, name: string = '', email: string = '', password: string = '', roles: Role[] = []) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }
}

