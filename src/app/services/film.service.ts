import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Film } from '../models/film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private filmUrl = 'https://netflix.cristiancarrino.com/film/read.php';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient
  ) { }

  getFilms(): Observable<Film> {
    return this.http.get<Film>(this.filmUrl, this.httpOptions);
  }
}
