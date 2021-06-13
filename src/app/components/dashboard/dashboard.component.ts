import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmService } from '../../services/film.service';
import { Film } from 'src/app/models/film';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userID: number | undefined = 0;
  films: Film[] = [];
  rate: number = 0;
  isWaiting = true;
  lastFilms: Film[] = [];
  topFilms: Film[] = [];
  constructor(
    private filmService: FilmService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userID = this.userService.loggedUser
      ? this.userService.loggedUser.id
      : undefined;
    let observable: Observable<any> = this.filmService.getFilms();
    observable.subscribe((response) => {
      this.lastFilms = this.filmService.getLastFilms(response);
      this.lastFilms = this.lastFilms.map((film) => {
        film.modify = film.created_by === this.userID;
        return film;
      });
      this.topFilms = this.filmService.getTopFilms(response);
      this.topFilms = this.topFilms.map((film) => {
        film.modify = film.created_by === this.userID;
        return film;
      });
      this.isWaiting = false;
    });
  }
}
