import { Injectable } from '@angular/core';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }
  errors(errors) {
    let message = '';
    message += this.error(errors, 'name');
    message += this.error(errors, 'email');
    message += this.error(errors, 'password');
    return message;
  }
  error(errors, key) {
    let message = '';
    if (!isNullOrUndefined(errors[key])) {
      for (const err of errors[key]) {
        message += err + '\n';
      }
    }
    return message;
  }
}
