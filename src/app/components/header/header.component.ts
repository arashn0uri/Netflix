import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: any;
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getLoggedUser();
  }

  loggedOut(): void {
    this.user = this.userService.logeedOut();
  }
}
