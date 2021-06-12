import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-localstorage';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private host = 'https://netflix.cristiancarrino.com';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  loggedUser: User | null = null;
  rememberMe: boolean = false;
  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService
  ) {}

  login(
    username: string,
    password: string,
    rememberMe: boolean
  ): Observable<User | null> {
    this.rememberMe = rememberMe;
    return this.http
      .post<User | null>(
        this.host + '/user/login.php',
        { username: username, password: password },
        this.httpOptions
      )
      .pipe(
        tap((response) => {
          this.loggedUser = response;
          if (rememberMe)
            this.storageService.set('loggedUser', this.loggedUser);
        }),
        catchError((error) => {
          console.log(error);
          this.loggedOut();
          return of(null);
        })
      );
  }

  getLoggedUser(): User | null {
    this.loggedUser = this.storageService.get('loggedUser');
    return this.loggedUser;
  }

  loggedOut(): User | null {
    this.storageService.remove('loggedUser');
    return (this.loggedUser = null);
  }

  editUser(user: any): Observable<User | null> {
    if (!this.loggedUser) {
      alert('Please login before');
      return of(null);
    }

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.loggedUser.token,
      }),
    };

    console.log('Editing user:', user);

    return this.http
      .post<User>(this.host + '/user/edit.php', user, httpOptions)
      .pipe(
        tap((response) => {
          this.loggedUser = response;

          if (this.rememberMe) {
            this.storageService.clear();
            this.storageService.set('loggedUser', this.loggedUser);
          }
        }),
        catchError((error) => {
          alert(error.status + ': ' + error.error);
          return of(null);
        })
      );
  }

  editFavoriteFilms(films: any): Observable<any> {
    if (!this.loggedUser) {
      alert('Please login before');
      return of(false);
    }

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.loggedUser.token,
      }),
    };

    console.log('Adding favorite films:', films);
    return this.http.post<any>(
      this.host + '/user/favorite-films.php',
      { ids: films },
      httpOptions
    );
  }

  editFavoriteActors(actors: any): Observable<any> {
    if (!this.loggedUser) {
      alert('Please login before');
      return of(false);
    }

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.loggedUser.token,
      }),
    };

    console.log('Adding favorite actors:', actors);
    return this.http.post<any>(
      this.host + '/user/favorite-actors.php',
      { ids: actors },
      httpOptions
    );
  }

  editFavoriteGenres(genres: any): Observable<any> {
    if (!this.loggedUser) {
      alert('Please login before');
      return of(false);
    }

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.loggedUser.token,
      }),
    };

    console.log('Adding favorite genres:', genres);
    return this.http
      .post<any>(
        this.host + '/user/favorite-genres.php',
        { ids: genres },
        httpOptions
      )
      .pipe(
        tap((response) => {
          if (this.loggedUser)
            this.login(
              this.loggedUser?.username,
              this.loggedUser?.password,
              this.rememberMe
            );
        }),
        catchError((error) => {
          alert(error.status + ': ' + error.error);
          return of(null);
        })
      );
  }
}
