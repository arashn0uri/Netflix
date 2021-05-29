import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Film } from '../models/film';
import { UserService } from './user.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private host = 'https://netflix.cristiancarrino.com';
  films: Film[] | null = null;

  private filmUrl = 'https://netflix.cristiancarrino.com/film/read.php';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient, private userService: UserService) {}

  getFilms(): Observable<Film> {
    return this.http.get<Film>(this.filmUrl, this.httpOptions);
  }

  addFilm(film: Film): Observable<any> {
    let loggedUser = this.userService.getLoggedUser();

    if (!loggedUser) {
      alert('Please login before');
      return of(false);
    }

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: loggedUser.token,
      }),
    };

    console.log('Adding film:', film);
    return this.http
      .post<any>(this.host + '/film/create.php', film, httpOptions)
      .pipe(
        tap((response) => {
          if (response.success) {
            if (this.films) {
              film.id = response.id;
              this.films.push(film);
            } else {
              this.getFilms().subscribe();
            }
          }
        }),
        catchError((error) => {
          alert(error.status + ': ' + error.error);
          return of(false);
        })
      );
  }

  editFilm(): Observable<Film> {
    return this.http.get<Film>(this.filmUrl, this.httpOptions);
  }

  removeFilm(): Observable<Film> {
    return this.http.get<Film>(this.filmUrl, this.httpOptions);
  }

  getLastFilms(films: Film[]): Film[] {
    let result = films
      .sort(
        (firstFilm, secondFilm) =>
          new Date(secondFilm.created_at || '').getTime() -
          new Date(firstFilm.created_at || '').getTime()
      )
      .slice(0, 4);
    return result;
  }

  getTopFilms(films: Film[]): Film[] {
    let result = films
      .sort((firstFilm, secondFilm) => secondFilm.vote - firstFilm.vote)
      .slice(0, 4);
    return result;
  }
}
