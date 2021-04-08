import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loginUrl = 'https://netflix.cristiancarrino.com/user/login.php';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  loggedUser: any;
  constructor(
    private http: HttpClient
  ) { }


  login(username: string, password: string, rememberMe: boolean): Observable<any> {
    console.log(username, password)
    return this.http.post(this.loginUrl, { username: username, password: password }, this.httpOptions)
      .pipe(tap(response => {
        console.log('login:', response);
        this.loggedUser = response;
      }),
        catchError(error => {
          console.log(error);
          this.loggedUser = null;
          return of(null);
        })
      );
  }
}
