import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  profile = faUserCircle;
  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getLoggedUser();
  }

  loggedOut(): void {
    this.user = this.userService.logeedOut();
  }

}
