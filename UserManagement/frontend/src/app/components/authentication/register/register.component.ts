import {Component, ViewEncapsulation} from '@angular/core';
import {User} from '../../../models/user';
import {AuthenticateService} from '../../../services/authenticate.service';
import {Router} from '@angular/router';
import {ErrorService} from '../../../services/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public user: User;
  public message: string;
  constructor(private authService: AuthenticateService, private router: Router, private errorService: ErrorService) {
    this.user = new User();
  }
  register(registerForm) {
    if (registerForm.valid) {
      this.authService.register(this.user.name, this.user.email, this.user.password).subscribe((res) => {
        console.log('Successfully registered!');
        this.router.navigate(['login']);
      }, (err) => {
        console.log('Error registering', err.error['errors']);
        this.message = this.errorService.errors(err.error['errors']);
      });
    } else {
      this.message = 'Invalid Form!';
    }
  }
}
