import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Film } from '../models/film';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private filmUrl = 'https://netflix.cristiancarrino.com/film/read.php';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getFilms(): Observable<Film> {
    return this.http.get<Film>(this.filmUrl, this.httpOptions);
  }

  addFilm(film: Film): Observable<Film> {
    return this.http.post<Film>('https://netflix.cristiancarrino.com/film/read.php', film, {
      headers: new HttpHeaders({
        'Conetnt-Type': 'application/json',
        'Authorization': this.userService.loggedUser ? this.userService.loggedUser.token : ''
      })
    });
  }
}
