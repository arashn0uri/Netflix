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

    return this.http
      .post<User>(this.host + '/user/edit.php', user, httpOptions)
      .pipe(
        tap((response) => {
          console.log(response);
          this.loggedUser = response;
          console.log(this.rememberMe);

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
}
