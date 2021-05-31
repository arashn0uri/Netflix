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
  private loginUrl = 'https://netflix.cristiancarrino.com/user/login.php';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  loggedUser: User | null = null;
  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService
  ) {}

  login(
    username: string,
    password: string,
    rememberMe: boolean
  ): Observable<User | null> {
    return this.http
      .post<User | null>(
        this.loginUrl,
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
}
