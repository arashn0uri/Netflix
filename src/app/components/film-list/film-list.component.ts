import { FilmService } from './../../services/film.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from 'src/app/models/film';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
})
export class FilmListComponent implements OnInit {
  search: string = '';
  isWaiting = true;
  films: Film[] = [];
  showedFilms: Film[] = this.films;
  constructor(
    private FilmService: FilmService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    let observable: Observable<any> = this.FilmService.getFilms();
    observable.subscribe((response) => {
      console.log(response);
      this.films = response;
      this.showedFilms = response;
      this.isWaiting = false;
    });
  }

  change() {
    this.showedFilms = this.films.filter((film) => {
      return film.title.toLowerCase().includes(this.search.toLowerCase());
    });
  }
}
