import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HostListener } from '@angular/core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  arrowUp = faArrowUp;
  user: any;
  headerHeight: number = 0;
  width: number = 0;

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getLoggedUser();
    this.headerHeight = $('.header').height();
    this.width = window.innerWidth;
  }

  loggedOut(): void {
    this.user = this.userService.loggedOut();
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let height = $(document).height() - $(window).height();
    $('#progressBar').css(
      'width',
      String((window.pageYOffset * this.width) / height) + 'px'
    );
    if (window.pageYOffset > this.headerHeight) {
      $('#up').css('display', 'block');
    } else {
      $('#up').css('display', 'none');
    }
  }

  goUp() {
    window.scroll(0, 0);
  }

  toggle() {
    if ($('#arrow').has('active')) $('#arrow').removeClass('active');
  }
}
