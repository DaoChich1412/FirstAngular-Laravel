import { Component, OnInit } from '@angular/core';
import {UserStoreService} from '../../services/user-store.service';
import {AuthenticateService} from '../../services/authenticate.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user: User = new User();
  constructor(private userStore: UserStoreService, private authenticateService: AuthenticateService, private router: Router) {
  }
  ngOnInit(): void {
    this.infoUser();
  }

  infoUser() {
    this.authenticateService.authUser().subscribe((res) => {
      console.log('Success');
      const temp = res['data']['info'];
      const roles = res['data']['roles'];
      const rolesName = [];
      for (const role of roles) {
        rolesName.push(role.name);
      }
      this.userStore.roles = JSON.stringify(rolesName);
      this.user = new User(temp.id, temp.name, temp.email);
      this.router.navigate(['admin/all-user']);
    }, (err) => {
      console.log(err);
    });
  }
}
