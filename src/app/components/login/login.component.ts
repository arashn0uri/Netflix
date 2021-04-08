import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  rememberMe: boolean = false;
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.username = this.username.trim();
    if (!this.username) { return; }
    this.userService.login(this.username, this.password, this.rememberMe)
      .subscribe(response => {
        if (response !== null) {
          this.router.navigate(['/dashboard']);
        } else {
          alert("login faild");
        }
      });
  }

}
