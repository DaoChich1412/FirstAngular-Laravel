import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {User} from '../../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: User[];
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.users = new Array<User>();
    this.allUser();
  }
  allUser() {
    this.adminService.getListUsers().subscribe((res) => {
      const data = res['data'];
      data.forEach((item) => {
        const user = item['info'];
        this.users.push(new User(user.id, user.name, user.email, '', item['roles']));
      });
    }, (err) => {
      console.log(err);
    });
  }
  editUser(id: number) {
    this.router.navigate(['admin', 'edit-user', id]);
  }
  deleteUser(id: number) {
    this.adminService.deleteUser(id).subscribe((res) => {
      console.log(res);
      this.ngOnInit();
    }, (err) => {
      console.log(err);
    });
  }
}
