import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { faSignOutAlt as signout } from '@fortawesome/free-solid-svg-icons';
import { faUserEdit as userEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userEdit = userEdit;
  signout = signout;
  user: User | null = null;
  img: string = '';
  profile = faUserCircle;
  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.userService.getLoggedUser();
    this.img = this.user
      ? this.user.photo_url
      : 'http://simpleicon.com/wp-content/uploads/account.png';
  }

  loggedOut(): void {
    this.user = this.userService.loggedOut();
    if (this.user == null) {
      this.router.navigate(['/login']);
    } else {
      alert('sign out failed. try again after one minute, please!');
    }
  }
}
