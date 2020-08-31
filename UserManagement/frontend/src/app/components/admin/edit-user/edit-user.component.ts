import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Role} from '../../../models/role';
import {ErrorService} from '../../../services/error.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public user: User = new User();
  public roles: Role[] = [];
  public roleIds: number[] = [];
  public message: string;
  // tslint:disable-next-line:max-line-length
  constructor(private adminService: AdminService, private route: ActivatedRoute, private router: Router, private errorService: ErrorService) {
  }

  ngOnInit() {
    this.bindingUser();
    this.allRoles();
  }
  bindingUser() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.adminService.detailOfUser(Number(userId)).subscribe((res) => {
      const u = res['data']['info'];
      const roles = res['data']['roles'];
      roles.forEach((role) => {
        this.roleIds.push(role.id);
      });
      this.user = new User(u.id, u.name, u.email, '', roles);
    }, (err) => {
      console.log(err);
    });
  }
  allRoles() {
    this.adminService.getAllRoles().subscribe((res) => {
      this.roles = res['data'];
    }, (err) => {
      console.log(err);
    });
  }
  editUser(editForm) {
    if (editForm.valid) {
      this.adminService.editUser(this.user.id, this.user.name, this.roleIds).subscribe( (res) => {
        console.log(res['message']);
        this.router.navigate(['/admin/all-user']);
      }, (err) => {
        console.log('Error edit user', err.error['errors']);
        this.message = this.errorService.errors(err.error['errors']);
      });
    } else {
      this.message = 'Invalid Form';
    }
  }
}
