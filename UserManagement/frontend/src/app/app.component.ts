import {Component, ViewEncapsulation} from '@angular/core';
import {UserStoreService} from './services/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Dictionary';
  constructor(private userStore: UserStoreService) {
  }
}
