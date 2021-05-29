import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Genre } from '../models/genre';
import { UserService } from './user.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private host = 'https://netflix.cristiancarrino.com';
  genres: Genre[] | null = null;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient, private userService: UserService) {}

  getGenres(): Observable<any> {
    return this.http.get(this.host + '/genre/read.php', this.httpOptions);
  }

  addGenre(genre: Genre): Observable<any> {
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

    console.log('Adding genre:', genre);
    return this.http
      .post<any>(this.host + '/genre/create.php', genre, httpOptions)
      .pipe(
        tap((response) => {
          if (response.success) {
            if (this.genres) {
              genre.id = response.id;
              this.genres.push(genre);
            } else {
              this.getGenres().subscribe();
            }
          }
        }),
        catchError((error) => {
          alert(error.status + ': ' + error.error);
          return of(false);
        })
      );
  }

  editGenre(genre: Genre): Observable<any> {
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

    console.log('Adding genre:', genre);
    return this.http
      .post<any>(this.host + '/genre/update.php', genre, httpOptions)
      .pipe(
        tap((response) => {
          if (response.success) {
            if (this.genres) {
              let genreToEdit = this.genres.find((x) => x.id == genre.id);
              genreToEdit = genre;
            } else {
              this.getGenres().subscribe();
            }
          }
        }),
        catchError((error) => {
          alert(error.status + ': ' + error.error);
          return of(false);
        })
      );
  }

  deleteGenre(genre: Genre): Observable<any> {
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

    console.log('deleting genre:', genre);
    return this.http
      .post<any>(this.host + '/genre/delete.php', { id: genre.id }, httpOptions)
      .pipe(
        tap((response) => {
          if (response.success) {
            if (this.genres) {
              this.genres = this.genres.filter((x) => x.id != genre.id);
            } else {
              this.getGenres().subscribe();
            }
          }
        }),
        catchError((error) => {
          alert(error.status + ': ' + error.error);
          return of(false);
        })
      );
  }
}
