import { FilmService } from './../../services/film.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from 'src/app/models/film';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
})
export class FilmListComponent implements OnInit {
  search: string = '';
  isWaiting = true;
  userID: number | undefined = 0;
  films: Film[] = [];
  showedFilms: Film[] = this.films;
  constructor(
    private filmService: FilmService,
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let observable: Observable<any> = this.filmService.getFilms();
    observable.subscribe((response) => {
      this.films = response;
      this.showedFilms = response;
      this.showedFilms = this.showedFilms.map((film) => {
        film.modify = film.created_by === this.userID;
        return film;
      });
      this.isWaiting = false;
    });

    this.userID = this.userService.loggedUser
      ? this.userService.loggedUser.id
      : undefined;
  }

  searchHandler() {
    this.showedFilms = this.films.filter((film) => {
      return film.title.toLowerCase().includes(this.search.toLowerCase());
    });
  }
}
