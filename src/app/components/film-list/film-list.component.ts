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
      console.log(response);
      this.films = response;
      this.showedFilms = response;
      this.isWaiting = false;
    });
  }

  searchHandler() {
    this.showedFilms = this.films.filter((film) => {
      return film.title.toLowerCase().includes(this.search.toLowerCase());
    });
  }

  delete(film: Film) {
    this.filmService.deleteFilm(film).subscribe((response) => {
      if (response !== null) {
        this.router.navigate(['/dashboard']);
      } else {
        alert('deleting film failed. try again after one minute, please!');
      }
    });
  }
}
