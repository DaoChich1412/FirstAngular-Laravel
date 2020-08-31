import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user';
import {UserStoreService} from '../../../services/user-store.service';
import {AuthenticateService} from '../../../services/authenticate.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User;
  public message: string;
  constructor(private userStore: UserStoreService, private authService: AuthenticateService, private router: Router) {
    this.user = new User();
  }

  ngOnInit(): void {
    if (this.userStore.isLoggedIn()) {
      this.authService.logout().subscribe((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
      this.userStore.resetStore();
    }
  }
  login(loginForm) {
    if (loginForm.valid) {
      this.authService.login(this.user.email, this.user.password).subscribe((res) => {
        console.log('Successfully logged in!');
        console.log(res);
        this.userStore.token = res['data']['token_type'] + ' ' + res['data']['access_token'];
        this.router.navigate(['home']);
      }, (err) => {
        console.log('Error logging in', err.error['errors']);
        this.message = 'Invalid email or password';
      });
    } else {
      this.message = 'Invalid Form!';
    }
  }
}
