import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HostListener } from '@angular/core';

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
    this.user = this.userService.loggedOut();
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element = document.querySelector('.header') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('dark');
    } else {
      element.classList.remove('dark');
    }
  }
}
