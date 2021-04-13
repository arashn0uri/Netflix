import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private filmUrl = 'https://netflix.cristiancarrino.com/genre/read.php';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient
  ) { }

  getGenres(): Observable<any> {
    return this.http.get(this.filmUrl, this.httpOptions);
  };
}
