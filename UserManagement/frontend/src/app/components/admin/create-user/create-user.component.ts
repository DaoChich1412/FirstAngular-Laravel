import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user';
import {AdminService} from '../../../services/admin.service';
import {Router} from '@angular/router';
import {Role} from '../../../models/role';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  public user: User;
  public roles: Role[];
  public roleIds: number[] = [];
  public message: string;
  constructor(private adminService: AdminService, private router: Router) {
    this.user = new User();
  }

  ngOnInit() {
    this.allRoles();
  }
  allRoles() {
    this.adminService.getAllRoles().subscribe((res) => {
      this.roles = res['data'];
    }, (err) => {
      console.log(err);
    });
  }
  newUser(createUserForm) {
    if (createUserForm.valid) {
      this.adminService.createNewUser(this.user.name, this.user.email, this.user.password, this.roleIds).subscribe((res) => {
        console.log(res['message']);
        this.router.navigate(['/admin/all-user']);
      }, (err) => {
        console.log('Error create user', err.error['errors'])
        this.message = 'Invalid form';
      });
    } else {
      this.message = 'Invalid form';
    }
  }
}
