import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-localstorage';

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
    private http: HttpClient,
    private storageService: LocalStorageService

  ) { }


  login(username: string, password: string, rememberMe: boolean): Observable<any> {
    console.log(username, password)
    return this.http.post(this.loginUrl, { username: username, password: password }, this.httpOptions)
      .pipe(tap(response => {
        console.log('login:', response);
        this.loggedUser = response;
        if (rememberMe) this.storageService.set("loggedUser", this.loggedUser);
      }),
        catchError(error => {
          console.log(error);
          this.loggedUser = null;

          this.storageService.clear();
          return of(null);
        })
      );
  }

  getLoggedUser(): void {
    this.loggedUser = this.storageService.get("loggedUser");
    return this.loggedUser;
  }
}
