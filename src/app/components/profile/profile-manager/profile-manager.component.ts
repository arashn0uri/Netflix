import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-manager',
  templateUrl: './profile-manager.component.html',
  styleUrls: ['./profile-manager.component.scss'],
})
export class ProfileManagerComponent implements OnInit {
  user: User | null = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    photo_url: '',
    birthdate: '',
    token: '',
  };
  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getLoggedUser();
  }

  edit() {
    this.userService.editUser(this.user).subscribe((response) => {
      if (response !== null) {
        this.router.navigate(['/profile']);
      } else {
        alert(
          'editing your profile failed. try again after one minute, please!'
        );
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
